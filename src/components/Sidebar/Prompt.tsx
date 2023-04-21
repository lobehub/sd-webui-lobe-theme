import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import TagList, { PromptType, TagItem } from './TagList'
import { formatPrompt } from './utils'

const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
`

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--button-border-width) solid var(--button-secondary-border-color);
  border-radius: var(--input-radius);
  background: var(--button-secondary-background-fill);
  position: relative;
  font-weight: var(--input-text-weight);
  font-size: var(--input-text-size);
  line-height: var(--line-sm);
  padding: var(--input-padding);
  cursor: pointer;
  flex: 1;
`

interface PromptProps {
  type: PromptType
}

const Prompt: React.FC<PromptProps> = ({ type }) => {
  const [tags, setTags] = useState<TagItem[]>([])

  const id = type === 'positive' ? "[id$='2img_prompt'] textarea" : "[id$='2img_neg_prompt'] textarea"

  const getValue = useCallback(() => {
    try {
      const textarea: HTMLTextAreaElement | any = get_uiCurrentTabContent().querySelector(id)
      if (textarea) setTags(formatPrompt(textarea.value))
    } catch {}
  }, [])

  const setValue = useCallback(() => {
    try {
      const textarea: HTMLTextAreaElement | any = get_uiCurrentTabContent().querySelector(id)
      if (textarea) textarea.value = tags.map((t) => t.text).join(', ')
    } catch {}
  }, [tags])

  return (
    <View>
      <TagList type={type} tags={tags} setTags={setTags} />
      <BtnGroup>
        <Btn title="Load Prompt" onClick={getValue}>
          🔄
        </Btn>
        <Btn title="Set Prompt" onClick={setValue}>
          ➡️
        </Btn>
      </BtnGroup>
    </View>
  )
}

export default React.memo(Prompt)
