'use client';
import { updateUserAction } from '@/lib/actions/actions';
import { Log } from '@/lib/logs';
import { ErrorMessage } from '@hookform/error-message';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLoader } from 'react-icons/lu';

interface FormFields {
  username: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  email: string;
}

interface Props {
  username: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  email: string;
}

const ProfileForm = (props: Props) => {
  const [isInitial, setIsInitial] = useState(true);
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: { ...props },
  });

  const updateProfileHandler = async (userInp: FormFields) => {
    setSending(true);
    try {
      Log.log(userInp);

      const res = await updateUserAction({ ...userInp, email: props.email });

      if (!res.ok) throw new Error(res.message);

      Log.log(res);
      setIsInitial(true);
    } catch (err) {
      Log.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateProfileHandler)}
      className='grid grid-cols-2 gap-y-4 gap-x-5 max-xs:grid-cols-1'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='firstName' className='font-medium text-sm'>
          First Name *
        </label>
        <input
          type='text'
          {...register('firstName', {
            required: 'Please Provide first name',
            onChange() {
              setIsInitial(false);
            },
          })}
          id='firstName'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
        <ErrorMessage
          name='firstName'
          as={'span'}
          className='text-sm text-red-500'
          errors={errors}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='lastName' className='font-medium text-sm'>
          Last Name *
        </label>
        <input
          type='text'
          {...register('lastName', {
            required: 'Please Provide last name',
            onChange() {
              setIsInitial(false);
            },
          })}
          id='lastName'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
        <ErrorMessage
          name='lastName'
          as={'span'}
          className='text-sm text-red-500'
          errors={errors}
        />
      </div>
      <div className='flex flex-col gap-2 col-span-2 max-xs:col-auto'>
        <label htmlFor='email' className='font-medium text-sm'>
          Username *
        </label>
        <input
          type='text'
          {...register('username', {
            required: 'Please Provide Username',
            onChange() {
              setIsInitial(false);
            },
          })}
          id='username'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
        <ErrorMessage
          name='username'
          as={'span'}
          className='text-sm text-red-500'
          errors={errors}
        />
      </div>
      <div className='flex flex-col gap-2 col-span-2 max-xs:col-auto'>
        <label htmlFor='email' className='font-medium text-sm'>
          Email *
        </label>
        <input
          type='email'
          {...register('email', {
            required: 'Please Provide Email',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
              message: 'Please enter a valid email address',
            },
            disabled: true,
          })}
          id='email'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 px-3 transition-all focus:border-opacity-70'
        />
        <ErrorMessage
          name='email'
          as={'span'}
          className='text-sm text-red-500'
          errors={errors}
        />
      </div>
      <div className='flex flex-col gap-2 col-span-2 max-xs:col-auto relative'>
        <label htmlFor='mobileNo' className='font-medium text-sm'>
          Mobile No *
        </label>
        <span className='font-medium inline-block text-slate-400 h-max absolute bottom-[2px] pb-3 px-3 left-0'>
          +91
        </span>
        <input
          type='text'
          {...register('mobileNo', {
            required: 'Please Provide MobileNo',
            onChange() {
              setIsInitial(false);
            },
          })}
          id='mobileNo'
          maxLength={10}
          placeholder='XXXXXXXXXX'
          className='outline-none border border-opacity-35 border-charcoal-grey rounded py-3 pl-11 pr-3 transition-all focus:border-opacity-70'
        />{' '}
        <ErrorMessage
          name='mobileNo'
          as={'span'}
          className='text-sm text-red-500'
          errors={errors}
        />
      </div>

      <button
        type='submit'
        disabled={isInitial || sending}
        className='py-2 px-6 rounded justify-start mt-2 self-start w-max bg-charcoal-grey transition-all text-off-white disabled:bg-opacity-70 disabled:cursor-not-allowed'>
        {sending ? (
          <LuLoader className='animate-spin text-2xl' />
        ) : (
          'Save Changes'
        )}
      </button>
    </form>
  );
};

export default ProfileForm;
