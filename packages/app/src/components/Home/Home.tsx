import React, { Suspense } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { NewProduct } from './NewProduct';
import { useAuth } from '../../core/auth/useAuth';
import { Store } from '../home/Store';
import { HomeStoreListQuery } from './HomeStoreListQuery';
import { Product } from '../ui/Product';

import type { HomeStoreListQuery as HomeStoreListQueryType } from './__generated__/HomeStoreListQuery.graphql';

export function Home() {
  const { type } = useAuth();

  const data = useLazyLoadQuery<HomeStoreListQueryType>(
    HomeStoreListQuery,
    {},
    { fetchPolicy: 'network-only' }
  );

  console.log();
  console.log({ type });

  if (type === 'provider') {
    if (data.userStoreByUserId.edges.length < 0) {
      return <Text>Create</Text>;
    }

    return (
      <FlatList
        data={data?.userStoreByUserId?.edges[0]?.node?.store?.products?.edges}
        renderItem={({ item: { node } }) => <Product product={node} />}
        keyExtractor={({ node }) => node._id.toString()}
        ListHeaderComponent={() => <NewProduct />}
      />
    );
  }

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
