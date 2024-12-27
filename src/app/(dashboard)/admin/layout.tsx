import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getLocale} from 'next-intl/server';
 import {Inter} from 'next/font/google';
import localFont from 'next/font/local';

const myFont = Inter({subsets: ['latin']});
const FaFont = localFont({src: '../../assets/fonts/IRANSans.ttf'});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html dir={locale === 'en' ? 'ltr' : 'rtl'} lang={locale} id="html">
      <body
        suppressHydrationWarning={true}
        className={locale === 'en' ? myFont.className : FaFont.className}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {children}
            <ToastContainer position="top-left" autoClose={3000} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
