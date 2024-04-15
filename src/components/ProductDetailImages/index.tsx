'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const images = [
  '/images/charcoal-body-wash.jpg',
  '/images/classic-body-wash.jpg',
  '/images/tshirt-black.png',
];

const ProductDetailImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='flex flex-col w-[40%] max-lg:w-full gap-5'>
      <figure className='w-full aspect-square bg-charcoal-grey rounded-3xl overflow-hidden shadow-xl border-2'>
        <Image
          src={images[activeIndex]}
          alt='prd image'
          width={500}
          height={500}
          className='w-full h-full object-cover object-center border-none outline-none'
        />
      </figure>

      {images.length > 0 && (
        <div className='flex justify-center gap-3 h-20 max-xs:gap-1 max-xs:h-16'>
          {images.map((img, index) => (
            <button
              type='button'
              onClick={() => setActiveIndex(index)}
              className={`h-full aspect-square rounded-lg overflow-hidden transition-all outline-none relative ${
                activeIndex === index ? 'shadow-xl scale-100' : 'scale-90'
              }`}
              key={img}>
              <span
                className={`inline-block absolute top-0 left-0 backdrop-blur-[2px] z-10 w-full h-full transition-all ${
                  activeIndex === index
                    ? 'scale-0 opacity-0'
                    : 'scale-100 opacity-100'
                }`}
              />
              <Image
                src={img}
                alt='prd image'
                width={100}
                height={100}
                className='w-full h-full object-cover object-center rounded'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailImages;
