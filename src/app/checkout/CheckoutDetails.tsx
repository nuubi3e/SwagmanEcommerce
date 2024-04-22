'use client';
import { CartContext } from '@/providers/Cart/Cart.provider';
import Image from 'next/image';
import React, { useContext } from 'react';
import { MdInfo } from 'react-icons/md';

const CheckoutDetails = () => {
  const cartState = useContext(CartContext);
  const shippingCharges = cartState.totalPrice > 399 ? 0 : 50;
  const totalPrice = cartState.totalPrice + shippingCharges;
  return (
    <section className='flex gap-5 lg:gap-10 relative mt-5 max-lg:flex-col'>
      <ul className='w-full lg:w-[60%] flex flex-col'>
        {cartState.products.map((prd) => (
          <li
            className='flex border-b gap-5 py-3 items-center flex-wrap'
            key={prd._id}>
            <figure className='h-20 aspect-square rounded-md bg-slate-200 overflow-hidden'>
              <Image
                src={'/images/tshirt-black.png'}
                alt='product'
                width={200}
                height={200}
                className='w-full h-full object-cover object-center'
              />
            </figure>
            <div className='flex flex-col gap-1'>
              <h4 className='text-xl font-medium'>{prd.name}</h4>
              <span className=''> ({prd.size})</span>
              <p className='font-medium'>Quantity: {prd.quantity}</p>
            </div>

            <p className='ml-auto font-medium text-lg w-max'>
              ₹ {prd.quantity * prd.price}
            </p>
          </li>
        ))}
      </ul>
      <div className='lg:self-start flex-1 sticky top-0 right-0 border rounded-md p-5'>
        <h3 className='text-3xl font-medium text-center'>Order Total</h3>

        <ul className='flex flex-col my-5'>
          <li className='py-3 border-b flex justify-between font-medium'>
            <strong>Taxes</strong> <p>₹ 0</p>
          </li>
          <li className='py-3 border-b flex justify-between font-medium'>
            <p className='flex items-center gap-2'>
              <strong>Shipping</strong>
              <MdInfo />
            </p>{' '}
            <p>₹ {shippingCharges}</p>
          </li>
          <li className='py-3 border-b flex justify-between font-medium'>
            <strong>Total Price</strong> <p>₹ {totalPrice}</p>
          </li>
        </ul>

        <button
          type='button'
          className='w-full bg-charcoal-grey flex items-center justify-center py-3 px-2 text-off-white transition-all disabled:cursor-not-allowed disabled:bg-opacity-50'>
          Proceed to Pay
        </button>
      </div>
    </section>
  );
};

export default CheckoutDetails;
