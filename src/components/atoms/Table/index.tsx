import cx from 'classnames'
import { forwardRef, ForwardRefExoticComponent } from 'react'

import Body from './Body'
import Cell from './Cell'
import Head from './Head'
import Heading from './Heading'
import Row from './Row'

import styles from './styles.module.css'

type TableType = ForwardRefExoticComponent<Props> & {
  Body: typeof Body
  Cell: typeof Cell
  Head: typeof Head
  Heading: typeof Heading
  Row: typeof Row
}

export type Props = JSX.IntrinsicElements['table'] & {
  fixed?: boolean
}

// Display name is defined below, but ESLint does not recognize it
// eslint-disable-next-line react/display-name
const Table = forwardRef<HTMLTableElement, Props>(
  ({ className, fixed, ...rest }, ref) => {
    return (
      <table
        ref={ref}
        {...rest}
        className={cx(className, styles.table, { [styles.fixed]: fixed })}
      />
    )
  }
) as TableType

Table.Body = Body
Table.Cell = Cell
Table.Head = Head
Table.Heading = Heading
Table.Row = Row

Table.displayName = 'Table'

export default Table
