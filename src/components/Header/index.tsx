import React from 'react';
import { SwagmanLogo } from '../icons/Logos';
import Link from 'next/link';
import SearchBar from '../SearchBar';
import { CartButton, UserButton } from '../Buttons';
import NavBar from '../NavBar/NavBar.component';

const Header = () => {
  return (
    <header className='sticky top-0 bg-white left-0 z-[100]'>
      <div className='p-6'>
        <section className='w-primary mx-auto max-[1360px]:w-full flex items-center justify-between'>
          <Link href={'/'} className='outline-none'>
            <SwagmanLogo className='h-20 w-auto' />
          </Link>
          <SearchBar />
          <div className='flex items-center gap-3'>
            <UserButton />
            <CartButton />
          </div>
        </section>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
