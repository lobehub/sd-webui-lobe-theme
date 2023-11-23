const manifest = {
  background_color: '#000000',
  description:
    'The modern theme for stable diffusion webui, exquisite interface design, highly customizable UI, and efficiency boosting features.',
  display: 'standalone',
  icons: [
    {
      sizes: '192x192',
      src: 'https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/android-chrome-192x192.png',
      type: 'image/png',
    },
    {
      sizes: '512x512',
      src: 'https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/android-chrome-512x512.png',
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

export default `data:application/manifest+json;base64,${btoa(JSON.stringify(manifest))}`;
