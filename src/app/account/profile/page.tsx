import { Metadata } from 'next';
import React from 'react';

export const metaData: Metadata = {
  title: 'Swagman | Profile',
  description: '',
};

const UserOrderPage = async () => {
  return (
    <form
      action='#'
      className='grid grid-cols-2 gap-y-4 gap-x-5 max-xs:grid-cols-1'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='firstName' className='font-medium text-sm'>
          First Name *
        </label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='lastName' className='font-medium text-sm'>
          Last Name *
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
      </div>
      <div className='flex flex-col gap-2 col-span-2 max-xs:col-auto'>
        <label htmlFor='email' className='font-medium text-sm'>
          Email *
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
      </div>
      <div className='flex flex-col gap-2 col-span-2 max-xs:col-auto relative'>
        <label htmlFor='email' className='font-medium text-sm'>
          Mobile No *
        </label>
        <span className='font-medium inline-block text-slate-400 h-max absolute bottom-[2px] pb-3 px-3 left-0'>
          +91
        </span>
        <input
          type='text'
          name='email'
          id='email'
          maxLength={10}
          placeholder='XXXXXXXXXX'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 pl-11 pr-3 transition-all focus:border-opacity-70'
        />
      </div>
    </form>
  );
};

export default UserOrderPage;
