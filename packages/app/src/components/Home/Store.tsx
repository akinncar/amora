import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../ui/Button';

export function Store({ store }) {
  const { _id, pictureUrl, name, description } = store;

  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        padding: 16,
        flexDirection: 'row',
        borderRadius: 8,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          source={{ uri: pictureUrl }}
          style={{ width: 40, height: 40, marginRight: 16 }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{description}</Text>
        </View>
      </View>
      <Button
        onPress={() => navigate('StoreDetails', { storeId: _id, title: name })}
        title="Detalhes"
      />
    </View>
  );
}
