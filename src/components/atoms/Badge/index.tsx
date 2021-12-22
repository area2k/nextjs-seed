import cx from 'classnames'
import { forwardRef } from 'react'

import styles from './styles.module.css'

export type Props = StyleProps & {
  label: string
  status?: 'neutral' | 'theme' | 'danger' | 'success' | 'warning'
}

const Badge = forwardRef<HTMLSpanElement, Props>(
  ({ className, status = 'neutral', label, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        {...rest}
        className={cx(className, styles.main, styles[`status-${status}`])}
      >
        {label}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
