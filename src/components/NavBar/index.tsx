import { Category } from '@/lib/types/client.types';
import React, { FC } from 'react';
import NavLink from './Link';

const categories: Category[] = [
  { _id: '1', name: 'Face Care' },
  { _id: '2', name: 'Skin Care' },
  { _id: '3', name: 'Skin Care' },
  { _id: '4', name: 'Skin Care' },
  { _id: '5', name: 'Skin Care' },
  { _id: '6', name: 'Skin Care' },
  { _id: '7', name: 'Skin Care' },
];

const NavBar = () => {
  const categoryJSX = categories.map((cat) => (
    <li
      className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '
      key={cat._id}>
      <NavLink href={`/products?category=${cat.name}`}>{cat.name}</NavLink>
    </li>
  ));

  return (
    <nav className='bg-off-white py-4 hidden lg:flex justify-center'>
      <ul className='flex'>
        <li className='nav_item font-medium uppercase px-10 max-[1410px]:px-7 max-[1200px]:px-4 '>
          <NavLink href='/products'>All Products</NavLink>
        </li>
        {categoryJSX}
      </ul>
    </nav>
  );
};

export default NavBar;
