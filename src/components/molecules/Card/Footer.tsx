import cx from 'classnames'
import { PropsWithChildren } from 'react'

import { GenericActionOrList } from '@/types/actions'

import Action from '@/components/molecules/Action'

import styles from './styles.module.css'

export type Props = PropsWithChildren<{
  justify?: 'start' | 'end'
  primaryAction?: GenericActionOrList
  secondaryActions?: GenericActionOrList[]
}>

const Footer = ({
  children,
  justify = 'end',
  primaryAction,
  secondaryActions,
}: Props) => {
  return (
    <div
      className={cx(
        styles.footer,
        justify === 'end' ? 'justify-end' : 'justify-start'
      )}
    >
      {children}
      {secondaryActions && (
        <div className="flex justify-end gap-2">
          {secondaryActions.map((action, idx) => (
            <Action key={idx} action={action} appearance="outline" />
          ))}
        </div>
      )}
      {primaryAction && <Action action={primaryAction} appearance="primary" />}
    </div>
  )
}

Footer.displayName = 'Card.Footer'

export default Footer
