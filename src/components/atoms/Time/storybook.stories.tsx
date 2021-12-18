import { Story, Meta } from '@storybook/react'

import TimeComponent, { Props } from '@/components/atoms/Time'

import { FULL_DATETIME } from '@/util/date'

// import docs from './docs.mdx'

export const Time: Story<Props> = ({ format }) => (
  <TimeComponent
    className="text-sm"
    format={format === '' ? FULL_DATETIME : format}
    value={new Date()}
  />
)

export default {
  title: 'Components/Atoms/Time',
  component: TimeComponent,
  argTypes: {
    format: {
      control: { type: 'text' },
      defaultValue: FULL_DATETIME,
    },
  },
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
