import { Story, Meta } from '@storybook/react'

import Card from '@/components/molecules/Card'
import LoadingAreaComponent, { Props } from '@/components/molecules/LoadingArea'

// import docs from './docs.mdx'

export const LoadingArea: Story<Props> = (props) => (
  <Card title="Featured content">
    <div className="w-full">
      <LoadingAreaComponent {...props} />
    </div>
  </Card>
)

export default {
  title: 'Components/Molecules/Loading Area',
  component: LoadingAreaComponent,
  parameters: {
    backgrounds: {
      default: 'light',
    },
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
