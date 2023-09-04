import { memo, useEffect } from 'react';

const Preview = memo(() => {
  useEffect(() => {
    console.time('🤯 [layout] inject - Split Previewer');
    // tab_txt2img
    const txt2imgToprow = gradioApp().querySelector('#txt2img_toprow') as HTMLDivElement;
    const txt2imgSettings = gradioApp().querySelector('#txt2img_settings') as HTMLDivElement;
    const txt2imgGenerate = gradioApp().querySelector('#txt2img_generate') as HTMLButtonElement;
    const txt2imgPreview = gradioApp().querySelector(
      '#txt2img_gallery_container',
    ) as HTMLDivElement;
    if (txt2imgToprow && txt2imgSettings && txt2imgGenerate && txt2imgPreview) {
      txt2imgSettings.prepend(txt2imgToprow);
      txt2imgPreview.prepend(txt2imgGenerate);
    }
    // tab_img2img
    const img2imgToprow = gradioApp().querySelector('#img2img_toprow') as HTMLDivElement;
    const img2imgSettings = gradioApp().querySelector('#img2img_settings') as HTMLDivElement;
    const img2imgGenerate = gradioApp().querySelector('#img2img_generate') as HTMLButtonElement;
    const img2imgPreview = gradioApp().querySelector(
      '#img2img_gallery_container',
    ) as HTMLDivElement;
    if (img2imgSettings && img2imgToprow && img2imgGenerate && img2imgPreview) {
      img2imgSettings.prepend(img2imgToprow);
      img2imgPreview.prepend(img2imgGenerate);
    }
    console.timeEnd('🤯 [layout] inject - Split Previewer');
  }, []);

  return null;
});

export default Preview;
