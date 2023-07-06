import { type FC, memo, useCallback, useEffect, useState } from 'react';
import { WithContext, ReactTagsProps as WithContextProps } from 'react-tag-input';

import { genTagType } from '../utils';
import { useStyles } from './style';

export interface TagItem {
  className?: string;
  id: string;
  text: string;
}

export type PromptType = 'positive' | 'negative';

interface ReactTagsProps extends WithContextProps {
  editable?: boolean;
  onTagUpdate?: (editIndex: number, tag: TagItem) => void;
}

// @ts-ignore
const ReactTags: FC<ReactTagsProps> = WithContext;

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface TagListProps {
  setTags: (tags: TagItem[]) => void;
  setValue: (tags: TagItem[]) => void;
  tags: TagItem[];
  type: PromptType;
}

const TagList = memo<TagListProps>(({ tags, setTags, type, setValue }) => {
  const id = `${type}_tag_editor`;
  const [bind, setBind] = useState(false);
  const { styles } = useStyles(type);
  const handleDelete = useCallback(
    (index_: number) => {
      const newTags = tags.filter((tag, index) => index !== index_);
      setTags(newTags);
      setValue(newTags);
    },
    [tags],
  );

  const handleAddition = useCallback(
    (tag: TagItem) => {
      const newTags = [...tags, genTagType(tag)];
      setTags(newTags);
      setValue(newTags);
    },
    [tags],
  );

  const handleDrag = useCallback(
    (tag: TagItem, currentPos: number, newPos: number) => {
      const newTags = [...tags];
      newTags.splice(currentPos, 1);
      newTags.splice(newPos, 0, genTagType(tag));
      setTags(newTags);
      setValue(newTags);
    },
    [tags],
  );

  const handleTagUpdate = useCallback(
    (index: number, tag: TagItem) => {
      const newTags = [...tags];
      newTags[index] = genTagType(tag);
      setTags(newTags);
      setValue(newTags);
    },
    [tags],
  );

  useEffect(() => {
    try {
      if (!addAutocompleteToArea || bind) return;
      let retryTimes = 0;
      const bindInterval = setInterval(() => {
        console.time('🤯 [promptTagEditor] inject');
        if (bind || retryTimes > 10) {
          const inputDom = document.querySelector(`#${id}`) as HTMLInputElement;
          if (inputDom) {
            setBind(true);
            addAutocompleteToArea(inputDom);
            clearInterval(bindInterval);
            console.timeEnd('🤯 [promptTagEditor] inject');
          }
        }
        retryTimes++;
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, [bind]);

  return (
    <div className={styles}>
      <ReactTags
        delimiters={delimiters}
        editable
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        handleDrag={handleDrag}
        id={id}
        inline
        inputFieldPosition="bottom"
        onTagUpdate={handleTagUpdate}
        tags={tags}
      />
    </div>
  );
});

export default TagList;
