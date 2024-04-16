'use server';

import { cookies } from 'next/headers';
import { Log } from '../logs';

export const getSession = async () => {
  const session = cookies().get('session');

  Log.log(session);
};
