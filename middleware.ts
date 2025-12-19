import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, but allow auth pages
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/auth')) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // For middleware, just check presence of the cookie.
    // JWT verification is done in the API/Server components.
    if (!token) {
      const loginUrl = new URL('/admin/auth/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};



