import { ProductDetail } from '@/lib/types/client.types';
import { connectToAPI } from '@/lib/utils/globals.utils';
import React from 'react';
import Error from './components/Error.component';
import ProductDetailImages from '@/components/ProductDetailImages';
import { GenerateStars } from '@/lib/utils/client.utils';
import ProductDescription from './components/ProductDescription.component';
import Ingredients from './components/Ingredients.component';
import NewReviewForm from './components/NewReviewForm.component';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let product: ProductDetail | null = null;
  try {
    const data = await connectToAPI({
      endpoint: `product?name=${params.id}`,
    });

    product = data?.data?.product || null;
  } catch (err: any) {
    // setting error message and product to null
    product = null;
  }

  return {
    title: product ? product?.name : '404 Product Not Found',
    description: product
      ? product.description.split('\n')[0]
      : "We don't have this product",
  };
}

const sizes = [
  {
    name: '50ml',
    id: 1,
  },
  {
    name: '100ml',
    id: 2,
  },
  {
    name: '150ml',
    id: 3,
  },
  {
    name: '200ml',
    id: 4,
  },
];

const ProductDetailsPage = async ({ params }: Props) => {
  let errorMessage = 'Product Not Found';
  let product: ProductDetail | null = null;
  try {
    const data = await connectToAPI({
      endpoint: `product?name=${params.id}`,
    });

    product = data?.data?.product || null;
  } catch (err: any) {
    // setting error message and product to null
    errorMessage = err.message;
    product = null;
  }

  if (!product) return <Error message={errorMessage} />;

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex max-lg:flex-col gap-20'>
        {/* product images */}
        <ProductDetailImages />

        {/* info */}
        <section className='flex flex-col gap-3 text-black'>
          <h1 className='text-5xl max-xs:text-4xl'>{product.name}</h1>

          <div className='flex items-center gap-2 text-2xl text-charcoal-grey'>
            {GenerateStars(product.rating)}{' '}
            <p className='text-lg font-medium'>({product.rating}) Ratings</p>
          </div>

          {/* sizes */}
          <div className='flex flex-col gap-3'>
            <p>
              <strong>Sizes:</strong>
            </p>
            <section className='flex items-center gap-2 flex-wrap'>
              {sizes.map((size) => (
                <div key={size.name} className='w-max'>
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

          <p className='font-semibold text-2xl'>₹ {product.price}</p>
        </section>
      </header>

      <ProductDescription description={product.description} />

      <Ingredients ingredients={product.ingredients} />

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
              {GenerateStars(product.rating)}
            </div>

            <NewReviewForm />
          </div>

          <ul className='flex flex-col gap-4 flex-1'>
            {product.reviews.length === 0 && (
              <li className='text-center text-2xl font-medium mt-16'>
                No Reviews Found!!
              </li>
            )}
            {product.reviews.map((review) => (
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
