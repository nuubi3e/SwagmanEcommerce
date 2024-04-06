/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import Link from 'next/link';
import { SwagmanLogo } from '../icons/Logos';
import NavBar from '../NavBar';

export const Footer: FC = () => {
  return (
    <>
      <footer className='flex flex-col items-center gap-12 bg-off-white-light pt-8'>
        <div className='flex items-center flex-col gap-5'>
          <SwagmanLogo className='h-40 max-sm:h-32 max-[450px]:h-28' />
          <p className='text-sm'>Swag on point with Swagman</p>
        </div>

        <div className='w-full max-[1310px]:px-10 max-md:px-6'>
          <p className='w-[1350px] text-justify flex flex-col gap-3 max-[1360px]:w-full mx-auto'>
            Welcome to Swagman, a premium men's grooming and clothing brand
            dedicated to helping men look and feel their best. At Swagman, we
            understand that men today are more conscious about their appearance
            than ever before. That's why we provide an extensive range of
            high-quality grooming and clothing products designed specifically
            for men.
            <span>
              Our grooming range includes everything from beard oils and balms
              to hair care and skincare products, all made from natural and
              organic ingredients that are gentle on the skin and hair. We also
              offer a range of fragrances designed to suit every occasion, from
              casual everyday wear to formal events.
            </span>
            <span>
              When it comes to clothing, we offer a variety of stylish and
              sophisticated options that are perfect for any occasion. Whether
              you're looking for smart casual wear or something more formal, our
              range of shirts, suits, and accessories will help you look your
              best.
            </span>
            <span>
              At Swagman, we pride ourselves on delivering exceptional customer
              service and quality products that our customers can rely on. We're
              committed to helping our customers look and feel their best, and
              we believe that our range of grooming and clothing products can
              help them achieve that goal.
            </span>
            <span>
              So why not experience the Swagman difference for yourself? Visit
              our website or one of our stores today and discover our range of
              premium grooming and clothing products.
            </span>
          </p>
        </div>

        <section className='w-full bg-off-white-dark max-[1310px]:px-10 max-md:px-6'>
          <div className='text-center flex justify-between self-stretch items-center w-[1300px] mx-auto py-4 max-[1310px]:w-full flex-wrap gap-2 max-[540px]:justify-center'>
            <h4 className=''>
              &copy; Copyright {new Date().getFullYear()} Swagman
            </h4>
            <h4 className='text-black'>
              Designed & Developed By
              <Link href='https://nuubi3e.netlify.app/' target='_blank'>
                <strong className='ml-2'>Gaurav</strong>
              </Link>
            </h4>
          </div>
        </section>
      </footer>
    </>
  );
};
