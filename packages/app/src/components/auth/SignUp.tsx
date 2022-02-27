import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useMutation } from 'react-relay';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { RadioButton } from '../ui/RadioButton';
import { Button } from '../ui/Button';
import Alert from '../ui/Alert';
import { SignUpUserRegisterWithEmailMutation } from './SignUpUserRegisterWithEmailMutation';

import { SignUpUserRegisterWithEmailMutation as SignUpUserRegisterWithEmailMutationType } from './__generated__/SignUpUserRegisterWithEmailMutation.graphql';

export function SignUp() {
  const { navigate } = useNavigation();

  const [createUser, isLoading] =
    useMutation<SignUpUserRegisterWithEmailMutationType>(
      SignUpUserRegisterWithEmailMutation
    );

  const [type, setType] = useState('customer'); // customer or provider
  const [name, setName] = useState('Akinn Teste');
  const [email, setEmail] = useState('akinn@teste.com');
  const [password, setPassword] = useState('123');
  const [confirmPassword, setConfirmPassword] = useState('123');

  function onCompleted(data) {
    if (data.UserRegisterWithEmail.error)
      return Alert.alert(data.UserRegisterWithEmail.error);

    return Alert.alert('Sucesso ao criar sua conta!', undefined, [
      {
        text: 'OK',
        onPress: () => navigate('SignIn'),
      },
    ]);
  }

  function handleSubmit() {
    if (isLoading) return;

    if (!name) return Alert.alert('Campo Nome é obrigatório');
    if (!email) return Alert.alert('Campo E-mail é obrigatório');
    if (!password) return Alert.alert('Campo Senha é obrigatório');
    if (password !== confirmPassword)
      return Alert.alert('Os campos de senha devem ser iguais');

    createUser({
      variables: {
        input: {
          name,
          email: email.toLowerCase(),
          password,
          type,
        },
      },
      onCompleted,
    });
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <RadioButton
          checked={type === 'customer'}
          label="Cliente"
          onPress={() => setType('customer')}
        />
        <RadioButton
          checked={type === 'provider'}
          label="Estabelecimento"
          onPress={() => setType('provider')}
        />
      </View>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        label="Nome"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        label="E-mail"
        keyboardType="email-address"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        label="Senha"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        secureTextEntry={true}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        label="Confirmar Senha"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
        secureTextEntry={true}
      />
      <Button
        onPress={handleSubmit}
        title="Criar uma conta"
        style={{ margin: 16, padding: 8 }}
        isLoading={isLoading}
      />
      <View style={{ height: 300 }} />
    </ScrollView>
  );
}
