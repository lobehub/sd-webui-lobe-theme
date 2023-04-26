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
    width: -webkit-fill-available;
    width: -moz-available;
    margin: 0;
    input,
    input:focus {
      position: relative;

      display: block;

      width: -webkit-fill-available;
      width: -moz-available;
      margin: 0;
      padding: var(--input-padding);

      font-size: var(--input-text-size);
      font-weight: var(--input-text-weight);
      line-height: var(--line-sm);
      color: var(--body-text-color);

      background: var(--input-background-fill);
      border: var(--input-border-width) solid var(--input-border-color);
      border-radius: var(--input-radius);
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
      position: relative;

      display: flex;
      align-items: center;

      padding: var(--input-padding);

      font-size: var(--text-sm);
      font-weight: var(--input-text-weight);
      line-height: var(--line-sm);
      color: ${({ type }) => (type === 'positive' ? 'var(--green-9)' : 'var(--magenta-9)')};

      background: var(--button-secondary-background-fill);
      border: var(--button-border-width) solid var(--button-secondary-border-color);
      border-radius: var(--input-radius);
      &:hover {
        color: ${({ type }) => (type === 'positive' ? 'var(--green-10)' : 'var(--magenta-10)')};
      }
    }
    a.ReactTags__remove {
      cursor: pointer;
      margin-left: 5px;
      color: #aaa;
    }
  }

  /* Styles for suggestions */
  .ReactTags__suggestions {
    position: absolute;
    z-index: 1000;
  }
  ul {
    overflow-x: hidden;
    overflow-y: auto;

    width: 248px;
    max-height: 480px;
    padding: 0;

    list-style-type: none;

    background: var(--color-bg-container);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    li {
      margin: 0;
      padding: 4px 8px;
      font-size: 12px;
      &.ReactTags__activeSuggestion {
        cursor: pointer;
        color: #fff;
        background: var(--color-primary);
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
    cursor: pointer;
    color: var(--color-text);
    background: none;
    border: none;
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
