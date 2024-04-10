'use client';
import { ProductBrief } from '@/lib/types/client.types';
import React, { createContext, ReactNode, useReducer } from 'react';

type ProductState = ProductBrief & { quantity: number };

type CartContextT = {
  products: ProductState[];
  addToCart: (product: ProductBrief) => void;
  removeFromCart: (productId: string) => void;
  totalQuantity: number;
  totalPrice: number;
};

type CartState = {
  products: ProductState[];
  totalQuantity: number;
  totalPrice: number;
};

type CartReducerFn = (
  state: CartState,
  action: { payload: ProductBrief | string; type: 'add' | 'remove' }
) => CartState;

export const CartContext = createContext<CartContextT>({
  products: [],
  addToCart: (prd) => {},
  removeFromCart: (_id) => {},
  totalQuantity: 0,
  totalPrice: 0,
});

const init: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer: CartReducerFn = (state, action) => {
  const { payload, type } = action;

  const products = JSON.parse(JSON.stringify(state.products)) as ProductState[]; // creating a deep copy of products to avoid multiple renders
  let totalPrice = state.totalPrice; // total price
  let totalQuantity = state.totalQuantity; // total quantity

  if (type === 'add') {
    const prdIndex = products.findIndex(
      (p) => p._id === (payload as ProductBrief)._id
    ); // finding product index
    totalPrice = totalPrice + (payload as ProductBrief).price; // incrementing total price
    totalQuantity++; // incrementing total quantity

    if (prdIndex === -1) {
      products.push({ ...(payload as ProductBrief), quantity: 1 }); // adding product
    } else {
      products[prdIndex].quantity++; // updating quantity
    }
  }

  if (type === 'remove') {
    const prdIndex = products.findIndex((p) => p._id === (payload as string));
    const product = products[prdIndex];
    totalQuantity--; // decreasing quantity
    totalPrice = totalPrice - product.price; // decreasing price

    if (prdIndex > -1) {
      if (product.quantity > 1) {
        products[prdIndex].quantity--; // decreasing product quantity
      } else {
        products.splice(prdIndex, 1); // removing product
      }
    }
  }

  return {
    ...state.products,
    products,
    totalPrice,
    totalQuantity,
  };
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, init);

  const addToCart = (product: ProductBrief) => {
    cartDispatch({ payload: product, type: 'add' });
  };

  const removeFromCart = (productId: string) => {
    cartDispatch({ payload: productId, type: 'remove' });
  };

  return (
    <CartContext.Provider value={{ ...cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
