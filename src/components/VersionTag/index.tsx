import { Tag, TagProps } from 'antd';
import { memo } from 'react';
import semver from 'semver';

import { GITHUB_REPO_URL } from '@/const/url';
import { useAppStore } from '@/store';

const VersionTag = memo<TagProps>((props) => {
  const { version, latestVersion } = useAppStore((st) => ({
    latestVersion: st.latestVersion,
    version: st.version,
  }));

  const isLatest = semver.gte(version, latestVersion);

  return (
    <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
      {isLatest ? (
        <Tag color="success" {...props}>
          v{version}
        </Tag>
      ) : (
        <Tag color="warning" {...props}>
          v{version} / latest v{latestVersion}
        </Tag>
      )}
    </a>
  );
});

export default VersionTag;
