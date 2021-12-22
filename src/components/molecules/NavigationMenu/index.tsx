import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
// import Link from 'next/link'

import { LinkAction } from '@/types/actions'

import Link from '@/components/atoms/Link'

import styles from './styles.module.css'

export type NavigationItem = PickRequired<LinkAction, 'icon' | 'label'> & {
  isActive?: boolean
}
export type NavigationGroup = { items: NavigationItem[]; title?: string }

export type Props = StyleProps & {
  groups: NavigationGroup[]
}

const NavigationMenu = ({ groups }: Props) => {
  return (
    <nav className={styles.main}>
      {groups.map((group, groupIndex) => (
        <div key={`group-${groupIndex}`} className={styles.group}>
          {group.title && <div className={styles.title}>{group.title}</div>}
          {group.items.map((item, itemIndex) => (
            <Link
              key={`item-${groupIndex}-${itemIndex}`}
              action={item}
              className={cx(styles.item, { [styles.active]: item.isActive })}
            >
              <span className={styles.icon}>
                <FontAwesomeIcon fixedWidth icon={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}

export default NavigationMenu
