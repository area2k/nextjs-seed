import cx from 'classnames'
import { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export type Variants = {
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export type Props = StyleProps & Variants

const SingleColumnLayout = ({
  children,
  className,
  size = 'md',
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <div
      {...rest}
      className={cx(className, styles.main, styles[`size-${size}`])}
    >
      <div style={{ gridArea: 'content' }}>{children}</div>
    </div>
  )
}

export default SingleColumnLayout
