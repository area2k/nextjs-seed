import { PropsWithChildren } from 'react'

import GraphQLProvider from '@/components/providers/GraphQLProvider'

const Unauthenticated = ({ children }: PropsWithChildren<{}>) => {
  return <GraphQLProvider>{children}</GraphQLProvider>
}

export default Unauthenticated
