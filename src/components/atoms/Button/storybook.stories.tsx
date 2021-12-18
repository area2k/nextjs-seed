import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Story, Meta } from '@storybook/react'

import ButtonComponent, { Props } from '@/components/atoms/Button'

// import docs from './docs.mdx'

export const Button: Story<Props> = (props) => <ButtonComponent {...props} />

export default {
  title: 'Components/Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    a11yLabel: {
      control: { type: 'text' },
      defaultValue: 'Click this button',
    },
    appearance: {
      control: {
        type: 'select',
        options: ['primary', 'outline', 'clear', 'plain'],
      },
      defaultValue: 'primary',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    hasPopup: {
      control: { type: 'boolean' },
      defaultValue: false,
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
    isLoading: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Click me',
    },
    loadingLabel: {
      control: { type: 'text' },
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
