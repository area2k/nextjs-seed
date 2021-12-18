import { Story, Meta } from '@storybook/react'

import AlertComponent, { Props } from '@/components/atoms/Alert'

// import docs from './docs.mdx'

export const Alert: Story<Props> = (props) => <AlertComponent {...props} />

export default {
  title: 'Components/Atoms/Alert',
  component: AlertComponent,
  argTypes: {
    message: {
      control: { type: 'text' },
      defaultValue: 'Something needs the users attention!',
    },
    status: {
      control: {
        type: 'select',
        options: ['neutral', 'danger', 'success', 'warning'],
      },
      defaultValue: 'neutral',
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
