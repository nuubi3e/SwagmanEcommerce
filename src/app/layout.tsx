import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../sass/index.scss';
import Providers from '@/providers';
import CartContianer from '@/components/Cart';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-pr',
});

export const metadata: Metadata = {
  title: 'Swagman | Swag on point with swagman',
  description: `Welcome to Swagman, a premium men's grooming and clothing brand dedicated to helping men look and feel their best. At Swagman, we understand that men today are more conscious about their appearance than ever before. That's why we provide an extensive range of high-quality grooming and clothing products designed specifically for men.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={raleway.variable}>
      <body className='font-primary relative'>
        <Providers>
          <CartContianer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
