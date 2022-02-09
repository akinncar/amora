import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { graphql, useMutation } from 'react-relay';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';

export function SignIn() {
  const { navigate } = useNavigation();

  const [login, isLoading] = useMutation(graphql`
    mutation SignInUserLoginWithEmailMutation(
      $input: UserLoginWithEmailInput!
    ) {
      UserLoginWithEmail(input: $input) {
        token
        error
        success
        me {
          _id
          name
          username
          email
          type
        }
      }
    }
  `);

  const [email, setEmail] = useState('akinn@teste.com');
  const [password, setPassword] = useState('123');

  function onCompleted(data) {
    if (data.UserLoginWithEmail.error)
      return Alert.alert(data.UserLoginWithEmail.error);

    return Alert.alert('Logado com sucesso!');
  }

  function handleSubmit() {
    if (isLoading) return;

    if (!email) return Alert.alert('Campo E-mail é obrigatório');
    if (!password) return Alert.alert('Campo Senha é obrigatório');

    login({
      variables: {
        input: {
          email,
          password,
        },
      },
      onCompleted,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="E-mail"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        label="Senha"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        secureTextEntry={true}
      />
      <Button
        onPress={handleSubmit}
        title="Entrar"
        style={{ margin: 16, padding: 8 }}
        isLoading={isLoading}
      />
    </View>
  );
}
