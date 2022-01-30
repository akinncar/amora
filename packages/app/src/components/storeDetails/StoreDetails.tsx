import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { Header } from './Header';
import { Product } from './Product';

export function StoreDetails() {
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
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <FlatList
        data={data?.products.edges}
        renderItem={({ item: { node } }) => <Product product={node} />}
        keyExtractor={({ node }) => node._id.toString()}
        ListHeaderComponent={() => <Header store={data?.store} />}
      />
    </View>
  );
}
