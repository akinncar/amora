import User, { IUser } from "../UserModel";
// import { getCounter } from "../../../../../test";

export const createUser = async (args: IUser = {}) => {
//   const i = getCounter("user");

let { ...payload } = args;

  return new User({
    name: `user#${i}`,
    username: `username${i}`,
    email: `user${i}@example.com`,
    password: `password#${i}`,
    ...payload,
  }).save();
};
