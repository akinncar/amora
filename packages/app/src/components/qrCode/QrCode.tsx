import React from 'react';
import { Text, View } from 'react-native';

import { useLazyLoadQuery } from 'react-relay';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';

import { QrCodeMeQuery } from './QrCodeMeQuery';
import type { QrCodeMeQuery as QrCodeMeQueryType } from './__generated__/QrCodeMeQuery.graphql';

export function QrCode() {
  const { params = { points: 0 } } = useRoute();
  const { points } = params;

  const data = useLazyLoadQuery<QrCodeMeQueryType>(
    QrCodeMeQuery,
    {},
    undefined
  );

  const code = {
    userId: data.me?._id,
    points: points || 0,
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode size={250} value={JSON.stringify(code)} />
    </View>
  );
}
