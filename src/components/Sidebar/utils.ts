import negativeData from '@/data/negative.json'
import positiveData from '@/data/positive.json'
import { Converter } from '@/script/format-prompt'
import { TagItem } from './TagList'

export const genTagType = (tag: TagItem): TagItem => {
  const newTag = tag
  if (newTag.text.includes('<lora')) {
    newTag.className = 'ReactTags__lora'
  } else if (newTag.text.includes('<hypernet')) {
    newTag.className = 'ReactTags__hypernet'
  } else if (newTag.text.includes('<embedding')) {
    newTag.className = 'ReactTags__embedding'
  } else {
    newTag.className = undefined
  }
  return newTag
}

export const formatPrompt = (value: string) => {
  const text = Converter.convertStr(value)
  const textArray = Converter.convertStr2Array(text).map((item) => {
    if (item.includes('<')) return item
    const newItem = item
      .replace(/\s+/g, ' ')
      .replace(/，|\.\|。/g, ',')
      .replace(/“|‘|”|"|\/'/g, '')
      .replace(/, /g, ',')
      .replace(/,,/g, ',')
      .replace(/,/g, ', ')
    return Converter.convertStr2Array(newItem).join(', ')
  })
  return textArray.map((tag) => genTagType({ id: tag, text: tag }))
}

const genSuggestions = (array: string[]) =>
  array.map((text) => {
    return {
      id: text,
      text,
    }
  })

export const suggestions = {
  positive: genSuggestions(positiveData),
  negative: genSuggestions(negativeData),
}
