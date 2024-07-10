import { TypedDocumentNode } from '@apollo/client/core/types';
import { print } from 'graphql';
export interface FetchResult<TData> {
  data?: TData;
  error?: string;
}
export interface GraphqlRequestOptions<TData, V> {
  document: TypedDocumentNode<TData, V>;
  variables?: V;
  config?: RequestInit;
  token?: string;
}

export async function fetchGraphQL<TData, V>({
  document,
  variables,
  config,
  token,
}: GraphqlRequestOptions<TData, V>): Promise<FetchResult<TData>> {
  const query = print(document);
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then(async (res) => {
      const { data, errors } = await res.json();
      if (errors) {
        console.log(errors);
        return {
            error: JSON.stringify(errors[0].message)
        }
      }
      return {data};
    });
    // .catch((error) => {
    //   console.log(error);
    //   return { error: JSON.stringify(error[0].message) };
    // });
}
