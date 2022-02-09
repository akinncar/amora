import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { graphql, useLazyLoadQuery, useQueryLoader } from 'react-relay';

import { SettingsMeQuery } from './SettingsMeQuery';
import { Button } from '../ui/Button';
import { useAuth } from '../../core/auth/useAuth';

export function Settings() {
  const { navigate } = useNavigation();
  const { signOut } = useAuth();

  const [, loadQuery] = useQueryLoader(SettingsMeQuery);

  const refresh = useCallback(
    () => loadQuery({}, { fetchPolicy: 'network-only' }),
    []
  );

  const data = useLazyLoadQuery(
    SettingsMeQuery,
    {},
    { fetchPolicy: 'store-or-network' }
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {data.me?._id ? (
        <TouchableOpacity onPress={() => signOut(refresh)}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Sair</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Button
            onPress={() => navigate('SignUp')}
            title="Criar uma conta"
            style={{ marginHorizontal: 16, padding: 8 }}
          />
          <Text style={{ paddingVertical: 12, textAlign: 'center' }}>ou</Text>
          <TouchableOpacity onPress={() => navigate('SignIn')}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Faça login com uma conta já existente
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
