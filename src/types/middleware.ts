import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Retrieve the token (i.e., session)
  const session = await getToken({ req: request });

  const url = request.nextUrl;
  
    // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (session && 
    (url.pathname.startsWith('/sign-in') ||
     url.pathname.startsWith('/sign-up') ||
     url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();  // Continue if no redirection is required
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/'],
}
