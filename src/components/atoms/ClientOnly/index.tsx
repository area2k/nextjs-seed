import dynamic from 'next/dynamic'

const ClientOnly = ({ children }: EmptyPropsWithChildren) => <>{children}</>

export default dynamic(() => Promise.resolve(ClientOnly), { ssr: false })
