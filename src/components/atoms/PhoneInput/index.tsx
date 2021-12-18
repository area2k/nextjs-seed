import cx from 'classnames'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import ReactPhoneNumberInput from 'react-phone-number-input/input'

import { StyleProps } from '@/types/styles'

import getClassNames from '@/styles/input'

export type Props = Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> &
  StyleProps & {
    value?: string
    onChange: (nextValue: string) => void
  }

const PhoneInput = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <ReactPhoneNumberInput
        {...props}
        className={cx(className, getClassNames())}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
