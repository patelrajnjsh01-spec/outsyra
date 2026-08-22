import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard", "/admin", "/analytics", "/billing", "/bookings", "/calendar", "/coaching", "/community", "/courses", "/email", "/instagram", "/products", "/settings", "/store", "/templates"];

export async function middleware(request) {
  const isProtected = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isConfigured = url && key && !url.includes("your-project-id") && !key.includes("your-supabase");

  if (!isConfigured) {
    // In preview / demo mode without active Supabase credentials, allow full access to explore the app
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch (err) {
    // Network or fetch failure with Supabase - allow proceed in demo mode
    return NextResponse.next();
  }
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };