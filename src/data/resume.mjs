export const profile = {
  name: { zh: '黃鵬展 / Ken Huang', en: 'Ken Huang' },
  handle: '@mabyes1',
  role: 'Software Engineer · Full-stack & AI Application Engineering',
  location: 'Taipei / New Taipei, Taiwan',
  email: 'mabyes1@gmail.com',
  github: 'https://github.com/mabyes1',
  linkedin: 'https://www.linkedin.com/in/%E9%B5%AC%E5%B1%95-%E9%BB%83-7b164c4254/',
  avatar: 'https://avatars.githubusercontent.com/u/124116017?v=4',
  intro: {
    zh: '16 年軟體工程經驗。從商用旅遊 ERP 與 production 問題處理起步，之後長期參與金融業外匯與交易核心系統。近年隨 AI coding tools 成熟，將既有工程經驗延伸到 Full-stack 與 AI Application Engineering，持續把真實需求做成自己每天使用或可公開交付的產品。',
    en: 'Software engineer with 16 years of experience across commercial ERP systems and financial-market infrastructure. In recent years, I have extended that foundation into full-stack and AI application engineering, using modern AI coding tools to turn real operational needs into products I use daily or ship publicly.',
  },
  about: {
    zh: '我的工作方式通常不是先選技術，而是先確認問題、限制與可接受的取捨，再選擇適合的實作方式。AI 在我的開發流程中負責大量 implementation、跨陌生領域探索、重構與除錯協助；我負責問題定義、system boundary、方案選擇、實機驗證、根因判斷與最終品質。',
    en: 'I work problem-first rather than stack-first: define the constraint, choose an appropriate approach, test it against reality, and keep or discard it based on results. AI coding tools handle a large share of implementation, exploration, refactoring, and debugging assistance; I remain responsible for product definition, system boundaries, engineering trade-offs, real-device validation, root-cause reasoning, and final quality.',
  },
};

export const experiences = [
  {
    company: { zh: '台新銀行', en: 'Taishin International Bank' },
    period: '2015–2026',
    title: {
      zh: '高階程式設計師 · 副理職等｜外匯交易部 財務金融核心組',
      en: 'Senior Software Engineer · Assistant Manager grade | FX Trading, Financial Markets Core Systems',
    },
    summary: {
      zh: '超過十年參與外匯交易與金融核心系統開發維護，涵蓋 Murex、MLC、Pre-trade rule、STP、交易額度與多家上手銀行介接。',
      en: 'More than a decade developing and supporting FX trading and financial-market core systems, spanning Murex, MLC, pre-trade rules, STP flows, trading limits, and integrations with multiple counterparty banks.',
    },
    bullets: {
      zh: [
        '主要負責 MLC，並可獨立開發 Pre-trade rule；長期參與 Murex 各類功能與升版工作。',
        '後期建立多條 STP 流程：接收上手銀行 XML 交易確認資料，完成 parse、mapping、格式轉換並自動匯入 Murex；異常以 Email 通知並列出錯誤原因。',
        '介接多家上手銀行，處理 XML、CSV、MQ、Socket、SFTP 等不同交易與批次整合邊界。',
        '離職前仍持續交付新流程，包含 SPARK / TMU 對 Trader 的 BTB 交易自動化。',
        '長期參與 production support、問題定位、資料修正、批次與排程作業，以及 Windows / Linux 伺服器環境維運協作。',
      ],
      en: [
        'Primary owner for MLC, with independent delivery of pre-trade rules and broad long-term involvement across Murex functions and upgrade work.',
        'Built multiple STP flows from the ground up: receive counterparty-bank XML confirmations, parse and map fields, convert formats, and import trades into Murex; failures trigger email notifications with actionable error details.',
        'Integrated with multiple counterparty banks across XML, CSV, MQ, sockets, SFTP, and scheduled/batch boundaries.',
        'Continued delivering new automation near the end of tenure, including SPARK / TMU back-to-back trading flows for traders.',
        'Handled production support, root-cause investigation, data correction, batch/scheduler operations, and cross-team support across Windows and Linux server environments.',
      ],
    },
    technologies: ['C#', 'VB.NET', 'SQL', 'Oracle', 'SQL Server', 'Stored Procedure', 'Windows Service', 'IIS', 'MQ', 'Socket', 'SFTP', 'XML', 'CSV', 'Batch', 'Scheduler', 'Windows Server', 'Linux', 'Git', 'SVN', 'TFS', 'Murex', 'STP'],
  },
  {
    company: { zh: '科威資訊', en: 'Kewei Information' },
    period: '2010–2015',
    title: { zh: 'FAE 組長', en: 'FAE Team Lead' },
    summary: {
      zh: '旅遊資訊 ERP 公司。早期參與 Classic ASP 後端開發與維護，後期帶領 3 人 FAE 團隊處理正式商用系統的 production 問題。',
      en: 'Travel-industry ERP vendor. Started with Classic ASP backend development and maintenance, then led a three-person FAE team responsible for diagnosing and fixing production issues in commercial ERP deployments.',
    },
    bullets: {
      zh: [
        '參與旅遊 ERP 後端功能開發、既有功能維護與客戶正式環境問題處理。',
        '帶領 3 人 FAE 團隊，將 production bug 重現、定位並修復，與開發端及客戶端協作確認結果。',
        '累積長期 application maintenance、商用系統除錯與面對真實使用情境的工程經驗。',
      ],
      en: [
        'Developed and maintained backend functionality for a travel ERP product and supported live customer environments.',
        'Led a three-person FAE team that reproduced, isolated, and fixed production bugs while coordinating verification with development and customer-side users.',
        'Built a foundation in long-lived application maintenance, commercial-system debugging, and engineering against real operational constraints.',
      ],
    },
    technologies: ['Classic ASP', 'SQL', 'Commercial ERP', 'Production Support'],
  },
];

export const professionalStack = ['C#', 'VB.NET', 'Classic ASP', 'SQL', 'Oracle', 'SQL Server', 'Stored Procedure', 'Windows Service', 'IIS', 'MQ', 'Socket', 'SFTP', 'XML', 'CSV', 'Batch', 'Scheduler', 'Windows Server', 'Linux', 'Git', 'SVN', 'TFS', 'Murex', 'STP'];
export const recentStack = ['TypeScript', 'Node.js', 'HTML / CSS', 'WebSocket', 'WebRTC', 'Python', 'PWA', 'Cloudflare', 'GitHub Actions', 'Android', 'ADB', 'MCP', 'AI SDK', 'C# Host'];

export const education = {
  school: { zh: '台北商業技術學院', en: 'National Taipei College of Business' },
  program: { zh: '資訊管理系｜五專、二技', en: 'Department of Information Management | Five-year junior college + two-year technical program' },
};

export const languages = {
  zh: [
    '中文：Native',
    '英文：可閱讀技術文件；written communication 可透過工具輔助，口說與即時對話能力較弱。',
  ],
  en: [
    'Mandarin Chinese: Native',
    'English: Comfortable reading technical documentation; written communication can be tool-assisted. Speaking and spontaneous conversation are more limited.',
  ],
};
