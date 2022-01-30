import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { objectIdResolver } from '@entria/graphql-mongo-helpers';

// import TeamType from "../team/TeamType";
// import Team from "../team/TeamModel";
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './ProductLoader';
import { connectionDefinitions } from '../../graphql/connectionDefinitions';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product data',
  fields: () => ({
    id: globalIdField('Product'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: (product) => product.name,
    },
    description: {
      type: GraphQLString,
      resolve: (product) => product.description,
    },
    pictureUrl: {
      type: GraphQLString,
      resolve: (product) => product.pictureUrl,
    },
    points: {
      type: GraphQLInt,
      resolve: (product) => product.points,
    },
    storeId: {
      type: GraphQLID,
      resolve: (product) => product.storeId,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(ProductType, load);

export default ProductType;

export const ProductConnection = connectionDefinitions({
  name: 'Product',
  nodeType: ProductType,
});
