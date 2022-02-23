import Constants from 'expo-constants';
const { manifest } = Constants;

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

  const uri = __DEV__ ? `http://${manifest.debuggerHost.split(':').shift().concat(':9001')}` : API_URL;

  const response = await fetch(`${uri}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  })

  return response.json()
}
