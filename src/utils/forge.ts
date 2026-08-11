declare global {
  interface Window {
    gradio_config?: { version?: string };
  }
}

const FORGE_MARKERS = ['#forge_ui_preset', '#forge_refresh_checkpoint', '#forge_ui_dtype'] as const;

/**
 * Detect Forge / Forge Neo (Gradio 4 + forge-specific UI).
 * Positive results are cached; negative are not — Gradio may still be hydrating
 * into shadow DOM when main.tsx runs at DOMContentLoaded.
 */
let cachedTrue = false;

const appRoot = (): ParentNode => {
  try {
    if (typeof gradioApp === 'function') {
      const root = gradioApp();
      if (root) return root as unknown as ParentNode;
    }
  } catch {
    /* gradioApp not ready yet */
  }
  return document;
};

const queryInApp = (sel: string): boolean => {
  try {
    if (appRoot().querySelector(sel)) return true;
  } catch {
    /* ignore */
  }
  // Fallback: some builds keep ids in light DOM
  return !!document.querySelector(sel);
};

export const detectForgeNeo = (): boolean => {
  if (cachedTrue) return true;

  const hasForgeUi = FORGE_MARKERS.some((sel) => queryInApp(sel));
  const gradioVersion = window.gradio_config?.version ?? '';
  const isGradio4 = /^4\./.test(gradioVersion);

  // lobe-theme-neo targets Forge Neo: Gradio 4 alone is a strong signal, but
  // prefer concrete forge markers / extra-networks tab when available.
  const detected = hasForgeUi || (isGradio4 && queryInApp('#txt2img_extra_tabs')) || isGradio4;

  if (detected) cachedTrue = true;
  return detected;
};

export const applyForgeDocumentFlag = () => {
  if (detectForgeNeo()) {
    document.documentElement.dataset.lobeForge = 'true';
  }
};
