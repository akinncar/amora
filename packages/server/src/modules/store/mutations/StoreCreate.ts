import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bcrypt from 'bcrypt';

import { errorField, successField } from '../../../graphql';

import * as StoreLoader from '../StoreLoader';
import Store from '../StoreModel';
import StoreType from '../StoreType';

import * as UserStoreLoader from '../../userStore/UserStoreLoader';
import UserStore from '../../userStore/UserStoreModel';
import UserStoreType from '../../userStore/UserStoreType';

export default mutationWithClientMutationId({
  name: 'StoreCreate',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },    
    pictureUrl: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id, name, description, pictureUrl }, props) => {
    const store = await new Store({
      id, 
      name, 
      description, 
      pictureUrl
    }).save();

    if (props.user._id) {
      await new UserStore({
        id, 
        storeId: store.id,
        userId: props.user._id
      }).save();
    }

    return {
      id: store.id,
      success: 'Store register success',
    };
  },
  outputFields: {
    store: {
      type: StoreType,
      resolve: async ({ id }, _, context) => {
        return await StoreLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
