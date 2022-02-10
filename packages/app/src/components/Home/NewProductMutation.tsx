import { graphql } from 'react-relay';

export const NewProductMutation = graphql`
  mutation NewProductMutation($input: ProductCreateInput!) {
    ProductCreate(input: $input) {
      product {
        name
        description
        pictureUrl
        points
        storeId
      }
      error
    }
  }
`;
