import { Metadata } from 'next';
import React from 'react';

export const metaData: Metadata = {
  title: 'Swagman | Orders',
  description: '',
};

const UserOrderPage = async () => {
  return <div className='flex flex-col gap-2'>Orders Page</div>;
};

export default UserOrderPage;
