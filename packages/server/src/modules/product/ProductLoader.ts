// @ts-nocheck
import { createLoader } from '../../graphql/createLoader';

import { registerLoader } from '../../graphql/loaderRegister';

import ProductModel from './ProductModel';

const { Wrapper: Product, getLoader, clearCache, load, loadAll } = createLoader({
  model: ProductModel,
  loaderName: 'ProductLoader',
});

export { getLoader, clearCache, load, loadAll };
export default Product;

registerLoader('ProductLoader', getLoader);
