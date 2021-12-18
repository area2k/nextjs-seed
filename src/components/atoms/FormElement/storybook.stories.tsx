import { Story, Meta } from '@storybook/react'

import FormElementComponent, { Props } from '@/components/atoms/FormElement'
import TextInput from '@/components/atoms/TextInput'

// import docs from './docs.mdx'

export const FormElement: Story<Props> = (props) => (
  <div style={{ width: 'calc(100vw - 32px)', maxWidth: '24rem' }}>
    <FormElementComponent {...props}>
      <TextInput placeholder="Input placeholder" />
    </FormElementComponent>
  </div>
)

export default {
  title: 'Components/Atoms/Form Element',
  component: FormElementComponent,
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: 'Form label',
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
