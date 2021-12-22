import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { forwardRef, HTMLProps } from 'react'

import { GenericActionOrList } from '@/types/actions'

import Button from '@/components/atoms/Button'
import DropdownMenu, { ContentProps } from '@/components/molecules/DropdownMenu'
import LinkButton from '@/components/molecules/LinkButton'

import { Variants as ButtonVariants } from '@/styles/button'

import { isActionList, isCallbackAction, isLinkAction } from '@/util/action'
import { pauseEvent } from '@/util/events'

export type Variants = Omit<ButtonVariants, 'hasPopup' | 'iconic'>

type ElementProps = Omit<
  HTMLProps<HTMLElement>,
  keyof Variants | 'action' | 'children' | 'ref' | 'type'
>

export type Props = ElementProps &
  Variants & {
    action: GenericActionOrList
    listOptions?: ContentProps
  }

const Action = forwardRef<any, Props>(
  ({ action, status, listOptions, ...rest }, ref) => {
    const commonProps = {
      ...rest,
      iconLeft: action.icon,
      id: action.id,
      status: action.dangerous ? 'danger' : status,
    }

    if (isCallbackAction(action)) {
      return (
        <Button
          ref={ref}
          {...commonProps}
          a11yLabel={action.a11yLabel}
          disabled={action.disabled}
          iconLeft={action.icon}
          isLoading={action.isLoading}
          label={action.label}
          loadingIcon={action.loadingIcon}
          loadingLabel={action.loadingLabel}
          onClick={pauseEvent(action.onAction)}
        />
      )
    } else if (isLinkAction(action)) {
      return (
        <LinkButton
          ref={ref}
          {...commonProps}
          action={action}
          iconLeft={action.icon}
          iconRight={action.external ? faExternalLinkAlt : undefined}
        />
      )
    } else if (isActionList(action)) {
      return (
        <DropdownMenu {...listOptions} actionGroups={action.actionGroups}>
          <Button
            ref={ref}
            {...commonProps}
            a11yLabel={action.a11yLabel}
            disabled={action.disabled}
            iconLeft={action.icon}
            label={action.label}
          />
        </DropdownMenu>
      )
    } else {
      console.log('unknown action type', action)
      return null
    }
  }
)

Action.displayName = 'Action'

export default Action
