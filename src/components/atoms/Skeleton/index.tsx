import cx from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

import getClassNames from '@/styles/shimmer'

import { nTimes } from '@/util/array'

import styles from './styles.module.css'

export type Props = ComponentPropsWithoutRef<'div'>

const Action = ({ className, ...props }: Props) => (
  <div {...props} className={cx(className, getClassNames(), styles.action)} />
)

export type TextProps = Props & {
  kind?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small'
}

const Text = ({ className, kind = 'p', ...props }: TextProps) => (
  <div
    {...props}
    className={cx(
      className,
      getClassNames(),
      styles.text,
      styles[`kind-${kind}`]
    )}
  />
)

export type LinesProps = Props & {
  count: number
}

const Lines = ({ className, count, ...props }: LinesProps) => (
  <div className="flex flex-col">
    {nTimes(count, (n) => (
      <div
        {...props}
        className={cx(className, getClassNames(), styles.line, {
          [styles.trailing]: n === count - 1,
        })}
      />
    ))}
  </div>
)

const Skeleton = {
  Action,
  Lines,
  Text,
}

export default Skeleton
