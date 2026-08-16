import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const qaDir = path.join(root, 'tmp', 'qa-pages');
const css = await readFile(path.join(dist, 'assets', 'styles.css'), 'utf8');

await mkdir(qaDir, { recursive: true });

const pages = [
  ['home', path.join(dist, 'index.html')],
  ['project-vibedeck', path.join(dist, 'projects', 'vibedeck', 'index.html')],
  ['resume-zh', path.join(dist, 'resume', 'zh', 'index.html')],
  ['resume-en', path.join(dist, 'resume', 'en', 'index.html')],
];

function makeSelfContained(html) {
  return html
    .replace('<link rel="stylesheet" href="/assets/styles.css">', `<style>${css}</style>`)
    .replaceAll('href="/favicon.svg"', 'href=""')
    .replaceAll('href="/resume-zh.pdf"', 'href="#"')
    .replaceAll('href="/resume-en.pdf"', 'href="#"');
}

for (const [name, source] of pages) {
  const html = await readFile(source, 'utf8');
  await writeFile(path.join(qaDir, `${name}.html`), makeSelfContained(html), 'utf8');
}

console.log(`Prepared ${pages.length} self-contained QA pages in ${qaDir}`);
