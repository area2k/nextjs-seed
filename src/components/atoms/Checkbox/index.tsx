import * as Primitive from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'

import styles from './styles.module.css'

export type Props = {
  checked: boolean
  id: string
  label?: string
  required?: boolean
  onChange: (newChecked: boolean) => void
}

const Checkbox = forwardRef<HTMLButtonElement, Props>(
  ({ checked, id, label, required, onChange }, ref) => {
    return (
      <div className={styles.root}>
        <Primitive.Root
          ref={ref}
          checked={checked}
          className={styles.box}
          id={id}
          required={required}
          onCheckedChange={onChange}
        >
          <Primitive.Indicator className={styles.indicator}>
            ✓
          </Primitive.Indicator>
        </Primitive.Root>
        {label && label !== '' && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
