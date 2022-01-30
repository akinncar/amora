import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../ui/Button';

export function SignIn() {
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>SignIn</Text>
    </View>
  );
}
