import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

import { withFilter } from '../graphql/withFilter'

import UserType, { UserConnection } from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';

import StoreType, { StoreConnection } from '../modules/store/StoreType';
import * as StoreLoader from '../modules/store/StoreLoader';

import ProductType, { ProductConnection } from '../modules/product/ProductType';
import * as ProductLoader from '../modules/product/ProductLoader';

import { nodeField, nodesField } from '../modules/node/typeRegister';
import { connectionArgs } from '../graphql/connectionDefinitions';

// import { version } from "../../../package.json";

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    version: {
      type: GraphQLString,
      resolve: () => '1.0.0',
    },
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        UserLoader.load(context, context.user?._id),
    },
    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await UserLoader.loadAll(context, args),
    },
    stores: {
      type: GraphQLNonNull(StoreConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await StoreLoader.loadAll(context, args),
    },
    storeByStoreId: {
      type: StoreType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (_, args, context) =>
        StoreLoader.load(context, args.id),
    },
    productsByStoreId: {
      type: GraphQLNonNull(ProductConnection.connectionType),
      args: {
        storeId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args, context) =>
        ProductLoader.loadAll(context, withFilter(args, { storeId: args.storeId })),
    },
  }),
});