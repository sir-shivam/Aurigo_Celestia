// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Check if the user is on the login or signup page
  const isLoginOrSignupPage = url.pathname === '/login' || url.pathname === '/signup';
  
  // Simulate an authentication check (you can replace this with your actual auth check logic)
  const isAuthenticated = Boolean(request.cookies.get('token')); // Example: check for auth token in cookies

  // If the user is not authenticated and is trying to access a restricted page
  if (!isAuthenticated && !isLoginOrSignupPage) {
    // Redirect to login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If authenticated or on public pages, allow access
  return NextResponse.next();
}

// Define which paths the middleware should be applied to
export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard', '/search'], // Adjust based on your app's structure
};
