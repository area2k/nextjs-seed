import { FC } from 'react'

import Authenticated from '@/components/layouts/Authenticated'

import AppFrame from '@/components/atoms/AppFrame'

const AppLayout: FC = ({ children }) => {
  return (
    <Authenticated>
      <AppFrame.ContentArea>{children}</AppFrame.ContentArea>
    </Authenticated>
  )
}

export default AppLayout
