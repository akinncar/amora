import React, { Suspense } from "react";
import { View, Text, Image } from 'react-native'
import { FlatList } from "react-native-gesture-handler";

export function Store({ store }) {
  const { pictureUrl, name, description } = store
  
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignContent: 'center', backgroundColor: '#FFF', marginHorizontal: 16, padding: 16, flexDirection: 'row', borderRadius: 8 }}>
      <Image source={{ uri: pictureUrl }} style={{ width: 40, height: 40, marginRight: 16 }} />
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  )
}