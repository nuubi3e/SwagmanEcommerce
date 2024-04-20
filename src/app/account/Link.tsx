'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  children?: React.ReactNode;
}

const ProfileLink = ({ href, children }: Props) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`py-4 px-3 inline-block font-medium border-r-4  border-b border-b-slate-200 transition-all outline-none ${
        isActive ? 'focus-grd' : 'border-r-transparent'
      }`}>
      {children}
    </Link>
  );
};

export default ProfileLink;
