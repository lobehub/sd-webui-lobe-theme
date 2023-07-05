const manifest = {
  background_color: '#000000',
  display: 'fullscreen',
  icons: [
    {
      sizes: '192x192',
      src: 'https://npm.elemecdn.com/@lobehub/assets-favicons/assets/android-chrome-192x192.png',
      type: 'image/png',
    },
    {
      sizes: '512x512',
      src: 'https://npm.elemecdn.com/@lobehub/assets-favicons/assets/android-chrome-512x512.png',
      type: 'image/png',
    },
  ],
  name: 'Stable Diffusion',
  orientation: 'portrait',
  short_name: 'Stable Diffusion',
  start_url: location.origin,
  theme_color: '#000000',
};

export default `data:application/manifest+json;base64,${btoa(JSON.stringify(manifest))}`;
