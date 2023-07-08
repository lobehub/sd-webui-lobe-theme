import { Tag, TagProps } from 'antd';
import { memo } from 'react';
import semver from 'semver';
import { shallow } from 'zustand/shallow';

import { homepage } from '@/../package.json';
import { useAppStore } from '@/store';

const VersionTag = memo<TagProps>((props) => {
  const { version, latestVersion } = useAppStore(
    (st) => ({ latestVersion: st.latestVersion, version: st.version }),
    shallow,
  );

  const isLatest = semver.gte(version, latestVersion);

  return (
    <a href={homepage} rel="noreferrer" target="_blank">
      {isLatest ? (
        <Tag color="success" {...props}>
          v{version}
        </Tag>
      ) : (
        <Tag color="warning" {...props}>
          v{version} / latest v${latestVersion}
        </Tag>
      )}
    </a>
  );
});

export default VersionTag;
