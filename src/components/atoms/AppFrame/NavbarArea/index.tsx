import cx from 'classnames'
import { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export type Props = {
  withSidebar?: boolean
}

const NavbarArea = ({
  children,
  withSidebar = false,
}: PropsWithChildren<Props>) => {
  return (
    <nav className={cx(styles.main, { [styles['with-sidebar']]: withSidebar })}>
      {children}
    </nav>
  )
}

NavbarArea.displayName = 'AppFrame.NavbarArea'

export default NavbarArea
