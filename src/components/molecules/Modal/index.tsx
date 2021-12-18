import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as Primitive from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'

import Button from '@/components/atoms/Button'
import Card from '@/components/molecules/Card'

import getDialogClassNames, {
  Variants as DialogVariants,
} from '@/styles/dialog'
import getOverlayClassNames from '@/styles/overlay'

export type Props = DialogVariants & {
  disableClickout?: boolean
  isOpen: boolean
  title: string
  onRequestClose: () => void
}

const Modal = ({
  children,
  disableClickout = false,
  isOpen,
  size = 'md',
  title,
  onRequestClose,
}: PropsWithChildren<Props>) => {
  return (
    <Primitive.Root open={isOpen}>
      <Primitive.Overlay className={getOverlayClassNames()} />
      <Primitive.Content
        aria-label={title}
        className={getDialogClassNames({ size })}
        onEscapeKeyDown={onRequestClose}
        onPointerDownOutside={disableClickout ? undefined : onRequestClose}
      >
        <Card>
          <Card.Header title={title}>
            <div>
              <Primitive.Close asChild>
                <Button
                  a11yLabel="Close dialog"
                  appearance="clear"
                  iconLeft={faTimes}
                  size="md"
                  onClick={onRequestClose}
                />
              </Primitive.Close>
            </div>
          </Card.Header>
          {children}
        </Card>
      </Primitive.Content>
    </Primitive.Root>
  )
}

export default Modal
