'use client';

import { createContext, ReactNode, useState } from 'react';

type TAuthContext = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  showAuthForm: boolean;
  setShowAuthForm: (val: boolean) => void;
};

export const AuthContext = createContext<TAuthContext>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  showAuthForm: false,
  setShowAuthForm: (val) => {},
});

export const AuthProvider = ({
  children,
  hasUser,
}: {
  children: ReactNode;
  hasUser: boolean;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasUser);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
        setShowAuthForm: (val: boolean) => setShowAuthForm(val),
        showAuthForm,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
