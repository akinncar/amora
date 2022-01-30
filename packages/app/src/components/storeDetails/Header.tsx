import React from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { graphql, useLazyLoadQuery } from 'react-relay';

export function Header({ store }) {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        flexDirection: 'row',
        borderRadius: 8,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          source={{ uri: store.pictureUrl }}
          style={{ width: 40, height: 40, marginRight: 16 }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{store.name}</Text>
          <Text>{store.description}</Text>
        </View>
      </View>
      <Text style={{ alignSelf: 'center' }}>8 pontos</Text>
    </View>
  );
}
