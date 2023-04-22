import React, { useCallback, useMemo } from 'react'
import { WithContext, ReactTagsProps as WithContextProps } from 'react-tag-input'
import styled from 'styled-components'
import { genTagType, suggestions } from './utils'

export interface TagItem {
  id: string
  text: string
  className?: string
}

export type PromptType = 'positive' | 'negative'

interface ReactTagsProps extends WithContextProps {
  editable?: boolean
  onTagUpdate?: (editIndex: number, tag: TagItem) => void
}

// @ts-ignore
const ReactTags: React.FC<ReactTagsProps> = WithContext

const View = styled.div<{ type: PromptType }>`
  /* Styles for the input */
  .ReactTags__editTagInput,
  .ReactTags__tagInput {
    display: inline-block;
    margin: 0;
    width: -webkit-fill-available;
    input,
    input:focus {
      display: block;
      position: relative;
      margin: 0;
      width: -webkit-fill-available;
      border: var(--input-border-width) solid var(--input-border-color);
      border-radius: var(--input-radius);
      background: var(--input-background-fill);
      padding: var(--input-padding);
      color: var(--body-text-color);
      font-weight: var(--input-text-weight);
      font-size: var(--input-text-size);
      line-height: var(--line-sm);
      outline: none;
    }
  }

  /* Styles for selected tags */
  .ReactTags__tags.react-tags-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ReactTags__selected {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    span.ReactTags__tag {
      display: flex;
      align-items: center;
      border: var(--button-border-width) solid var(--button-secondary-border-color);
      border-radius: var(--input-radius);
      background: var(--button-secondary-background-fill);
      color: ${({ type }) => (type === 'positive' ? 'var(--green-9)' : 'var(--magenta-9)')};
      position: relative;
      font-weight: var(--input-text-weight);
      font-size: var(--text-sm);
      line-height: var(--line-sm);
      padding: var(--input-padding);
      &:hover {
        color: ${({ type }) => (type === 'positive' ? 'var(--green-10)' : 'var(--magenta-10)')};
      }
    }
    a.ReactTags__remove {
      color: #aaa;
      margin-left: 5px;
      cursor: pointer;
    }
  }

  /* Styles for suggestions */
  .ReactTags__suggestions {
    position: absolute;
    z-index: 1000;
  }
  ul {
    list-style-type: none;
    box-shadow: var(--box-shadow);
    background: var(--color-bg-container);
    width: 248px;
    max-height: 480px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    border-radius: var(--border-radius);
    li {
      font-size: 12px;
      padding: 4px 8px;
      margin: 0;
      &.ReactTags__activeSuggestion {
        background: var(--color-primary);
        color: #fff;
        cursor: pointer;
      }
      mark {
        font-weight: 600;
        color: #fff;
        background: var(--color-primary-hover);
        border-radius: 2px;
      }
    }
  }

  .ReactTags__remove {
    border: none;
    cursor: pointer;
    background: none;
    color: var(--color-text);
  }

  .ReactTags__lora {
    background: var(--cyan-2) !important;
    border-color: var(--cyan-3) !important;
  }
  .ReactTags__hypernet {
    background: var(--purple-2) !important;
    border-color: var(--purple-3) !important;
  }
  .ReactTags__embedding {
    background: var(--orange-2) !important;
    border-color: var(--orange-3) !important;
  }
`

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

interface TagListProps {
  tags: TagItem[]
  setTags: (tags: TagItem[]) => void
  type: PromptType
  setValue: (tags: TagItem[]) => void
}

const TagList: React.FC<TagListProps> = ({ tags, setTags, type, setValue }) => {
  const handleDelete = useCallback(
    (i: number) => {
      const newTags = tags.filter((tag, index) => index !== i)
      setTags(newTags)
      setValue(newTags)
    },
    [tags]
  )

  const handleAddition = useCallback(
    (tag: TagItem) => {
      const newTags = [...tags, genTagType(tag)]
      setTags(newTags)
      setValue(newTags)
    },
    [tags]
  )

  const handleDrag = useCallback(
    (tag: TagItem, currPos: number, newPos: number) => {
      const newTags = tags.slice()
      newTags.splice(currPos, 1)
      newTags.splice(newPos, 0, genTagType(tag))
      setTags(newTags)
      setValue(newTags)
    },
    [tags]
  )

  const handleTagUpdate = useCallback(
    (i: number, tag: TagItem) => {
      const newTags = [...tags]
      newTags[i] = genTagType(tag)
      setTags(newTags)
      setValue(newTags)
    },
    [tags]
  )

  const suggestionData = useMemo(() => suggestions[type], [type])

  return (
    <View type={type}>
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        onTagUpdate={handleTagUpdate}
        suggestions={suggestionData}
        inputFieldPosition="bottom"
        inline
        autocomplete
        editable
      />
    </View>
  )
}

export default React.memo(TagList)
