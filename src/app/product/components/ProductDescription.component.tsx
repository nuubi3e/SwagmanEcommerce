import React from 'react';

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <section className=''>
      <h2 className='text-4xl max-xs:text-3xl text-center font-medium'>
        Product Description
      </h2>

      <p className='text-justify mt-10 leading-[1.6rem] tracking-wide flex flex-col gap-2'>
        {/* spliting description by \n character  */}
        {description.split('\n').map((desc) => (
          <span key={desc}>{desc}</span>
        ))}
      </p>
    </section>
  );
};

export default ProductDescription;
