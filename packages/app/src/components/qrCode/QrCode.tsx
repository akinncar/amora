import React from 'react';
import { Text, View } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

export function QrCode() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode size={250} value={Math.random().toString()} />
    </View>
  );
}
