import cx from 'classnames'
import { PropsWithChildren } from 'react'

import { GenericActionOrList } from '@/types/actions'

import Action from '@/components/molecules/Action'

import styles from './styles.module.css'

export type Props = PropsWithChildren<{
  actions?: GenericActionOrList[]
  flush?: boolean
  subdued?: boolean
  title?: string
}>

const Section = ({ actions, children, flush, subdued, title }: Props) => {
  const hasTitleBar = title || (actions && actions.length > 0)

  return (
    <div
      className={cx(styles.section, {
        [styles.flush]: flush,
        [styles.subdued]: subdued,
      })}
    >
      {hasTitleBar && (
        <div className="flex gap-2 justify-between pb-3">
          <div className="flex-initial w-full">
            {title && (
              <small className="font-medium uppercase tracking-wide">
                {title}
              </small>
            )}
          </div>
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
        </div>
      )}
      {children}
    </div>
  )
}

export default Section
