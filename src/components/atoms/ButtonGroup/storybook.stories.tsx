import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'

import Button from '@/components/atoms/Button'
import ButtonGroupComponent from '@/components/atoms/ButtonGroup'

// import docs from './docs.mdx'

export const ButtonGroup: Story = () => (
  <ButtonGroupComponent>
    <Button
      a11yLabel="Click this button"
      appearance="outline"
      label="Click me"
      onClick={action('Click me')}
    />
    <Button
      a11yLabel="No, click this button"
      appearance="outline"
      label="No, click me"
      status="danger"
      onClick={action('No, click me')}
    />
  </ButtonGroupComponent>
)

export default {
  title: 'Components/Atoms/Button Group',
  component: ButtonGroupComponent,
  argTypes: {},
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
