import cx from 'classnames'
import { useCombobox, UseComboboxProps } from 'downshift'
import { useCallback } from 'react'

import TextInput, {
  Props as TextInputProps,
} from '@/components/atoms/TextInput'

import styles from './styles.module.css'

export type RenderItemProps<T> = {
  index: number
  item: T
  isHighlighted: boolean
  isSelected: boolean
}

export type Props<T> = TextInputProps & {
  items: UseComboboxProps<T>['items']
  selectedItem: T | null
  itemToKey: (item: T) => string | number
  itemToString: NonNullable<UseComboboxProps<T>['itemToString']>
  onInputValueChange: UseComboboxProps<T>['onInputValueChange']
  onSelectedItemChange: UseComboboxProps<T>['onSelectedItemChange']
  renderItem?: (props: RenderItemProps<T>) => JSX.Element
  stateReducer?: UseComboboxProps<T>['stateReducer']
}

const defaultStateReducer: UseComboboxProps<any>['stateReducer'] = (
  _state,
  { changes }
) => changes

const Autocomplete = <T extends object>({
  autoFocus,
  id,
  items,
  selectedItem: providedSelectedItem,
  itemToKey,
  itemToString,
  onInputValueChange,
  onSelectedItemChange,
  renderItem: providedRenderItem,
  stateReducer = defaultStateReducer,
  ...inputProps
}: Props<T>) => {
  const {
    highlightedIndex,
    isOpen,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    openMenu,
    setInputValue,
  } = useCombobox({
    id,
    inputId: id,
    items,
    selectedItem: providedSelectedItem,
    itemToString,
    stateReducer,
    onInputValueChange,
    onSelectedItemChange,
    onStateChange: ({ type }) => {
      if (type === useCombobox.stateChangeTypes.InputBlur) {
        setInputValue(itemToString(selectedItem))
      }
    },
  })

  const defaultRenderItem = useCallback(
    ({ item, isHighlighted, isSelected }: RenderItemProps<T>) => (
      <div
        className={cx(styles.item, {
          [styles['is-highlighted']]: isHighlighted,
          [styles['is-selected']]: isSelected,
        })}
      >
        {itemToString(item)}
      </div>
    ),
    [itemToString]
  )

  const renderItem = providedRenderItem ?? defaultRenderItem

  return (
    <div style={{ width: '100%' }}>
      <div {...getComboboxProps()}>
        <TextInput
          {...getInputProps({
            autoFocus,
            onFocus: () => {
              if (!isOpen) {
                openMenu()
              }
            },
          })}
          {...inputProps}
        />
      </div>
      <ul
        {...getMenuProps()}
        className={cx(styles.menu, {
          [styles['is-open']]: items.length > 0 && isOpen,
        })}
      >
        {items.map((item, index) => (
          <li key={itemToKey(item)} {...getItemProps({ item, index })}>
            {renderItem({
              item,
              index,
              isHighlighted: highlightedIndex === index,
              isSelected:
                !!selectedItem && itemToKey(item) === itemToKey(selectedItem),
            })}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Autocomplete
