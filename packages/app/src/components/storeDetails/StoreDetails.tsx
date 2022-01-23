import React from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useLazyLoadQuery, graphql } from "react-relay";

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
    { fetchPolicy: "store-or-network" }
  );

  return (
    <View>
      <Text>{data?.store.name}</Text>
    </View>
  );
}
