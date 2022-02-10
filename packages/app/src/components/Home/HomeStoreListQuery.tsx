import { graphql } from 'react-relay';

export const HomeStoreListQuery = graphql`
  query HomeStoreListQuery {
    stores {
      edges {
        node {
          _id
          name
          description
          pictureUrl
        }
      }
    }
    userStoreByUserId {
      edges {
        node {
          _id
          storeId
          userId
          store {
            _id
            name
            products {
              edges {
                node {
                  _id
                  name
                  pictureUrl
                  points
                }
              }
            }
          }
        }
      }
    }
  }
`;
