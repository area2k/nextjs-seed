import cx from 'classnames'
import { FC } from 'react'

import NavbarArea, { Props as NavbarAreaProps } from './NavbarArea'
import SidebarArea from './SidebarArea'

import styles from './styles.module.css'

export type Props = {
  withSidebar?: boolean
}

export type AppFrameType = FC<Props> & {
  ContentArea: FC
  FooterArea: FC
  NavbarArea: FC<NavbarAreaProps>
  SidebarArea: FC
}

const AppFrame: FC<Props> = ({ children, withSidebar = false }) => {
  return (
    <article
      className={cx(styles.main, { [styles['with-sidebar']]: withSidebar })}
    >
      {children}
    </article>
  )
}

const ContentArea: FC = ({ children }) => (
  <section style={{ gridArea: 'content' }}>{children}</section>
)

const FooterArea: FC = ({ children }) => (
  <footer style={{ gridArea: 'footer' }}>{children}</footer>
)

// @ts-ignore
AppFrame.ContentArea = ContentArea
// @ts-ignore
AppFrame.FooterArea = FooterArea
// @ts-ignore
AppFrame.NavbarArea = NavbarArea
// @ts-ignore
AppFrame.SidebarArea = SidebarArea

export default AppFrame as AppFrameType
