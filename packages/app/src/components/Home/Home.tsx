import React, { Suspense } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useLazyLoadQuery } from 'react-relay';

import { NewProduct } from './NewProduct';
import { useAuth } from '../../core/auth/useAuth';
import { Store } from '../home/Store';
import { HomeStoreListQuery } from './HomeStoreListQuery';
import { Product } from '../ui/Product';

import type { HomeStoreListQuery as HomeStoreListQueryType } from './__generated__/HomeStoreListQuery.graphql';

export function Home() {
  const { type } = useAuth();
  const { navigate } = useNavigation();

  const data = useLazyLoadQuery<HomeStoreListQueryType>(
    HomeStoreListQuery,
    {},
    { fetchPolicy: 'network-only' }
  );

  if (type === 'provider') {
    if (data.userStoreByUserId.edges.length < 1) {
      navigate('CreateStore');
      return <></>;
    }

    return (
      <FlatList
        data={data?.userStoreByUserId?.edges[0]?.node?.store?.products?.edges}
        renderItem={({ item: { node } }) => <Product product={node} />}
        keyExtractor={({ node }) => node._id.toString()}
        ListHeaderComponent={() => (
          <NewProduct
            storeId={data.userStoreByUserId.edges[0]?.node?.storeId}
          />
        )}
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
