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

    const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
    const isAuthOnly = authOnlyPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

    // Verify session
    let isAuthenticated = false;
    let payload = null;
    if (token) {
        payload = await verifySessionTokenEdge(token);
        if (payload) {
            isAuthenticated = true;
        }
    }

    // 1. Redirect unauthenticated user trying to access protected routes
    if (isProtected && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Redirect already authenticated user away from login/signup pages
    if (isAuthOnly && isAuthenticated && pathname !== "/verify-otp") {
        const destination = payload?.role === "superadmin" || payload?.role === "admin" ? "/admin" : "/dashboard";
        return NextResponse.redirect(new URL(destination, request.url));
    }

    // 3. Superadmin-only guard for /admin route
    if (pathname.startsWith("/admin") && isAuthenticated) {
        if (payload?.role !== "superadmin" && payload?.role !== "admin") {
            // Regular creator attempted to access admin console -> send to creator dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    // 4. Creator dashboard access check
    if (isProtected && isAuthenticated && pathname !== "/access-restricted" && !pathname.startsWith("/admin")) {
        // If a creator's dashboard access is revoked or pending, redirect to /access-restricted
        if (payload?.role === "creator" && payload?.dashboard_access === false) {
            return NextResponse.redirect(new URL("/access-restricted", request.url));
        }
    }

    // 5. If approved user visits /access-restricted, redirect them to dashboard
    if (pathname === "/access-restricted" && isAuthenticated) {
        if (payload?.role === "superadmin" || payload?.role === "admin") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        if (payload?.dashboard_access !== false) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api/auth).*)"],
};