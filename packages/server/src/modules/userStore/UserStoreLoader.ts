// @ts-nocheck
import { createLoader } from '../../graphql/createLoader';

import { registerLoader } from '../../graphql/loaderRegister';

import UserStoreModel from './UserStoreModel';

const { Wrapper: UserStore, getLoader, clearCache, load, loadAll } = createLoader({
  model: UserStoreModel,
  loaderName: 'UserStoreLoader',
});

export { getLoader, clearCache, load, loadAll };
export default UserStore;

registerLoader('UserStoreLoader', getLoader);
