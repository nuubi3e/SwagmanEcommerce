import { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Log } from '@/lib/logs';
import { CartItems } from '@/lib/types/global.types';
import { MdInfo } from 'react-icons/md';
import Image from 'next/image';
import { ProceedToPayBtn } from '@/components/Buttons/Buttons';

export const metadata: Metadata = {
  title: 'Swagman | Checkout',
  description: 'Securly pay for your order.',
};

const MINIMUM_ORDER_VAL = 399;

const CheckoutPage = async () => {
  console.clear();
  let cart: CartItems[] = [];
  const cookie = cookies().get('session')?.value;
  const order = cookies().get('order')?.value;
  let shippingCharges = 0;
  let totalPrice = 0;

  Log.log(cookie, order);

  // if user is not logged in or there is no order then we redirect to home
  if (!cookie || !order) return redirect('/');

  try {
    const res = await fetch(`${process.env.API_URL}api/orders?order=${order}`, {
      method: 'GET',
      headers: {
        Authorization: cookie,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = JSON.parse(await res.text());

      throw new Error(text.message);
    }

    const data = await res.json();
    Log.log('ORDER: ', data.data.order);
    const orderToBePlaced = data?.data?.order || null;

    if (!orderToBePlaced) return redirect('/');

    shippingCharges =
      orderToBePlaced.totalAmount < MINIMUM_ORDER_VAL
        ? 50
        : orderToBePlaced.totalAmount;
    totalPrice = orderToBePlaced.totalAmount + shippingCharges;
    cart = orderToBePlaced.products || [];
  } catch (err) {}

  return (
    <>
      <h1 className='text-center text-3xl font-bold'>Checkout</h1>
      <section className='flex gap-5 lg:gap-10 relative mt-5 max-lg:flex-col'>
        <ul className='w-full lg:w-[60%] flex flex-col'>
          {cart.map((prd) => (
            <li
              className='flex border-b gap-5 py-3 items-center flex-wrap'
              key={prd.id}>
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
                <span className='inline-block relative info'>
                  <MdInfo />
                  <span className='hidden text-sm py-2 px-3 w-max bg-off-white shadow text-charcoal-grey absolute top-full left-0 max-xs:-left-24'>
                    Free Delivery on orders above ₹ {MINIMUM_ORDER_VAL}
                  </span>
                </span>
              </p>
              <p>₹ {shippingCharges}</p>
            </li>
            <li className='py-3 border-b flex justify-between font-medium'>
              <strong>Total Price</strong> <p>₹ {totalPrice}</p>
            </li>
          </ul>
          <ProceedToPayBtn />
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
