import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import bcrypt from 'bcrypt';

import { errorField, successField } from '../../../graphql';

import * as UserLoader from '../UserLoader';
import User from '../UserModel';
import UserType from '../UserType';

import { generateToken } from '../../../auth';

export default mutationWithClientMutationId({
  name: 'UserRegisterWithEmail',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const hasUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (hasUser) {
      return {
        token: null,
        error: 'User already exists',
      };
    }

    const user = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    }).save();

    return {
      token: generateToken({ user }),
      error: null,
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    // error: {
    //   type: GraphQLString,
    //   resolve: ({ error }) => error,
    // },
    me: {
      type: UserType,
      resolve: async ({ id }, _, context) => {
        return await UserLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});
