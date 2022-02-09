import React from 'react';

import { AuthProvider } from './auth/AuthContext';

function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
