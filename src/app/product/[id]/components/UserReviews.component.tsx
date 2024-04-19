'use client';
import { Review } from '@/lib/types/client.types';
import { GenerateStars } from '@/lib/utils/client.utils';
import React, { useRef, useState } from 'react';
import NewReviewForm from './NewReviewForm.component';
import { AnimatePresence } from 'framer-motion';
import { newReviewAction } from '@/lib/actions/actions';
import { MdEdit } from 'react-icons/md';
import UserReview from './UserReview.component';

interface Props {
  rating: number;
  reviews: Review[];
  userId: string;
  productId: string;
}

interface ReviewPayload {
  userId: string;
  productId: string;
  review: string;
  rating: number;
  username: string;
}

interface NewReview {
  review: string;
  rating: number;
}

const UserReviews = ({ rating, reviews, userId, productId }: Props) => {
  const [canAddReview, setCanAddReview] = useState(true);
  const hasUserReview = useRef(false);
  const [productReviews, setProductReviews] = useState<Review[]>(reviews);

  const addNewReview = async (review: NewReview) => {
    const payload: ReviewPayload = {
      ...review,
      productId,
      username: 'abcd',
      userId,
    };

    const res = await newReviewAction(payload);

    setCanAddReview(false);
  };

  const reviewJSX = productReviews.map((review) => {
    if (review.userId === userId) {
      hasUserReview.current = true;
    } // user can add review if user already reviewed the product

    return <UserReview key={review._id} {...review} curUserId={userId} />;
  });

  return (
    <section className=''>
      <h2 className='text-4xl max-xs:text-3xl text-center font-medium items-center'>
        User Reviews
      </h2>

      <div className='mt-10 flex gap-10 max-md:flex-col-reverse relative'>
        {/* New Review */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-3xl max-xs:text-2xl'>Overall Rating</h3>
          <div className='flex items-center gap-2 text-3xl text-charcoal-grey mb-2'>
            {GenerateStars(rating)}
          </div>

          <AnimatePresence mode='wait'>
            {(canAddReview || !hasUserReview) && (
              <NewReviewForm addNewReview={addNewReview} />
            )}
          </AnimatePresence>
        </div>

        <ul className='flex flex-col gap-4 flex-1'>
          {reviews.length === 0 && (
            <li className='text-center text-2xl font-medium mt-16'>
              No Reviews Found!!
            </li>
          )}
          {reviewJSX}
        </ul>
      </div>
    </section>
  );
};

export default UserReviews;
