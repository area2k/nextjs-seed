import cx from 'classnames'
import { PropsWithChildren } from 'react'

import NavbarArea from './NavbarArea'
import SidebarArea from './SidebarArea'

import styles from './styles.module.css'

export type Props = {
  withSidebar?: boolean
}

const AppFrame = ({
  children,
  withSidebar = false,
}: PropsWithChildren<Props>) => {
  return (
    <article
      className={cx(styles.main, { [styles['with-sidebar']]: withSidebar })}
    >
      {children}
    </article>
  )
}

const ContentArea = ({ children }: EmptyPropsWithChildren) => (
  <section style={{ gridArea: 'content' }}>{children}</section>
)

const FooterArea = ({ children }: EmptyPropsWithChildren) => (
  <footer style={{ gridArea: 'footer' }}>{children}</footer>
)

AppFrame.ContentArea = ContentArea
ContentArea.displayName = 'AppFrame.ContentArea'

AppFrame.FooterArea = FooterArea
FooterArea.displayName = 'AppFrame.FooterArea'

AppFrame.NavbarArea = NavbarArea
NavbarArea.displayName = 'AppFrame.NavbarArea'

AppFrame.SidebarArea = SidebarArea
SidebarArea.displayName = 'AppFrame.SidebarArea'

export default AppFrame
