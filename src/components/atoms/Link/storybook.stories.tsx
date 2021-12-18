import { Story, Meta } from '@storybook/react'

import LinkComponent, { Props } from '@/components/atoms/Link'

// import docs from './docs.mdx'

export const Link: Story<Props> = (props) => (
  <LinkComponent
    {...props}
    action={{ a11yLabel: 'A link that takes you somewhere', href: '/' }}
  >
    Click me to go somewhere
  </LinkComponent>
)

export default {
  title: 'Components/Atoms/Link',
  component: LinkComponent,
  parameters: {
    //   docs: {
    //     page: docs,
    //   },
  },
} as Meta
