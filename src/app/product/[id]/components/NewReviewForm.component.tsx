'use client';
import { Review } from '@/lib/types/client.types';
import { GenerateStars } from '@/lib/utils/client.utils';
import { AuthContext } from '@/providers/Auth/Auth.provider';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ReviewFormData {
  review: string;
  rating: number;
}

interface Props {
  addNewReview: (review: ReviewFormData) => Promise<void>;
}

const NewReviewForm = ({ addNewReview }: Props) => {
  const authCtx = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>();
  const [showForm, setShowForm] = useState<boolean | null>(null);
  const formContainer = useRef<HTMLDivElement>(null); // to store ref of form div for animation
  const buttonContainer = useRef<HTMLDivElement>(null); // to store button div for animation
  const formHeight = useRef<number>(0); // to store form div height
  const buttonHeight = useRef<number>(0); // to store button div height

  useEffect(() => {
    // to store heights of button and form divs in ref
    formHeight.current = formContainer.current?.clientHeight || 0;
    buttonHeight.current = buttonContainer.current?.clientHeight || 0;

    setShowForm(false); // trigger state change to show button and hide form and also enable animation
  }, []);

  if (formContainer.current && buttonContainer.current) {
    // showing form and hidding button
    if (showForm) {
      formContainer.current.style.height = formHeight.current + 'px';
      buttonContainer.current.style.height = '0px';
    }
    // showing button and hidding form
    else {
      formContainer.current.style.height = '0px';
      buttonContainer.current.style.height = buttonHeight.current + 'px';
    }
  }

  const newReviewHandler = async (userInp: ReviewFormData) => {
    try {
      await addNewReview(userInp);
    } catch (err) {}
  };

  return (
    <>
      <div
        ref={buttonContainer}
        className={`origin-top overflow-hidden hide-show`}>
        <button
          type='button'
          onClick={() =>
            // opening review form is user is logged in else opening form modal
            authCtx.isLoggedIn
              ? setShowForm(true)
              : authCtx.setShowAuthForm(true)
          }
          className={`max-w-full border-2 origin-top min-w-[300px] max-[350px]:min-w-full self-stretch border-charcoal-grey text-charcoal-grey py-3 font-medium border-opacity-70 text-center px-10 text-xl transition-all`}>
          Write a Review
        </button>
      </div>
      <div
        ref={formContainer}
        className={`origin-bottom overflow-hidden hide-show`}>
        <form noValidate onSubmit={handleSubmit(newReviewHandler)}>
          <label htmlFor='review' className='font-medium block'>
            Review:
          </label>
          <textarea
            id='review'
            {...register('review', {
              required: 'Please Provide your valuable feeback',
            })}
            rows={5}
            placeholder='write a review'
            className={
              'border w-full border-opacity-70 border-charcoal-grey resize-none outline-none p-2 des-cus-scroll'
            }></textarea>
          {errors.review && (
            <p className='text-red-500 text-sm'>{errors.review.message}</p>
          )}

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3 mt-1'>
              <label htmlFor='rating' className='font-medium'>
                Rating:
              </label>
              <input
                type='number'
                {...register('rating', {
                  required: 'Please provide some rating',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Rating must be at least 1',
                  },
                  max: {
                    value: 5,
                    message: 'Rating must be at most 5',
                  },
                })}
              />
              <div className='flex items-center gap-1 text-xl'>
                {GenerateStars(0)}
              </div>
            </div>
            {errors.rating && (
              <p className='text-red-500 text-sm'>{errors.rating.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='bg-charcoal-grey bg-opacity-90 mt-4 px-4 py-2 text-off-white transition-all capitalize hover:bg-opacity-100 outline-none'>
            add review
          </button>
        </form>
      </div>
    </>
  );
};

export default NewReviewForm;
