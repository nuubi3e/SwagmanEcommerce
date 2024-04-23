'use client';
import { logOutAction } from '@/lib/actions/actions';
import { AuthContext } from '@/providers/Auth/Auth.provider';
import { CartContext } from '@/providers/Cart/Cart.provider';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { LuLoader, LuLoader2, LuMinus } from 'react-icons/lu';
import { MdMenu } from 'react-icons/md';
import { RiUser6Fill } from 'react-icons/ri';
import { SwagmanLogo } from '../icons/Logos';
import { IoClose } from 'react-icons/io5';
import { PaymentContext } from '@/providers/Payment/Payment.provider';

export const CartButton = () => {
  const cartState = useContext(CartContext);

  return (
    <button
      className='relative outline-none'
      type='button'
      onClick={() => {
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
  size: string;
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
          disabled={cartState.adding}
          onClick={() => {
            cartState.addToCart(product);
          }}
          className='bg-charcoal-grey w-full py-3 min-w-[116px] justify-center flex px-8 uppercase font-medium text-off-white transition-all disabled:cursor-not-allowed disabled:bg-opacity-50'>
          {cartState.adding ? (
            <LuLoader2 className='text-2xl animate-spin' />
          ) : (
            'Add to Cart'
          )}
        </button>
      )}

      {!showBtn && (
        <div className='w-full flex items-center border border-off-white-dark'>
          <button
            type='button'
            disabled={
              cartState.adding || cartState.removing || cartState.deleting
            }
            onClick={() => {
              cartState.removeFromCart(product._id);
            }}
            className='outline-none h-12 aspect-square flex items-center justify-center transition-all border-r border-off-white-dark hover:bg-off-white disabled:cursor-not-allowed'>
            {cartState.removing ? (
              <LuLoader2 className='text-2xl animate-spin' />
            ) : (
              <LuMinus className='text-lg' />
            )}
          </button>
          <p className='flex-1 flex items-center justify-center text-2xl font-medium px-8'>
            {curPrd.quantity}
          </p>
          <button
            type='button'
            disabled={
              cartState.adding || cartState.removing || cartState.deleting
            }
            onClick={() => {
              cartState.addToCart(product);
            }}
            className='outline-none h-12 aspect-square flex items-center justify-center transition-all border-l text-charcoal-grey border-off-white-dark hover:bg-off-white disabled:cursor-not-allowed'>
            {cartState.adding ? (
              <LuLoader2 className='text-2xl animate-spin' />
            ) : (
              <GoPlus className='text-2xl' />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export const UserButton = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  return (
    <button
      type='button'
      className='outline-none transition-all rounded-full max-md:hidden'
      onClick={() => {
        authCtx.isLoggedIn
          ? router.push('/account/orders')
          : authCtx.setShowAuthForm(true);
      }}>
      <RiUser6Fill className='text-3xl' />
    </button>
  );
};

export const LogoutButton = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const router = useRouter();

  return (
    <button
      className='py-4 px-3 border-b border-b-slate-200 font-medium text-left'
      onClick={async () => {
        await logOutAction();
        authCtx.logOut();
        cartCtx.reset();
        router.replace('/');
      }}>
      Logout
    </button>
  );
};

const SmallScreenMenus = ({ onClose }: { onClose: () => void }) => {
  const menus = [
    {
      path: '/products',
      name: 'All Products',
    },
  ];

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut' }}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('#smallScreenMenus')) onClose();
      }}
      className='w-full h-[100dvh] bg-opacity-10 bg-charcoal-grey fixed top-0 left-0 z-[999]'>
      <m.div
        id='smallScreenMenus'
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ ease: 'easeInOut' }}
        className='bg-white h-full bg-opacity-85 backdrop-blur-xl transition-all w-[450px] max-[460px]:w-full'>
        <div className='flex justify-between items-start px-5 py-3'>
          <SwagmanLogo className='h-16 w-auto' />
          <button
            type='button'
            onClick={() => onClose()}
            className='w-9 transition-all aspect-square flex items-center justify-center text-charcoal-grey border border-off-white-dark rounded-md hover:bg-off-white-dark'>
            <IoClose className='text-2xl' />
          </button>
        </div>
      </m.div>
    </m.div>
  );
};

export const SmallScreenMenuBar = () => {
  const [showMenuBar, setShowMenuBar] = useState(false);

  return (
    <>
      <button
        type='button'
        className='hidden max-md:block outline-none'
        id='menuBar'
        onClick={() => setShowMenuBar(true)}>
        <MdMenu className='text-4xl' />
      </button>

      <AnimatePresence mode='wait'>
        {showMenuBar && (
          <SmallScreenMenus onClose={() => setShowMenuBar(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export const ProceedToPayBtn = () => {
  const paymentCtx = useContext(PaymentContext);

  return (
    <button
      type='button'
      onClick={() => paymentCtx.openPaymentScreen()}
      className='w-full bg-charcoal-grey flex items-center justify-center py-3 px-2 text-off-white transition-all disabled:cursor-not-allowed disabled:bg-opacity-50'>
      Proceed to Pay
    </button>
  );
};
