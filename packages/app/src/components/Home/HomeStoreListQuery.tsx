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
  }
`;
