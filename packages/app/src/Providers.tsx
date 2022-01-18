import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import Environment from './relay/Environment';

type Props = {
  children: React.ReactNode;
  environment: typeof Environment;
};
const Providers = ({ children, environment = Environment }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

export default Providers;
