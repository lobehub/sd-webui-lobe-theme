import { memo } from 'react';

import { useStyles } from '@/slots/PromptEditor/style';

import Prompt from './Prompt';

const PromptEditor = memo(() => {
  const { styles } = useStyles();
  return (
    <div className={styles.view}>
      <span style={{ marginBottom: -10 }}>Positive</span>
      <Prompt type="positive" />
      <span style={{ marginBottom: -10 }}>Negative</span>
      <Prompt type="negative" />
    </div>
  );
});

export default PromptEditor;
