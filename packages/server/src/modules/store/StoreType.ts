// @ts-nocheck
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

// import TeamType from "../team/TeamType";
// import Team from "../team/TeamModel";
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './StoreLoader';
import { connectionDefinitions } from '../../graphql/connectionDefinitions';
import { withFilter } from '../../graphql/withFilter'

import ProductType, { ProductConnection } from '../../modules/product/ProductType';
import Product from '../product/ProductModel';
import * as ProductLoader from '../product/ProductLoader';

const StoreType = new GraphQLObjectType({
  name: 'Store',
  description: 'Store data',
  fields: () => ({
    id: globalIdField('Store'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: (store) => store.name,
    },
    description: {
      type: GraphQLString,
      resolve: (store) => store.description,
    },
    pictureUrl: {
      type: GraphQLString,
      resolve: (store) => store.pictureUrl,
    },
    // products: {
    //   type: GraphQLList(ProductType),
    //   resolve: async (store) => {
    //     return await Product.find({
    //       storeId: store._id,
    //     });
    //   },
    // },
    products: {
      type: GraphQLNonNull(ProductConnection.connectionType),
      resolve: async (store, args, context) => 
        ProductLoader.loadAll(context, withFilter(args, { storeId: store._id })),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(StoreType, load);

export default StoreType;

export const StoreConnection = connectionDefinitions({
  name: 'Store',
  nodeType: StoreType,
});
