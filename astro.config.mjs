import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@styles": "/src/styles",
        "@layouts": "/src/layouts",
        "@types": "/src/types",
        "@components": "/src/components",
        "@editor": "/src/components/editor",
        "@personalizacion": "/src/components/personalizacion",
        "@public": "/public",
      },
    },
  },
  integrations: [react()],
});
