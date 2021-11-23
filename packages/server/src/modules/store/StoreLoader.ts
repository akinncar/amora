import { createLoader } from "../../graphql/createLoader";

import { registerLoader } from "../../graphql/loaderRegister";

import StoreModel from './StoreModel';

const { Wrapper: Store, getLoader, clearCache, load, loadAll } = createLoader({
  model: StoreModel,
  loaderName: 'StoreLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Store;

registerLoader('StoreLoader', getLoader);
