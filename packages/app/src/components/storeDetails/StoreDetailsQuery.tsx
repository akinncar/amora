import { graphql } from 'react-relay';

export const StoreDetailsQuery = graphql`
  query StoreDetailsQuery($storeId: ID!) {
    me {
      _id
      email
    }
    store: storeByStoreId(id: $storeId) {
      _id
      name
      description
      pictureUrl
    }
    products: productsByStoreId(storeId: $storeId) {
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
    userPoints: userPointsByStoreIdAndUserId(storeId: $storeId) {
      edges {
        node {
          _id
          points
          storeId
          userId
        }
      }
    }
  }
`;
