import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from '../../../graphql';

import * as UserStoreLoader from '../UserStoreLoader';
import UserStore from '../UserStoreModel';
import UserStoreType from '../UserStoreType';

export default mutationWithClientMutationId({
  name: 'UserStoreCreate',
  inputFields: {
    storeId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id,  storeId, userId }) => {
    const userStore = await new UserStore({
      id, 
      storeId,
      userId
    }).save();

    return {
      id: userStore.id,
      success: 'User points register success',
    };
  },
  outputFields: {
    userStore: {
      type: UserStoreType,
      resolve: async ({ id }, _, context) => {
        return await UserStoreLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
