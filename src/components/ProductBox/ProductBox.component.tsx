import React from 'react'
import { Log } from '@/lib/logs'
import { ProductBrief } from '@/lib/types/client.types'
import Image from 'next/image'
import Link from 'next/link'
import { GenerateStars } from '@/lib/utils/client.utils'

interface ProductBoxProps extends ProductBrief {
  rating: number
}

const ProductBox = (prd: ProductBoxProps) => {
  return (
    <li
      className='border border-off-white-dark flex flex-col items-center shadow select-none'
      key={prd._id.toString()}>
      {/* image box */}
      <figure className='w-full aspect-[1/1] max-xs:aspect-[1/1.2]'>
        <Image
          src={'/images/tshirt-black.png'}
          alt='product-cover'
          width={400}
          height={400}
          className='w-full h-full object-contain'
        />
      </figure>

      {/* info box */}
      <div className='p-4 flex flex-col items-center text-center w-full flex-1'>
        <h4 className='text-2xl font-medium'>
          <Link href={`/product/${prd.name}`}> {prd.name}</Link>{' '}
        </h4>

        <div className='flex items-center gap-1 my-1'>
          {GenerateStars(prd.rating)}
        </div>
        <p className=''>({prd.rating}) Rating</p>
        <p className='mb-4 font-semibold text-xl'>₹ {prd.price}</p>
        <div className='self-stretch mt-auto'>
          <Link
            href={`/product/${prd.name}`}
            className='bg-charcoal-grey w-full py-3 px-6 uppercase font-medium text-off-white inline-block'>
            View Options
          </Link>
        </div>
      </div>
    </li>
  )
}

export default ProductBox
