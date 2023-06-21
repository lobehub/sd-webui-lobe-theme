import { GithubOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Modal, Popover, Space } from 'antd';
import { Bold, Github, LucideIcon, Moon, Settings2, Sun } from 'lucide-react';
import qs from 'query-string';
import { memo, useCallback, useState } from 'react';
import { shallow } from 'zustand/shallow';

import Giscus from '@/slots/Giscus';
import Setting from '@/slots/Setting';
import { useAppStore } from '@/store';

const CivitaiLogo: LucideIcon = ({ size }) => (
  <svg fill="currentColor" height={size} viewBox="0 0 16 16" width={size}>
    <path d="M2 4.5L8 1l6 3.5v7L8 15l-6-3.5v-7zm6-1.194L3.976 5.653v4.694L8 12.694l4.024-2.347V5.653L8 3.306zm0 1.589l2.662 1.552v.824H9.25L8 6.54l-1.25.73v1.458L8 9.46l1.25-.73h1.412v.824L8 11.105 5.338 9.553V6.447L8 4.895z" />
  </svg>
);

interface ActionsProps {
  themeMode: 'dark' | 'light';
}

const Actions = memo<ActionsProps>(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themeMode = useAppStore((st) => st.themeMode, shallow);

  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light';
    const gradioURL = qs.parseUrl(window.location.href);
    gradioURL.query.__theme = theme;
    window.location.replace(qs.stringifyUrl(gradioURL));
  }, [themeMode]);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Space.Compact>
        <a href="https://civitai.com/" rel="noreferrer" target="_blank">
          <ActionIcon icon={CivitaiLogo} title="Civitai" />
        </a>
        <a
          href="https://www.birme.net/?target_width=512&target_height=512"
          rel="noreferrer"
          target="_blank"
        >
          <ActionIcon icon={Bold} title="Birme" />
        </a>
        <ActionIcon icon={Github} onClick={showModal} title="Feedback" />
        <Popover
          content={<Setting />}
          title={<h3 style={{ lineHeight: 2, margin: 0 }}>⚙ Setting</h3>}
          trigger="click"
        >
          <ActionIcon icon={Settings2} title="Setting" />
        </Popover>
        <ActionIcon
          icon={themeMode === 'light' ? Sun : Moon}
          onClick={handleSetTheme}
          title="Switch Theme"
        />
      </Space.Compact>
      <Modal
        footer={false}
        onCancel={handleCancel}
        open={isModalOpen}
        title={
          <a
            href="https://github.com/canisminor1990/sd-webui-kitchen-theme"
            rel="noreferrer"
            target="_blank"
          >
            <Space>
              <GithubOutlined />
              {'canisminor1990/sd-webui-kitchen-theme'}
            </Space>
          </a>
        }
      >
        <Giscus themeMode={themeMode} />
      </Modal>
    </>
  );
});

export default Actions;
