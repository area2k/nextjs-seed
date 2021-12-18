import { Story, Meta } from '@storybook/react'
import { useState } from 'react'

import PhoneInputComponent, { Props } from '@/components/atoms/PhoneInput'

// import docs from './docs.mdx'

export const PhoneInput: Story<Props> = (props) => {
  const [value, setValue] = useState<string | undefined>(undefined)

  return <PhoneInputComponent {...props} value={value} onChange={setValue} />
}

export default {
  title: 'Components/Atoms/Phone Input',
  component: PhoneInputComponent,
  argTypes: {
    country: {
      control: { type: 'text' },
      defaultValue: 'US',
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Phone number',
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
