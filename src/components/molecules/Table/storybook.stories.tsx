import { Story, Meta } from '@storybook/react'

import TableAtom from '@/components/atoms/Table'

import Badge from '@/components/atoms/Badge'
import Card from '@/components/molecules/Card'
import TableComponent, { Props } from '@/components/molecules/Table'

// import docs from './docs.mdx'

export const Table: Story<Props<any>> = (props) => (
  <Card title="Table">
    <TableComponent
      {...props}
      headings={[
        { label: 'Name', size: '40%' },
        { label: 'Email', size: '40%' },
        { label: 'Status', size: '20%' },
      ]}
      rows={[
        { name: 'Andrew Rempe', email: 'arempe@area2k.com', status: 1 },
        { name: 'Eric Ashman', email: 'eashman@area2k.com', status: 1 },
        { name: 'Bill Story', email: 'storywr@gmail.com', status: 2 },
      ]}
      renderRow={(row) => (
        <TableAtom.Row>
          <TableAtom.Cell>
            <p>{row.name}</p>
          </TableAtom.Cell>
          <TableAtom.Cell>
            <p>{row.email}</p>
          </TableAtom.Cell>
          <TableAtom.Cell>
            <Badge
              label={row.status === 1 ? 'Admin' : 'User'}
              status={row.status === 1 ? 'theme' : 'neutral'}
            />
          </TableAtom.Cell>
        </TableAtom.Row>
      )}
    />
  </Card>
)

export default {
  title: 'Components/Molecules/Table',
  component: TableComponent,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: 'light',
    },
    layout: 'none',
    //   docs: {
    //     page: docs,
    //   },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-12">
        <div className="flex-initial w-full max-w-[768px]">{Story()}</div>
      </div>
    ),
  ],
} as Meta
