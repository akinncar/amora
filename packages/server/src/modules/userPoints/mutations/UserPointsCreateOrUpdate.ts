import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from '../../../graphql';

import * as UserPointsLoader from '../UserPointsLoader';
import UserPoints from '../UserPointsModel';
import UserPointsType from '../UserPointsType';

export default mutationWithClientMutationId({
  name: 'UserPointsCreateOrUpdate',
  inputFields: {
    points: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    storeId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id, points, storeId, userId }) => {
    const hasUserPoints = await UserPoints.findOne({
      storeId: storeId,
      userId: userId,
    });

    if (hasUserPoints) {
      await hasUserPoints.updateOne({
        points, storeId, userId
      })

      return {
        id: hasUserPoints.id,
        success: 'User points register success',
      };
    }

    const userPoints = await new UserPoints({
      id, 
      points,
      storeId,
      userId
    }).save();

    return {
      id: userPoints.id,
      success: 'User points register success',
    };
  },
  outputFields: {
    userPoints: {
      type: UserPointsType,
      resolve: async ({ id }, _, context) => {
        return await UserPointsLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
