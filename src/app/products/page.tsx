import React from 'react';

interface ProductsPageProps {
  searchParams?: {
    category?: string;
  };
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  return (
    <section className='flex flex-col gap-10'>
      <h1 className='text-center uppercase font-medium text-3xl'>
        {searchParams?.category || 'all products'}
      </h1>
      <div className='ml-auto flex items-center gap-3'>
        <p>Sort By:</p>{' '}
        <select id='' className='w-max border py-2 px-4 outline-none'></select>
      </div>
      <ul className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-[450px]:gap-3 max-xs:gap-5'>
        <li className='aspect-video border border-off-white-dark'></li>
        <li className='aspect-video border border-off-white-dark'></li>
        <li className='aspect-video border border-off-white-dark'></li>
        <li className='aspect-video border border-off-white-dark'></li>
        <li className='aspect-video border border-off-white-dark'></li>
      </ul>
    </section>
  );
};

export default ProductsPage;
