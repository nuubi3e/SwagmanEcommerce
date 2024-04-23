'use client';
import { PaymentContext } from '@/providers/Payment/Payment.provider';
import React, { useContext } from 'react';
import { PaymentModal } from '../PaymentModal/PaymentModal.component';
import { AnimatePresence } from 'framer-motion';

const Payment = () => {
  const paymentCtx = useContext(PaymentContext);

  return (
    <AnimatePresence mode='wait'>
      {paymentCtx.showPaymentScreen && <PaymentModal />}
    </AnimatePresence>
  );
};

export default Payment;
