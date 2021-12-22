import cx from 'classnames'
import { HTMLProps, PropsWithChildren } from 'react'

import styles from './styles.module.css'

export type Variants = {
  flipped?: boolean
}

export type Props = StyleProps & Variants

const PrimarySecondaryLayout = ({
  className,
  flipped,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <div
      {...rest}
      className={cx(className, styles.main, { [styles.flipped]: flipped })}
    />
  )
}

const Primary = ({ className, ...rest }: HTMLProps<HTMLDivElement>) => (
  <div {...rest} className={cx(className, styles.primary)} />
)
Primary.displayName = 'PrimarySecondaryLayout.Primary'

const Secondary = ({ className, ...rest }: HTMLProps<HTMLDivElement>) => (
  <div {...rest} className={cx(className, styles.secondary)} />
)
Secondary.displayName = 'PrimarySecondaryLayout.Secondary'

PrimarySecondaryLayout.Primary = Primary
PrimarySecondaryLayout.Secondary = Secondary

export default PrimarySecondaryLayout
