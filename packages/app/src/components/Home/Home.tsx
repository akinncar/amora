import React, { Suspense } from "react";
import { View, Text } from 'react-native'
import { FlatList } from "react-native-gesture-handler";

import { useLazyLoadQuery, graphql } from 'react-relay'

import { Store } from '../home/Store'

export function Home() {
  const data = useLazyLoadQuery(
    graphql`
      query HomeStoreListQuery {
        stores {
          edges {
            node {
              id
              name
              description
              pictureUrl
            }
          }
        }
      }
    `,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <FlatList 
        data={data?.stores.edges}
        renderItem={({ item: { node } }) => <Store store={node} />}
        keyExtractor={({ node }) => node.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />  
    </View>
  )
}