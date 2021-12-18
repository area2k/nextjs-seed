import { useModal } from 'react-modal-hook'

import { CallbackAction } from '@/types/actions'

import Card from '@/components/molecules/Card'
import ConfirmDialogComponent, {
  Props,
} from '@/components/molecules/ConfirmDialog'

export type UseConfirmDialogOptions = Props & {
  content?: JSX.Element
  dependencies?: any[]
}

const useConfirmDialog = ({
  cancelAction,
  confirmAction,
  content,
  dependencies = [],
  description,
  ...rest
}: UseConfirmDialogOptions) => {
  const [showConfirmDialog, closeConfirmDialog] = useModal(() => {
    const mixedCancelAction: CallbackAction = {
      ...cancelAction,
      onAction: () => {
        cancelAction.onAction()
        closeConfirmDialog()
      },
    }

    const mixedConfirmAction: CallbackAction = {
      ...confirmAction,
      onAction: () => {
        confirmAction.onAction()
        closeConfirmDialog()
      },
    }

    return (
      <ConfirmDialogComponent
        {...rest}
        isOpen
        cancelAction={mixedCancelAction}
        confirmAction={mixedConfirmAction}
        description={description}
      >
        {content ? (
          content
        ) : (
          <Card.Section>
            <p>{description}</p>
          </Card.Section>
        )}
      </ConfirmDialogComponent>
    )
  }, dependencies)

  return showConfirmDialog
}

export default useConfirmDialog
