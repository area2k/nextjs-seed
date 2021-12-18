import { Reducer, useCallback, useReducer, useState } from 'react'

import useDebouncedValue from './useDebouncedValue'

const useFilters = <F extends Record<any, any>>(initialState: F) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  const [filters, dispatch] = useReducer<Reducer<F, FilterAction<F>>>(
    filterReducer,
    initialState
  )

  const clearAll = useCallback(
    () => dispatch({ type: FilterActionType.CLEAR_ALL, initialState }),
    [initialState]
  )

  const clearFilter = useCallback(
    (key: keyof F) => dispatch({ type: FilterActionType.CLEAR, key }),
    []
  )

  const setFilter = useCallback(
    <K extends keyof F>(key: K, value: NonNullable<F[K]>) =>
      dispatch({ type: FilterActionType.SET, key, value }),
    []
  )

  return {
    debouncedQuery,
    filters,
    query,
    clearAll,
    clearFilter,
    setFilter,
    setQuery,
  }
}

export enum FilterActionType {
  CLEAR = 'clear',
  CLEAR_ALL = 'clear_all',
  SET = 'set',
}

type ClearFilterAction<T extends Record<any, any>> = {
  type: FilterActionType.CLEAR
  key: keyof T
}
type ClearAllFilterAction<T extends Record<any, any>> = {
  type: FilterActionType.CLEAR_ALL
  initialState: T
}
type SetFilterAction<T extends Record<any, any>, K = keyof T> = {
  type: FilterActionType.SET
  key: K
  value: NonNullable<T[K]>
}
export type FilterAction<T> =
  | ClearAllFilterAction<T>
  | ClearFilterAction<T>
  | SetFilterAction<T>

export const filterReducer = <T extends Record<any, any>>(
  state: T,
  action: FilterAction<T>
): T => {
  switch (action.type) {
    case FilterActionType.CLEAR:
      const nextState = { ...state }
      delete nextState[action.key]

      return nextState
    case FilterActionType.CLEAR_ALL:
      return action.initialState
    case FilterActionType.SET:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}

export default useFilters
