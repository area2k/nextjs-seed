import { devtoolsExchange } from '@urql/devtools'
import {
  ClientOptions,
  debugExchange,
  dedupExchange,
  fetchExchange,
} from 'urql'

import authExchange from './exchanges/authExchange'
import cacheExchange from './exchanges/cacheExchange'

export const authenticatedOptions: ClientOptions = {
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  exchanges: [
    devtoolsExchange,
    debugExchange,
    dedupExchange,
    cacheExchange,
    authExchange,
    fetchExchange,
  ],
}

export const unauthenticatedOptions: ClientOptions = {
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  exchanges: [
    devtoolsExchange,
    debugExchange,
    dedupExchange,
    cacheExchange,
    fetchExchange,
  ],
}

export type { AuthContext } from './exchanges/authExchange'
