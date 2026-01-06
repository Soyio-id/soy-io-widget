export type WidgetType = 'privacy-center' | 'consent-box';

export interface SavedConfig {
  name: string;
  privacyConfig: string;
  consentConfig: string;
  activeTab: WidgetType;
  timestamp: number;
}

const STORAGE_PREFIX = 'soyio-smoke-config-';

export const saveConfig = (name: string, privacyConfig: string, consentConfig: string, activeTab: WidgetType): void => {
  const data: SavedConfig = {
    name,
    privacyConfig,
    consentConfig,
    activeTab,
    timestamp: Date.now(),
  };
  localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(data));
};

export const loadConfig = (name: string): SavedConfig | null => {
  const item = localStorage.getItem(`${STORAGE_PREFIX}${name}`);
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error('Failed to parse config', e);
    return null;
  }
};

export const listConfigs = (): string[] => {
  const configs: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      configs.push(key.slice(STORAGE_PREFIX.length));
    }
  }
  return configs.sort();
};

export const deleteConfig = (name: string): void => {
  localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
};
