import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import getClassNames, { Variants } from '@/styles/button'

export type BaseProps = Omit<Variants, 'iconic'> & {
  a11yLabel: string
  children?: never
  iconLeft?: IconDefinition
  iconRight?: IconDefinition
  label?: string
}

export type Props = ComponentPropsWithoutRef<'button'> &
  BaseProps & {
    disabled?: boolean
    isLoading?: boolean
    loadingA11yLabel?: string
    loadingIcon?: IconDefinition
    loadingLabel?: string
    submit?: boolean
  }

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      a11yLabel,
      appearance,
      'aria-haspopup': ariaHasPopup,
      className,
      hasPopup,
      iconLeft,
      iconRight,
      isLoading,
      label,
      loadingA11yLabel,
      loadingIcon = faCircleNotch,
      loadingLabel,
      size,
      status,
      submit = false,
      ...props
    },
    ref
  ) => {
    const isIconic = isLoading ? !(label ?? loadingLabel) : !label && !!iconLeft

    return (
      <button
        ref={ref}
        {...props}
        aria-label={isLoading ? loadingA11yLabel ?? a11yLabel : a11yLabel}
        className={cx(
          className,
          getClassNames({
            appearance,
            size,
            status,
            hasPopup: !!ariaHasPopup || hasPopup,
            iconic: isIconic,
          })
        )}
        disabled={isLoading || props.disabled}
        type={submit ? 'submit' : 'button'}
      >
        {(isLoading || iconLeft) && (
          <FontAwesomeIcon
            fixedWidth
            spin={isLoading}
            icon={isLoading ? loadingIcon : iconLeft!}
          />
        )}
        {isLoading ? loadingLabel ?? label : label}
        {iconRight && <FontAwesomeIcon fixedWidth icon={iconRight} />}
        {(hasPopup || (!!ariaHasPopup && !isIconic)) && (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
