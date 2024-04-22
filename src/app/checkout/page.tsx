import { Metadata, Viewport } from 'next';
import React from 'react';
import CheckoutTest from './CheckoutTest';
import CheckoutDetails from './CheckoutDetails';

// <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
export const metadata: Metadata = {
  title: 'Swagman | Checkout',
  description: 'Securly pay for your order.',
};

// setting viewport for paytm payment integration
export const viewport: Viewport = {
  height: 'device-height',
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
};

const CheckoutPage = () => {
  return (
    <>
      <h1 className='text-center text-3xl font-bold'>Checkout</h1>
      <CheckoutDetails />
    </>
  );
};

export default CheckoutPage;
