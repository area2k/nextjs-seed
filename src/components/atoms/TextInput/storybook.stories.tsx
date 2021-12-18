import { Story, Meta } from '@storybook/react'

import TextInputComponent, { Props } from '@/components/atoms/TextInput'

// import docs from './docs.mdx'

export const TextInput: Story<Props> = (props) => (
  <TextInputComponent {...props} ref={undefined} />
)

export default {
  title: 'Components/Atoms/Text Input',
  component: TextInputComponent,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Input placeholder',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'calc(100vw - 32px)', maxWidth: '24rem' }}>
        {Story()}
      </div>
    ),
  ],
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
