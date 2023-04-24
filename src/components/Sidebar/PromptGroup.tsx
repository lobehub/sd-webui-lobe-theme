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

  margin-bottom: -10px;
  padding: var(--block-title-padding);

  font-size: var(--block-title-text-size);
  font-weight: var(--block-title-text-weight);
  line-height: var(--line-sm);
  color: var(--block-title-text-color);

  background: var(--block-title-background-fill);
  border: solid var(--block-title-border-width) var(--block-title-border-color);
  border-radius: var(--block-title-radius);
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
