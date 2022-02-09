import { graphql } from 'react-relay';

export const QrCodeMeQuery = graphql`
  query QrCodeMeQuery {
    me {
      _id
    }
  }
`;
