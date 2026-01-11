interface ImportMetaEnv {
  readonly NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: string;
  readonly RESEND_API_KEY: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
