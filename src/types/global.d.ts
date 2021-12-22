import { CSSProperties, ReactNode } from 'react'

declare global {
  type PickRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

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
