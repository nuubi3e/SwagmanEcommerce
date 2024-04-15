'use client';
import Link from 'next/link';
import SadGif from '@/assets/gifs/delivery.gif';
import Image from 'next/image';

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error.message);

  return (
    <section className='h-[60dvh] flex flex-col items-center gap-2 justify-center text-charcoal-grey'>
      <Image
        src={SadGif}
        alt='not-found'
        width={125}
        height={125}
        unoptimized
      />
      <h1 className='text-4xl font-semibold'>{error.message}</h1>
      <Link
        href={'/products'}
        className='outline-none transition-all border-b-[2px] text-lg border-transparent font-medium hover:border-charcoal-grey hover:scale-105'>
        Go Back
      </Link>
    </section>
  );
}
