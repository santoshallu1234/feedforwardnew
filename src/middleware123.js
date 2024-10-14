import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const url = new URL(request.url); // Parses the full URL
  const path = url.pathname; 
   const isPiblicPath = path === '/login' || path ==='/signup' || path === '/verifyemail' || path === '/'   ;
  const token = request.cookies.get("token")?.value || '';

   if(isPiblicPath && token){
    
    return NextResponse.redirect(new URL('/profile', request.url))
    
   }
   if(isPiblicPath==false && token===''){
    
   return NextResponse.redirect(new URL('/login', request.url))
   }
  //return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/scanqr',
    '/profile',
    '/profile',
    '/signup',
    '/genqr',
    '/profile/donatepost',
  ],
}