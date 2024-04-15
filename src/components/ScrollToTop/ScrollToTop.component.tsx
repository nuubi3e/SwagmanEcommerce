'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const ScrollToTop = () => {
  const pathname = usePathname();
  window.scrollTo(0, 0);

  return <></>;
};

export default ScrollToTop;
