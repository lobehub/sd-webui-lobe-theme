// import { useAppStore } from '@/store'
import { FloatButton } from 'antd';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/store';

const ContentView = styled.div<{ isPromptResizable: boolean }>`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;

  [id$='2img_prompt'] textarea {
    max-height: ${({ isPromptResizable }) => (isPromptResizable ? 'unset' : '84px')};
  }

  [id$='2img_neg_prompt'] textarea {
    max-height: ${({ isPromptResizable }) => (isPromptResizable ? 'unset' : '84px')};
  }
`;

interface ContentProps {
  children: React.ReactNode;
  loading?: boolean;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const ref: any = useRef(null);
  const [setting] = useAppStore((st) => [st.setting], shallow);

  return (
    <ContentView isPromptResizable={setting.promotTextarea === 'resizable'} ref={ref}>
      {children}
      <FloatButton.BackTop target={() => ref.current} />
    </ContentView>
  );
};

export default React.memo(Content);
