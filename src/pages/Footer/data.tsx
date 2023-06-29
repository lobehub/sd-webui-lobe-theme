import { Icon } from '@lobehub/ui';
import { Bug, FileClock, GitFork, Github } from 'lucide-react';

import { homepage } from '@/../package.json';

export const Resources = [
  {
    description: 'AUTOMATIC111',
    openExternal: true,
    title: 'Stable Diffusion Webui',
    url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
  },
  {
    description: 'WebUI extension',
    openExternal: true,
    title: 'Controlnet',
    url: 'https://github.com/Mikubill/sd-webui-controlnet',
  },
  {
    description: 'Art models',
    openExternal: true,
    title: 'Civitai',
    url: 'https://civitai.com/',
  },
  {
    description: 'Artist Inspired Styles',
    openExternal: true,
    title: 'Cheat Sheet',
    url: 'https://supagruen.github.io/StableDiffusion-CheatSheet',
  },
  {
    description: 'Image Resizing',
    openExternal: true,
    title: 'Birme',
    url: 'https://www.birme.net/?target_width=512&target_height=512',
  },
];

export const Community = [
  {
    icon: <Icon icon={Bug} size="small" />,
    openExternal: true,
    title: 'Report Bug',
    url: `${homepage}/issues/new/choose`,
  },
  {
    icon: <Icon icon={GitFork} size="small" />,
    openExternal: true,
    title: 'Request Feature',
    url: `${homepage}/issues/new/choose`,
  },
];

export const Help = [
  {
    icon: <Icon icon={Github} size="small" />,
    openExternal: true,
    title: 'GitHub',
    url: homepage,
  },
  {
    icon: <Icon icon={FileClock} size="small" />,
    openExternal: true,
    title: 'Changelog',
    url: `${homepage}/blob/main/CHANGELOG.md`,
  },
];

export const MoreProducts = [
  {
    description: 'Minifier ExtraNetwrok Covers',
    openExternal: true,
    title: '✂️ Cover Minifier',
    url: 'https://github.com/canisminor1990/sd-webui-cover-minifier',
  },
  {
    description: 'AIGC Components',
    openExternal: true,
    title: '🤯 Lobe UI',
    url: 'https://github.com/lobehub/lobe-ui',
  },
  {
    description: 'AI Commit CLI',
    openExternal: true,
    title: '💌 Lobe Commit',
    url: 'https://github.com/lobehub/lobe-commit',
  },
];
