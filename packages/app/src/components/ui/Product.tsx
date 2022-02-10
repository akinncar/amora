import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from './Button';
import { useAuth } from '../../core/auth/useAuth';

export function Product({ product, userPoints = 0 }) {
  const { _id, pictureUrl, name, description, points } = product;
  const { token, type } = useAuth();

  const { navigate } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
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
          source={{ uri: pictureUrl }}
          style={{ width: 40, height: 40, marginRight: 16, borderRadius: 6 }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{points} pontos</Text>
        </View>
      </View>
      {token && type === 'customer' && (
        <Button
          onPress={() => navigate('QrCode')}
          title="Resgatar"
          disabled={userPoints.points < points}
        />
      )}
    </View>
  );
}
