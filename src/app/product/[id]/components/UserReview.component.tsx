'use client';
import { Review } from '@/lib/types/client.types';
import { GenerateStars } from '@/lib/utils/client.utils';
import React from 'react';
import { MdEdit } from 'react-icons/md';
interface Props extends Review {
  curUserId: string;
}

const UserReview = ({ curUserId, ...review }: Props) => {
  return (
    <li className='bg-off-white flex flex-col p-3 gap-2 text-charcoal-grey'>
      <div className='flex items-center justify-between'>
        <h4 className='text-xl font-medium'>{review.username}</h4>

        {/* User can edit their review only */}
        {review.userId === curUserId && (
          <button
            type='button'
            className='outline-none rounded-full transition-all hover:bg-charcoal-grey hover:bg-opacity-10 p-2 text-charcoal-grey'>
            <MdEdit className='text-xl' />
          </button>
        )}
      </div>
      <div className='flex gap-3 items-center'>
        <div className='flex items-center gap-1'>
          {GenerateStars(review.rating)}
        </div>
        <p className='text-sm font-medium'>
          {new Intl.DateTimeFormat('en-IN', {
            month: 'long',
            year: '2-digit',
            day: '2-digit',
          }).format(new Date(review.date))}
        </p>
      </div>
      <p>{review.review}</p>
    </li>
  );
};

export default UserReview;
