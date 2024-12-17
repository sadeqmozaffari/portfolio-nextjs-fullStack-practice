import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
// import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const {pathname} = request.nextUrl;

  // استثنا کردن مسیر لاگین از middleware
  if (pathname === '/admin/auth/signin') {
    return NextResponse.next();
  }

  // بررسی وجود توکن
  if (!token) {
    return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
  } else {
    return NextResponse.next();
  }

  // try {
  //   // بررسی اعتبار توکن
  //   jwt.verify(token, 'my secret');
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error('Invalid Token:', error);
  //   return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
  // }
}

export const config = {
  matcher: ['/admin/:path*'], // مسیرهای تحت کنترل middleware
};
