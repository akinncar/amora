// @ts-nocheck
import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './UserStoreLoader';
import { connectionDefinitions } from '../../graphql/connectionDefinitions';

import StoreType from '../../modules/store/StoreType';
import Store from '../store/StoreModel';

const UserStoreType = new GraphQLObjectType({
  name: 'UserStore',
  description: 'UserStore data',
  fields: () => ({
    id: globalIdField('UserStore'),
    ...objectIdResolver,
    storeId: {
      type: GraphQLID,
      resolve: (userStore) => userStore.storeId,
    },
    userId: {
      type: GraphQLID,
      resolve: (userStore) => userStore.userId,
    },
    store: {
      type: StoreType,
      resolve: async (userStore) => {
        return await Store.findOne({
          _id: userStore.storeId,
        });
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserStoreType, load);

export default UserStoreType;

export const UserStoreConnection = connectionDefinitions({
  name: 'UserStore',
  nodeType: UserStoreType,
});
