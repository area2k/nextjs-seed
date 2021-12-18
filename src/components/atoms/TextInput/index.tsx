import cx from 'classnames'
import { forwardRef, HTMLProps } from 'react'

import getClassNames from '@/styles/input'

export type Props = Omit<HTMLProps<HTMLInputElement>, 'type'> & {
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cx(className, getClassNames())}
        type={type}
      />
    )
  }
)

TextInput.displayName = 'TextInput'

export default TextInput
