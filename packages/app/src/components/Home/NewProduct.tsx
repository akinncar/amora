import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { useMutation, useQueryLoader } from 'react-relay';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';
import Alert from '../ui/Alert';
import { HomeStoreListQuery } from './HomeStoreListQuery';
import { NewProductMutation } from './NewProductMutation';

export function NewProduct({ storeId }) {
  console.log({ storeId });
  const [createProduct, isLoading] = useMutation(NewProductMutation);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [pictureUrl] = useState(
    'https://looklanches.com.br/wp-content/uploads/2020/09/salada-1.jpg'
  );

  const [, loadQueryHome] = useQueryLoader(HomeStoreListQuery);
  const refreshHome = useCallback(
    () => loadQueryHome({}, { fetchPolicy: 'network-only' }),
    []
  );

  function onCompleted(data) {
    if (data.ProductCreate.error) return Alert.alert(data.ProductCreate.error);

    return Alert.alert('Sucesso ao criar seu produto!', undefined, [
      {
        text: 'OK',
        onPress: async () => {
          refreshHome();
        },
      },
    ]);
  }

  function handleSubmit() {
    if (isLoading) return;

    if (!name) return Alert.alert('Campo Nome é obrigatório');
    if (!points) return Alert.alert('Campo Quantidade de pontos é obrigatório');

    createProduct({
      variables: {
        input: {
          name,
          description,
          points: parseInt(points),
          pictureUrl,
          storeId,
        },
      },
      onCompleted,
    });
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={{ flex: 1, paddingBottom: 16 }}
        label="Nome do produto"
      />
      <TextInput
        value={description}
        onChangeText={text => setDescription(text)}
        style={{ flex: 1, paddingBottom: 16 }}
        label="Descrição do produto"
      />
      <TextInput
        value={points}
        onChangeText={text => setPoints(text)}
        style={{ flex: 1, paddingBottom: 16 }}
        label="Quantidade de pontos para resgatar"
        keyboardType="numeric"
      />
      <Button
        title="Adicionar novo produto"
        style={{ padding: 6 }}
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    </View>
  );
}
