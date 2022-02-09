import React from 'react';
import { Text, View } from 'react-native';

import { useLazyLoadQuery } from 'react-relay';
import QRCode from 'react-native-qrcode-svg';

import { QrCodeMeQuery } from './QrCodeMeQuery';

export function QrCode() {
  const data = useLazyLoadQuery(QrCodeMeQuery, {}, undefined);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode size={250} value={data.me?._id} />
    </View>
  );
}
