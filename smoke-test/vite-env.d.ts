/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMPANY_ID?: string;
  readonly VITE_PRIVACY_CENTER_URL?: string;
  readonly VITE_CONSENT_URL?: string;
  readonly VITE_CONSENT_TEMPLATE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
