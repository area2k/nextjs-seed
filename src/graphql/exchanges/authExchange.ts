import {
  authExchange as createAuthExchange,
  AuthConfig,
} from '@urql/exchange-auth'
import Cookies from 'js-cookie'
import { makeOperation } from 'urql'

import {
  RefreshDeviceMutation,
  RefreshDeviceMutationVariables,
} from '@/types/graphql'

import { logout } from '@/util/auth'
import { operationName } from '@/util/graphql'

import { RefreshDeviceDocument } from '..'

export type AuthContext = {
  accessToken: string
  refreshToken: string
}

const AUTH_ERROR_CODES = [
  'TOKEN_EXPIRED',
  'TOKEN_INVALID',
  'TOKEN_DECODE_ERROR',
]

const baseAuthConfig: Pick<
  AuthConfig<AuthContext>,
  'addAuthToOperation' | 'didAuthError'
> = {
  addAuthToOperation: ({ authState, operation }) => {
    console.log('addAuthToOperation', authState)

    if (
      !authState ||
      !authState.accessToken ||
      operationName(operation) === 'RefreshDevice'
    ) {
      return operation
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {}

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.accessToken,
        },
      },
    })
  },
  didAuthError: ({ error }) =>
    error.graphQLErrors.some((err) =>
      AUTH_ERROR_CODES.includes(err.extensions?.code)
    ),
}

const authExchange = createAuthExchange<AuthContext>({
  ...baseAuthConfig,
  getAuth: async ({ authState, mutate }) => {
    if (!authState) {
      const accessToken = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      console.log('getAuth', accessToken, refreshToken)

      if (!accessToken || !refreshToken) return null

      return { accessToken, refreshToken }
    }

    const result = await mutate<
      RefreshDeviceMutation,
      RefreshDeviceMutationVariables
    >(RefreshDeviceDocument, {
      refreshToken: authState.refreshToken,
    })

    if (
      result.data &&
      result.data.deviceRefreshToken.accessToken &&
      result.data.deviceRefreshToken.refreshToken
    ) {
      Cookies.set('accessToken', result.data.deviceRefreshToken.accessToken)
      Cookies.set('refreshToken', result.data.deviceRefreshToken.refreshToken)

      return {
        accessToken: result.data.deviceRefreshToken.accessToken,
        refreshToken: result.data.deviceRefreshToken.refreshToken,
      }
    }

    logout()

    return null
  },
})

export default authExchange
