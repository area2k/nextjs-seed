import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Story, Meta } from '@storybook/react'

import LinkButtonComponent, { Props } from '@/components/molecules/LinkButton'

// import docs from './docs.mdx'

export const LinkButton: Story<Props> = (props) => (
  <LinkButtonComponent
    {...props}
    action={{
      a11yLabel: 'Go to the destination',
      href: '/',
      label: 'Go to page',
    }}
  />
)

export default {
  title: 'Components/Molecules/Link Button',
  component: LinkButtonComponent,
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: ['primary', 'outline', 'clear', 'plain'],
      },
      defaultValue: 'primary',
    },
    iconLeft: {
      control: { type: 'boolean' },
      defaultValue: false,
      mapping: { true: faCheck, false: undefined },
    },
    iconRight: {
      control: { type: 'boolean' },
      defaultValue: false,
      mapping: { true: faArrowRight, false: undefined },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      defaultValue: 'md',
    },
    status: {
      control: {
        type: 'select',
        options: ['theme', 'success', 'danger'],
      },
      defaultValue: 'theme',
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
