'use client';
import { Log } from '@/lib/logs';
import { CartContext } from '@/providers/Cart/Cart.provider';
import { FC, useContext } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { LuMinus } from 'react-icons/lu';

export const CartButton = () => {
  const cartState = useContext(CartContext);

  Log.log('In Cart Button', cartState);

  return (
    <button
      className='relative outline-none'
      type='button'
      onClick={() => {
        Log.log('heh');
        cartState.showCart();
      }}>
      {cartState.totalQuantity > 0 && (
        <span className='w-5 h-5 text-sm animate-bounce bg-charcoal-grey text-off-white rounded-full font-sans flex items-center justify-center absolute -top-1/2 -right-1/2'>
          {cartState.totalQuantity}
        </span>
      )}
      <FaCartShopping className='text-3xl' />
    </button>
  );
};

interface AddToCartButtonProps {
  _id: string;
  name: string;
  price: number;
  image?: string;
  rating: number;
}

export const AddToCartButton: FC<AddToCartButtonProps> = (product) => {
  const cartState = useContext(CartContext);

  const curPrd = cartState.products.find((prd) => prd._id === product._id);

  const showBtn = !curPrd || curPrd.quantity === 0;

  return (
    <>
      {showBtn && (
        <button
          type='button'
          onClick={() => {
            cartState.addToCart(product);
            cartState.showCart(); // showing cart when user add item into cart
          }}
          className='bg-charcoal-grey w-full py-3 px-6 uppercase font-medium text-off-white'>
          add to cart
        </button>
      )}

      {!showBtn && (
        <div className='w-full flex items-center border border-off-white-dark'>
          <button
            type='button'
            onClick={() => {
              cartState.removeFromCart(product._id);
            }}
            className='outline-none h-12 aspect-square flex items-center justify-center transition-all border-r border-off-white-dark hover:bg-off-white'>
            <LuMinus className='text-lg' />
          </button>
          <p className='flex-1 flex items-center justify-center text-2xl font-medium'>
            {curPrd.quantity}
          </p>
          <button
            type='button'
            onClick={() => {
              cartState.addToCart(product);
            }}
            className='outline-none h-12 aspect-square flex items-center justify-center transition-all border-l text-charcoal-grey border-off-white-dark hover:bg-off-white'>
            <GoPlus className='text-2xl' />
          </button>
        </div>
      )}
    </>
  );
};
