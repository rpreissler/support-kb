// Render the added page with the desk's own components, server-side, into the static HTML
// the desk will see. Run the two builds from vite.config first:
//   npx vite build --ssr src/routes/kb/incidents/4471-what-it-shows/+page.svx --outDir .ssr
//   CSSBUILD=1 npx vite build
import { render } from 'svelte/server';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const { default: Page } = await import('../.ssr/page.js');
const { body, head } = render(Page);
const css = readFileSync(path.resolve('.css/page.css'), 'utf8');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>#4471 · what it shows · support kb</title>
<style>${css}</style>
</head>
<body>${head}${body}</body>
</html>
`;

const outDir = path.resolve('../rendered/kb/incidents/4471-what-it-shows');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'index.html'), html);
console.log('rendered', outDir + '/index.html', html.length, 'chars');
