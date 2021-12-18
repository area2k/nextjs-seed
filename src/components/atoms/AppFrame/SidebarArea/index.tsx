import { FC } from 'react'

import styles from './styles.module.css'

const SidebarArea: FC = ({ children }) => {
  return <aside className={styles.main}>{children}</aside>
}

SidebarArea.displayName = 'AppFrame.SidebarArea'

export default SidebarArea
