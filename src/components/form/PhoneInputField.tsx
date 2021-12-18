import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

import FormElement from '@/components/atoms/FormElement'
import PhoneInput, {
  Props as PhoneInputProps,
} from '@/components/atoms/PhoneInput'

type Props<FV> = Omit<PhoneInputProps, 'value' | 'onChange'> & {
  control: NonNullable<UseControllerProps<FV>['control']>
  fieldId: UseControllerProps<FV>['name']
  label?: string
  rules?: UseControllerProps<FV>['rules']
}

const PhoneInputField = <FV extends FieldValues>({
  control,
  fieldId,
  label,
  rules,
  ...props
}: Props<FV>) => {
  const rulesWithValidation: UseControllerProps<FV>['rules'] = {
    ...(rules ?? {}),
    validate: (value) =>
      isPossiblePhoneNumber(value as string) ? true : 'Phone number is invalid',
  }

  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, rules: rulesWithValidation, name: fieldId })

  return (
    <FormElement
      error={error ? error.message : undefined}
      id={fieldId}
      label={label}
    >
      <PhoneInput {...props} {...field} aria-invalid={invalid} id={fieldId} />
    </FormElement>
  )
}

export default PhoneInputField
