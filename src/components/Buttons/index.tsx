'use client';
import { logOutAction } from '@/lib/actions/actions';
import { Log } from '@/lib/logs';
import { AuthContext } from '@/providers/Auth/Auth.provider';
import { CartContext } from '@/providers/Cart/Cart.provider';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { FaCartShopping } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { LuMinus } from 'react-icons/lu';
import { MdMenu } from 'react-icons/md';
import { RiUser6Fill } from 'react-icons/ri';
import { SwagmanLogo } from '../icons/Logos';
import { IoClose } from 'react-icons/io5';

export const CartButton = () => {
  const cartState = useContext(CartContext);

  Log.log('In Cart Button', cartState);

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
  const router = useRouter();

  return (
    <button
      className='py-4 px-3 border-b border-b-slate-200 font-medium text-left'
      onClick={async () => {
        await logOutAction();
        authCtx.logOut();
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
