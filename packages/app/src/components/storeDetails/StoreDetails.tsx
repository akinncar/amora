import React from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { Header } from './Header';

export function StoreDetails() {
  const { params } = useRoute();
  const { storeId } = params;

  const data = useLazyLoadQuery(
    graphql`
      query StoreDetailsQuery($id: String!) {
        store: storeByStoreId(id: $id) {
          _id
          name
          description
          pictureUrl
        }
      }
    `,
    { id: storeId },
    { fetchPolicy: 'store-or-network' }
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header store={data?.store} />
    </View>
  );
}
