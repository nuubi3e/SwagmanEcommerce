import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../sass/index.scss';
import Cart from '@/components/Cart';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/providers/Auth/Auth.provider';
import CartProvider from '@/providers/Cart/Cart.provider';
import Login from '@/components/Login/Login.component';
import { getSession } from '@/lib/actions/actions';
const ScrollToTop = dynamic(
  () => import('@/components/ScrollToTop/ScrollToTop.component'),
  {
    ssr: false,
  }
);

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-pr',
});

export const metadata: Metadata = {
  title: 'Swagman | Swag on point with swagman',
  description: `Welcome to Swagman, a premium men's grooming and clothing brand dedicated to helping men look and feel their best. At Swagman, we understand that men today are more conscious about their appearance than ever before. That's why we provide an extensive range of high-quality grooming and clothing products designed specifically for men.`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang='en' className={raleway.variable}>
      <body className='font-primary relative'>
        <ScrollToTop />
        <AuthProvider hasUser={session ? true : false}>
          <CartProvider>
            <Cart />
            <Login />
            <Header />
            <main className='px-8 max-lg:px-6 max-md:px-5'>
              <div className='w-primary max-[1430px]:w-full mx-auto pt-10 pb-14'>
                {children}
              </div>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
