import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Check if Supabase is configured
  let user = null
  let error = null

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url_here') {
      const result = await supabase.auth.getUser()
      user = result.data.user
      error = result.error
    } else {
      // Mock authentication check - in a real app you'd check a session cookie
      // For development, we'll allow access
      user = { id: 'mock-user' }
    }
  } catch (err) {
    console.error("Auth middleware error:", err)
    error = err
  }

  // Redirect to signin if accessing dashboard without auth
  if (request.nextUrl.pathname.startsWith("/dashboard") && (!user || error)) {
    const redirectUrl = new URL("/auth/signin", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard if accessing auth pages while authenticated
  if (
    (request.nextUrl.pathname === "/auth/signin" || request.nextUrl.pathname === "/auth/signup") &&
    user && !error
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
