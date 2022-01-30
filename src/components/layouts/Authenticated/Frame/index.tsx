import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

import AppFrame from '@/components/atoms/AppFrame'

// import { useGetCurrentCustomerQuery } from '@/graphql'

export type Props = {
  hideFraming?: boolean
}

const Frame = ({ hideFraming = false, children }: PropsWithChildren<Props>) => {
  const router = useRouter()

  // const [result] = useGetCurrentCustomerQuery()

  // useEffect(() => {
  //   if (
  //     result.error &&
  //     result.error.graphQLErrors.length > 0 &&
  //     result.error.graphQLErrors[0].extensions?.code === 'AUTHORIZATION_FAILED'
  //   ) {
  //     router.replace({ pathname: '/login', query: { to: router.pathname } })
  //   }
  // }, [result.error])

  // const customer = result.data?.currentCustomer

  if (hideFraming) {
    return children as JSX.Element
  }

  return (
    <AppFrame>
      {children}
      <AppFrame.FooterArea>
        <div className="p-8 text-center">
          <small>
            &copy; Area2K &mdash; {process.env.BUILD_ID} (
            {process.env.BUILD_ENV})
          </small>
        </div>
      </AppFrame.FooterArea>
    </AppFrame>
  )
}

export default Frame
