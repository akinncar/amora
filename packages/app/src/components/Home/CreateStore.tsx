import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { useMutation, useQueryLoader } from 'react-relay';

import { useNavigation } from '@react-navigation/native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import { CreateStoreMutation } from './CreateStoreMutation';
import { HomeStoreListQuery } from './HomeStoreListQuery';

export function CreateStore() {
  const { navigate } = useNavigation();

  const [createStore, isLoading] = useMutation(CreateStoreMutation);

  const [name, setName] = useState('Dobom Lanches');
  const [description, setDescription] = useState('Um lanche muito gostoso!');
  const [pictureUrl] = useState(
    'https://looklanches.com.br/wp-content/uploads/2020/09/salada-1.jpg'
  );

  const [, loadQueryHome] = useQueryLoader(HomeStoreListQuery);
  const refreshHome = useCallback(
    () => loadQueryHome({}, { fetchPolicy: 'network-only' }),
    []
  );

  function onCompleted(data) {
    if (data.StoreCreate.error) return Alert.alert(data.StoreCreate.error);

    return Alert.alert('Sucesso ao criar seu estabelecimento!', undefined, [
      {
        text: 'OK',
        onPress: async () => {
          await refreshHome();
          navigate('Home');
        },
      },
    ]);
  }

  function handleSubmit() {
    if (isLoading) return;

    if (!name) return Alert.alert('Campo Nome é obrigatório');
    if (!description) return Alert.alert('Campo Descrição é obrigatório');

    createStore({
      variables: {
        input: {
          name,
          description,
          pictureUrl,
        },
      },
      onCompleted,
    });
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={{ flex: 1, paddingTop: 16 }}>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        label="Nome"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
      />
      <TextInput
        value={description}
        onChangeText={text => setDescription(text)}
        label="Descrição"
        style={{ marginHorizontal: 16, marginBottom: 16 }}
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
