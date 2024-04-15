import ProductDetailImages from '@/components/ProductDetailImages';
import { Log } from '@/lib/logs';
import { ProductDetail } from '@/lib/types/client.types';
import { connectToAPI } from '@/lib/utils/globals.utils';
import { redirect } from 'next/navigation';
import React from 'react';
import ProductDescription from './components/ProductDescription.component';
import { Metadata } from 'next';
import NewReviewForm from './components/NewReviewForm.component';
import { GenerateStars } from '@/lib/utils/client.utils';
import Ingredients from './components/Ingredients.component';

interface ProductDetailsPageProps {
  searchParams: {
    name?: string;
  };
}

// generating dynamic meta deta for each product
export async function generateMetadata({
  searchParams,
}: ProductDetailsPageProps) {
  if (!searchParams?.name) return {};

  try {
    const data = await connectToAPI({
      endpoint: `product?name=${searchParams.name}`,
    });

    const prd = data.data.product as ProductDetail;

    // return product details in metadata
    return {
      title: `${searchParams?.name}`,
      description: prd.description.split('\n')[0],
    } as Metadata;
  } catch (err) {
    // return product not found metadata
    return {
      title: `Swagman | Product not Found`,
      description: `Sorry Looks like this product no longer exists`,
    } as Metadata;
  }
}

const sizes = [
  {
    name: '20 ml',
    price: 99,
  },
  {
    name: '100 ml',
    price: 189,
  },
  {
    name: '200 ml',
    price: 259,
  },
  {
    name: '300 ml',
    price: 450,
  },
];

const ProductDetailsPage = async ({
  searchParams,
}: ProductDetailsPageProps) => {
  if (!searchParams?.name) return redirect('/products'); // if there is no search params then redirect to products page

  const data = await connectToAPI({
    endpoint: `product?name=${searchParams.name}`,
  });

  const prd = data.data.product as ProductDetail;

  Log.log(prd);

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex max-lg:flex-col gap-20'>
        {/* prd images */}
        <ProductDetailImages />

        {/* info */}
        <section className='flex flex-col gap-3 text-black'>
          <h1 className='text-5xl max-xs:text-4xl'>{prd.name}</h1>

          <div className='flex items-center gap-2 text-2xl text-charcoal-grey'>
            {GenerateStars(prd.rating)}{' '}
            <p className='text-lg font-medium'>({prd.rating}) Ratings</p>
          </div>

          {/* sizes */}
          <div className='flex flex-col gap-3'>
            <p>
              <strong>Sizes:</strong>
            </p>
            <section className='flex items-center gap-2'>
              {sizes.map((size) => (
                <div key={size.name}>
                  <input type='radio' name='sizes' id={size.name} hidden />
                  <label
                    htmlFor={size.name}
                    className='px-4 py-1 inline-block rounded bg-off-white-dark text-charcoal-grey text-sm font-medium transition-all select-none cursor-pointer'>
                    {size.name}
                  </label>
                </div>
              ))}
            </section>
          </div>

          <p className='font-semibold text-2xl'>₹ {prd.price}</p>
        </section>
      </header>

      <ProductDescription description={prd.description} />

      <Ingredients ingredients={prd.ingredients} />

      {/* User Reviews */}
      <section className=''>
        <h2 className='text-4xl max-xs:text-3xl text-center font-medium items-center'>
          User Reviews
        </h2>

        <div className='mt-10 flex gap-10 max-md:flex-col-reverse relative'>
          {/* New Review */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-3xl max-xs:text-2xl'>Overall Rating</h3>
            <div className='flex items-center gap-2 text-3xl text-charcoal-grey mb-2'>
              {GenerateStars(prd.rating)}
            </div>

            <NewReviewForm />
          </div>

          <ul className='flex flex-col gap-4 flex-1'>
            {prd.reviews.length === 0 && (
              <li className='text-center text-2xl font-medium mt-16'>
                No Reviews Found!!
              </li>
            )}
            {prd.reviews.map((review) => (
              <li
                className='bg-off-white flex flex-col p-3 gap-2 text-charcoal-grey'
                key={review._id}>
                <h4 className='text-xl font-medium'>{review.username}</h4>
                <div className='flex gap-3 items-center'>
                  <div className='flex items-center gap-1'>
                    {GenerateStars(review.rating)}
                  </div>
                  <p className='text-sm'>{review.date}</p>
                </div>
                <p>{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
