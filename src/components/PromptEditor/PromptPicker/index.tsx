import { Button, Skeleton } from 'antd';
import { consola } from 'consola';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import useSWR from 'swr';

import { TagItem } from '@/components/PromptEditor/TagList';
import { formatPrompt } from '@/components/PromptEditor/utils';
import { selectors, useAppStore } from '@/store';
import { getPrompt } from '@/store/api';

const ID = `[id$='2img_prompt'] textarea`;

const PromptPicker = memo(() => {
  const { data, isLoading } = useSWR('prompt', getPrompt);
  const [tags, setTags] = useState<TagItem[]>([]);
  const [activeObject, setActiveObject] = useState<string>();
  const [activeAttribute, setActiveAttribute] = useState<string>();
  const i18n = useAppStore(selectors.currentLanguage);
  const { t } = useTranslation();

  const isCN = i18n === 'zh_CN' || i18n === 'zh_HK';

  const getValue = useCallback(() => {
    try {
      const textarea = get_uiCurrentTabContent().querySelector(ID) as HTMLTextAreaElement;
      const data = formatPrompt(textarea.value);
      if (textarea) setTags(data);
      return data;
    } catch (error) {
      consola.error('🤯 [prompt]', error);
    }
  }, []);

  const setValue = useCallback((currentTags: TagItem[]) => {
    try {
      const newValue = currentTags.map((t) => t.text).join(', ');
      const textarea = get_uiCurrentTabContent().querySelector(ID) as HTMLTextAreaElement;
      if (textarea) textarea.value = newValue;
      updateInput(textarea);
    } catch (error) {
      consola.error('🤯 [prompt]', error);
    }
  }, []);

  const handleTagUpdate = useCallback((tag: TagItem) => {
    let currentTags = getValue() || [];
    console.log(currentTags);
    const hasTag = currentTags.some(
      (t) => t.text.toLowerCase() === tag.text.toLowerCase() || t.id === tag.id,
    );
    if (hasTag) {
      currentTags = currentTags.filter(
        (t) => t.text.toLowerCase() !== tag.text.toLowerCase() && t.id !== tag.id,
      );
    } else {
      currentTags = [...currentTags, tag].filter(Boolean);
    }

    setTags(currentTags);
    setValue(currentTags);
  }, []);

  useEffect(() => {
    getValue();
    if (!data || activeObject || activeAttribute) return;
    const defaultActiveObject = Object.keys(data)[0];
    setActiveObject(defaultActiveObject);
    const defaultActiveAttribute = Object.keys(data[defaultActiveObject].children)[0];
    setActiveAttribute(defaultActiveAttribute);
  }, [data, activeObject, activeAttribute]);

  if (isLoading || !data) return <Skeleton active />;

  return (
    <>
      <span style={{ marginBottom: -10 }}>{t('prompt.area.object')}</span>
      <Flexbox gap={4} horizontal style={{ flexWrap: 'wrap' }}>
        {Object.entries(data).map(([key, value], index) => {
          const name = isCN ? value.langName : value.name;
          const isActive = activeObject ? activeObject === key : index === 0;
          return (
            <Button
              key={key}
              onClick={() => {
                setActiveObject(key);
                setActiveAttribute(Object.keys(data[key].children)[0]);
              }}
              size={'small'}
              style={{ flex: 1 }}
              type={isActive ? 'primary' : 'default'}
            >
              {name}
            </Button>
          );
        })}
      </Flexbox>
      <span style={{ marginBottom: -10 }}>{t('prompt.area.attribute')}</span>
      <Flexbox gap={4} horizontal style={{ flexWrap: 'wrap' }}>
        {activeObject &&
          Object.entries(data[activeObject].children).map(([key, value], index) => {
            const name = isCN ? value.langName : value.name;
            const isActive = activeAttribute ? activeAttribute === key : index === 0;
            return (
              <Button
                key={key}
                onClick={() => setActiveAttribute(key)}
                size={'small'}
                style={{ flex: 1 }}
                type={isActive ? 'primary' : 'default'}
              >
                {name}
              </Button>
            );
          })}
      </Flexbox>
      <span style={{ marginBottom: -10 }}>{t('prompt.area.tag')}</span>
      <Flexbox gap={4} horizontal style={{ flexWrap: 'wrap' }}>
        {activeObject &&
          activeAttribute &&
          Object.entries(data[activeObject].children[activeAttribute].children).map(
            ([key, value]) => {
              const isActive = tags.some(
                (tag) => tag.text.toLowerCase() === value.name.toLowerCase(),
              );
              return (
                <Button
                  key={key}
                  onClick={() => handleTagUpdate({ id: key, text: value.name })}
                  size={'small'}
                  style={isCN ? { flex: 1, height: 36 } : { flex: 1 }}
                  type={isActive ? 'primary' : 'dashed'}
                >
                  {isCN ? (
                    <Flexbox gap={2}>
                      <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>
                        {value.langName}
                      </div>
                      <div style={{ fontSize: 12, lineHeight: 1, opacity: 0.75 }}>{value.name}</div>
                    </Flexbox>
                  ) : (
                    value.name
                  )}
                </Button>
              );
            },
          )}
      </Flexbox>
    </>
  );
});

export default PromptPicker;
