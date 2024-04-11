'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const searchParams = useSearchParams();
  const url = new URLSearchParams(searchParams);
  const category = url.get('category');
  const pathname = usePathname();

  const isActive =
    `${pathname}${category ? `?category=${category}` : ''}` === href;
  return (
    <Link
      className={`border-b-2 pb-1 transition-all hover:border-black outline-none ${
        isActive ? 'border-black' : 'border-transparent'
      }`}
      href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
