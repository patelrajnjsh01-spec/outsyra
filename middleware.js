import { NextResponse } from "next/server";
import { verifySessionTokenEdge } from "@/lib/auth/edge-jwt";

const protectedPrefixes = [
    "/dashboard",
    "/admin",
    "/analytics",
    "/billing",
    "/bookings",
    "/calendar",
    "/coaching",
    "/community",
    "/courses",
    "/email",
    "/instagram",
    "/products",
    "/settings",
    "/store",
    "/templates",
];

const authOnlyPrefixes = ["/login", "/signup", "/verify-otp", "/forgot-password", "/reset-password"];

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("auth_token")?.value;
    const supabaseToken = request.cookies.get("sb-access-token")?.value || request.cookies.get("sb-refresh-token")?.value;

    const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
    const isAuthOnly = authOnlyPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

    // Verify session
    let isAuthenticated = false;
    if (token) {
        const payload = await verifySessionTokenEdge(token);
        if (payload) {
            isAuthenticated = true;
        }
    } else if (supabaseToken) {
        isAuthenticated = true;
    }

    // 1. Redirect unauthenticated user trying to access protected routes
    if (isProtected && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Redirect already authenticated user away from login/signup pages
    if (isAuthOnly && isAuthenticated && pathname !== "/verify-otp") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/auth).*)"],
};