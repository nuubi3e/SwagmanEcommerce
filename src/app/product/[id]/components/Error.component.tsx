import Image from 'next/image';
import React from 'react';
import SadGif from '@/assets/gifs/delivery.gif';
import Link from 'next/link';

const Error = ({ message }: { message: string }) => {
  return (
    <section className='h-[60dvh] flex flex-col items-center gap-2 justify-center text-charcoal-grey'>
      <Image
        src={SadGif}
        alt='not-found'
        width={125}
        height={125}
        unoptimized
      />
      <h1 className='text-4xl font-semibold'>{message}</h1>
      <Link
        href={'/products'}
        className='outline-none transition-all border-b-[2px] text-lg border-transparent font-medium hover:border-charcoal-grey hover:scale-105'>
        Go Back
      </Link>
    </section>
  );
};

export default Error;
