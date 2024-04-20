'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  dropdown?: boolean;
  children?: React.ReactNode;
}

const NavLink = ({ href, children, dropdown }: NavLinkProps) => {
  const searchParams = useSearchParams();
  const url = new URLSearchParams(searchParams);
  const category = url.get('category');
  const pathname = usePathname();

  const isActive =
    `${pathname}${category ? `?category=${category}` : ''}` === href;

  const LinkType = {
    normal: (
      <Link
        className={`border-b-2 pb-1 transition-all hover:border-black outline-none ${
          isActive ? 'border-black' : 'border-transparent'
        }`}
        href={href}>
        {children}
      </Link>
    ),

    // className='py-2 px-3 inline-block transition-all hover:bg-charcoal-grey hover:bg-opacity-5 w-full'
    dropdown: (
      <Link
        className={`py-3 px-3 inline-block transition-all bg-charcoal-grey w-full outline-none ${
          isActive ? 'bg-opacity-5' : 'bg-opacity-0'
        }`}
        href={href}>
        {children}
      </Link>
    ),
  };

  const linkTypeKey = dropdown
    ? 'dropdown'
    : ('normal' as keyof typeof LinkType);

  return LinkType[linkTypeKey];
};

export default NavLink;
