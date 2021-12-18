import { PropsWithChildren, useMemo } from 'react'
import { createClient, Provider } from 'urql'

import { authenticatedOptions, unauthenticatedOptions } from '@/graphql/client'

export type Props = {
  authenticated?: boolean
}

const GraphQLProvider = ({
  authenticated = false,
  children,
}: PropsWithChildren<Props>) => {
  const client = useMemo(
    () =>
      createClient(
        authenticated ? authenticatedOptions : unauthenticatedOptions
      ),
    [authenticated]
  )

  return <Provider value={client}>{children}</Provider>
}

export default GraphQLProvider
