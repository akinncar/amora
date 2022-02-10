import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getAuthToken, updateAuthToken } from './security';
import { getUserType, updateUserType } from './userType';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = React.createContext<any>(null!);

export const AuthProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [userToken, setUserToken] = useState<any>();
  const [userType, setUserType] = useState<any>('customer'); // customer or provider

  const signIn = useCallback<any>((token, type, callback) => {
    updateAuthToken(token);
    setUserToken(token);
    updateUserType(type);
    setUserType(type);
    return callback();
  }, []);

  const signOut = useCallback<any>(callback => {
    setUserToken(null);
    updateAuthToken();
    updateUserType('customer');
    setUserType('customer');
    return callback();
  }, []);

  async function init() {
    const authToken = await getAuthToken();
    setUserToken(authToken);
    console.log({ authToken });
    const type = await getUserType();
    setUserType(type);
  }

  useEffect(() => {
    init();
  }, []);

  const value = useMemo<any>(
    () => ({
      token: userToken,
      type: userType,
      signIn,
      signOut,
    }),
    [userToken, userType, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
