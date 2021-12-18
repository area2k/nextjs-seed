import cx from 'classnames'
import { FC } from 'react'

import styles from './styles.module.css'

export type Props = {
  withSidebar?: boolean
}

const NavbarArea: FC<Props> = ({ children, withSidebar = false }) => {
  return (
    <nav className={cx(styles.main, { [styles['with-sidebar']]: withSidebar })}>
      {children}
    </nav>
  )
}

NavbarArea.displayName = 'AppFrame.NavbarArea'

export default NavbarArea
