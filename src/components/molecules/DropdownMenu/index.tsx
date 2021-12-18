import { GenericActionOrList } from '@/types/actions'
import * as Primitve from '@radix-ui/react-dropdown-menu'
import { Fragment, PropsWithChildren } from 'react'

import ActionItem from './ActionItem'

import styles from './styles.module.css'

export type ContentProps = Pick<
  Primitve.DropdownMenuRootContentProps,
  | 'align'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionTolerance'
  | 'side'
  | 'sideOffset'
>

export type Props = ContentProps & {
  actionGroups: GenericActionOrList[][]
}

const DropdownMenu = ({
  actionGroups,
  children,
  ...contentProps
}: PropsWithChildren<Props>) => {
  return (
    <Primitve.Root>
      <Primitve.Trigger asChild>{children}</Primitve.Trigger>
      <Primitve.Content
        align="start"
        className={styles.content}
        side="bottom"
        sideOffset={4}
        {...contentProps}
      >
        {actionGroups.map((group, groupIndex) => (
          <Fragment key={`group-${groupIndex}`}>
            <Primitve.Group>
              {group.map((action, actionIndex) => (
                <ActionItem key={`item-${actionIndex}`} action={action} />
              ))}
            </Primitve.Group>
            {groupIndex !== actionGroups.length - 1 && (
              <Primitve.Separator className={styles.separator} />
            )}
          </Fragment>
        ))}
      </Primitve.Content>
    </Primitve.Root>
  )
}

export default DropdownMenu
