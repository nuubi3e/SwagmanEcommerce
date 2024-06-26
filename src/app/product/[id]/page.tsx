import { ProductDetail } from '@/lib/types/client.types'
import { connectToAPI } from '@/lib/utils/globals.utils'
import React from 'react'
import Error from './components/Error.component'
import ProductDetailImages from '@/components/ProductDetailImages'
import { GenerateStars } from '@/lib/utils/client.utils'
import ProductDescription from './components/ProductDescription.component'
import Ingredients from './components/Ingredients.component'
import { Metadata } from 'next'
import { Log } from '@/lib/logs'
import UserReview from './components/UserReviews.component'
import { getSession } from '@/lib/actions/actions'
import { AddToCartButton } from '@/components/Buttons/Buttons'

interface Props {
  params: { id: string }
  searchParams: { size: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let product: ProductDetail | null = null
  try {
    const data = await connectToAPI({
      endpoint: `product?name=${params.id}`,
    })

    product = data?.data?.product || null
  } catch (err: any) {
    // setting error message and product to null
    product = null
  }

  return {
    title: product ? product?.name : '404 Product Not Found',
    description: product
      ? product.description.split('\n')[0]
      : "We don't have this product",
  }
}

const ProductDetailsPage = async ({ params, searchParams }: Props) => {
  const session = await getSession()

  let errorMessage = 'Product Not Found'
  let product: ProductDetail | null = null
  try {
    const data = await connectToAPI({
      endpoint: `product?name=${params.id}`,
      noCache: true,
    })

    product = data?.data?.product || null
  } catch (err: any) {
    // setting error message and product to null
    errorMessage = err.message
    product = null
  }

  if (!product) return <Error message={errorMessage} />

  Log.log(product)

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex max-lg:flex-col gap-20'>
        {/* product images */}
        <ProductDetailImages />

        {/* info */}
        <section className='flex flex-col gap-3 text-black'>
          <h1 className='text-5xl max-xs:text-4xl'>{product.name}</h1>

          <div className='flex items-center gap-2 text-2xl text-charcoal-grey flex-wrap'>
            {GenerateStars(product.rating)}{' '}
            <p className='text-lg font-medium'>({product.rating}) Ratings</p>
          </div>

          {/* sizes */}
          {product?.sizes && product.sizes.length > 0 && (
            <div className='flex flex-col gap-3'>
              <p>
                <strong>Sizes:</strong>
              </p>
              <section className='flex items-center gap-2 flex-wrap'>
                {product?.sizes.map((size) => (
                  <div key={size._id} className='w-max'>
                    <input
                      type='radio'
                      name='sizes'
                      id={size._id}
                      hidden
                      defaultChecked={size.size === searchParams?.size}
                    />
                    <label
                      htmlFor={size._id}
                      className='px-4 py-1 inline-block rounded bg-off-white-dark text-charcoal-grey text-sm font-medium transition-all select-none cursor-pointer'>
                      {size.size}
                    </label>
                  </div>
                ))}
              </section>
            </div>
          )}

          <p className='font-semibold text-2xl'>₹ {product.price}</p>

          <div className='self-start max-xs:self-stretch'>
            <AddToCartButton
              _id={product._id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              size={'default'}
            />
          </div>
        </section>
      </header>

      <ProductDescription description={product.description} />

      <Ingredients ingredients={product.ingredients} />

      <UserReview
        rating={product.rating}
        reviews={product.reviews}
        userId={session?.id || ''}
        productId={product._id}
      />
    </div>
  )
}

export default ProductDetailsPage
