import cx from 'classnames'

import styles from './styles.module.css'

export type Variants = {
  appearance?: 'primary' | 'outline' | 'clear' | 'plain'
  hasPopup?: boolean
  iconic?: boolean
  size?: 'sm' | 'md' | 'lg'
  status?: 'theme' | 'success' | 'danger'
}

const getClassNames = ({
  appearance = 'primary',
  hasPopup = false,
  iconic = false,
  size = 'md',
  status = 'theme',
}: Variants) =>
  cx(
    styles.button,
    styles[`appearance-${appearance}`],
    styles[`status-${status}`],
    styles[`size-${size}`],
    {
      [styles.hasPopup]: !iconic && hasPopup,
      [styles.iconic]: iconic,
    }
  )

export default getClassNames
