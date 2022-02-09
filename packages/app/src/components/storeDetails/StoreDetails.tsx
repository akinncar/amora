import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { Header } from './Header';
import { Product } from './Product';
import { Button } from '../ui/Button';
import { useAuth } from '../../core/auth/useAuth';

export function StoreDetails() {
  const { navigate } = useNavigation();
  const { token } = useAuth();
  const { params } = useRoute();
  const { storeId } = params;

  const data = useLazyLoadQuery(
    graphql`
      query StoreDetailsQuery($id: ID!) {
        store: storeByStoreId(id: $id) {
          _id
          name
          description
          pictureUrl
        }
        products: productsByStoreId(storeId: $id) {
          edges {
            node {
              _id
              name
              description
              pictureUrl
              points
              storeId
            }
          }
        }
      }
    `,
    { id: storeId },
    { fetchPolicy: 'store-or-network' }
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <FlatList
        data={data?.products.edges}
        renderItem={({ item: { node } }) => <Product product={node} />}
        keyExtractor={({ node }) => node._id.toString()}
        ListHeaderComponent={() => <Header store={data?.store} />}
      />
      {token && (
        <Button
          onPress={() => navigate('QrCode')}
          title="Exibir seu QRCode"
          style={{ margin: 16, padding: 8 }}
        />
      )}
    </SafeAreaView>
  );
}
