import { type FC, memo, useCallback, useMemo } from 'react';
import { WithContext, ReactTagsProps as WithContextProps } from 'react-tag-input';

import { genTagType, suggestions } from '../utils';
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

  const suggestionData = useMemo(() => suggestions[type], [type]);

  return (
    <div className={styles}>
      <ReactTags
        autocomplete
        delimiters={delimiters}
        editable
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        handleDrag={handleDrag}
        inline
        inputFieldPosition="bottom"
        onTagUpdate={handleTagUpdate}
        suggestions={suggestionData}
        tags={tags}
      />
    </div>
  );
});

export default TagList;
