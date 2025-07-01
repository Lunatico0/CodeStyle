import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@styles": "/src/styles",
        "@layouts": "/src/layouts",
        "@components": "/src/components",
        "@editor": "/src/components/editor",
        "@public": "/public",
      },
    },
  },
  integrations: [react()],
});
