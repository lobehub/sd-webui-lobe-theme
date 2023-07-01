import { Converter } from '@/script/formatPrompt';

import { TagItem } from './TagList';

export const genTagType = (tag: TagItem): TagItem => {
  const newTag = tag;
  if (newTag.text.includes('<lora')) {
    newTag.className = 'ReactTags__lora';
  } else if (newTag.text.includes('<hypernet')) {
    newTag.className = 'ReactTags__hypernet';
  } else if (newTag.text.includes('<embedding')) {
    newTag.className = 'ReactTags__embedding';
  } else {
    newTag.className = undefined;
  }
  return newTag;
};

export const formatPrompt = (value: string) => {
  const text = Converter.convertStr(value);
  const textArray = Converter.convertStr2Array(text).map((item) => {
    if (item.includes('<')) return item;
    const newItem = item
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/，|\.\|。/g, ',')
      .replaceAll(/“|‘|”|"|\/'/g, '')
      .replaceAll(', ', ',')
      .replaceAll(',,', ',')
      .replaceAll(',', ', ');
    return Converter.convertStr2Array(newItem).join(', ');
  });
  return textArray.map((tag) => genTagType({ id: tag, text: tag }));
};
