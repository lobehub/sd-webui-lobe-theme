import { Modal, type ModalProps } from '@lobehub/ui';
import { useResponsive, useTheme } from 'antd-style';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import FormAppearance from './Form/Appearance';
import FormExperimental from './Form/Experimental';
import Footer from './Form/Footer';
import FormLayout from './Form/Layout';
import FormSidebar from './Form/Sidebar';
import Sidebar, { MobileSidebar, SettingsTabs } from './Sidebar';

export interface SettingProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Setting = memo<SettingProps>(({ open, onCancel }) => {
  const [tab, setTab] = useState<SettingsTabs>(SettingsTabs.Appearance);
  const { mobile } = useResponsive();
  const theme = useTheme();

  const content = (
    <>
      {tab === SettingsTabs.Appearance && <FormAppearance />}
      {tab === SettingsTabs.Layout && <FormLayout />}
      {tab === SettingsTabs.Sidebar && <FormSidebar />}
      {tab === SettingsTabs.Experimental && <FormExperimental />}
    </>
  );

  return (
    <Modal
      allowFullscreen={true}
      footer={mobile ? <Footer /> : null}
      onCancel={onCancel}
      open={open}
      styles={{
        body: {
          display: 'flex',
          minHeight: 'min(75vh, 750px)',
          overflow: 'hidden',
          padding: 0,
          paddingBlock: 0,
        },
        content: {
          background: mobile ? theme.colorBgContainer : undefined,
          border: 'none',
          boxShadow: `0 0 0 1px ${theme.colorBorderSecondary}`,
        },
      }}
      title={false}
      width={1024}
    >
      {mobile ? (
        <Flexbox
          height={'100%'}
          style={{ overflow: 'hidden', position: 'relative' }}
          width={'100%'}
        >
          <div style={{ padding: 16 }}>
            <MobileSidebar setTab={setTab} tab={tab} />
          </div>
          <Flexbox
            height={'100%'}
            style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}
            width={'100%'}
          >
            {content}
          </Flexbox>
        </Flexbox>
      ) : (
        <Flexbox horizontal width={'100%'}>
          <Sidebar setTab={setTab} tab={tab} />
          <Flexbox
            align={'center'}
            gap={64}
            style={{
              background: theme.isDarkMode ? theme.colorFillQuaternary : theme.colorBgElevated,
              minHeight: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              paddingBlock: 40,
              paddingInline: 56,
            }}
            width={'100%'}
          >
            {content}
            <Flexbox width={'100%'}>
              <Footer />
            </Flexbox>
          </Flexbox>
        </Flexbox>
      )}
    </Modal>
  );
});

export default Setting;
