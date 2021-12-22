import GraphQLProvider from '@/components/providers/GraphQLProvider'

const Unauthenticated = ({ children }: EmptyPropsWithChildren) => {
  return <GraphQLProvider>{children}</GraphQLProvider>
}

export default Unauthenticated
