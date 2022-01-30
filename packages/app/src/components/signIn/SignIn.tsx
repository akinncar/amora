import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';

export function SignIn() {
  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <TextInput
        label="E-mail"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
      />
      <TextInput
        label="Senha"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        secureTextEntry={true}
      />
      <Button
        onPress={() => {}}
        title="Entrar"
        style={{ margin: 16, padding: 8 }}
      />
    </View>
  );
}
