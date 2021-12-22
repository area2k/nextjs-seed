import { faServer, faWifi } from '@fortawesome/free-solid-svg-icons'
import { Operation, OperationResult } from 'urql'

import { FormError } from '@/hooks/useForm'

export type SuccessfulOperationResult<TData, TVariables> = PickRequired<
  OperationResult<TData, TVariables>,
  'data'
> & { error: undefined }

export type IsMutatationSuccessfulOptions = {
  onError?: (key: string, error: FormError) => void
}

export const isMutatationSuccessful = <TData = any, TVariables = any>(
  result: OperationResult<TData, TVariables>,
  options: IsMutatationSuccessfulOptions
): result is SuccessfulOperationResult<TData, TVariables> => {
  if (result.error) {
    if (options.onError) {
      const { networkError } = result.error

      if (networkError) {
        options.onError('networkError', {
          icon: faWifi,
          message: 'A network error has occurred.',
          status: 'danger',
        })
      } else {
        const graphQLError = result.error.graphQLErrors[0]

        if (graphQLError.extensions?.code === 'SERVER_ERROR') {
          options.onError('serverError', {
            icon: faServer,
            message: 'A server error has occurred.',
            status: 'danger',
          })
        }
      }
    }
    return false
  }

  if (!result.data) {
    if (options.onError) {
      options.onError('unknownError', {
        message: 'Unable to load response.',
        status: 'danger',
      })
    }
    return false
  }

  return true
}

export const operationName = (operation: Operation<any, any>) => {
  const def = operation.query.definitions[0]

  if (!def || def.kind !== 'OperationDefinition' || !def.name) return ''

  return def.name.value
}
