import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

// The desk's app is not in this export; this config is the smallest thing that runs
// the desk's own components over the desk's own data, so the page renders the way the
// desk will see it. Layouts and #lib follow the desk's conventions (README.md).
//
// Two passes from one config:
//   npx vite build --ssr src/routes/kb/incidents/4471-what-it-shows/+page.svx --outDir .ssr  → the body
//   CSSBUILD=1 npx vite build                                                                → the stylesheet
// The SSR pass drops CSS (vite behaviour), the client lib pass emits the same class hashes.

const PAGE = 'src/routes/kb/incidents/4471-what-it-shows/+page.svx';

export default defineConfig({
  resolve: {
    alias: [{ find: /^#lib\//, replacement: path.resolve('src/lib') + '/' }],
  },
  plugins: [
    svelte({
      extensions: ['.svelte', '.svx'],
      compilerOptions: { css: 'external' },
      preprocess: [
        mdsvex({
          extension: 'svx',
          layout: {
            runbook: path.resolve('src/lib/layouts/runbook.svelte'),
            default: path.resolve('src/lib/layouts/runbook.svelte'),
          },
        }),
        vitePreprocess(),
      ],
    }),
  ],
  build: process.env.CSSBUILD
    ? { outDir: '.css', lib: { entry: PAGE, formats: ['es'], fileName: 'page' }, cssCodeSplit: false }
    : { outDir: '.ssr', rollupOptions: { output: { entryFileNames: 'page.js' } } },
});
