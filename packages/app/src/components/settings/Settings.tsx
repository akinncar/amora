import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button } from '../ui/Button';

export function Settings() {
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Button
        onPress={() => navigate('SignUp')}
        title="Criar uma conta"
        style={{ marginHorizontal: 16, padding: 8 }}
      />
      <Text style={{ paddingVertical: 12, textAlign: 'center' }}>ou</Text>
      <TouchableOpacity onPress={() => navigate('SignIn')}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Faça login com uma conta já existente
        </Text>
      </TouchableOpacity>
    </View>
  );
}
