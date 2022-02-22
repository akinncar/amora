import { graphql } from 'react-relay';

export const ScanQrCodeUserPointsCreateOrUpdateMutation = graphql`
  mutation ScanQrCodeUserPointsCreateOrUpdateMutation(
    $input: UserPointsCreateOrUpdateInput!
  ) {
    UserPointsCreateOrUpdate(input: $input) {
      userPoints {
        _id
        points
        storeId
        userId
      }
      success
      error
    }
  }
`;
