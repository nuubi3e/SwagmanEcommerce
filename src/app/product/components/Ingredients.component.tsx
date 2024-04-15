import { Ingredient } from '@/lib/types/client.types';
import React from 'react';
import { IoIosCheckmark } from 'react-icons/io';

const Ingredients = ({ ingredients }: { ingredients: Ingredient[] }) => {
  return (
    <section className=''>
      <h2 className='text-4xl max-xs:text-3xl text-center font-medium'>
        Ingredients
      </h2>

      <ul className='flex flex-col gap-2 mt-10'>
        {ingredients.map((ing) => (
          <li
            className='leading-[1.6rem] tracking-wide flex items-center gap-1 flex-wrap'
            key={ing._id}>
            <IoIosCheckmark className='text-2xl mr-1' />
            <strong>{ing.name}:</strong> {ing.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Ingredients;
