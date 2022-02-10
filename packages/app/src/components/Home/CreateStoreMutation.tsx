import { graphql } from 'react-relay';

export const CreateStoreMutation = graphql`
  mutation CreateStoreMutation($input: StoreCreateInput!) {
    StoreCreate(input: $input) {
      store {
        name
        description
        pictureUrl
      }
      error
    }
  }
`;
