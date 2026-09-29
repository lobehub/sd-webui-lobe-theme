/**
 * The theme's tools that are not tied to one panel: the progress hook, tab
 * progress, history capture, LoRA card tools, image buttons under Generate,
 * aspect ratios and suggested settings, and the lazily loaded command
 * palette and history drawer.
 */
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectors, useAppStore } from '@/store';

import { startSingleAccordion } from './accordions';
import { bus } from './bus';
import { startExtraNetworkRail } from './extraNetworkRail';
import { startFolderTree } from './folderTree';
import { startProgressFx } from './progressFx';
import { startGenerationCapture } from './generation';
import { installProgressHook } from './hook';
import { startImageButtons } from './imageButtons';
import { startLoraTools } from './loraTools';
import { startPromptSections } from './promptSections';
import { startSizeTools } from './sizeTools';
import { startStudioLayout } from './studioLayout';
import { startTabProgress } from './tabProgress';

const CommandPalette = lazy(() => import('./CommandPalette'));
const HistoryDrawer = lazy(() => import('./HistoryDrawer'));

const isPaletteShortcut = (event: KeyboardEvent) =>
  (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k';

const Tools = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    if (installProgressHook()) return;
    // progressbar.js not run yet: try again once the UI is up
    onUiLoaded(() => installProgressHook());
  }, []);

  useEffect(() => {
    if (setting.progressBarStyle === 'classic' && setting.resultFrameStyle === 'off') return;
    return startProgressFx({ bar: setting.progressBarStyle, frame: setting.resultFrameStyle });
  }, [setting.progressBarStyle, setting.resultFrameStyle]);

  useEffect(() => {
    if (!setting.extraNetworkFolderTree) return;
    return startFolderTree();
  }, [setting.extraNetworkFolderTree]);

  useEffect(() => {
    if (setting.layoutPreset === 'classic') return;
    return startStudioLayout({
      mirror: setting.layoutPreset === 'studioMirror',
      text: {
        extensions: t('tools.studio.extensions'),
        parameters: t('tools.studio.parameters'),
        prompt: t('tools.studio.prompt'),
      },
    });
  }, [setting.layoutPreset, i18n.language]);

  useEffect(() => {
    if (!setting.enableExtraNetworkSidebar || !setting.extraNetworkTabRail) return;
    return startExtraNetworkRail();
  }, [setting.enableExtraNetworkSidebar, setting.extraNetworkTabRail]);

  useEffect(() => {
    if (!setting.promptSections) return;
    return startPromptSections({
      colors: [theme.colorPrimary, theme.colorSuccess, theme.colorWarning, theme.colorInfo, theme.colorError, theme.colorTextSecondary],
      text: {
        add: t('tools.sections.add'),
        merge: t('tools.sections.merge'),
        section: t('tools.sections.section'),
        toggle: t('tools.sections.toggle'),
        tokens: t('tools.sections.tokens'),
      },
    });
  }, [setting.promptSections, i18n.language]);

  useEffect(() => {
    if (setting.accordionMode !== 'single') return;
    return startSingleAccordion();
  }, [setting.accordionMode]);

  useEffect(() => {
    if (!setting.enableTabProgress) return;
    return startTabProgress({ color: theme.colorPrimary, doneColor: theme.colorSuccess });
  }, [setting.enableTabProgress]);

  useEffect(() => {
    if (!setting.enableHistory && !setting.enableNotification) return;
    return startGenerationCapture({
      history: setting.enableHistory,
      notify: setting.enableNotification,
      notifyTitle: t('tools.notify.done'),
    });
  }, [setting.enableHistory, setting.enableNotification]);

  useEffect(() => {
    if (!setting.enableLoraTools) return;
    return startLoraTools({
      colors: { fill: theme.colorFillTertiary, primary: theme.colorPrimary, primaryLight: theme.colorPrimaryTextHover },
      text: {
        all: t('tools.lora.all'),
        compatible: t('tools.lora.compatible'),
        favorite: t('tools.lora.favorite'),
        favorites: t('tools.lora.favorites'),
        recent: t('tools.lora.recent'),
        triggerWords: t('tools.lora.triggerWords'),
        weight: t('tools.lora.weight'),
      },
    });
  }, [setting.enableLoraTools]);

  useEffect(() => {
    if (!setting.layoutImageButtonsTop) return;
    return startImageButtons();
  }, [setting.layoutImageButtonsTop]);

  useEffect(() => {
    if (!setting.enableSizeTools) return;
    return startSizeTools({
      colors: { border: theme.colorBorder, fill: theme.colorFillQuaternary, primary: theme.colorPrimary },
      text: {
        auto: t('tools.size.auto'),
        base: t('tools.size.base'),
        cfg: t('tools.size.cfg'),
        distilled: t('tools.size.distilled'),
        lock: t('tools.size.lock'),
        noSuggestions: t('tools.size.noSuggestions'),
        ratio: t('tools.size.ratio'),
        steps: t('tools.size.steps'),
        suggested: t('tools.size.suggested'),
      },
    });
  }, [setting.enableSizeTools]);

  useEffect(() => {
    const offPalette = bus.on('open:palette', () => {
      if (!setting.enableCommandPalette) return;
      setPaletteLoaded(true);
      setPaletteOpen(true);
    });
    const offHistory = bus.on('open:history', () => {
      if (!setting.enableHistory) return;
      setHistoryLoaded(true);
      setHistoryOpen(true);
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (!setting.enableCommandPalette || !isPaletteShortcut(event)) return;
      event.preventDefault();
      event.stopPropagation();
      setPaletteLoaded(true);
      setPaletteOpen((value) => !value);
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      offPalette();
      offHistory();
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [setting.enableCommandPalette, setting.enableHistory]);

  return (
    <>
      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette onClose={() => setPaletteOpen(false)} open={paletteOpen} />
        </Suspense>
      )}
      {historyLoaded && (
        <Suspense fallback={null}>
          <HistoryDrawer onClose={() => setHistoryOpen(false)} open={historyOpen} />
        </Suspense>
      )}
    </>
  );
});

export default Tools;
