import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from '@/components/PromptEditor/style';

import Prompt from './Prompt';

const PromptEditor = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles.view}>
      <span style={{ marginBottom: -10 }}>{t('positive')}</span>
      <Prompt type="positive" />
      <span style={{ marginBottom: -10 }}>{t('negative')}</span>
      <Prompt type="negative" />
    </div>
  );
});

export default PromptEditor;
