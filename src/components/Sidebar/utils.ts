import { Converter } from '@/script/format-prompt'

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
  return textArray.map((tag) => ({ id: tag, text: tag }))
}
