import cx from 'classnames'

import styles from './styles.module.css'

export type Variants = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const getClassNames = ({ size = 'md' }: Variants) =>
  cx(styles.dialog, styles[`size-${size}`])

export default getClassNames
