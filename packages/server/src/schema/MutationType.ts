import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutations';
import StoreMutations from '../modules/store/mutations';
import ProductMutations from '../modules/product/mutations';
import UserPointsMutations from '../modules/userPoints/mutations';
import UserStoreMutations from '../modules/userStore/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of ... mutations',
  fields: () => ({
    ...UserMutations,
    ...StoreMutations,
    ...ProductMutations,
    ...UserPointsMutations,
    ...UserStoreMutations,
  }),
});