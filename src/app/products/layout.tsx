import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React, { ReactNode } from 'react';

const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className='px-8 max-lg:px-6 max-md:px-5'>
        <div className='w-[1350px] max-[1430px]:w-full mx-auto pt-10 pb-14'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsLayout;
