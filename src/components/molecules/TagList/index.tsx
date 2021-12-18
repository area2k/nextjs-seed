import Tag from '@/components/atoms/Tag'

export type Props = {
  disabled?: boolean
  tags: string[]
  onRemove?: (index: number) => void
}

const TagList = ({ disabled, tags, onRemove }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tagLabel, index) => (
        <Tag
          key={index}
          disabled={disabled}
          label={tagLabel}
          onRemove={onRemove ? () => onRemove(index) : undefined}
        />
      ))}
    </div>
  )
}

export default TagList
