import { graphql } from 'react-relay';

export const SignInUserLoginWithEmailMutation = graphql`
  mutation SignInUserLoginWithEmailMutation($input: UserLoginWithEmailInput!) {
    UserLoginWithEmail(input: $input) {
      token
      error
      success
      me {
        _id
        name
        username
        email
        type
      }
    }
  }
`;
