import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './UserPointsLoader';
import { connectionDefinitions } from '../../graphql/connectionDefinitions';

const UserPointsType = new GraphQLObjectType({
  name: 'UserPoints',
  description: 'UserPoints data',
  fields: () => ({
    id: globalIdField('UserPoints'),
    ...objectIdResolver,
    points: {
      type: GraphQLInt,
      resolve: (userPoints) => userPoints.points,
    },
    storeId: {
      type: GraphQLID,
      resolve: (userPoints) => userPoints.storeId,
    },
    userId: {
      type: GraphQLID,
      resolve: (userPoints) => userPoints.userId,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserPointsType, load);

export default UserPointsType;

export const UserPointsConnection = connectionDefinitions({
  name: 'UserPoints',
  nodeType: UserPointsType,
});
