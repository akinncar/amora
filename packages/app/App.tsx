import React, { Suspense } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Providers from './src/Providers';
import Environment from './src/relay/Environment';
import { Routes } from './src/routes';

// AsyncStorage.clear();

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
