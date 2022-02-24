import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import mongoose, { Document, Model, Types } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

import { withFilter } from '../graphql/withFilter'

import UserType, { UserConnection } from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';

import StoreType, { StoreConnection } from '../modules/store/StoreType';
import * as StoreLoader from '../modules/store/StoreLoader';

import ProductType, { ProductConnection } from '../modules/product/ProductType';
import * as ProductLoader from '../modules/product/ProductLoader';

import UserPointsType, { UserPointsConnection } from '../modules/userPoints/UserPointsType';
import * as UserPointsLoader from '../modules/userPoints/UserPointsLoader';

import UserStoreType, { UserStoreConnection } from '../modules/userStore/UserStoreType';
import * as UserStoreLoader from '../modules/userStore/UserStoreLoader';

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
        // @ts-ignore
        UserLoader.load(context, context.user?._id)
    },
    users: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await UserLoader.loadAll(context, args),
    },
    stores: {
      type: new GraphQLNonNull(StoreConnection.connectionType),
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
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args, context) =>
        // @ts-ignore
        StoreLoader.load(context, args.id),
    },
    productsByStoreId: {
      type: new GraphQLNonNull(ProductConnection.connectionType),
      args: {
        storeId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: async (_, args, context) =>
        ProductLoader.loadAll(context, withFilter(args, { storeId: args.storeId })),
    },
    userPoints: {
      type: new GraphQLNonNull(UserPointsConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await UserPointsLoader.loadAll(context, args),
    },
    userPointsByStoreIdAndUserId: {
      type: new GraphQLNonNull(UserPointsConnection.connectionType),
      args: {
        storeId: {
          type: new GraphQLNonNull(GraphQLID)
        },
        userId: {
          type: GraphQLID,
        }
      },
      resolve: async (_, args, context) =>
        // @ts-ignore
        UserPointsLoader.loadAll(context, withFilter(args, { storeId: args.storeId, userId: args.userId || context.user?._id })),
    },
    userStore: {
      type: new GraphQLNonNull(UserStoreConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        await UserStoreLoader.loadAll(context, args),
    },
    userStoreByUserId: {
      type: new GraphQLNonNull(UserStoreConnection.connectionType),
      args: {
        userId: {
          type: GraphQLID,
        }
      },
      resolve: async (_, args, context) =>
        {
          // @ts-ignore
          return UserStoreLoader.loadAll(context, withFilter(args, { userId: args.userId || context.user?._id }))
        }
    },
  }),
});