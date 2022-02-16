import { graphql } from 'react-relay';

export const ScanQrCodeStoreQuery = graphql`
  query ScanQrCodeStoreQuery {
    userStoreByUserId {
      edges {
        node {
          _id
          storeId
          userId
        }
      }
    }
  }
`;
