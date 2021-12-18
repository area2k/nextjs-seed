import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'

import Button from '@/components/atoms/Button'
import DropdownMenuComponent, {
  Props,
} from '@/components/molecules/DropdownMenu'

// import docs from './docs.mdx'

export const DropdownMenu: Story<Props> = (props) => (
  <DropdownMenuComponent
    {...props}
    actionGroups={[
      [
        {
          a11yLabel: 'Callback action',
          label: 'Callback action',
          onAction: action('first'),
        },
        {
          a11yLabel: 'Link action',
          label: 'Link action',
          href: '/',
        },
      ],
      [
        {
          a11yLabel: 'External link',
          label: 'External link',
          href: 'https://google.com',
          external: true,
        },
      ],
    ]}
  >
    <Button
      a11yLabel="Click this button"
      label="Click me"
      onClick={action('Clicked')}
    />
  </DropdownMenuComponent>
)

export default {
  title: 'Components/Atoms/Dropdown Menu',
  component: DropdownMenuComponent,
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['center', 'end', 'start'],
      defaultValue: 'start',
    },
    side: {
      control: { type: 'select' },
      options: ['bottom', 'left', 'right', 'top'],
      defaultValue: 'bottom',
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
