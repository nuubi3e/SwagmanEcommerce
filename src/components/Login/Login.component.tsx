'use client';
import { Log } from '@/lib/logs';
import { AuthContext } from '@/providers/Auth/Auth.provider';
import { AnimatePresence, motion as m } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { SwagmanLogo } from '../icons/Logos';
import { useForm } from 'react-hook-form';
import { LuLoader } from 'react-icons/lu';
import { loginAction, verifyOtpAction } from '@/lib/actions/actions';

interface LoginPayload {
  email: string;
}

const LoginModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginPayload>();
  const [logging, setLogging] = useState(false);
  const [OTP, setOTP] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const key = useRef(''); // to store key recieve from server
  const [mode, setMode] = useState<'req-otp' | 'verify-otp'>('req-otp');
  const authCtx = useContext(AuthContext);

  const loginHandler = async (userInp: LoginPayload) => {
    setLogging(true);
    try {
      const res = await loginAction(userInp.email);

      if (!res.ok) throw new Error(res.message);

      Log.log(res.data?.key);
      key.current = res?.data?.key || '';
      setMode('verify-otp');
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  };

  const verifyOTPHandler = async (OTP: number) => {
    setLogging(true);
    try {
      const res = await verifyOtpAction({ otp: OTP, key: key.current });

      if (!res.ok) throw new Error(res.message);

      authCtx.logIn();
      authCtx.setShowAuthForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLogging(false);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) =>
        // hidding modal if  clicked element is not having loginModal id which is pointing to login modal
        !(e.target as HTMLElement).closest('#loginModal') &&
        authCtx.setShowAuthForm(false)
      }
      className='fixed top-0 left-0 w-full h-[100dvh] bg-opacity-10 backdrop-blur-[3px] bg-black z-[9999] py-10 max-xs:px-5 overflow-y-auto hide_scrollbar flex'>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='bg-white py-7 px-7 w-full h-max xs:px-8 xs:w-[430px] mx-auto flex flex-col gap-5 relative my-auto shadow overflow-hidden'
        id='loginModal'>
        <button
          type='button'
          onClick={() => authCtx.setShowAuthForm(false)}
          className='absolute top-0 right-0 p-2 text-2xl outline-none'>
          <BiX />
        </button>
        <SwagmanLogo className='h-24' />

        <AnimatePresence mode='wait'>
          {mode === 'verify-otp' && (
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut' }}>
              <h3 className='text-xl font-medium text-center mb-3'>
                OTP sent to {getValues('email')}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyOTPHandler(+OTP);
                }}
                noValidate
                className='max-xs:my-auto'>
                <input
                  type='text'
                  maxLength={6}
                  placeholder='XXXXXX'
                  value={OTP}
                  disabled={logging}
                  onChange={(e) => {
                    const value = e.target.value.trim();

                    if (isNaN(+value)) return;
                    if (value.length === 6) verifyOTPHandler(+value);
                    setOTP(value);
                  }}
                  className='border border-charcoal-grey border-opacity-50 transition-all text-charcoal-grey focus:border-opacity-80 py-3 px-4 text-2xl outline-none w-full text-center'
                />
                <button
                  type='submit'
                  disabled={logging}
                  className='w-full mt-6 text-center py-3 bg-charcoal-grey transition-all bg-opacity-90 hover:bg-opacity-100 outline-none text-off-white flex items-center justify-center disabled:bg-opacity-50'>
                  {logging ? (
                    <LuLoader className='animate-spin text-2xl' />
                  ) : (
                    'Verify'
                  )}
                </button>
              </form>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {mode === 'req-otp' && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: '-100%' }}
              transition={{ ease: 'easeInOut' }}
              className='flex flex-col gap-5'>
              <h2 className='text-2xl font-medium uppercase text-center'>
                Login / Signup
              </h2>

              <form
                onSubmit={handleSubmit(loginHandler)}
                noValidate
                className='max-xs:my-auto'>
                <div className='flex flex-col'>
                  <label htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    placeholder='example@something.com'
                    className='border border-charcoal-grey border-opacity-50 transition-all text-charcoal-grey focus:border-opacity-80 py-3 px-4 text-lg outline-none'
                  />
                  {errors.email && (
                    <m.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='text-red-500 text-sm'>
                      {errors.email.message}
                    </m.p>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={logging}
                  className='w-full mt-6 text-center py-3 bg-charcoal-grey transition-all bg-opacity-90 hover:bg-opacity-100 outline-none text-off-white flex items-center justify-center disabled:bg-opacity-50'>
                  {logging ? (
                    <LuLoader className='animate-spin text-2xl' />
                  ) : (
                    'Get OTP'
                  )}
                </button>
              </form>
            </m.div>
          )}
        </AnimatePresence>
      </m.section>
    </m.div>
  );
};

const Login = () => {
  const authCtx = useContext(AuthContext);
  Log.log('I am in Login');
  return (
    <AnimatePresence>{authCtx.showAuthForm && <LoginModal />}</AnimatePresence>
  );
};

export default Login;
