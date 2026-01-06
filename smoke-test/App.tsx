import React, { useState, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { WidgetPreview } from './WidgetPreview';
import appearanceSchema from './appearance-schema.json';

const COMPANY_ID = (import.meta as any).env.VITE_COMPANY_ID || 'com_test';
const PRIVACY_CENTER_URL = (import.meta as any).env.VITE_PRIVACY_CENTER_URL || 'http://localhost:5173';
const CONSENT_URL = (import.meta as any).env.VITE_CONSENT_URL || 'http://localhost:5173';
const CONSENT_TEMPLATE_ID = (import.meta as any).env.VITE_CONSENT_TEMPLATE_ID || 'constpl_test';

const DEFAULT_PRIVACY_CENTER_CONFIG = {
  companyId: COMPANY_ID,
  isSandbox: true,
  developmentUrl: PRIVACY_CENTER_URL, // Default to local privacy-center
  appearance: {
    variables: {
      colorPrimary: '#E81E2B',
      fontFamily: 'Ubuntu sans, sans-serif',
      borderRadius: '0.25rem',
      colorBackground: '#ffffff',
    },
    rules: {
      '.Button': {
        fontWeight: 'bold',
        padding: '12px 24px',
      },
      '.Input': {
        borderColor: '#E81E2B',
      },
    },
  },
};

const DEFAULT_CONSENT_BOX_CONFIG = {
  consentTemplateId: CONSENT_TEMPLATE_ID,
  isSandbox: true,
  developmentUrl: CONSENT_URL, // Default to local privacy-center
  appearance: {
    variables: {
      colorPrimary: '#E81E2B',
      fontFamily: 'Ubuntu sans, sans-serif',
      borderRadius: '0.25rem',
      colorBackground: '#ffffff',
    },
    rules: {
      '.CheckboxInput': {
        borderRadius: '4px',
        borderColor: '#E81E2B',
      },
    },
  },
};

type WidgetType = 'privacy-center' | 'consent-box';

const App: React.FC = () => {
  const [widgetType, setWidgetType] = useState<WidgetType>('privacy-center');
  const [jsonValue, setJsonValue] = useState(JSON.stringify(DEFAULT_PRIVACY_CENTER_CONFIG, null, 2));
  const [error, setError] = useState<string | null>(null);

  const config = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonValue);
      setError(null);
      return parsed;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [jsonValue]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setJsonValue(value);
    }
  };

  const handleWidgetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as WidgetType;
    setWidgetType(newType);
    if (newType === 'privacy-center') {
      setJsonValue(JSON.stringify(DEFAULT_PRIVACY_CENTER_CONFIG, null, 2));
    } else {
      setJsonValue(JSON.stringify(DEFAULT_CONSENT_BOX_CONFIG, null, 2));
    }
  };

  const beforeMount = (monaco: any) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'soyio-appearance-schema.json',
          fileMatch: ['*'],
          schema: appearanceSchema,
        },
      ],
    });
  };

  return (
    <div className="container">
      <div className="editor-pane">
        <div className="header">
          <h1>Widget customization smoke test</h1>
          <div className="controls">
            <select value={widgetType} onChange={handleWidgetTypeChange}>
              <option value="privacy-center">Privacy Center</option>
              <option value="consent-box">Consent Box</option>
            </select>
          </div>
          <p>Edit the configuration below to see changes in the preview.</p>
        </div>
        {error && <div className="error-banner">JSON Error: {error}</div>}
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="light"
            value={jsonValue}
            onChange={handleEditorChange}
            beforeMount={beforeMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>
      </div>
      <div className="preview-pane">
        {config ? (
          <WidgetPreview config={config} widgetType={widgetType} />
        ) : (
          <div style={{ color: '#999' }}>Fix JSON to see preview</div>
        )}
      </div>
    </div>
  );
};

export default App;
