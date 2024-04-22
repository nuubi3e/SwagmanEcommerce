'use client';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const RootChildrenWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  // return direct children if requested route is / -> which is home page
  if (pathname === '/') return children;

  // else we wrap childrens in a responsive container to presist same styling accross all routes
  return (
    <main className='px-8 max-lg:px-6 max-md:px-5'>
      <div className='w-primary max-[1430px]:w-full mx-auto pt-10 pb-14'>
        {children}
      </div>
    </main>
  );
};

export default RootChildrenWrapper;
