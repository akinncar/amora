import { GraphQLObjectType } from "graphql";

import UserMutations from '../modules/user/mutations';

export default new GraphQLObjectType({
  name: "Mutation",
  description: "Root of ... mutations",
  fields: () => ({
    ...UserMutations,
  }),
});