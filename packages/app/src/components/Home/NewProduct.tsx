import React from 'react';
import { View } from 'react-native';

import { TextInput } from '../ui/TextInput';
import { Button } from '../ui/Button';

export function NewProduct() {
  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={{ flex: 1, paddingBottom: 16 }}
        label="Nome do produto"
      />
      <TextInput
        style={{ flex: 1, paddingBottom: 16 }}
        label="Quantidade de pontos para resgatar"
      />
      <Button
        title="Adicionar novo produto"
        style={{ padding: 6 }}
        onPress={() => {}}
      />
    </View>
  );
}
