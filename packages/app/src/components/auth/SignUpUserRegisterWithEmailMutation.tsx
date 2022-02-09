import { graphql } from 'react-relay';

export const SignUpUserRegisterWithEmailMutation = graphql`
  mutation SignUpUserRegisterWithEmailMutation(
    $input: UserRegisterWithEmailInput!
  ) {
    UserRegisterWithEmail(input: $input) {
      token
      error
      success
      me {
        id
        name
        username
        email
        type
      }
    }
  }
`;
