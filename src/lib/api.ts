import { WP_GRAPHQL_URL, WP_AUTH_USER, WP_AUTH_PASSWORD } from '$env/static/private';
import type { CardsResponse } from './types';

const GET_CARDS = `
  query GetCards {
    posts {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (WP_AUTH_USER && WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(`${WP_AUTH_USER}:${WP_AUTH_PASSWORD}`).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  return headers;
}

/**
 * Generic function to execute GraphQL queries
 * @param query - The GraphQL query string
 * @param variables - Variables to pass to the query (optional)
 * @returns The GraphQL response data
 */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`GraphQL error: ${errors[0]?.message || 'Unknown error'}`);
  }

  return data as T;
}

/**
 * Fetch all cards from WordPress
 */
export async function getCards(): Promise<CardsResponse> {
  return fetchGraphQL<CardsResponse>(GET_CARDS);
}
