'use client';
import { CartContext } from '@/providers/CartProvider';
// import { Metadata } from 'next';
import React, { useContext } from 'react';

// export const metaData: Metadata = {
//   title: 'Swagman | Cart',
//   description: 'All products',
// };

const CartPage = () => {
  const cartState = useContext(CartContext);
  return <div>{JSON.stringify(cartState.products)}</div>;
};

export default CartPage;
