import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { useAuth } from '../../core/auth/useAuth';

export function Header({ store, userPoints }) {
  const { token } = useAuth();

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 32,
        flexDirection: 'row',
        borderRadius: 8,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          source={{ uri: store?.pictureUrl }}
          style={{ width: 64, height: 64, marginRight: 16, borderRadius: 6 }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{store?.name}</Text>
          <Text>{store?.description}</Text>
        </View>
      </View>
      {token && (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Você tem</Text>
          <Text style={{ alignSelf: 'center' }}>
            {userPoints?.points || 0} pontos
          </Text>
        </View>
      )}
    </View>
  );
}
