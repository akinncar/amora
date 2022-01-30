import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from '../../../graphql';

import * as ProductLoader from '../ProductLoader';
import Product from '../ProductModel';
import ProductType from '../ProductType';

export default mutationWithClientMutationId({
  name: 'ProductCreate',
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
    points: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    storeId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ id, name, description, pictureUrl, points, storeId }) => {
    const product = await new Product({
      id, 
      name, 
      description, 
      pictureUrl,
      points,
      storeId
    }).save();

    return {
      id: product.id,
      success: 'Product register success',
    };
  },
  outputFields: {
    product: {
      type: ProductType,
      resolve: async ({ id }, _, context) => {
        return await ProductLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
