import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { useMutation, useQueryLoader } from 'react-relay';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { useAuth } from '../../core/auth/useAuth';
import { SettingsMeQuery } from '../settings/SettingsMeQuery';
import { SignInUserLoginWithEmailMutation } from './SignInUserLoginWithEmailMutation';

import { SignInUserLoginWithEmailMutation as SignInUserLoginWithEmailMutationType } from './__generated__/SignInUserLoginWithEmailMutation.graphql';

export function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('akinn@teste.com');
  const [password, setPassword] = useState('123');

  const [, loadQuery] = useQueryLoader(SettingsMeQuery);

  const refresh = useCallback(
    () => loadQuery({}, { fetchPolicy: 'network-only' }),
    []
  );

  const [login, isLoading] = useMutation<SignInUserLoginWithEmailMutationType>(
    SignInUserLoginWithEmailMutation
  );

  async function onLogin() {
    await refresh();
    return navigate('Settings');
  }

  function onCompleted(data) {
    if (data.UserLoginWithEmail.error)
      return Alert.alert(data.UserLoginWithEmail.error);

    if (data.UserLoginWithEmail?.token) {
      signIn(data.UserLoginWithEmail?.token, () =>
        Alert.alert('Logado com sucesso!', undefined, [
          { text: 'OK', onPress: onLogin },
        ])
      );
    }
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
