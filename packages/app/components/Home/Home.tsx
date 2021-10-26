import * as React from "react";
import { View, Text } from 'react-native'

export function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Home Screen</Text>
    </View>
  )
}