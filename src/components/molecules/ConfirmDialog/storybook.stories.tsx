import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'

import useConfirmDialog from '@/hooks/useConfirmDialog'

import Button from '@/components/atoms/Button'
import ConfirmDialogComponent, {
  Props,
} from '@/components/molecules/ConfirmDialog'

// import docs from './docs.mdx'

export const ConfirmDialog: Story<Props> = (props) => {
  const showConfirmDialog = useConfirmDialog({
    ...props,
    cancelAction: {
      a11yLabel: 'Cancel the dangerous action',
      label: 'Go back',
      onAction: action('Cancel'),
    },
    confirmAction: {
      a11yLabel: 'Confirm the dangerous action',
      label: 'Keep going',
      onAction: action('Confirm'),
    },
    dependencies: [props],
  })

  return (
    <Button
      a11yLabel="Do something dangerous"
      label="Dangerous"
      status="danger"
      onClick={showConfirmDialog}
    />
  )
}

export default {
  title: 'Components/Molecules/Confirm Dialog',
  component: ConfirmDialogComponent,
  argTypes: {
    confirmStatus: {
      control: {
        type: 'select',
        options: ['theme', 'success', 'danger'],
      },
      defaultValue: 'danger',
    },
    description: {
      control: { type: 'text' },
      defaultValue: "What you're about to do is pretty dangerous.",
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Are you sure?',
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
