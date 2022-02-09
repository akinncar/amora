import React, { useCallback, useMemo, useState } from 'react';

import { getAuthToken, updateAuthToken } from './security';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = React.createContext<any>(null!);

export const AuthProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const [userToken, setUserToken] = useState<any>(() => getAuthToken());

  const signIn = useCallback<any>((token, callback) => {
    updateAuthToken(token);
    setUserToken(token);
    return callback();
  }, []);

  const signOut = useCallback<any>(callback => {
    setUserToken(null);
    updateAuthToken();
    return callback();
  }, []);

  const value = useMemo<any>(
    () => ({
      token: userToken,
      signIn,
      signOut,
    }),
    [userToken, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
