import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { projects } from '../src/data/projects.mjs';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const required = ['index.html', 'en/index.html', 'projects/index.html', 'en/projects/index.html', 'resume/zh/index.html', 'resume/en/index.html', 'robots.txt', 'sitemap.xml', 'favicon.svg'];
for (const project of projects) {
  required.push(`projects/${project.slug}/index.html`, `en/projects/${project.slug}/index.html`);
}

const errors = [];
for (const file of required) {
  try {
    const text = await readFile(join(dist, file), 'utf8');
    if (file.endsWith('.html')) {
      if (!text.includes('<title>')) errors.push(`${file}: missing title`);
      if (!text.includes('rel="canonical"')) errors.push(`${file}: missing canonical`);
      if (!text.includes('name="description"')) errors.push(`${file}: missing description`);
    }
  } catch { errors.push(`${file}: missing`); }
}

for (const entry of await readdir(dist)) {
  if (entry === 'node_modules') errors.push('node_modules leaked into dist');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checks passed: ${required.length} required outputs present.`);
