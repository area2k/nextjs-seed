import cx from 'classnames'

import { StyleProps } from '@/types/styles'

import TableAtom from '@/components/atoms/Table'

import styles from './styles.module.css'

export type TableHeading = {
  label: string
  size: string
}

export type Props<T> = StyleProps & {
  fixed?: boolean
  headings?: TableHeading[]
  rows: T[]
  renderRow: (row: T, index: number, rows: T[]) => JSX.Element
}

const Table = <T extends any>({
  className,
  fixed = false,
  headings,
  rows,
  renderRow,
  ...rest
}: Props<T>) => {
  return (
    <div {...rest} className={cx(className, styles.main)}>
      <TableAtom fixed={fixed}>
        {headings && (
          <TableAtom.Head>
            <TableAtom.Row>
              {headings.map((heading, index) => (
                <TableAtom.Heading key={index} style={{ width: heading.size }}>
                  {heading.label}
                </TableAtom.Heading>
              ))}
            </TableAtom.Row>
          </TableAtom.Head>
        )}
        <TableAtom.Body>{rows.map(renderRow)}</TableAtom.Body>
      </TableAtom>
    </div>
  )
}

Table.Atom = TableAtom

export default Table
