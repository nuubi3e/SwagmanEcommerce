import React, { Fragment, Suspense } from 'react';
import NavLink from './NavLink.component';
import { connectToAPI } from '@/lib/utils/globals.utils';
import { Log } from '@/lib/logs';
import { Category } from '@/lib/types/client.types';
import { FaAngleDown } from 'react-icons/fa6';

const LIMIT = 6;

const NavBar = async () => {
  let categories: Category[] = [];
  let catLength = 0;
  let categoryJSX: JSX.Element[] = [];

  try {
    const data = await connectToAPI({ endpoint: 'categories', noCache: true });

    console.clear();
    Log.log('IN CAT', data);
    categories = data?.data?.categories || [];
    catLength = data?.data?.length || 0;
  } catch (err) {
    categories = [];
  }

  if (catLength <= 5)
    categoryJSX = categories.map((cat) => (
      <Fragment key={cat._id.toString()}>
        <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '>
          <Suspense>
            <NavLink href={`/products?category=${cat.name}`}>
              {cat.name}
            </NavLink>
          </Suspense>
        </li>
      </Fragment>
    ));
  // only showing 4 categories if categories is more than 5 rest will be hidden in more option
  else
    categoryJSX = categories.slice(0, LIMIT - 1).map((cat) => (
      <Fragment key={cat._id.toString()}>
        <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '>
          <Suspense>
            <NavLink href={`/products?category=${cat.name}`}>
              {cat.name}
            </NavLink>
          </Suspense>
        </li>
      </Fragment>
    ));

  return (
    <nav className='bg-off-white py-4 hidden md:flex justify-center'>
      <ul className='flex'>
        <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '>
          <Suspense>
            <NavLink href='/products'>All Products</NavLink>
          </Suspense>
        </li>
        {categoryJSX}
        {catLength > 5 && (
          <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 flex items-center gap-4 relative more-links'>
            More <FaAngleDown className='text-sm' />
            <ul className='bg-white shadow-lg z-[10] absolute top-full left-0 w-full hidden flex-col'>
              {categories.slice(LIMIT).map((cat) => (
                <li key={cat._id}>
                  <Suspense>
                    <NavLink href={`/products?category=${cat.name}`} dropdown>
                      {cat.name}
                    </NavLink>
                  </Suspense>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
