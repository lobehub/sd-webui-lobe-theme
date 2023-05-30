import { useResponsive } from 'antd-style';
import React, { CSSProperties, useEffect, useState } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { DraggablePanel } from '@/components';
import { useAppStore } from '@/store';

import PromptGroup from './PromptGroup';

const SidebarView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;

  height: -webkit-fill-available;
  height: -moz-available;
  padding: 16px;
`;

interface SidebarProps {
  children: React.ReactNode;
  loading?: boolean;
  style?: CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ children, loading, style }) => {
  const [setting] = useAppStore((st) => [st.setting], shallow);
  const [mode] = useState<'fixed' | 'float'>(setting.sidebarFixedMode);
  const { mobile } = useResponsive();
  const [expand, setExpand] = useState<boolean>(setting.sidebarExpand);

  useEffect(() => {
    if (mobile) setExpand(false);
  }, []);

  return (
    <DraggablePanel
      defaultSize={{ width: setting.sidebarWidth }}
      expand={expand}
      minWidth={setting.sidebarWidth}
      mode={mode}
      onExpandChange={setExpand}
      pin={mode === 'fixed'}
      placement="left"
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <SidebarView>
        {!loading && <PromptGroup />}
        {children}
      </SidebarView>
    </DraggablePanel>
  );
};

export default React.memo(Sidebar);
