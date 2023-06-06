import { ZoomInOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import { useResponsive } from 'antd-style';
import React, { CSSProperties, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { shallow } from 'zustand/shallow';

import { DraggablePanel } from '@/components';
import { useAppStore } from '@/store';

const GlobalStyle = createGlobalStyle`
  button#txt2img_extra_networks,
  button#img2img_extra_networks {
    display: none !important;
  }
`;

const View = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  height: var(--chrome-fill-available);
  height: var(--firefox-fill-available);
`;

const SidebarView = styled.div<{ size: number }>`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  padding: 16px;

  #txt2img_extra_networks,
  #img2img_extra_networks {
    display: block !important;
  }

  .extra-network-cards .actions .name {
    background: unset !important;
  }

  .extra-network-cards,
  .extra-network-thumbs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${({ size }) => size}px, 1fr));

    > .card {
      width: fill-available !important;
      width: available !important;
      height: ${({ size }) => size * 1.5}px !important;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex: 0;
  align-items: center;
  justify-content: flex-start;

  padding: 8px 16px;

  border-top: 1px solid var(--color-border);
`;

const ZoomSlider = styled(Slider)`
  flex: 1;
  margin-left: 16px;
`;

interface SidebarProps {
  children: React.ReactNode;
  loading?: boolean;
  style?: CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ children, style }) => {
  const { mobile } = useResponsive();
  const [setting] = useAppStore((st) => [st.setting], shallow);
  const [mode] = useState<'fixed' | 'float'>(setting.extraNetworkFixedMode);
  const [expand, setExpand] = useState<boolean>(setting.extraNetworkSidebarExpand);
  const [size, setSize] = useState<number>(setting?.extraNetworkCardSize || 86);

  useEffect(() => {
    if (mobile) setExpand(false);
  }, []);

  return (
    <>
      <GlobalStyle />
      <DraggablePanel
        defaultSize={{ width: setting.extraNetworkSidebarWidth }}
        expand={expand}
        minWidth={setting.extraNetworkSidebarWidth}
        mode={mode}
        onExpandChange={setExpand}
        pin={mode === 'fixed'}
        placement="right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        <View>
          <SidebarView size={size}>{children}</SidebarView>
          <Footer>
            <ZoomInOutlined />
            <ZoomSlider defaultValue={size} max={256} min={64} onChange={setSize} step={8} />
          </Footer>
        </View>
      </DraggablePanel>
    </>
  );
};

export default React.memo(Sidebar);
