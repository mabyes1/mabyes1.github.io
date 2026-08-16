import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { education, experiences, languages, professionalStack, profile, recentStack } from '../src/data/resume.mjs';
import { featuredProjects, projects } from '../src/data/projects.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const site = 'https://kenhuang.kennyxizi.pp.ua';

const e = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const url = (path) => `${site}${path === '/' ? '/' : path}`;
const tags = (values, limit) => `<div class="tag-list">${values.slice(0, limit ?? values.length).map((x) => `<span>${e(x)}</span>`).join('')}</div>`;
const statuses = (values) => `<div class="status-list">${values.map((x) => `<span class="status-chip">${e(x)}</span>`).join('')}</div>`;
const bullets = (values) => `<ul>${values.map((x) => `<li>${e(x)}</li>`).join('')}</ul>`;

function langPath(lang, path) {
  if (lang === 'zh') return path;
  if (path === '/') return '/en';
  return `/en${path}`;
}

function switchLangPath(lang, path) {
  if (lang === 'zh') return path === '/' ? '/en' : `/en${path}`;
  const without = path.replace(/^\/en(?=\/|$)/, '');
  return without || '/';
}

function base({ lang, title, description, path, body, noindex = false, pageClass = '' }) {
  const htmlLang = lang === 'zh' ? 'zh-TW' : 'en';
  const alt = switchLangPath(lang, path);
  const locale = lang === 'zh' ? 'zh_TW' : 'en_US';
  return `<!doctype html>
<html lang="${htmlLang}" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${e(description)}">
  ${noindex ? '<meta name="robots" content="noindex,nofollow">' : ''}
  <meta name="theme-color" content="#f6f7f4">
  <link rel="canonical" href="${url(path)}">
  <link rel="alternate" hreflang="${lang === 'zh' ? 'en' : 'zh-TW'}" href="${url(alt)}">
  <link rel="alternate" hreflang="x-default" href="${site}/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/assets/styles.css">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(description)}">
  <meta property="og:url" content="${url(path)}">
  <meta property="og:image" content="${site}/og.png">
  <meta property="og:locale" content="${locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${e(title)}">
  <meta name="twitter:description" content="${e(description)}">
  <meta name="twitter:image" content="${site}/og.png">
  <title>${e(title)}</title>
  <script>try{const t=localStorage.getItem('ken-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch{}</script>
</head>
<body class="${e(pageClass)}">
  <a class="skip-link" href="#main">${lang === 'zh' ? '跳到主要內容' : 'Skip to main content'}</a>
  ${body}
  <script>document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;try{localStorage.setItem('ken-theme',n)}catch{}}));</script>
</body>
</html>`;
}

