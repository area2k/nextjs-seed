import { CSSProperties, ReactNode } from 'react'

declare global {
  type EmptyProps = Record<string, never>
  type EmptyPropsWithChildren = { children?: ReactNode }

  type StyleProps = {
    className?: string
    style?: CSSProperties
  }

  interface IStyleProps {
    className?: string
    style?: CSSProperties
  }
}
