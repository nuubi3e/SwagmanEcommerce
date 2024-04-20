import React from 'react';
import { SwagmanLogo } from '../icons/Logos';
import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar.component';
import { CartButton, SmallScreenMenuBar, UserButton } from '../Buttons';
import NavBar from '../NavBar/NavBar.component';

const Header = () => {
  return (
    <header className='sticky top-0 bg-white left-0 z-[100]'>
      <div className='p-6'>
        <section className='w-primary mx-auto max-[1360px]:w-full flex items-center justify-between'>
          <SmallScreenMenuBar />
          <Link href={'/'} className='outline-none'>
            <SwagmanLogo className='h-20 w-auto max-md:w-[4.25rem]' />
          </Link>
          <div className='w-1/2 max-md:hidden'>
            <SearchBar />
          </div>
          <div className='flex items-center gap-3'>
            <UserButton />
            <CartButton />
          </div>
        </section>
      </div>

      <div className='hidden max-md:block w-full px-6'>
        <SearchBar />
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
