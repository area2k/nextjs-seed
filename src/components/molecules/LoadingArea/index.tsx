import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

import AspectRatio from '@/components/atoms/AspectRatio'

import styles from './styles.module.css'

export type Props = StyleProps & {
  icon?: IconDefinition
  ratio?: number
}

const LoadingArea = ({
  className,
  icon = faCircleNotch,
  ratio = 1,
  ...props
}: Props) => {
  return (
    <AspectRatio
      {...props}
      className={cx(className, styles.main)}
      ratio={ratio}
    >
      <FontAwesomeIcon fixedWidth spin icon={icon} />
    </AspectRatio>
  )
}

export default LoadingArea
