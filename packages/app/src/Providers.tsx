import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import Environment from './relay/Environment';
import { AuthProvider } from './core/auth/AuthContext';

type Props = {
  readonly children: React.ReactNode;
  readonly environment: typeof Environment;
};
const Providers = ({ children, environment = Environment }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>{children}</AuthProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;
