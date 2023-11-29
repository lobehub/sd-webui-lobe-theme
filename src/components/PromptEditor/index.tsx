import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import PromptPicker from '@/components/PromptEditor/PromptPicker';
import { selectors, useAppStore } from '@/store';

import Prompt from './Prompt';

const PromptEditor = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { t } = useTranslation();
  return (
    <Flexbox gap={16}>
      {setting.promptEditor && (
        <>
          <span style={{ marginBottom: -10 }}>{t('prompt.positive')}</span>
          <Prompt type="positive" />
          <span style={{ marginBottom: -10 }}>{t('prompt.negative')}</span>
          <Prompt type="negative" />
        </>
      )}
      <PromptPicker />
    </Flexbox>
  );
});

export default PromptEditor;
