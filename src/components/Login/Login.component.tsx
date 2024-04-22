/* eslint-disable react/no-unescaped-entities */
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

// function to format the seconds in mm:ss format
function formatTime(seconds: number) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  return min + ':' + (sec < 10 ? '0' : '') + sec;
}

const RESEND_OTP_TIME = 90; // in sec
let OTP_TIMER: NodeJS.Timeout;

const LoginModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setFocus,
  } = useForm<LoginPayload>();
  const [resendOTP, setResendOTP] = useState<{
    time: number;
    canSend: boolean;
  }>({ canSend: false, time: RESEND_OTP_TIME });
  const [logging, setLogging] = useState(false);
  const [OTP, setOTP] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const key = useRef(''); // to store key recieve from server
  const [mode, setMode] = useState<'req-otp' | 'verify-otp'>('req-otp');
  const authCtx = useContext(AuthContext);
  const otpIP = useRef<HTMLInputElement>(null);

  const loginHandler = async (userInp: LoginPayload) => {
    setLogging(true);
    setErrorMsg('');
    try {
      const res = await loginAction(userInp.email);

      if (!res.ok) throw new Error(res.message);

      Log.log(res.data?.key);
      key.current = res?.data?.key || '';
      setMode('verify-otp');
      otpIP.current?.focus();

      OTP_TIMER = setInterval(() => {
        setResendOTP((lst) => {
          const resend = { ...lst };
          if (lst.time >= 1) return { ...resend, time: resend.time - 1 };
          else {
            clearInterval(OTP_TIMER);
            return { canSend: true, time: RESEND_OTP_TIME };
          }
        });
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLogging(false);
    }
  };

  const verifyOTPHandler = async (OTP: number) => {
    setLogging(true);
    setErrorMsg('');
    try {
      const res = await verifyOtpAction({ otp: OTP, key: key.current });

      if (!res.ok) throw new Error(res.message);

      // reloading the page in order to get the updated user info like cart, etc...
      location.reload();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLogging(false);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    setFocus('email');

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [setFocus]);

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
          {errorMsg.trim().length > 0 && (
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='text-center text-red-500 font-semibold'>
              {errorMsg}
            </m.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {mode === 'verify-otp' && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={'verify-otp'}
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
                  ref={otpIP}
                  value={OTP}
                  disabled={logging}
                  onChange={(e) => {
                    setErrorMsg('');
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
              <p className='mt-7 font-medium'>
                Didn't get the OTP,{' '}
                <button
                  disabled={!resendOTP.canSend}
                  onClick={() => {
                    console.log('I AM HERE');
                    OTP_TIMER = setInterval(() => {
                      setResendOTP((lst) => {
                        const resend = { ...lst };
                        if (lst.time >= 1)
                          return { canSend: false, time: resend.time - 1 };
                        else {
                          clearInterval(OTP_TIMER);
                          return { canSend: true, time: RESEND_OTP_TIME };
                        }
                      });
                    }, 1000);
                  }}
                  className='disabled:text-slate-500 font-semibold disabled:cursor-not-allowed'>
                  Resend{' '}
                  {!resendOTP.canSend && <> in {formatTime(resendOTP.time)}</>}
                </button>
              </p>
            </m.div>
          )}

          {mode === 'req-otp' && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut' }}
              key={'req-otp'}
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
