import React, { Suspense } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { Store } from '../home/Store';
import { HomeStoreListQuery } from './HomeStoreListQuery';

import type { HomeStoreListQuery as HomeStoreListQueryType } from './__generated__/HomeStoreListQuery.graphql';

export function Home() {
  const data = useLazyLoadQuery<HomeStoreListQueryType>(
    HomeStoreListQuery,
    {},
    { fetchPolicy: 'store-or-network' }
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <FlatList
        data={data?.stores.edges}
        renderItem={({ item: { node } }) => <Store store={node} />}
        keyExtractor={({ node }) => node._id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListHeaderComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
