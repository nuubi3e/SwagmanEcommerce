'use client';
import { Log } from '@/lib/logs';
import { AuthContext } from '@/providers/Auth/Auth.provider';
import { CartContext } from '@/providers/Cart/Cart.provider';
import { AnimatePresence, motion as m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { LuLoader, LuLoader2, LuMinus } from 'react-icons/lu';

const EmptyCartBox = () => (
  <div className='flex flex-col items-center gap-5 mt-28 text-charcoal-grey'>
    <FaCartShopping className='text-5xl' />
    <p className='text-2xl font-extrabold'>Your Cart is Empty</p>
  </div>
);

const CartItems = () => {
  const cartState = useContext(CartContext);

  return (
    <ul className='flex flex-col'>
      {cartState.products.map((prd) => (
        <li
          key={prd._id}
          className='border-b py-3 flex items-center gap-3 border-charcoal-grey border-opacity-15'>
          <figure className='h-16 aspect-square border border-charcoal-grey border-opacity-15 relative'>
            <button
              type='button'
              disabled={
                cartState.adding || cartState.removing || cartState.deleting
              }
              onClick={() => cartState.deleteItemFromCart(prd._id)}
              className='outline-none p-1 bg-off-white rounded-full absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] text-charcoal-grey text-opacity-80 transition-all hover:text-opacity-100 disabled:cursor-not-allowed'>
              <IoClose />
            </button>
            <Image
              src={'/images/tshirt-black.png'}
              alt='product-cover'
              width={50}
              height={50}
              className='w-full h-full object-cover object-center'
            />
          </figure>
          <h4 className='text font-medium'>{prd.name}</h4>

          <div className='flex flex-col ml-auto items-center gap-2'>
            <strong className='text'>₹ {prd.price * prd.quantity}</strong>
            <div className='w-full flex items-center border border-charcoal-grey border-opacity-15 rounded-full overflow-hidden'>
              <button
                type='button'
                disabled={
                  cartState.adding || cartState.removing || cartState.deleting
                }
                onClick={() => cartState.removeFromCart(prd._id)}
                className='outline-none h-7 aspect-square flex items-center justify-center transition-all hover:bg-off-white disabled:cursor-not-allowed'>
                {cartState.removing ? (
                  <LuLoader2 className='text-sm animate-spin' />
                ) : (
                  <LuMinus className='text-sm' />
                )}
              </button>
              <p className='flex-1 flex items-center justify-center text font-medium px-3'>
                {prd.quantity}
              </p>
              <button
                type='button'
                disabled={
                  cartState.adding || cartState.removing || cartState.deleting
                }
                onClick={() => cartState.addToCart(prd)}
                className='outline-none h-7 aspect-square flex items-center justify-center transition-all text-charcoal-grey hover:bg-off-white disabled:cursor-not-allowed'>
                {cartState.adding ? (
                  <LuLoader2 className='text-sm animate-spin' />
                ) : (
                  <GoPlus className='text-lg' />
                )}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CartSummary = () => {
  const cartState = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  return (
    <footer className='flex flex-col gap-3'>
      <p className='border-b flex justify-between items-end pb-1 text-sm'>
        <strong>Taxes</strong>
        <strong className='text-xl'>₹ 0</strong>
      </p>
      <p className='border-b flex justify-between items-end pb-1 text-sm'>
        <strong>Shipping</strong>
        <span className=''>Calculated on Next Step</span>
      </p>
      <p className='border-b flex justify-between items-end pb-1 text-sm'>
        <strong>Total</strong>
        <strong className='text-xl'>₹ {cartState.totalPrice}</strong>
      </p>

      {authCtx.isLoggedIn ? (
        <Link
          href={'/checkout'}
          onClick={() => cartState.hideCart()}
          className='bg-charcoal-grey py-4 text-off-white font-medium mt-6 outline-none text-center'>
          Proceed to Checkout
        </Link>
      ) : (
        <button
          type='button'
          onClick={() => {
            authCtx.setShowAuthForm(true);
          }}
          className='bg-charcoal-grey py-4 text-off-white font-medium mt-6 outline-none'>
          Proceed to Checkout
        </button>
      )}
    </footer>
  );
};

const CartModal = () => {
  const cartState = useContext(CartContext);

  useEffect(() => {
    // stop body scroll when cart opens
    document.body.style.overflowY = 'hidden';
    return () => {
      // stops body scroll when cart closes
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <m.div
      onClick={(e) =>
        !(e.target as HTMLElement).closest('#cartModal') && cartState.hideCart()
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut' }}
      className='fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-30'>
      <m.section
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ ease: 'easeInOut' }}
        className='w-[460px] ml-auto max-[500px]:w-full h-full bg-white origin-right overflow-hidden relative px-8 py-6 flex flex-col max-[510px]:transition-all max-xs:px-3 max-xs:py-3 bg-opacity-90 backdrop-blur-[10px]'
        id='cartModal'>
        <header className='flex justify-between items-center'>
          <h2 className='text-2xl font-extrabold'>
            My Cart{' '}
            {cartState.totalQuantity > 0 && `(${cartState.totalQuantity})`}
          </h2>

          <button
            type='button'
            onClick={() => cartState.hideCart()}
            className='w-9 transition-all aspect-square flex items-center justify-center text-charcoal-grey border border-off-white-dark rounded-md hover:bg-off-white-dark'>
            <IoClose className='text-2xl' />
          </button>
        </header>

        {cartState.totalQuantity === 0 && <EmptyCartBox />}

        {cartState.totalQuantity > 0 && (
          <>
            <section className='flex-1 mt-4 mb-10 overflow-y-scroll hide_scrollbar'>
              <CartItems />
            </section>
            <CartSummary />
          </>
        )}
      </m.section>
    </m.div>
  );
};

const Cart = () => {
  const cartState = useContext(CartContext);
  Log.log(cartState);
  return (
    <AnimatePresence mode='wait'>
      {cartState.cartIsVisible && <CartModal />}
    </AnimatePresence>
  );
};

export default Cart;