function header(lang, projectPage = false, currentPath = '/') {
  const zh = lang === 'zh';
  return `<header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="${langPath(lang, '/')}"><span class="brand-mark">KH</span><span>Ken Huang</span></a>
      <nav class="main-nav" aria-label="${zh ? '主要導覽' : 'Primary navigation'}">
        <a class="${projectPage ? '' : 'active'}" href="${langPath(lang, '/')}">${zh ? '履歷' : 'Resume'}</a>
        <a class="${projectPage ? 'active' : ''}" href="${langPath(lang, '/projects')}">${zh ? '作品' : 'Projects'}</a>
      </nav>
      <div class="header-actions">
        <a class="text-control" href="${switchLangPath(lang, currentPath)}" hreflang="${zh ? 'en' : 'zh-TW'}">${zh ? 'EN' : '中'}</a>
        <button class="icon-control" type="button" data-theme-toggle aria-label="${zh ? '切換深色模式' : 'Toggle color theme'}">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M12 3a9 9 0 1 0 9 9c0-.47-.04-.93-.1-1.38A7 7 0 0 1 13.38 3.1C12.93 3.04 12.47 3 12 3Z" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function sectionHeading(eyebrow, title, description = '') {
  return `<div class="section-heading"><p class="eyebrow">${e(eyebrow)}</p><h2>${e(title)}</h2>${description ? `<p>${e(description)}</p>` : ''}</div>`;
}

function projectCard(project, lang, compact = false) {
  const href = langPath(lang, `/projects/${project.slug}`);
  return `<article class="project-card${compact ? ' compact' : ''}">
    ${project.image && !compact ? `<a href="${href}" class="project-media" tabindex="-1" aria-hidden="true"><img src="${e(project.image)}" alt="" loading="lazy"></a>` : ''}
    <div class="project-card-body">
      ${statuses(project.status)}
      <h3><a href="${href}">${e(project.name)}</a></h3>
      <p>${e(project.summary[lang])}</p>
      ${tags(project.technologies, compact ? 5 : 6)}
      <a class="inline-link" href="${href}">${lang === 'zh' ? '查看 case study' : 'View case study'} <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function homepage(lang) {
  const zh = lang === 'zh';
  const path = langPath(lang, '/');
  const body = `${header(lang, false, path)}
  <main id="main">
    <section class="hero shell">
      <div class="hero-copy">
        <p class="hero-kicker">${e(profile.role)}</p>
        <h1>${e(profile.name[lang])}</h1>
        <p class="hero-intro">${e(profile.intro[lang])}</p>
        <div class="hero-actions">
          <a class="button primary" href="mailto:${profile.email}">${zh ? 'Email 聯絡' : 'Email me'}</a>
          <a class="button secondary" href="/${zh ? 'resume-zh' : 'resume-en'}.pdf">${zh ? '下載 PDF 履歷' : 'Download PDF resume'}</a>
        </div>
        <div class="hero-links"><a href="${profile.github}" target="_blank" rel="noreferrer">GitHub</a><a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a><span>${e(profile.location)}</span></div>
      </div>
      <div class="identity-card">
        <img class="avatar" src="${profile.avatar}" alt="${zh ? 'Ken Huang 個人照片' : 'Portrait of Ken Huang'}">
        <div><strong>Ken Huang</strong><span>${profile.handle}</span></div>
      </div>
    </section>

    <section class="section shell about-grid">
      ${sectionHeading('About', zh ? '從正式系統一路做到 AI-assisted engineering' : 'From production systems to AI-assisted engineering')}
      <div class="prose-large"><p>${e(profile.about[lang])}</p><p>${e(zh ? '這不是從「AI 做 App」反向包裝成工程經驗。我的底座一直是正式商用系統、金融交易流程與 production support；AI 讓我能更快跨進前端、裝置、串流與各種過去不會主動選的領域。' : 'This is not an “AI made an app” story repackaged as engineering experience. The foundation is production software, financial trading workflows, and operational support; AI has expanded the range of problems I can personally take from idea to working product.')}</p></div>
    </section>

    <section class="section section-tinted"><div class="shell">
      ${sectionHeading('Professional Experience', zh ? '正式工作經驗' : 'Production engineering experience', zh ? '16 年商用軟體與金融核心系統經驗。' : '16 years across commercial software and financial-market core systems.')}
      <div class="timeline">${experiences.map((x) => `<article class="experience-card"><div class="experience-side"><span>${e(x.period)}</span><h3>${e(x.company[lang])}</h3><p>${e(x.title[lang])}</p></div><div class="experience-main"><p class="experience-summary">${e(x.summary[lang])}</p>${bullets(x.bullets[lang])}${tags(x.technologies)}</div></article>`).join('')}</div>
    </div></section>

    <section class="section shell">
      <div class="section-heading-row">${sectionHeading('Featured Projects', zh ? '近年作品' : 'Recent work', zh ? '不是練習專案。這三個都是長期使用、公開交付或持續演進的工程工作。' : 'Not tutorial projects. These are shipped, daily-use, or continuously evolving engineering systems.')}<a class="inline-link desktop-link" href="${langPath(lang, '/projects')}">${zh ? '全部作品' : 'All projects'} →</a></div>
      <div class="featured-grid">${featuredProjects.map((x) => projectCard(x, lang)).join('')}</div>
    </section>

    <section class="section section-tinted"><div class="shell approach-grid">
      ${sectionHeading('Engineering Approach', 'Problem-first, technology-agnostic.')}
      <div class="approach-content">
        <ol class="principle-list">
          <li><strong>01</strong><span>${e(zh ? '先把問題與現實限制講清楚，不先替技術找用途。' : 'Start with the problem and real constraints, not a technology looking for a use case.')}</span></li>
          <li><strong>02</strong><span>${e(zh ? '讓 AI 擴張 implementation 半徑，但技術選擇、取捨與驗證不能外包。' : 'Use AI to expand implementation range without outsourcing technical choices, trade-offs, or validation.')}</span></li>
          <li><strong>03</strong><span>${e(zh ? '用真機、真流程與 production-like 情境驗證；不行就推翻。' : 'Validate with real devices, real workflows, and production-like conditions; discard what does not hold up.')}</span></li>
        </ol>
        <div class="stack-columns"><div><h3>Professional foundation</h3>${tags(professionalStack)}</div><div><h3>Recent hands-on project experience</h3>${tags(recentStack)}</div></div>
      </div>
    </div></section>

    <section class="section shell">${sectionHeading('Selected Projects', zh ? '其他完成作品' : 'Other completed work')}<div class="selected-grid">${projects.filter((x) => !x.featured).map((x) => projectCard(x, lang, true)).join('')}</div></section>

    <section class="section section-tinted"><div class="shell footer-details-grid">
      <div>${sectionHeading('Education', education.school[lang])}<p class="detail-copy">${e(education.program[lang])}</p></div>
      <div>${sectionHeading(zh ? 'Language' : 'Languages', zh ? '語言' : 'Communication')}<ul class="plain-list">${languages[lang].map((x) => `<li>${e(x)}</li>`).join('')}</ul></div>
    </div></section>

    <section class="contact-band"><div class="shell contact-inner"><div><p class="eyebrow">Contact</p><h2>${e(zh ? '如果這些經驗適合你的團隊，歡迎直接聯絡。' : 'If this background fits your team, feel free to reach out.')}</h2></div><div class="contact-links"><a href="mailto:${profile.email}">${profile.email}</a><a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a><a href="${profile.github}" target="_blank" rel="noreferrer">GitHub</a></div></div></section>
  </main>
  <footer class="site-footer"><div class="shell"><span>© 2026 Ken Huang</span><span>${profile.handle}</span></div></footer>`;

  return base({ lang, title: zh ? '黃鵬展 Ken Huang｜Software Engineer' : 'Ken Huang | Software Engineer', description: profile.intro[lang], path, body });
}

function archive(lang) {
  const zh = lang === 'zh';
  const path = langPath(lang, '/projects');
  const body = `${header(lang, true, path)}<main id="main" class="archive-main"><header class="page-hero shell"><p class="eyebrow">Projects Archive</p><h1>${zh ? '完成的東西，都留在這裡。' : 'Completed work lives here.'}</h1><p>${e(zh ? '有些是公開產品，有些是每天使用的私人系統，也有些只是為了解決一個具體問題而存在。不是每個都需要當 flagship，但每個都代表一次從問題到可用結果的完整過程。' : 'Some are public products, some are private systems I use every day, and some exist to solve one narrow problem. Not every project needs to be a flagship; each one represents a complete path from problem to usable result.')}</p></header><section class="section shell"><div class="archive-grid">${projects.map((x) => projectCard(x, lang, true)).join('')}</div></section></main>`;
  return base({ lang, title: zh ? '作品｜黃鵬展 Ken Huang' : 'Projects | Ken Huang', description: zh ? 'Ken Huang 的軟體工程與 AI-assisted engineering 作品集。' : 'Software engineering and AI-assisted engineering projects by Ken Huang.', path, body });
}

function projectDetail(project, lang) {
  const zh = lang === 'zh';
  const path = langPath(lang, `/projects/${project.slug}`);
  const body = `${header(lang, true, path)}<main id="main" class="project-detail-main"><header class="project-hero shell"><a class="back-link" href="${langPath(lang, '/projects')}">← ${zh ? '全部作品' : 'All projects'}</a><div class="project-hero-grid"><div>${statuses(project.status)}<h1>${e(project.name)}</h1><p class="project-lead">${e(project.summary[lang])}</p>${project.links ? `<div class="hero-actions">${project.links.map((x, i) => `<a class="button ${i ? 'secondary' : 'primary'}" href="${e(x.href)}" target="_blank" rel="noreferrer">${e(x.label)}</a>`).join('')}</div>` : ''}</div>${project.image ? `<figure class="detail-media"><img src="${e(project.image)}" alt="${e(project.imageAlt?.[lang] ?? project.name)}"></figure>` : ''}</div></header>
  <div class="shell case-study-grid"><aside class="case-nav"><a href="#problem">Problem</a><a href="#built">What I built</a><a href="#role">My role & AI</a><a href="#engineering">Engineering</a><a href="#evidence">Evidence</a><a href="#tradeoffs">Trade-offs</a></aside><article class="case-study">
    <section id="problem"><p class="eyebrow">Problem</p><h2>${zh ? '為什麼需要它' : 'Why it needed to exist'}</h2><p>${e(project.problem[lang])}</p></section>
    <section id="built"><p class="eyebrow">What I built</p><h2>${zh ? '最後做成什麼' : 'What the product does'}</h2>${bullets(project.built[lang])}</section>
    <section id="role"><p class="eyebrow">My role & AI collaboration</p><h2>${zh ? '我的角色與 AI 分工' : 'My role and the AI-assisted workflow'}</h2><p>${e(project.role[lang])}</p></section>
    <section id="engineering"><p class="eyebrow">Engineering</p><h2>${zh ? '值得談的工程問題' : 'Engineering decisions worth discussing'}</h2>${bullets(project.engineering[lang])}${tags(project.technologies)}</section>
    <section id="evidence" class="evidence-card"><p class="eyebrow">Evidence</p><h2>${zh ? '不是只停在 repo 裡' : 'Evidence beyond the source tree'}</h2><p>${e(project.evidence?.[lang] ?? '')}</p>${project.links ? `<div class="evidence-links">${project.links.map((x) => `<a href="${e(x.href)}" target="_blank" rel="noreferrer">${e(x.label)} ↗</a>`).join('')}</div>` : ''}</section>
    <section id="tradeoffs"><p class="eyebrow">Trade-offs / What I learned</p><h2>${zh ? '實測、推翻與取捨' : 'Testing, discarded ideas, and trade-offs'}</h2>${bullets(project.tradeoffs[lang])}</section>
  </article></div></main>`;
  return base({ lang, title: `${project.name}${zh ? '｜Ken Huang Case Study' : ' | Ken Huang Case Study'}`, description: project.summary[lang], path, body });
}

function printResume(lang) {
  const zh = lang === 'zh';
  const path = `/resume/${lang}`;
  const featured = featuredProjects;
  const body = `<main id="main" class="print-resume">
    <div class="print-page">
      <header class="print-header"><div><h1>${e(profile.name[lang])}</h1><p class="print-role">${e(profile.role)}</p><p>${e(profile.location)} · ${profile.email}</p><p>${profile.github} · ${profile.linkedin}</p></div></header>
      <section><h2>${zh ? '專業摘要' : 'Professional Summary'}</h2><p>${e(profile.intro[lang])}</p><p>${e(profile.about[lang])}</p></section>
      <section><h2>${zh ? '工作經驗' : 'Professional Experience'}</h2>${experiences.map((x) => `<article class="print-experience"><div class="print-row"><h3>${e(x.company[lang])}</h3><strong>${e(x.period)}</strong></div><p class="print-subtitle">${e(x.title[lang])}</p><p>${e(x.summary[lang])}</p>${bullets(x.bullets[lang].slice(0, 4))}</article>`).join('')}</section>
    </div>
    <div class="print-page">
      <div class="print-page-header"><strong>${e(profile.name[lang])}</strong><span>${e(profile.role)}</span></div>
      <section><h2>${zh ? '精選作品' : 'Selected Projects'}</h2>${featured.map((x) => `<article class="print-project"><div class="print-row"><h3>${e(x.name)}</h3><span>${e(x.status.join(' · '))}</span></div><p>${e(x.summary[lang])}</p><p><strong>${zh ? '角色：' : 'Role: '}</strong>${e(x.role[lang])}</p></article>`).join('')}</section>
      <section class="print-two-col"><div><h2>${zh ? '技術基礎' : 'Technical Foundation'}</h2><p>${e(professionalStack.join(' · '))}</p><h2>${zh ? '近期實作' : 'Recent Hands-on'}</h2><p>${e(recentStack.join(' · '))}</p></div><div><h2>Education</h2><p><strong>${e(education.school[lang])}</strong><br>${e(education.program[lang])}</p><h2>${zh ? '語言' : 'Languages'}</h2><p>${languages[lang].map(e).join('<br>')}</p></div></section>
    </div>
  </main>`;
  return base({ lang, title: zh ? '黃鵬展 Ken Huang｜PDF Resume Source' : 'Ken Huang | PDF Resume Source', description: profile.intro[lang], path, body, noindex: true, pageClass: 'resume-source' });
}

async function writeRoute(route, html) {
  const relative = route === '/' ? 'index.html' : join(route.replace(/^\//, ''), 'index.html');
  const target = join(out, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets'), { recursive: true });
await writeFile(join(out, 'assets', 'styles.css'), await readFile(join(root, 'src', 'styles', 'global.css'), 'utf8'), 'utf8');
await cp(join(root, 'public'), out, { recursive: true });

await writeRoute('/', homepage('zh'));
await writeRoute('/en', homepage('en'));
await writeRoute('/projects', archive('zh'));
await writeRoute('/en/projects', archive('en'));
for (const project of projects) {
  await writeRoute(`/projects/${project.slug}`, projectDetail(project, 'zh'));
  await writeRoute(`/en/projects/${project.slug}`, projectDetail(project, 'en'));
}
await writeRoute('/resume/zh', printResume('zh'));
await writeRoute('/resume/en', printResume('en'));

const publicRoutes = ['/', '/en', '/projects', '/en/projects', ...projects.flatMap((p) => [`/projects/${p.slug}`, `/en/projects/${p.slug}`])];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map((x) => `  <url><loc>${url(x)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(out, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`, 'utf8');

console.log(`Built ${publicRoutes.length} public routes + 2 resume sources into ${out}`);
