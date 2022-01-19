import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { API_URL } from '@env'

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
export function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: any,
) {
  return fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}
