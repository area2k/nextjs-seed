import { PropsWithChildren } from 'react'

import { GenericActionOrList } from '@/types/actions'

import Action from '@/components/molecules/Action'

import styles from './styles.module.css'

export type Props = PropsWithChildren<{
  actions?: GenericActionOrList[]
  subtitle?: string
  title?: string
}>

const Header = ({ actions, children, subtitle, title }: Props) => {
  return (
    <div className={styles.header}>
      {title && (
        <div className="flex-initial w-full">
          <h3 className="font-medium">{title}</h3>
          {subtitle && <small className="text-lo">{subtitle}</small>}
        </div>
      )}
      {actions && (
        <div className="flex justify-end gap-1">
          {actions.map((action, idx) => (
            <Action
              key={idx}
              action={action}
              appearance="plain"
              listOptions={{
                align: 'end',
              }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  )
}

export default Header
