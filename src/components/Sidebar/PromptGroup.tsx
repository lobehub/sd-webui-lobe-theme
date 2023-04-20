import React from 'react'
import styled from 'styled-components'
import Prompt from './Prompt'

const View = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1em;
`

const Desc = styled.div`
  position: relative;
  z-index: var(--layer-4);
  border: solid var(--block-title-border-width) var(--block-title-border-color);
  border-radius: var(--block-title-radius);
  background: var(--block-title-background-fill);
  padding: var(--block-title-padding);
  color: var(--block-title-text-color);
  font-weight: var(--block-title-text-weight);
  font-size: var(--block-title-text-size);
  line-height: var(--line-sm);
  margin-bottom: -10px;
`

const PromptGroup: React.FC = () => {
  return (
    <View>
      <Desc>Positive</Desc>
      <Prompt type="positive" />
      <Desc>Negative</Desc>
      <Prompt type="negative" />
    </View>
  )
}

export default React.memo(PromptGroup)
