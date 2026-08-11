import type { WebuiSetting } from '@/store/initialState';
import { DEFAULT_SETTING } from '@/store/initialState';

export const SETTING_SCHEMA_VERSION = 1;

export interface LobeSettingExport {
  exportedAt?: string;
  schemaVersion: number;
  setting: WebuiSetting;
}

export const buildSettingExport = (setting: WebuiSetting): LobeSettingExport => ({
  exportedAt: new Date().toISOString(),
  schemaVersion: SETTING_SCHEMA_VERSION,
  setting: { ...DEFAULT_SETTING, ...setting },
});

export const parseSettingImport = (raw: unknown): WebuiSetting => {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid settings file');
  }

  const data = raw as Record<string, unknown>;

  // New format: { schemaVersion, setting }
  if (data.setting && typeof data.setting === 'object') {
    return { ...DEFAULT_SETTING, ...(data.setting as WebuiSetting) };
  }

  // Legacy: flat WebuiSetting object
  if ('i18n' in data || 'enableSidebar' in data || 'primaryColor' in data) {
    return { ...DEFAULT_SETTING, ...(data as unknown as WebuiSetting) };
  }

  throw new Error('Unrecognized settings format');
};

export const downloadSettingJson = (setting: WebuiSetting) => {
  const payload = buildSettingExport(setting);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lobe-theme-settings-v${SETTING_SCHEMA_VERSION}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const readSettingJsonFile = async (file: File): Promise<WebuiSetting> => {
  try {
    const text = await file.text();
    const json = JSON.parse(text);
    return parseSettingImport(json);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse settings');
    }

    throw error instanceof Error ? error : new Error('Failed to read file');
  }
};
