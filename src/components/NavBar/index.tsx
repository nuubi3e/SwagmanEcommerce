import React, { Suspense } from 'react';
import NavLink from './Link';
import { getCategories } from '@/lib/server/get-data';

const NavBar = async () => {
  const serverData = await getCategories();
  const categories = serverData.data?.categories || [];

  const categoryJSX = categories.map((cat) => (
    <li
      className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '
      key={cat._id.toString()}>
      <NavLink href={`/products?category=${cat.name}`}>{cat.name}</NavLink>
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
