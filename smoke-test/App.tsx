import React, { useState, useMemo, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { WidgetPreview, WidgetPreviewHandle } from './WidgetPreview';
import configSchema from '../src/schemas/config.schema.json';
import { saveConfig, loadConfig, listConfigs, deleteConfig, exportConfigs, importConfigs, WidgetType } from './storage';
import type { SoyioAppearance } from '../src/embeds/appearance/types';

const COMPANY_ID = import.meta.env.VITE_COMPANY_ID || 'com_test';
const PRIVACY_CENTER_URL = import.meta.env.VITE_PRIVACY_CENTER_URL || 'http://localhost:5173';
const CONSENT_URL = import.meta.env.VITE_CONSENT_URL || 'http://localhost:5173';
const CONSENT_TEMPLATE_ID = import.meta.env.VITE_CONSENT_TEMPLATE_ID || 'constpl_test';

const DEFAULT_PRIVACY_CENTER_CONFIG = {
  companyId: COMPANY_ID,
  isSandbox: true,
  demo: true,
  developmentUrl: PRIVACY_CENTER_URL, // Default to local privacy-center
  appearance: {
    variables: {
      borderRadius: '0.25rem',
      colorBackground: '#ffffff',
    },
    rules: {
      '.Button': {
        fontWeight: 'bold',
        padding: '12px 24px',
      }
    },
  },
};

const DEFAULT_CONSENT_BOX_CONFIG = {
  consentTemplateId: CONSENT_TEMPLATE_ID,
  isSandbox: true,
  developmentUrl: CONSENT_URL, // Default to local privacy-center
  appearance: {
    variables: {
      borderRadius: '0.25rem',
      colorBackground: '#ffffff',
    },
    rules: {
      '.CheckboxInput': {
        borderRadius: '4px'
      },
    },
  },
};

type ViewportMode = 'desktop' | 'mobile';
type EditorMode = 'config' | 'appearance';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WidgetType>('privacy-center');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [editorMode, setEditorMode] = useState<EditorMode>('appearance');

  // State for both configurations
  const [privacyJson, setPrivacyJson] = useState(JSON.stringify(DEFAULT_PRIVACY_CENTER_CONFIG, null, 2));
  const [consentJson, setConsentJson] = useState(JSON.stringify(DEFAULT_CONSENT_BOX_CONFIG, null, 2));

  // Separate appearance state for live editing
  const [privacyAppearanceJson, setPrivacyAppearanceJson] = useState(
    JSON.stringify(DEFAULT_PRIVACY_CENTER_CONFIG.appearance, null, 2)
  );
  const [consentAppearanceJson, setConsentAppearanceJson] = useState(
    JSON.stringify(DEFAULT_CONSENT_BOX_CONFIG.appearance, null, 2)
  );

  const [error, setError] = useState<string | null>(null);

  // Ref to the widget for direct appearance updates
  const widgetRef = useRef<WidgetPreviewHandle>(null);

  // Storage state
  const [savedConfigs, setSavedConfigs] = useState<string[]>(listConfigs());
  const [configName, setConfigName] = useState('');
  const [currentPreset, setCurrentPreset] = useState<string | null>(null);

  // Determine current active config and setter based on widget tab
  const currentJson = activeTab === 'privacy-center' ? privacyJson : consentJson;
  const setCurrentJson = activeTab === 'privacy-center' ? setPrivacyJson : setConsentJson;
  const currentAppearanceJson = activeTab === 'privacy-center' ? privacyAppearanceJson : consentAppearanceJson;
  const setCurrentAppearanceJson = activeTab === 'privacy-center' ? setPrivacyAppearanceJson : setConsentAppearanceJson;

  // The config used for mounting the widget (only changes when in config mode)
  const config = useMemo(() => {
    try {
      const parsed = JSON.parse(currentJson);
      setError(null);
      return parsed;
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error parsing JSON');
      }
      return null;
    }
  }, [currentJson]);

  // Handle config editor changes (causes remount)
  const handleConfigEditorChange = (value: string | undefined) => {
    if (value) {
      setCurrentJson(value);
      // Sync appearance state when config changes
      try {
        const parsed = JSON.parse(value);
        if (parsed.appearance) {
          setCurrentAppearanceJson(JSON.stringify(parsed.appearance, null, 2));
        }
      } catch {
        // Ignore parse errors during editing
      }
    }
  };

  // Handle appearance editor changes (live update, no remount)
  const handleAppearanceEditorChange = useCallback((value: string | undefined) => {
    if (!value) return;

    setCurrentAppearanceJson(value);

    try {
      const appearance = JSON.parse(value) as SoyioAppearance;
      setError(null);

      // Call updateAppearance directly on the widget
      if (widgetRef.current) {
        widgetRef.current.updateAppearance(appearance);
      }
      // Note: We intentionally do NOT update currentJson here to avoid remounting
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error parsing JSON');
      }
    }
  }, [setCurrentAppearanceJson]);

  // Storage handlers
  const handleSaveConfig = () => {
    if (!configName.trim()) {
      alert('Please enter a preset name');
      return;
    }
    saveConfig(configName, privacyJson, consentJson, activeTab);
    setSavedConfigs(listConfigs());
    setCurrentPreset(configName);
    setConfigName('');
  };

  const handleUpdateConfig = () => {
    if (!currentPreset) return;
    saveConfig(currentPreset, privacyJson, consentJson, activeTab);
    setSavedConfigs(listConfigs());
  };

  const handleLoadConfig = (name: string) => {
    const saved = loadConfig(name);
    if (saved) {
      setCurrentPreset(name);

      // If in appearance mode, only update appearance (no widget reset)
      if (editorMode === 'appearance') {
        try {
          const parsed = JSON.parse(
            saved.activeTab === 'privacy-center' ? saved.privacyConfig : saved.consentConfig
          );
          if (parsed.appearance) {
            setCurrentAppearanceJson(JSON.stringify(parsed.appearance, null, 2));
            // Apply appearance live
            if (widgetRef.current) {
              widgetRef.current.updateAppearance(parsed.appearance);
            }
          }
          // Also sync the background full config state (won't trigger remount)
          setPrivacyJson(saved.privacyConfig);
          setConsentJson(saved.consentConfig);
        } catch {
          // Ignore parse errors
        }
      } else {
        // In config mode, load everything (causes remount)
        setPrivacyJson(saved.privacyConfig);
        setConsentJson(saved.consentConfig);
        setActiveTab(saved.activeTab);
        // Sync appearance state
        try {
          const privacyParsed = JSON.parse(saved.privacyConfig);
          if (privacyParsed.appearance) {
            setPrivacyAppearanceJson(JSON.stringify(privacyParsed.appearance, null, 2));
          }
          const consentParsed = JSON.parse(saved.consentConfig);
          if (consentParsed.appearance) {
            setConsentAppearanceJson(JSON.stringify(consentParsed.appearance, null, 2));
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  };

  const handleDeleteConfig = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    deleteConfig(name);
    setSavedConfigs(listConfigs());
    if (currentPreset === name) {
      setCurrentPreset(null);
    }
  };

  const handleExportConfigs = () => {
    exportConfigs();
  };

  const handleImportConfigs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const count = await importConfigs(file);
      setSavedConfigs(listConfigs());
      alert(`Successfully imported ${count} preset(s)`);
    } catch (error) {
      alert(`Failed to import presets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Reset input so the same file can be imported again
    e.target.value = '';
  };

  // Create appearance-only schema by extracting SoyioAppearance definition
  const appearanceOnlySchema = useMemo(() => ({
    $schema: 'http://json-schema.org/draft-07/schema#',
    $ref: '#/definitions/SoyioAppearance',
    definitions: configSchema.definitions,
  }), []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beforeMount = useCallback((monaco: any) => {
    const schema = editorMode === 'appearance' ? appearanceOnlySchema : configSchema;
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: editorMode === 'appearance' ? 'soyio-appearance-only.json' : 'soyio-config.json',
          fileMatch: ['*'],
          schema,
        },
      ],
    });
  }, [editorMode, appearanceOnlySchema]);

  return (
    <div className="container">
      <div className="editor-pane">
        <div className="header">
          <h1>Soyio Widget appearance API test</h1>
          <p className="subtitle">Configure and preview widget appearance and behavior.</p>

        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'privacy-center' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy-center')}
          >
            Privacy Center
          </button>
          <button
            className={`tab ${activeTab === 'consent-box' ? 'active' : ''}`}
            onClick={() => setActiveTab('consent-box')}
          >
            Consent Box
          </button>
        </div>

        <div className="editor-mode-toggle">
          <button
            className={`editor-mode-btn ${editorMode === 'appearance' ? 'active' : ''}`}
            onClick={() => setEditorMode('appearance')}
          >
            Appearance Only
            <span className="live-badge">Live</span>
          </button>
          <button
            className={`editor-mode-btn ${editorMode === 'config' ? 'active' : ''}`}
            onClick={() => setEditorMode('config')}
          >
            Full Config
          </button>
        </div>

        {error && <div className="error-banner">JSON Error: {error}</div>}
        <div className="editor-container">
          <Editor
            key={`${activeTab}-${editorMode}`} // Force re-mount on tab or mode switch
            height="100%"
            defaultLanguage="json"
            theme="light"
            value={editorMode === 'config' ? currentJson : currentAppearanceJson}
            onChange={editorMode === 'config' ? handleConfigEditorChange : handleAppearanceEditorChange}
            beforeMount={beforeMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        <div className="presets-section">
          <div className="presets-header">
            <h4>Presets</h4>
            {currentPreset && (
              <span className="current-preset">Current: <strong>{currentPreset}</strong></span>
            )}
          </div>
          <div className="presets-list">
            {savedConfigs.map(name => (
              <div key={name} className={`preset-item ${currentPreset === name ? 'active' : ''}`}>
                <button onClick={() => handleLoadConfig(name)} className="btn-preset">{name}</button>
                <button onClick={(e) => handleDeleteConfig(e, name)} className="btn-delete" title="Delete">×</button>
              </div>
            ))}
          </div>
          <div className="save-preset-row">
            {currentPreset && (
              <button onClick={handleUpdateConfig} className="btn-update">Update "{currentPreset}"</button>
            )}
            <input
              type="text"
              placeholder="New preset name"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              className="config-input"
            />
            <button onClick={handleSaveConfig} className="btn-save">Save New</button>
          </div>
          <div className="import-export-row">
            <button onClick={handleExportConfigs} className="btn-export" disabled={savedConfigs.length === 0}>
              Export All Presets
            </button>
            <label className="btn-import">
              Import Presets
              <input
                type="file"
                accept="application/json,.json"
                onChange={handleImportConfigs}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="preview-pane">
        <div className="preview-header">
          <div className="viewport-toggle">
            <button
              className={`viewport-btn ${viewport === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewport('desktop')}
              title="Desktop view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Desktop
            </button>
            <button
              className={`viewport-btn ${viewport === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewport('mobile')}
              title="Mobile view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
              </svg>
              Mobile
            </button>
          </div>
          <span className="viewport-label">
            {viewport === 'mobile' ? '390px' : 'Full width'}
          </span>
        </div>
        <div className={`preview-container ${viewport}`}>
          {config ? (
            <WidgetPreview ref={widgetRef} config={config} widgetType={activeTab} />
          ) : (
            <div style={{ color: '#999' }}>Fix JSON to see preview</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
