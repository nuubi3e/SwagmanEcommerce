import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../sass/index.scss';
import Cart from '@/components/Cart/CartModal/CartModal.component';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header/Header.component';
import dynamic from 'next/dynamic';
import { AuthProvider } from '@/providers/Auth/Auth.provider';
import CartProvider from '@/providers/Cart/Cart.provider';
import Login from '@/components/Login/Login.component';
import { getSession } from '@/lib/actions/actions';
import { cookies } from 'next/headers';
import { Log } from '@/lib/logs';
import RootChildrenWrapper from '@/wrappers/RootChildrenWrapper/RootChildren.wrapper';
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
  const cookie = cookies().get('session')?.value;
  const order = cookies().get('order')?.value;
  let cart: any[] = [];

  // if user is logged in and has some product in cart then we fetch the cart
  if (cookie && order) {
    try {
      console.clear();
      const res = await fetch(
        `${process.env.API_URL}api/orders?order=${order}`,
        {
          method: 'GET',
          headers: {
            Authorization: cookie,
          },
          cache: 'default',
        }
      );

      if (!res.ok) {
        const text = JSON.parse(await res.text());

        throw new Error(text.message);
      }

      const data = await res.json();
      Log.log(data);
      cart = data?.data?.items || [];
    } catch (err) {}
  }

  return (
    <html lang='en' className={raleway.variable}>
      <body className='font-primary relative'>
        <ScrollToTop />
        <AuthProvider hasUser={session ? true : false}>
          <CartProvider existingCart={JSON.stringify(cart)}>
            <Cart />
            <Login />
            <Header />
            <RootChildrenWrapper>{children}</RootChildrenWrapper>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
