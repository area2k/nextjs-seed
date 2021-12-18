import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { forwardRef } from 'react'

import styles from './styles.module.css'

export type Props = {
  disabled?: boolean
  label: string
  onRemove?: () => void
}

const Tag = forwardRef<HTMLSpanElement, Props>(
  ({ disabled = false, label, onRemove }, ref) => {
    return (
      <span ref={ref} className={styles.main}>
        <span className={styles.text}>{label}</span>
        {!disabled && onRemove && (
          <button className={styles.close} onClick={onRemove}>
            <FontAwesomeIcon fixedWidth icon={faTimes} />
          </button>
        )}
      </span>
    )
  }
)

export default Tag
