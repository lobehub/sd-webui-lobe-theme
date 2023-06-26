import { Icon } from '@lobehub/ui';
import { FooterProps as FProps } from '@lobehub/ui/es/Footer';
import { Bug, FileClock, GitFork, Github } from 'lucide-react';

import { homepage } from '@/../package.json';

export const columns: FProps['columns'] = [
  {
    items: [
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
    ],
    title: 'Resources',
  },
  {
    items: [
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
    ],
    title: 'Community',
  },
  {
    items: [
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
    ],
    title: 'Help',
  },
  {
    items: [
      {
        description: 'AIGC Components',
        openExternal: true,
        title: '🤯 Lobe UI',
        url: 'https://github.com/lobehub/lobe-ui',
      },
      {
        description: 'Chatbot Client',
        openExternal: true,
        title: '🤯 Lobe Chat',
        url: 'https://github.com/lobehub/lobe-chat',
      },
      {
        description: 'Node Flow Editor',
        openExternal: true,
        title: '🤯 Lobe Flow',
        url: 'https://github.com/lobehub/lobe-flow',
      },
      {
        description: 'AI Commit CLI',
        openExternal: true,
        title: '💌 Lobe Commit',
        url: 'https://github.com/lobehub/lobe-commit',
      },
      {
        description: 'Lint Config',
        openExternal: true,
        title: '📐 Lobe Lint',
        url: 'https://github.com/lobehub/lobe-lint',
      },
    ],
    title: 'More Products',
  },
];
