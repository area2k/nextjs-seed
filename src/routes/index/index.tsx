import Head from 'next/head'

import Card from '@/components/molecules/Card'
import SingleColumnLayout from '@/components/atoms/SingleColumnLayout'
import Unauthenticated from '@/components/layouts/Unauthenticated'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>App / Dashboard</title>
      </Head>
      <SingleColumnLayout>
        <div className="py-8 laptop:py-24">
          <Card title="Dashboard">
            <Card.Section>
              <p>Hello, world!</p>
            </Card.Section>
          </Card>
        </div>
      </SingleColumnLayout>
    </>
  )
}

Dashboard.applyPersistedLayout = (page: JSX.Element) => {
  return <Unauthenticated>{page}</Unauthenticated>
}

export default Dashboard
