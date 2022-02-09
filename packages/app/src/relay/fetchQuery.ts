import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { API_URL } from '@env'

import { getAuthToken } from '../core/auth/security'

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
export async function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: any,
) {
  const authorization = await getAuthToken();

  const headers = {
    'content-type': 'application/json',
    authorization,
  };

  return fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}
