import * as Primitive from '@radix-ui/react-alert-dialog'
import { PropsWithChildren } from 'react'

import { CallbackAction } from '@/types/actions'

import Action from '@/components/molecules/Action'
import Card from '@/components/molecules/Card'

import { Variants as ButtonVariants } from '@/styles/button'
import getDialogClassNames, {
  Variants as DialogVariants,
} from '@/styles/dialog'
import getOverlayClassNames from '@/styles/overlay'

export type Props = DialogVariants & {
  cancelAction: CallbackAction
  confirmAction: CallbackAction
  confirmStatus?: ButtonVariants['status']
  description?: string
  isOpen: boolean
  title: string
}

const ConfirmDialog = ({
  cancelAction,
  children,
  confirmAction,
  confirmStatus = 'theme',
  description,
  isOpen,
  size = 'sm',
  title,
}: PropsWithChildren<Props>) => {
  return (
    <Primitive.Root open={isOpen}>
      <Primitive.Overlay className={getOverlayClassNames()} />
      <Primitive.Content
        aria-label={title}
        aria-describedby={description}
        className={getDialogClassNames({ size })}
      >
        <Card title={title}>
          {children}
          <Card.Footer>
            <Primitive.Cancel asChild>
              <Action action={cancelAction} appearance="outline" />
            </Primitive.Cancel>
            <Primitive.Action asChild>
              <Action action={confirmAction} status={confirmStatus} />
            </Primitive.Action>
          </Card.Footer>
        </Card>
      </Primitive.Content>
    </Primitive.Root>
  )
}

export default ConfirmDialog
