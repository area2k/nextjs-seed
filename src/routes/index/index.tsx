import Head from 'next/head'

import Card from '@/components/molecules/Card'
import SingleColumnLayout from '@/components/atoms/SingleColumnLayout'
import Unauthenticated from '@/components/layouts/Unauthenticated'

import { BUILD_NAME } from '@/util/constants'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>App / Dashboard</title>
      </Head>
      <SingleColumnLayout>
        <div className="pt-8 laptop:pt-24">
          <Card
            title="Dashboard"
            primaryFooterAction={{
              a11yLabel: 'Click to destroy',
              label: 'Boom',
              onAction: () => {
                throw 'oops!'
              },
            }}
          >
            <Card.Section>
              <p>Hello, world!</p>
            </Card.Section>
          </Card>
        </div>
        <div className="mt-4">
          <small>{BUILD_NAME}</small>
        </div>
      </SingleColumnLayout>
    </>
  )
}

Dashboard.applyPersistedLayout = (page: JSX.Element) => {
  return <Unauthenticated>{page}</Unauthenticated>
}

export default Dashboard
