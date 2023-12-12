import pkg from '@/../package.json';

export const DISCORD_URL = 'https://discord.gg/AYFPHvv2jT';
export const SPONSOR_URL = 'https://opencollective.com/lobehub';
export const SPONSOR_IMG = 'https://readme-wizard.lobehub.com/api/sponsor';
export const GISCUS_REPO_ID = 'R_kgDOJCPcNg';
export const GITHUB_REPO_URL = pkg.homepage;
export const REPO_NAME = GITHUB_REPO_URL.replace(
  'https://github.com/',
  '',
) as `${string}/${string}`;
