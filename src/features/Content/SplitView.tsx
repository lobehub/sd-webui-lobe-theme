import {consola} from 'consola';
import {memo, useEffect} from 'react';

const Preview = memo(() => {
    useEffect(() => {
        try {
            // tab_txt2img
            const txt2imgToprow = gradioApp().querySelector('#txt2img_toprow') as HTMLDivElement;
            const txt2imgSettings = gradioApp().querySelector('#txt2img_settings') as HTMLDivElement;
            const txt2imgGenerate = gradioApp().querySelector('#txt2img_generate_box') as HTMLDivElement;
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
            const img2imgGenerate = gradioApp().querySelector('#img2img_generate_box') as HTMLDivElement;
            const img2imgPreview = gradioApp().querySelector(
                '#img2img_gallery_container',
            ) as HTMLDivElement;
            if (img2imgSettings && img2imgToprow && img2imgGenerate && img2imgPreview) {
                img2imgSettings.prepend(img2imgToprow);
                img2imgPreview.prepend(img2imgGenerate);
            }

            // extras_img2img
            const extrasGenerate = gradioApp().querySelector('#extras_generate') as HTMLDivElement;
            const extrasPreview = gradioApp().querySelector('#extras_results') as HTMLDivElement;
            if (extrasGenerate && extrasPreview) {
                (extrasPreview?.parentNode as HTMLDivElement).id = '#extras_gallery_container';
                extrasPreview.prepend(extrasGenerate);
            }

            consola.success('🤯 [layout] inject - Split Previewer');
        } catch (error) {
            consola.error('🤯 [layout] inject - Split Previewer', error);
        }
    }, []);

    return null;
});

export default Preview;
