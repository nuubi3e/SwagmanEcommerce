'use client';
import React from 'react';
import { AddToCartButton } from '../Buttons';
import { Log } from '@/lib/logs';
import { ProductBrief } from '@/lib/types/client.types';

interface ProductBoxProps extends ProductBrief {}

const ProductBox = (prd: ProductBoxProps) => {
  Log.log(prd._id);

  return (
    <li
      className='border border-off-white-dark flex flex-col items-center shadow select-none'
      key={prd._id.toString()}>
      {/* image box */}
      <figure className='w-full aspect-[1/1.1] bg-charcoal-grey bg-opacity-10'></figure>

      {/* info box */}
      <div className='p-4 flex flex-col items-center text-center w-full flex-1'>
        <h4 className='text-2xl font-medium'> {prd.name} </h4>
        <p className=''>({prd.rating}) Rating</p>
        <p className='mb-4 font-semibold text-xl'>₹ {prd.price}</p>
        <div className='self-stretch mt-auto'>
          <AddToCartButton
            _id={prd._id}
            name={prd.name}
            price={prd.price}
            rating={prd.rating}
          />
        </div>
      </div>
    </li>
  );
};

export default ProductBox;
