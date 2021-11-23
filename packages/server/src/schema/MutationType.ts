import { GraphQLObjectType } from "graphql";

import UserMutations from '../modules/user/mutations';
import StoreMutations from '../modules/store/mutations';

export default new GraphQLObjectType({
  name: "Mutation",
  description: "Root of ... mutations",
  fields: () => ({
    ...UserMutations,
    ...StoreMutations,
  }),
});