import { PropsWithChildren } from 'react'

import GraphQLProvider from '@/components/providers/GraphQLProvider'

import Frame, { Props as FrameProps } from './Frame'

export type Props = FrameProps

const Authenticated = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <GraphQLProvider authenticated>
      <Frame {...props}>{children}</Frame>
    </GraphQLProvider>
  )
}

export default Authenticated
