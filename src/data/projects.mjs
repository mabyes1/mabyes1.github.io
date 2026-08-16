export const projects = [
  {
    slug: 'vibedeck',
    name: 'VibeDeck',
    featured: true,
    status: ['Public Release'],
    summary: {
      zh: '把閒置手機、平板與其他瀏覽器裝置變成 Windows 真實第二螢幕，或可自訂的資訊面板。',
      en: 'Turns spare phones, tablets, and other browser-capable devices into a real Windows display or a customizable information deck.',
    },
    problem: {
      zh: '我想要一塊不佔主螢幕、但可以隨時看到 Agent 狀態、AI 額度、系統資訊與通知的小螢幕。與其再買一塊硬體，決定先利用桌上已經閒置的手機與平板。',
      en: 'I wanted a glanceable place for agent status, AI quota, system telemetry, and notifications without consuming a main monitor. Instead of buying another dedicated display, I repurposed spare phones and tablets already on the desk.',
    },
    built: {
      zh: [
        'Windows Host + browser client，副裝置不需要安裝 App。',
        'Display 模式建立／使用真實 Windows display，透過 WebRTC 傳送畫面並回傳輸入。',
        'Deck 模式直接在裝置瀏覽器執行 HTML / CSS / JavaScript，適合原生解析度資訊面板。',
        '內建 AI quota、system sideboard、Windows notification 與 custom Deck，並提供 Windows installer。',
      ],
      en: [
        'Windows Host plus browser client, with no secondary-device app required.',
        'Display mode uses a real Windows display, streams it over WebRTC, and relays input back to Windows.',
        'Deck mode runs ordinary HTML/CSS/JavaScript directly in the device browser for native-resolution small-screen interfaces.',
        'Ships with AI quota, system sideboard, Windows notification views, custom Decks, and a Windows installer.',
      ],
    },
    role: {
      zh: '我定義產品方向、裝置與 Windows 邊界、功能取捨、實機測試方式與最終 UX；ChatGPT、Codex、Claude 等 AI 工具協助架構探索、大量 implementation、重構與除錯。實機測試曾多次推翻看似合理但延遲或相容性不佳的方案。',
      en: 'I defined the product, device/Windows boundaries, feature trade-offs, validation strategy, and final UX. ChatGPT, Codex, Claude, and other AI tools assisted with architecture exploration, implementation, refactoring, and debugging. Real-device tests repeatedly rejected approaches that looked sound on paper but failed on latency or compatibility.',
    },
    engineering: {
      zh: [
        '同一裝置支援兩條不同 rendering path：Windows pixel streaming 與 browser-native Deck。',
        '針對手機、平板、BOOX 與不同效能裝置進行實機 responsive / streaming 驗證。',
        '把 installer、信任／配對、Host 資料目錄與 release flow 一併視為產品的一部分，而非只做 demo。',
      ],
      en: [
        'Two rendering paths coexist on one device: Windows pixel streaming and browser-native Decks.',
        'Validated responsive behavior and streaming on phones, tablets, BOOX devices, and low-powered hardware.',
        'Treated installer, pairing/trust, Host data layout, and release flow as product requirements rather than demo leftovers.',
      ],
    },
    tradeoffs: {
      zh: [
        'WebRTC 並不是所有畫面的最佳答案。資訊面板改走 browser-native Deck，可避免視訊編碼並保持文字銳利。',
        '曾研究更快的替代串流路線，但實測沒有優於現有方案，因此撤回，而不是為了新技術硬留。',
        '低階舊裝置的硬體能力會成為 streaming 上限，必要時降低 FPS 比增加複雜架構更有效。',
      ],
      en: [
        'WebRTC is not the right answer for every surface. Browser-native Decks avoid video encoding and keep text crisp for information panels.',
        'I explored alternate lower-latency streaming paths, but real tests did not beat the existing approach, so the experiment was dropped rather than preserved for novelty.',
        'On old low-powered devices, hardware is often the limiting factor; reducing FPS can be more effective than adding architectural complexity.',
      ],
    },
    technologies: ['C# / .NET 8', 'Windows Host', 'WebRTC', 'HTML / CSS / JS', 'WebSocket', 'Windows Virtual Display', 'Inno Setup', 'Playwright'],
    links: [
      { label: 'GitHub', href: 'https://github.com/mabyes1/VibeDeck' },
      { label: 'Latest release', href: 'https://github.com/mabyes1/VibeDeck/releases/latest' },
    ],
    image: 'https://raw.githubusercontent.com/mabyes1/VibeDeck/main/docs/assets/realshots/real-display.png',
    imageAlt: { zh: 'VibeDeck 在閒置平板上執行 Windows 真實第二螢幕', en: 'VibeDeck running a real Windows display on a spare tablet' },
    evidence: {
      zh: '公開 Windows release；repo 內提供真實產品與實機截圖、安裝流程與 product-flow 測試。',
      en: 'Public Windows release with real product/device captures, installer flow, and product-flow validation in the repository.',
    },
  },
  {
    slug: 'cli-monitor-v2',
    name: 'CLI Monitor v2',
    featured: true,
    status: ['Daily Use', 'Private', 'Case Study'],
    summary: {
      zh: '我每天使用的 AI coding control plane：管理多種 stateful AI CLI、PTY、遠端訊息通道、排程、process lifecycle 與 Web Control Dashboard。',
      en: 'A daily-use control plane for stateful AI coding CLIs, PTYs, remote messaging channels, scheduled jobs, process lifecycle, and browser-based operator control.',
    },
    problem: {
      zh: '一開始只是想在離開開發電腦時，仍能透過 Discord / Telegram 操作 AI coding CLI。實際使用後發現真正難題不是「轉發文字」，而是保留 PTY、native session、queue、權限、排程與人工 takeover 的狀態。',
      en: 'It started as a way to operate AI coding CLIs through Discord and Telegram while away from the development PC. The hard part turned out not to be forwarding text, but preserving PTY state, native sessions, queues, permissions, scheduling, and a clean human-takeover boundary.',
    },
    built: {
      zh: [
        '支援 7 種 AI CLI adapter，每個 instance 保有獨立 PTY 與 native session。',
        'Discord / Telegram transport、FIFO turn queue、session attribution 與 scheduled turns。',
        'Password-protected Control Hub，包含 session 管理、multi-session split view、web terminal 與 browser direct input。',
        'PM2 process projection 與 code-defined service templates，避免任意遠端 process execution。',
      ],
      en: [
        'Seven AI CLI adapters, each retaining an isolated PTY and native session.',
        'Discord / Telegram transports, FIFO turn queue, session attribution, and scheduled turns.',
        'Password-protected Control Hub with session management, multi-session split view, web terminal, and direct browser input.',
        'PM2 process projection and code-defined service templates rather than arbitrary remote process execution.',
      ],
    },
    role: {
      zh: '這是私人 production tool。我的主要工作是持續把每天真的遇到的故障模式與操作痛點轉成 system boundary、state model、驗證條件與安全限制；AI coding agents 協助大量 TypeScript implementation、測試、重構與案例整理。',
      en: 'This is a private production tool. I continuously turn failures and operational friction from daily use into system boundaries, state models, validation rules, and security constraints; AI coding agents assist heavily with TypeScript implementation, tests, refactoring, and case-study preparation.',
    },
    engineering: {
      zh: [
        'Domain layer 擁有 identity、turn state、queueing、completion 與 attribution；transport、PTY、session store、PM2 與 filesystem 放在 ports 後面。',
        '目前公開工程證據：402 tests pass / 0 fail、90.92% line coverage、79.33% branch coverage、83.38% function coverage。',
        'Production dependency audit 為 0 vulnerabilities；實際 CLI canary 與 deployment probe 與 unit tests 分開。',
      ],
      en: [
        'The domain layer owns identity, turn state, queueing, completion, and attribution; transports, PTYs, session stores, PM2, and filesystem behavior remain behind ports.',
        'Current public evidence: 402 tests pass / 0 fail, 90.92% line coverage, 79.33% branch coverage, and 83.38% function coverage.',
        'Production dependency audit reports zero vulnerabilities; real-CLI canaries and deployment probes remain separate from unit tests.',
      ],
    },
    tradeoffs: {
      zh: [
        '不把 stateful CLI 壓成 stateless request/response API，避免丟掉 TUI、權限與 session 行為。',
        '公開 repo 只放 sanitized case study 與 interactive demo，production source、對話、路徑與 topology 保持 private。',
        'Web 端 process control 只允許 code-defined templates；看得到 unmanaged PM2 process，但不能遠端控制或讀 log。',
      ],
      en: [
        'Stateful CLIs are not flattened into stateless request/response APIs, preserving TUI, permission, and session behavior.',
        'The public repository contains a sanitized case study and interactive demo while production source, conversations, paths, and topology remain private.',
        'Browser-side process control is restricted to code-defined templates; unmanaged PM2 processes are visible but not controllable and their logs are not exposed.',
      ],
    },
    technologies: ['TypeScript', 'Node.js 22', 'PTY', 'Discord', 'Telegram', 'PM2', 'WebSocket', 'Testing'],
    links: [
      { label: 'Public case study', href: 'https://github.com/mabyes1/cli-monitor-v2-demo' },
      { label: 'Interactive demo', href: 'https://mabyes1.github.io/cli-monitor-v2-demo/' },
    ],
    image: 'https://raw.githubusercontent.com/mabyes1/cli-monitor-v2-demo/main/assets/architecture.svg',
    imageAlt: { zh: 'CLI Monitor v2 脫敏架構圖', en: 'Sanitized CLI Monitor v2 architecture diagram' },
    evidence: {
      zh: 'Private daily-use system；公開 repo 提供脫敏架構、interactive demo 與可驗證測試數據。',
      en: 'Private daily-use system with a public sanitized architecture, interactive demo, and verifiable engineering evidence.',
    },
  },
  {
    slug: 'coding-tools-mcp',
    name: 'coding-tools MCP',
    featured: true,
    status: ['Private', 'Internal Tool', 'Case Study'],
    summary: {
      zh: '把既有 MCP tooling 長期大量客製成個人 AI engineering collaboration layer，讓 conversational AI 能安全地碰本機 workspace、shell、裝置與工程環境。',
      en: 'A heavily customized MCP toolset evolved into a personal AI engineering collaboration layer that connects conversational AI with local workspaces, shells, devices, and development environments.',
    },
    problem: {
      zh: '最初只是希望 Web ChatGPT 能直接操作本機開發環境。長期使用後，真正需求逐漸變成：讓對話型 AI、Codex / coding agents、本機 execution 與真人操作形成一個可協作、可診斷、可交棒的工程流程。',
      en: 'The initial goal was simply to let web ChatGPT interact with a local development environment. With daily use, the real requirement became a collaboration loop spanning conversational AI, coding agents, local execution, devices, diagnostics, and explicit human handoff.',
    },
    built: {
      zh: [
        'Filesystem、shell、execution session、Git 與 workspace 操作橋接。',
        'ADB / device interaction，讓 AI 可直接針對實機做安裝、log、screenshot 與驗證。',
        'Session lifecycle、health / diagnostics 與 execution environment introspection。',
        'HUMAN_HELP_ME human-in-the-loop escalation：遇到 GUI、UAC、登入或實體操作時，將最小必要動作交給真人。',
      ],
      en: [
        'Bridges filesystem, shell, execution sessions, Git, and workspace operations.',
        'ADB/device interaction enables installation, logs, screenshots, and validation against real hardware.',
        'Adds session lifecycle, health/diagnostics, and execution-environment introspection.',
        'HUMAN_HELP_ME provides explicit human-in-the-loop escalation for GUI, UAC, authentication, or physical-device steps.',
      ],
    },
    role: {
      zh: '不是從零建立。我以既有 repo 為起點，在長期真實使用中持續定義痛點、要求修改 tool contract、驗證模型是否真的會用，並把失敗模式回灌成 diagnostics、session lifecycle 與 human escalation。AI agents 協助 implementation。',
      en: 'This was not built from scratch. I started from existing MCP tooling and, through sustained real use, kept redefining tool contracts around actual model failure modes, then validating whether the changes improved collaboration. AI coding agents assisted with implementation.',
    },
    engineering: {
      zh: [
        '核心不是「多幾個 shell tool」，而是讓模型能先知道 server、workspace、權限、active sessions 與 environment 狀態，再決定下一步。',
        '避免 AI 在權限／Session／GUI 問題上長時間繞路；可辨識真人處理更快的邊界並主動 escalation。',
        '工具設計同時考慮 one-shot execution、自清 session、persistent session 條件與 retained output。',
      ],
      en: [
        'The important layer is not “more shell tools,” but giving the model explicit server, workspace, permission, session-pressure, and environment state before it acts.',
        'The workflow avoids long agent detours around permissions, desktop sessions, or GUI boundaries and escalates when a human is the faster execution node.',
        'Tool design distinguishes one-shot execution, self-cleaning sessions, intentional persistent sessions, and retained output.',
      ],
    },
    tradeoffs: {
      zh: [
        '私人協作基礎設施，不提供 install 或 source；作品重點放在 workflow、tool contract 與長期使用後的設計演進。',
        '工具越多不代表越好，必須讓模型理解何時使用、何時停止、何時交給真人。',
        'Diagnostics 是產品功能，不是事後補的 debug log，因為 AI 需要能自行判斷「command 壞了、MCP 壞了、host 不在，還是 session 爆了」。',
      ],
      en: [
        'It is private collaboration infrastructure, so there is no installer or source release; the portfolio value is in workflow design, tool contracts, and evolution under sustained use.',
        'More tools do not automatically improve an agent. The model needs clear conditions for use, stopping, and human escalation.',
        'Diagnostics are a product capability rather than an afterthought because the AI must distinguish command failure, MCP failure, host absence, and session pressure.',
      ],
    },
    technologies: ['MCP', 'Python', 'Windows Service', 'Shell', 'Git', 'ADB', 'OAuth', 'Human-in-the-loop'],
    evidence: {
      zh: 'Private daily-use collaboration infrastructure；以實際 coding sessions 持續驗證與修改工具行為。',
      en: 'Private daily-use collaboration infrastructure continuously validated and reshaped through real coding sessions.',
    },
  },
  {
    slug: 'cast-iron',
    name: '鑄鐵 / Cast Iron',
    featured: false,
    status: ['Private', 'Daily Use'],
    summary: {
      zh: '私人投資帳務與績效系統，自動整理證券交易資料、保存歷史並產生自己真正需要的績效與年度累計股利資訊。',
      en: 'A private investment ledger and performance system that ingests brokerage records, preserves history, and calculates the performance and annual dividend views I actually need.',
    },
    problem: {
      zh: '券商 App 能顯示交易與持倉，但無法很好回答我長期真正關心的問題，尤其是跨年度累計股利與自己的績效口徑。',
      en: 'Brokerage apps show trades and holdings, but not the long-horizon views I actually care about, especially annual cumulative dividends and performance under my own accounting rules.',
    },
    built: { zh: ['每日取得交易明細並正規化。', 'Rust core 管理帳務寫入與歷史資料。', '每日產生報表與績效／股利統計。'], en: ['Daily ingestion and normalization of brokerage records.', 'Rust core for ledger writes and historical data.', 'Daily reports for performance and dividend tracking.'] },
    role: { zh: '由個人需求定義資料模型、報表口徑與驗證方式；AI 協助 implementation。所有公開展示資料皆脫敏。', en: 'I define the accounting model, report semantics, and validation rules; AI assists with implementation. Any portfolio presentation uses sanitized data only.' },
    engineering: { zh: ['重點是可追溯的歷史資料與自己的計算口徑，而不是即時看盤。'], en: ['The priority is traceable historical data and explicit accounting semantics rather than real-time market display.'] },
    tradeoffs: { zh: ['保持 private，避免暴露真實資產、帳號與交易資料。'], en: ['Kept private to avoid exposing real assets, accounts, or transaction data.'] },
    technologies: ['Rust', 'Crawler', 'Email ingestion', 'Reporting'],
  },
  {
    slug: 'paper2ai',
    name: 'Paper2AI',
    featured: false,
    status: ['Private', 'Case Study'],
    summary: {
      zh: '把多頁紙本健檢或文件照片整理成可讀、可交給 AI 分析的 Markdown 工作流。',
      en: 'A workflow for turning multi-page photographed reports into clean Markdown that can be reviewed or analyzed with AI.',
    },
    problem: { zh: '紙本多頁文件要逐張 OCR、排序與整理非常麻煩，而且手機相簿、相機與不同瀏覽器的上傳行為並不一致。', en: 'Multi-page paper documents are tedious to OCR, order, and clean up, and mobile gallery/camera upload behavior varies across browsers.' },
    built: { zh: ['Web/PWA 多圖輸入與排序。', 'OCR 後整理成 Markdown。', '可切換 SDK 或 OpenAI-compatible API 設定。'], en: ['Web/PWA multi-image intake and ordering.', 'OCR cleanup into Markdown.', 'Configurable SDK or OpenAI-compatible API path.'] },
    role: { zh: '由真實健檢文件流程反推產品需求，持續在 Android 實機瀏覽器驗證。', en: 'Requirements came directly from processing real health-report documents, with continued validation on Android browsers.' },
    engineering: { zh: ['相簿多選、相機、檔案輸入與手機瀏覽器差異是主要 UX 邊界。'], en: ['Gallery multi-select, camera/file input, and mobile-browser differences are the main UX boundaries.'] },
    tradeoffs: { zh: ['先把 Markdown 工作流做可靠，再考慮更多輸出格式。'], en: ['Make the Markdown workflow reliable before expanding output formats.'] },
    technologies: ['TypeScript', 'PWA', 'OCR', 'AI API'],
  },
  {
    slug: 'backtestlab',
    name: 'BacktestLab',
    featured: false,
    status: ['Case Study'],
    summary: {
      zh: '用來快速驗證與比較投資策略假設的小型 backtesting 工具。',
      en: 'A small backtesting tool for quickly validating and comparing investment-strategy assumptions.',
    },
    problem: { zh: '想把投資想法變成可重跑、可比較的規則，而不是只靠回憶與肉眼看圖。', en: 'I wanted investment ideas expressed as repeatable, comparable rules rather than memory and visual chart inspection.' },
    built: { zh: ['策略參數與回測流程。', '結果視覺化與比較。'], en: ['Strategy parameters and backtest flow.', 'Result visualization and comparison.'] },
    role: { zh: '定義要驗證的假設、結果口徑與操作流程；AI 協助實作。', en: 'I define the hypothesis, result semantics, and workflow; AI assists with implementation.' },
    engineering: { zh: ['把策略條件與結果輸出拆開，方便快速修改假設。'], en: ['Separates strategy conditions from result presentation so hypotheses can change quickly.'] },
    tradeoffs: { zh: ['定位為研究工具，不包裝成交易建議產品。'], en: ['Positioned as a research tool, not a trading-advice product.'] },
    technologies: ['Node.js', 'JavaScript', 'Backtesting'],
    links: [{ label: 'GitHub', href: 'https://github.com/mabyes1/BacktestLab' }],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
