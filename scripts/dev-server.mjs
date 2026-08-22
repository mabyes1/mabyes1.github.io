import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { spawn } from 'node:child_process';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const dist = join(root, 'dist');
const port = Number(process.env.PORT || 4321);
const host = process.env.HOST || '0.0.0.0';

await new Promise((resolve, reject) => {
  const build = spawn(process.execPath, [join(root, 'scripts', 'build.mjs')], { stdio: 'inherit' });
  build.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`Build failed: ${code}`)));
});

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg' };

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
    let target = normalize(join(dist, pathname));
    if (!target.startsWith(dist)) throw new Error('Bad path');
    let info;
    try { info = await stat(target); } catch {}
    if (!info || info.isDirectory()) target = join(target, 'index.html');
    const data = await readFile(target);
    res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}).listen(port, host, () => {
  console.log(`Resume site listening on ${host}:${port}`);
  console.log(`Local: http://127.0.0.1:${port}`);
});
