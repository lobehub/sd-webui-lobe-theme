import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TagList, { PromptType, TagItem } from './TagList'
import { formatPrompt } from './utils'

const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Reload = styled.button`
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
`

interface PromptProps {
  type: PromptType
}

const Prompt: React.FC<PromptProps> = ({ type }) => {
  const [tags, setTags] = useState<TagItem[]>([])

  const id = type === 'positive' ? "[id$='2img_prompt'] textarea" : "[id$='2img_neg_prompt'] textarea"

  useEffect(() => {
    onUiUpdate(() => {
      const textarea: HTMLTextAreaElement | any = get_uiCurrentTabContent().querySelector(id)
      if (textarea) textarea.addEventListener('change', (e: any) => setTags(formatPrompt(e.target.value)), false)
    })
  }, [])

  useEffect(() => {
    if (!tags) return
    try {
      const textarea: HTMLTextAreaElement | any = get_uiCurrentTabContent().querySelector(id)
      if (textarea) textarea.value = tags.map((t) => t.text).join(', ')
    } catch {}
  }, [tags])

  const getValue = useCallback(() => {
    const textarea: HTMLTextAreaElement | any = get_uiCurrentTabContent().querySelector(id)
    if (textarea) setTags(formatPrompt(textarea.value))
  }, [])

  return (
    <View>
      <TagList type={type} tags={tags} setTags={setTags} />
      <Reload onClick={getValue}>🔄</Reload>
    </View>
  )
}

export default React.memo(Prompt)
