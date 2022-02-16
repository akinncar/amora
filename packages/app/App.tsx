import React, { Suspense } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';

import Providers from './src/Providers';
import Environment from './src/relay/Environment';
import { Routes } from './src/routes';

export default function App() {
  return (
    <Providers environment={Environment}>
      <Suspense fallback={<ActivityIndicator />}>
        <StatusBar barStyle="dark-content" />

        <Routes />
      </Suspense>
    </Providers>
  );
}
