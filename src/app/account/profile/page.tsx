import { Metadata } from 'next';
import React from 'react';
import ProfileForm from './ProfileForm/ProfileForm.component';
import { getSession } from '@/lib/actions/actions';

export const metadata: Metadata = {
  title: 'Swagman | Profile',
  description: '',
};

const UserOrderPage = async () => {
  const session = await getSession();
  return (
    <>
      <h1 className='text-center text-3xl font-semibold mb-8'>Profile</h1>
      <ProfileForm
        email={session!.email}
        firstName={session!.firstName}
        lastName={session!.lastName}
        mobileNo={session!.mobileNo}
        username={session!.username}
      />
    </>
  );
};

export default UserOrderPage;
