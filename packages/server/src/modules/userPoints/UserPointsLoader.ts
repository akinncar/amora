import { createLoader } from '../../graphql/createLoader';

import { registerLoader } from '../../graphql/loaderRegister';

import UserPointsModel from './UserPointsModel';

const { Wrapper: UserPoints, getLoader, clearCache, load, loadAll } = createLoader({
  model: UserPointsModel,
  loaderName: 'UserPointsLoader',
});

export { getLoader, clearCache, load, loadAll };
export default UserPoints;

registerLoader('UserPointsLoader', getLoader);
