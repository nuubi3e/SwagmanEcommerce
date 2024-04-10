import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import React, { ReactNode } from 'react';

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className='px-8 max-lg:px-6 max-md:px-5'>
        <div className='w-primary max-[1430px]:w-full mx-auto pt-10 pb-14'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsLayout;
