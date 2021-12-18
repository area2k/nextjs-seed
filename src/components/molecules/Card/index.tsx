import cx from 'classnames'
import { forwardRef, ForwardRefExoticComponent, PropsWithChildren } from 'react'

import { StyleProps } from '@/types/styles'

import Footer, { Props as FooterProps } from './Footer'
import Header, { Props as HeaderProps } from './Header'
import Section from './Section'

import styles from './styles.module.css'

export type Props = PropsWithChildren<
  StyleProps & {
    actions?: HeaderProps['actions']
    extraRounded?: boolean
    id?: string
    primaryFooterAction?: FooterProps['primaryAction']
    secondaryFooterActions?: FooterProps['secondaryActions']
    sectioned?: boolean
    subtitle?: HeaderProps['subtitle']
    title?: HeaderProps['title']
  }
>

type CardType = ForwardRefExoticComponent<Props> & {
  Footer: typeof Footer
  Header: typeof Header
  Section: typeof Section
}

const Card = forwardRef<HTMLDivElement, Props>(
  (
    {
      actions,
      children,
      className,
      extraRounded = false,
      id,
      primaryFooterAction,
      secondaryFooterActions,
      sectioned,
      style,
      subtitle,
      title,
    },
    ref
  ) => {
    const hasHeader = subtitle || title || (actions && actions.length > 0)
    const hasFooter =
      primaryFooterAction ||
      (secondaryFooterActions && secondaryFooterActions.length > 0)

    return (
      <div
        ref={ref}
        className={cx(className, styles.main, {
          [styles['extra-rounded']]: extraRounded,
        })}
        id={id}
        style={style}
      >
        {hasHeader && (
          <Header actions={actions} subtitle={subtitle} title={title} />
        )}
        {sectioned ? <Section>{children}</Section> : children}
        {hasFooter && (
          <Footer
            primaryAction={primaryFooterAction}
            secondaryActions={secondaryFooterActions}
          />
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

// @ts-ignore
Card.Footer = Footer
// @ts-ignore
Card.Header = Header
// @ts-ignore
Card.Section = Section

export default Card as CardType
