import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import { forwardRef } from 'react'

import Link, { Props as LinkProps } from '@/components/atoms/Link'

import getButtonClassNames, { Variants } from '@/styles/button'

export type ButtonProps = Omit<Variants, 'iconic' | 'hasPopup'> & {
  children?: never
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
}

export type Props = LinkProps & ButtonProps

const LinkButton = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      action,
      appearance,
      className,
      iconLeft,
      iconRight,
      size,
      status,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        {...props}
        action={action}
        className={cx(
          className,
          getButtonClassNames({
            appearance,
            size,
            status,
            iconic: !action.label && !!iconLeft,
          })
        )}
      >
        {iconLeft && <FontAwesomeIcon fixedWidth icon={iconLeft} />}
        {action.label}
        {iconRight && <FontAwesomeIcon fixedWidth icon={iconRight} />}
      </Link>
    )
  }
)

LinkButton.displayName = 'LinkButton'

export default LinkButton
