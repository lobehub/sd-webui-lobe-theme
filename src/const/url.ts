import pkg from '@/../package.json';

export const DISCORD_URL = 'https://discord.gg/AYFPHvv2jT';
export const SPONSOR_URL = 'https://opencollective.com/lobehub';
export const GISCUS_REPO_ID = 'R_kgDOJCPcNg';
export const GITHUB_REPO_URL = pkg.homepage;
export const REPO_NAME = GITHUB_REPO_URL.replace(
  'https://github.com/',
  '',
) as `${string}/${string}`;
export const OFFICIAL_SITE = 'https://lobehub.com/';
export const SITE_URL = location.origin;
export const EMAIL_SUPPORT = 'support@lobehub.com';
export const EMAIL_BUSINESS = 'hello@lobehub.com';
export const X = 'https://x.com/lobehub';
export const MEDIDUM_URL = 'https://medium.com/@lobehub';
export const STATUS_URL = 'https://status.lobehub.com';
