'use client';

import { ReactNode } from 'react';
import CartProvider from './CartProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
