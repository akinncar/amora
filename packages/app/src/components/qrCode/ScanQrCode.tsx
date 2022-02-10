import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';

export function ScanQrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // eslint-disable-next-line functional/no-return-void
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    return Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
