'use client';
import React, { PropsWithChildren } from 'react';

interface PaymentContext {
  showPaymentScreen: boolean;
  openPaymentScreen: () => void;
  closePaymentScreen: () => void;
}

export const PaymentContext = React.createContext<PaymentContext>({
  showPaymentScreen: false,
  openPaymentScreen: () => {},
  closePaymentScreen: () => {},
});

const PaymentProvider = ({ children }: PropsWithChildren) => {
  const [showPaymentScreen, setShowPaymentScreen] = React.useState(false);

  const openPaymentScreen = () => setShowPaymentScreen(true);
  const closePaymentScreen = () => setShowPaymentScreen(false);
  return (
    <PaymentContext.Provider
      value={{
        showPaymentScreen,
        openPaymentScreen,
        closePaymentScreen,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
