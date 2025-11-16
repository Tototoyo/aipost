// This file provides type declarations for modules and global variables
// that are available in the runtime environment but may not be known to TypeScript.

// This declares the shape of the environment variables exposed by Vite to the client.
// It provides type safety and autocompletion for `import.meta.env`.
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
