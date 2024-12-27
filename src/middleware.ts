import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {isAuthenticated} from './helper/authentication';
// مسیرهایی که نیاز به احراز هویت ندارند
const bypassAuth = ['/admin/auth/signin', '/admin/auth/signup'];
export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  // بررسی مسیرهای admin
  if (pathname.startsWith('/admin')) {
    // مسیرهای غیر از مسیرهای استثنا
    if (!bypassAuth.includes(pathname)) {
      try {
        const authStatus = await isAuthenticated(request);

        // در صورت عدم احراز هویت
        if (!authStatus?.status) {
          const signinUrl = new URL('/admin/auth/signin', request.url);
          signinUrl.searchParams.set('redirect', pathname); // تنظیم مسیر بازگشت
          return NextResponse.redirect(signinUrl); // هدایت به صفحه لاگین
        }
      } catch (error) {
        console.error('Authentication Error:', error);
        const errorPageUrl = new URL('/admin/auth/error', request.url); // هدایت به صفحه خطا
        return NextResponse.redirect(errorPageUrl);
      }
    }
  }

  // ادامه پردازش برای مسیرهای دیگر
  return NextResponse.next();
}

