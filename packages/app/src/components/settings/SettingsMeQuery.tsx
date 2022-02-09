import { graphql } from 'react-relay';

export const SettingsMeQuery = graphql`
  query SettingsMeQuery {
    me {
      _id
      name
      email
    }
  }
`;
