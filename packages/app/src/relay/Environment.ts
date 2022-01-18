import { Environment, Network, RecordSource, Store, QueryResponseCache } from 'relay-runtime';

import { fetchQuery } from './fetchQuery'

const __DEV__ = process.env.NODE_ENV === 'development';

const oneMinute = 60 * 1000;
const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10,
  }),
});

export default environment;
