import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useMutation, useQueryLoader } from 'react-relay';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import Alert from '../ui/Alert';
import { useAuth } from '../../core/auth/useAuth';
import { HomeStoreListQuery } from '../home/HomeStoreListQuery';
import { SettingsMeQuery } from '../settings/SettingsMeQuery';
import { SignInUserLoginWithEmailMutation } from './SignInUserLoginWithEmailMutation';

import { SignInUserLoginWithEmailMutation as SignInUserLoginWithEmailMutationType } from './__generated__/SignInUserLoginWithEmailMutation.graphql';

export function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [, loadQueryHome] = useQueryLoader(HomeStoreListQuery);
  const [, loadQuerySettings] = useQueryLoader(SettingsMeQuery);

  const refreshHome = useCallback(
    () => loadQueryHome({}, { fetchPolicy: 'network-only' }),
    []
  );
  const refreshSettings = useCallback(
    () => loadQuerySettings({}, { fetchPolicy: 'network-only' }),
    []
  );

  const [login, isLoading] = useMutation<SignInUserLoginWithEmailMutationType>(
    SignInUserLoginWithEmailMutation
  );

  async function onLogin() {
    await refreshHome();
    await refreshSettings();
    return navigate('Home');
  }

  function onCompleted(data) {
    if (data.UserLoginWithEmail.error)
      return Alert.alert(data.UserLoginWithEmail.error);

    if (data.UserLoginWithEmail?.token) {
      signIn(
        data.UserLoginWithEmail?.token,
        data.UserLoginWithEmail?.me.type,
        () =>
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
          email: email.toLowerCase(),
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
