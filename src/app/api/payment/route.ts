import Stripe from 'stripe';
import { Log } from '@/lib/logs';
import { NextRequest, NextResponse } from 'next/server';

const calculateOrderAmount = () => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 100;
};

export const GET = async () => {
  try {
    console.clear();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'inr',
      description: 'GOOD PRODUCTS',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    Log.log('ON SERVER: ', paymentIntent);

    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (err) {
    Log.error(err);
  }
};
