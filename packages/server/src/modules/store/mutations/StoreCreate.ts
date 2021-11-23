import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import bcrypt from "bcrypt";

import { errorField, successField } from '../../../graphql';

import * as StoreLoader from '../StoreLoader';
import Store from "../StoreModel";
import StoreType from "../StoreType";

export default mutationWithClientMutationId({
  name: "StoreCreate",
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
  mutateAndGetPayload: async ({ id, name, description, pictureUrl }) => {
    const store = await new Store({
      id, 
      name, 
      description, 
      pictureUrl
    }).save();

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
