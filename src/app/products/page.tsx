import { AddToCartButton } from '@/components/Buttons';
import ProductBox from '@/components/ProductBox';
import { getProducts } from '@/lib/server/get-data';
import { Metadata } from 'next';
import React from 'react';

interface ProductsPageProps {
  searchParams?: {
    category?: string;
  };
}

export async function generateMetadata({ searchParams }: ProductsPageProps) {
  return {
    title: `Swagman | ${searchParams?.category || 'All'} Products`,
    description: `Swagman ${
      searchParams?.category || 'All'
    } Products are very premium`,
  } as Metadata;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  console.log(searchParams);

  const productsData = await getProducts(searchParams?.category || '');

  const products = productsData.data?.products || [];

  return (
    <section className='flex flex-col gap-10'>
      <h1 className='text-center uppercase font-medium text-3xl'>
        {searchParams?.category || 'all products'}
      </h1>
      <div className='ml-auto flex items-center gap-3'>
        <p>Sort By:</p>{' '}
        <select id='' className='w-max border py-2 px-4 outline-none'></select>
      </div>
      <ul className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-[550px]:gap-3 text-charcoal-grey'>
        {products.map((prd) => (
          <ProductBox
            _id={prd._id.toString()}
            name={prd.name}
            price={prd.price}
            rating={prd.rating}
            key={prd._id.toString()}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductsPage;
