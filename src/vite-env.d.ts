/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GOOGLE_CLOUD_REGION?: string;
  readonly VITE_TTS_PREFERRED_ENGINE?: string;
  readonly VITE_TTS_DEFAULT_VOICE?: string;
  readonly VITE_TTS_DEFAULT_QUALITY?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
