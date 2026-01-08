/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_IMAGE_KIT_ENDPOINT?: string;
  // add other VITE_ variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
