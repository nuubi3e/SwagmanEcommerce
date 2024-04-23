'use client';
import { PaymentContext } from '@/providers/Payment/Payment.provider';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import {
  loadStripe,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { Log } from '@/lib/logs';
import { LuLoader, LuLoader2 } from 'react-icons/lu';
import {
  AddressElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
  // This is your test publishable API key.
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent!.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    Log.log(elements);

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,
      confirmParams: {
        shipping: {
          address: {
            line1: '2k-16',
            country: 'Germany',
          },
          name: 'Gaurav',
        },
        return_url: '',
      },
      redirect: 'if_required',
    });

    Log.log(res);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error?.type === 'card_error' || error?.type === 'validation_error') {
    //   setMessage(error.message as string);
    // } else {
    //   Log.log('CL ERROR', error);
    //   setMessage('An unexpected error occurred.');
    // }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
    terms: {
      googlePay: 'always',
    },
    wallets: {
      googlePay: 'auto',
    },
  };

  return (
    <form
      className='mt-4 flex flex-col gap-5 font-primary'
      onSubmit={handleSubmit}>
      {message && <p id='text-sm text-red-500 text-center'>{message}</p>}
      <AddressElement options={{ mode: 'billing' }} className='font-primary' />
      <PaymentElement options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        type='submit'
        className='w-full bg-charcoal-grey flex rounded items-center justify-center mt-2 mb-5 py-3 px-2 text-off-white transition-all disabled:cursor-not-allowed disabled:bg-opacity-50'>
        {isLoading ? <LuLoader className='animate-spin text-2xl' /> : 'Pay now'}
      </button>
    </form>
  );
};

export const PaymentModal = () => {
  const paymentCtx = useContext(PaymentContext);
  const [clientSecret, setClientSecret] = useState(''); // to store client secret getting from server

  useEffect(() => {
    fetch('/api/payment')
      .then((res) => res.json())
      .then((data) => {
        Log.log('IN CLIENT', data);
        setClientSecret(data.client_secret);
        return '';
      });

    // stop body scroll when cart opens
    document.body.style.overflowY = 'hidden';
    return () => {
      // stops body scroll when cart closes
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut' }}
      className='fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-30 flex backdrop-blur-[2px] overflow-hidden py-0 xs:overflow-y-auto xs:py-5'>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut' }}
        className='w-[460px] bg-white mx-auto overflow-y-auto  my-auto relative px-8 py-6 flex flex-col max-[510px]:transition-all max-xs:w-full max-xs:px-3 max-xs:py-3 bg-opacity-90 backdrop-blur-[10px] max-xs:h-full'>
        {!clientSecret && (
          <div className='flex flex-col items-center gap-5 w-full h-full justify-center'>
            <LuLoader2 className='text-6xl animate-spin' />
            <p className='font-medium text-xl'>Getting Payment Details</p>
          </div>
        )}
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <div className='flex justify-between items-start'>
              <h2 className='text-2xl font-medium mb-4'>Make Payment</h2>
              <button
                type='button'
                onClick={() => paymentCtx.closePaymentScreen()}
                className='w-9 transition-all aspect-square flex items-center justify-center text-charcoal-grey border border-off-white-dark rounded-md hover:bg-off-white-dark ml-auto'>
                <IoClose className='text-2xl' />
              </button>
            </div>

            <PaymentForm />
          </Elements>
        )}
      </m.section>
    </m.div>
  );
};
