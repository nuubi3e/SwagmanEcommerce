import React, { Suspense } from 'react';
import NavLink from './NavLink.component';
import { connectToAPI } from '@/lib/utils/globals.utils';
import { Log } from '@/lib/logs';
import { Category } from '@/lib/types/client.types';

const NavBar = async () => {
  let categories: Category[] = [];

  try {
    const data = await connectToAPI({ endpoint: 'categories', noCache: true });

    console.clear();
    Log.log('IN CAT', data);
    categories = data?.data?.categories || [];
  } catch (err) {
    categories = [];
  }

  const categoryJSX = categories.map((cat) => (
    <li
      className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '
      key={cat._id.toString()}>
      <Suspense>
        <NavLink href={`/products?category=${cat.name}`}>{cat.name}</NavLink>
      </Suspense>
    </li>
  ));

  return (
    <nav className='bg-off-white py-4 hidden lg:flex justify-center'>
      <ul className='flex'>
        <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '>
          <Suspense>
            <NavLink href='/products'>All Products</NavLink>
          </Suspense>
        </li>
        {categoryJSX}
      </ul>
    </nav>
  );
};

export default NavBar;
