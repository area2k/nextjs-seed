import NextLink, { LinkProps } from 'next/link'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { LinkAction } from '@/types/actions'

type NextLinkProps = Omit<LinkProps, 'href' | 'replace'>

export type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  action: LinkAction
  nextProps?: NextLinkProps
}

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ action, nextProps, ...props }, ref) => {
    const anchorProps = {
      'aria-label': action.a11yLabel,
      id: action.id,
      ...props,
    }

    if (action.external) {
      return (
        <a
          ref={ref}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
          href={typeof action.href === 'string' ? action.href : undefined}
        />
      )
    }

    return (
      <NextLink {...nextProps} href={action.href} replace={action.replace}>
        <a ref={ref} {...anchorProps} />
      </NextLink>
    )
  }
)

export default Link
