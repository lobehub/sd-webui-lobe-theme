import pkg from '@/../package.json';

export default (genAssets: (path: string) => string) => {
  const manifest = {
    background_color: '#000',
    description: pkg.description,
    display: 'fullscreen',
    icons: [
      {
        purpose: 'any',
        sizes: '192x192',
        src: genAssets('assets/android-chrome-192x192.png'),
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '192x192',
        src: genAssets('assets/android-chrome-maskable-192x192.png'),
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: genAssets('assets/android-chrome-512x512.png'),
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: genAssets('assets/android-chrome-maskable-512x512.png'),
        type: 'image/png',
      },
    ],
    id: '/',
    name: 'Stable Diffusion',
    orientation: 'portrait',
    scope: '/',
    short_name: 'Stable Diffusion',
    splash_pages: null,
    start_url: location.origin,
    theme_color: '#000000',
  };

  return `data:application/manifest+json;base64,${btoa(JSON.stringify(manifest))}`;
};
