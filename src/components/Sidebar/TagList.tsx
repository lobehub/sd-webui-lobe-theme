import React, { useCallback } from 'react'
import { WithContext, ReactTagsProps as WithContextProps } from 'react-tag-input'
import styled from 'styled-components'

export interface TagItem {
  id: string
  text: string
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
  }
  ul {
    list-style-type: none;
    box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
    background: white;
    width: 200px;
    li {
      border-bottom: 1px solid #ddd;
      padding: 5px 10px;
      margin: 0;
      &.ReactTags__activeSuggestion {
        background: #b7cfe0;
        cursor: pointer;
      }
      mark {
        text-decoration: underline;
        background: none;
        font-weight: 600;
      }
    }
  }

  .ReactTags__remove {
    border: none;
    cursor: pointer;
    background: none;
    color: white;
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
}

const TagList: React.FC<TagListProps> = ({ tags, setTags, type }) => {
  const handleDelete = useCallback(
    (i: number) => {
      setTags(tags.filter((tag, index) => index !== i))
    },
    [tags]
  )

  const handleAddition = useCallback(
    (tag: TagItem) => {
      setTags([...tags, tag])
    },
    [tags]
  )

  const handleDrag = useCallback(
    (tag: TagItem, currPos: number, newPos: number) => {
      const newTags = tags.slice()
      newTags.splice(currPos, 1)
      newTags.splice(newPos, 0, tag)
      setTags(newTags)
    },
    [tags]
  )

  const handleTagUpdate = useCallback(
    (i: number, tag: TagItem) => {
      const newTags = [...tags]
      newTags[i] = tag
      setTags(newTags)
    },
    [tags]
  )

  return (
    <View type={type}>
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        onTagUpdate={handleTagUpdate}
        inputFieldPosition="bottom"
        inline
        autocomplete
        editable
      />
    </View>
  )
}

export default React.memo(TagList)
