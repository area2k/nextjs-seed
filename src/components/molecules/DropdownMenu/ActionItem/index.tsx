import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Primitve from '@radix-ui/react-dropdown-menu'
import cx from 'classnames'

import { GenericActionOrList } from '@/types/actions'

import Link from '@/components/atoms/Link'

import { isActionList, isCallbackAction, isLinkAction } from '@/util/action'

import styles from './styles.module.css'

export type Props = {
  action: GenericActionOrList
}

const ActionItem = ({ action }: Props) => {
  const commonProps = {
    'aria-label': action.a11yLabel,
    className: cx(styles.main, { [styles.dangerous]: action.dangerous }),
    textValue: action.label,
  }

  if (isCallbackAction(action)) {
    return (
      <Primitve.Item
        {...commonProps}
        disabled={action.disabled}
        onSelect={action.onAction}
      >
        {action.icon && (
          <span className={styles.right}>
            <FontAwesomeIcon fixedWidth icon={action.icon} />
          </span>
        )}
        {action.label ?? action.a11yLabel}
      </Primitve.Item>
    )
  } else if (isLinkAction(action)) {
    return (
      <Primitve.Item asChild {...commonProps}>
        <Link action={action}>
          {action.label ?? action.a11yLabel}
          {action.external && (
            <span className={styles.right}>
              <FontAwesomeIcon fixedWidth icon={faExternalLinkAlt} />
            </span>
          )}
        </Link>
      </Primitve.Item>
    )
  } else {
    return null
  }
}

export default ActionItem
