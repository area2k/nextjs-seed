import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { useCallback } from 'react'

import FormElement from '@/components/atoms/FormElement'
import Autocomplete, {
  Props as AutocompleteProps,
} from '@/components/molecules/Autocomplete'

type InputProps<T> = Omit<
  AutocompleteProps<T>,
  'id' | 'selectedItem' | 'onSelectedItemChange'
>

type Props<FV> = InputProps<FV> & {
  control: NonNullable<UseControllerProps<FV>['control']>
  fieldId: UseControllerProps<FV>['name']
  label?: string
  rules?: UseControllerProps<FV>['rules']
}

const AutocompleteField = <FV extends FieldValues>({
  control,
  fieldId,
  label,
  rules,
  ...props
}: Props<FV>) => {
  const {
    field: { value, onChange, ...field },
    fieldState: { invalid, error },
  } = useController({ control, rules, name: fieldId })

  const handleSelectedItemChange = useCallback(
    ({ selectedItem }) => onChange(selectedItem),
    [onChange]
  )

  return (
    <FormElement
      error={error ? error.message : undefined}
      id={fieldId}
      label={label}
      labelId={`${fieldId}-label`}
    >
      <Autocomplete
        {...props}
        {...field}
        aria-invalid={invalid}
        id={fieldId}
        selectedItem={value}
        onSelectedItemChange={handleSelectedItemChange}
      />
    </FormElement>
  )
}

export default AutocompleteField
