import { PropsWithChildren, ReactNode } from 'react'

import { GenericAction, GenericActionOrList } from '@/types/actions'

import SingleColumnLayout, {
  Variants as SingleColumnLayoutVariants,
} from '@/components/atoms/SingleColumnLayout'
import Skeleton from '@/components/atoms/Skeleton'
import Action, { Props as ActionProps } from '@/components/molecules/Action'

import styles from './styles.module.css'

const listOptions: NonNullable<ActionProps['listOptions']> = {
  align: 'end',
} as const

export type Props = SingleColumnLayoutVariants & {
  isLoading?: boolean
  media?: ReactNode
  primaryAction?: GenericAction
  secondaryActions?: GenericActionOrList[]
  skeleton?: ReactNode
  subtitle?: ReactNode
  title: ReactNode
}

const Page = ({
  children = null,
  isLoading = false,
  media = null,
  primaryAction,
  secondaryActions,
  size = 'lg',
  skeleton = null,
  subtitle = null,
  title,
}: PropsWithChildren<Props>) => {
  const titleMarkup = isLoading ? (
    <Skeleton.Text kind="h1" />
  ) : typeof title === 'string' ? (
    <h1>{title}</h1>
  ) : (
    title
  )

  const subtitleMarkup = isLoading ? (
    <Skeleton.Text kind="h4" />
  ) : typeof subtitle === 'string' ? (
    <h4 className="text-light">{subtitle}</h4>
  ) : (
    subtitle ?? null
  )

  const secondaryActionsMarkup = secondaryActions?.map((action, index) =>
    isLoading ? (
      <Skeleton.Action key={index} />
    ) : (
      <Action
        key={index}
        action={action}
        appearance="clear"
        listOptions={listOptions}
      />
    )
  )

  const primaryActionMarkup = isLoading ? (
    <Skeleton.Action />
  ) : primaryAction ? (
    <Action action={primaryAction} appearance="primary" />
  ) : null

  return (
    <>
      <SingleColumnLayout className={styles.wrapper} size={size}>
        <div className={styles.header}>
          <div className="flex w-full items-center gap-6">
            {media && <div>{media}</div>}
            <div className="flex flex-col gap-[2px]">
              {titleMarkup}
              {subtitle && subtitleMarkup}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            {secondaryActionsMarkup}
            {primaryAction && primaryActionMarkup}
          </div>
        </div>
      </SingleColumnLayout>
      <SingleColumnLayout className="laptop:px-8" size={size}>
        <div className={styles.content}>
          {isLoading ? skeleton ?? children : children}
        </div>
      </SingleColumnLayout>
    </>
  )
}

export default Page
