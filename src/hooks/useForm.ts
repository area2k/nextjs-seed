import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Reducer, useCallback, useReducer } from 'react'
import {
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from 'react-hook-form'

export type FormError = {
  icon?: IconDefinition
  message: string
  status?: 'danger' | 'warning' | 'neutral'
}

export type FormErrorState = {
  [key: string]: FormError
}

export type SetFormErrorAction = {
  type: 'set'
  key: string
  error: FormError | null
}
export type ClearFormErrorsAction = { type: 'clear' }
export type FormErrorAction = SetFormErrorAction | ClearFormErrorsAction

export type FormErrorCallbacks = {
  clearFormErrors: () => void
  setFormError: (key: string, error: FormError) => void
}

const reducer: Reducer<FormErrorState, FormErrorAction> = (state, action) => {
  switch (action.type) {
    case 'set':
      if (action.error) {
        return { ...state, [action.key]: action.error }
      } else {
        const clone = { ...state }
        delete clone[action.key]

        return clone
      }
    case 'clear':
      return {}
    default:
      return state
  }
}

const useForm = <FV extends FieldValues = FieldValues>(
  props: UseFormProps<FV>
) => {
  const [formErrors, dispatch] = useReducer(reducer, {})
  const { setError, clearErrors, ...useFormResult } = useReactHookForm(props)

  const setFormError = useCallback(
    (key: string, error: FormError | null) =>
      dispatch({ type: 'set', key, error }),
    []
  )

  const clearFormErrors = useCallback(() => dispatch({ type: 'clear' }), [])

  return {
    ...useFormResult,
    formErrors,
    clearFormErrors,
    setFormError,
    clearFieldErrors: clearErrors,
    setFieldError: setError,
  }
}

export * from 'react-hook-form'

export default useForm
