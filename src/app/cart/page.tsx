'use client';
import { CartContext } from '@/providers/CartProvider';
import React, { useContext } from 'react';

const CartPage = () => {
  const cartState = useContext(CartContext);
  return <div>{JSON.stringify(cartState.products)}</div>;
};

export default CartPage;
