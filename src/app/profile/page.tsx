import { LogoutButton } from '@/components/Buttons';
import { getSession } from '@/lib/actions/actions';
import { redirect } from 'next/navigation';
import React from 'react';

const UserProfilePage = async () => {
  const session = await getSession();

  if (!session) return redirect('/');

  return (
    <div className='flex flex-col gap-2'>
      UserProfilePage
      <LogoutButton />
    </div>
  );
};

export default UserProfilePage;
