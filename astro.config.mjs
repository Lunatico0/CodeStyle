import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
        "@styles": "/src/styles",
        "@layouts": "/src/layouts",
        "@types": "/src/types",
        "@components": "/src/components",
        "@utils": "/src/utils",
        "@editor": "/src/components/editor",
        "@personalizacion": "/src/components/personalizacion",
        "@public": "/public",
      },
    },
  },
  integrations: [react()],
});
