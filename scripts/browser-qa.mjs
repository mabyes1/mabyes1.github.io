import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = path.join(root, 'tmp');
const qaDir = path.join(tmp, 'qa-pages');
const publicDir = path.join(root, 'public');
const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

const chrome = (await Promise.all(chromeCandidates.map(async (p) => [p, await exists(p)]))).find(([, ok]) => ok)?.[0];
if (!chrome) throw new Error('Chrome or Edge not found.');

await mkdir(tmp, { recursive: true });
await rm(path.join(tmp, 'cdp-profile'), { recursive: true, force: true });
for (const name of ['qa-home-desktop.png', 'qa-home-mobile.png', 'qa-project-desktop.png', 'qa-resume-zh-source.png', 'qa-resume-en-source.png']) {
  await rm(path.join(tmp, name), { force: true });
}

const port = 9333;
const proc = spawn(chrome, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--remote-debugging-address=127.0.0.1',
  `--user-data-dir=${path.join(tmp, 'cdp-profile')}`,
  '--disable-gpu', '--disable-extensions', '--disable-background-networking',
  '--disable-component-update', '--disable-sync', '--no-first-run',
  '--no-default-browser-check', '--allow-file-access-from-files', 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'], windowsHide: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForJson(url, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
    } catch {}
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class Cdp {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id) {
        const pending = this.pending.get(msg.id);
        if (!pending) return;
        this.pending.delete(msg.id);
        if (msg.error) pending.reject(new Error(msg.error.message));
        else pending.resolve(msg.result);
        return;
      }
      const waiters = this.events.get(msg.method);
      if (!waiters?.length) return;
      this.events.delete(msg.method);
      for (const resolve of waiters) resolve(msg.params);
    });
  }
  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId++;
    const promise = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.ws.send(JSON.stringify({ id, method, params }));
    return promise;
  }
  once(method) {
    return new Promise((resolve) => {
      const waiters = this.events.get(method) ?? [];
      waiters.push(resolve);
      this.events.set(method, waiters);
    });
  }
  close() { this.ws.close(); }
}

async function pageClient() {
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`);
  const target = targets.find((item) => item.type === 'page');
  if (!target) throw new Error('No CDP page target found.');
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send('Page.enable');
  return cdp;
}

async function navigate(cdp, url, width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url });
  await Promise.race([loaded, sleep(5000)]);
  await sleep(250);
}

async function screenshot(cdp, htmlFile, outputFile, width, height) {
  await navigate(cdp, pathToFileURL(htmlFile).href, width, height);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(outputFile, Buffer.from(data, 'base64'));
}

async function printPdf(cdp, htmlFile, outputFile) {
  await navigate(cdp, pathToFileURL(htmlFile).href, 1000, 1400);
  const { data } = await cdp.send('Page.printToPDF', { printBackground: true, displayHeaderFooter: false, preferCSSPageSize: true });
  await writeFile(outputFile, Buffer.from(data, 'base64'));
}

try {
  const cdp = await pageClient();
  await screenshot(cdp, path.join(qaDir, 'home.html'), path.join(tmp, 'qa-home-desktop.png'), 1440, 1100);
  await screenshot(cdp, path.join(qaDir, 'home.html'), path.join(tmp, 'qa-home-mobile.png'), 390, 1100);
  await screenshot(cdp, path.join(qaDir, 'project-vibedeck.html'), path.join(tmp, 'qa-project-desktop.png'), 1440, 1100);
  await screenshot(cdp, path.join(qaDir, 'resume-zh.html'), path.join(tmp, 'qa-resume-zh-source.png'), 1000, 1400);
  await screenshot(cdp, path.join(qaDir, 'resume-en.html'), path.join(tmp, 'qa-resume-en-source.png'), 1000, 1400);
  await printPdf(cdp, path.join(qaDir, 'resume-zh.html'), path.join(publicDir, 'resume-zh.pdf'));
  await printPdf(cdp, path.join(qaDir, 'resume-en.html'), path.join(publicDir, 'resume-en.pdf'));
  cdp.close();
  console.log('CDP browser QA generated screenshots and PDF resumes.');
} finally {
  proc.kill('SIGKILL');
  await sleep(200);
  await rm(path.join(tmp, 'cdp-profile'), { recursive: true, force: true });
}

