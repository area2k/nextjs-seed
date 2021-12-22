import { format as formatDate, formatISO } from 'date-fns'
import { forwardRef } from 'react'

import { FULL_DATETIME, parseAndFormat } from '@/util/date'

export type Props = StyleProps & {
  format?: string
  value: Date | string
}

const Time = forwardRef<HTMLTimeElement, Props>(
  ({ format = FULL_DATETIME, value, ...rest }, ref) => {
    return (
      <time
        ref={ref}
        {...rest}
        dateTime={typeof value === 'string' ? value : formatISO(value)}
      >
        {typeof value === 'string'
          ? parseAndFormat(value, format)
          : formatDate(value, format)}
      </time>
    )
  }
)

Time.displayName = 'Time'

export default Time
