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
        '在可信任的區網環境下，可把閒置筆電、平板或其他裝置變成可直接用鍵盤滑鼠操作的延伸螢幕，部分情境下可直接取代一般遠端桌面操作。',
        'Deck 模式直接在裝置瀏覽器執行 HTML / CSS / JavaScript，適合原生解析度資訊面板。',
        '內建 AI quota、system sideboard、Windows notification 與 custom Deck，並提供 Windows installer。',
      ],
      en: [
        'Windows Host plus browser client, with no secondary-device app required.',
        'Display mode uses a real Windows display, streams it over WebRTC, and relays input back to Windows.',
        'On a trusted local network, spare laptops, tablets, or other devices can act as directly interactive extended displays and replace a conventional remote-desktop workflow in some cases.',
        'Deck mode runs ordinary HTML/CSS/JavaScript directly in the device browser for native-resolution small-screen interfaces.',
        'Ships with AI quota, system sideboard, Windows notification views, custom Decks, and a Windows installer.',
      ],
    },
    role: {
      zh: '定義產品方向、裝置與 Windows 邊界、功能取捨、實機測試方式與最終 UX；ChatGPT、Codex、Claude 等 AI 工具協助架構探索、大量 implementation、重構與除錯。實機測試曾多次推翻看似合理但延遲或相容性不佳的方案。',
      en: 'I defined the product, device/Windows boundaries, feature trade-offs, validation strategy, and final UX. ChatGPT, Codex, Claude, and other AI tools assisted with architecture exploration, implementation, refactoring, and debugging. Real-device tests repeatedly rejected approaches that looked sound on paper but failed on latency or compatibility.',
    },
    engineering: {
      zh: [
        '同一裝置支援兩條不同 rendering path：Windows pixel streaming 與 browser-native Deck。',
        '針對手機、平板、BOOX 與不同效能裝置進行實機 responsive / streaming 驗證。',
      ],
      en: [
        'Two rendering paths coexist on one device: Windows pixel streaming and browser-native Decks.',
        'Validated responsive behavior and streaming on phones, tablets, BOOX devices, and low-powered hardware.',
      ],
    },
    tradeoffs: {
      zh: [
        'WebRTC 適合 Windows 畫面串流；資訊面板則改走 browser-native Deck，可避免視訊編碼並保持文字銳利。',
        '曾研究更快的替代串流路線，實測沒有優於現有方案，因此撤回並保留較可靠的路線。',
        '低階舊裝置的硬體能力會成為 streaming 上限，必要時降低 FPS 比增加複雜架構更有效。',
      ],
      en: [
        'WebRTC is used for Windows display streaming, while browser-native Decks avoid video encoding and keep text crisp for information panels.',
        'I explored alternate lower-latency streaming paths, but real tests did not beat the existing approach, so the more reliable route was kept.',
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
    status: ['Daily Use', 'Private'],
    summary: {
      zh: '我每天使用的 AI coding control plane：管理多種 stateful AI CLI、PTY、遠端訊息通道、排程、process lifecycle 與 Web Control Dashboard。',
      en: 'A daily-use control plane for stateful AI coding CLIs, PTYs, remote messaging channels, scheduled jobs, process lifecycle, and browser-based operator control.',
    },
    problem: {
      zh: '一開始只是想在離開開發電腦時，仍能透過 Discord / Telegram 操作 AI coding CLI。實際使用後，核心難題逐漸變成如何保留 PTY、native session、queue、權限、排程與人工 takeover 的狀態。',
      en: 'It started as a way to operate AI coding CLIs through Discord and Telegram while away from the development PC. With real use, the core challenge became preserving PTY state, native sessions, queues, permissions, scheduling, and a clean human-takeover boundary.',
    },
    built: {
      zh: [
        '支援多種 AI CLI adapter，每個 instance 保有獨立 PTY 與 native session。',
        'Discord / Telegram transport、FIFO turn queue、session attribution 與 scheduled turns。',
        'Password-protected Control Hub，包含 session 管理、multi-session split view、web terminal 與 browser direct input。',
        'PM2 process projection 與 code-defined service templates，避免任意遠端 process execution。',
      ],
      en: [
        'Multiple AI CLI adapters, each retaining an isolated PTY and native session.',
        'Discord / Telegram transports, FIFO turn queue, session attribution, and scheduled turns.',
        'Password-protected Control Hub with session management, multi-session split view, web terminal, and direct browser input.',
        'PM2 process projection and code-defined service templates rather than arbitrary remote process execution.',
      ],
    },
    role: {
      zh: '這是私人 production tool。我的主要工作是持續把每天真的遇到的故障模式與操作痛點轉成 system boundary、state model、驗證條件與安全限制；AI coding agents 協助大量 TypeScript implementation、測試、重構與案例整理。',
      en: 'This is a private production tool. I continuously turn failures and operational friction from daily use into system boundaries, state models, validation rules, and security constraints; AI coding agents assist heavily with TypeScript implementation, tests, refactoring, and documentation.',
    },
    engineering: {
      zh: [
        '每個 CLI instance 都保有自己的 PTY 與 native session，避免不同 Agent 的狀態互相污染。',
        'Discord、Telegram 與 Web Dashboard 的操作最後都進入同一套 queue / session 管理，確保訊息順序與回覆來源不會亂掉。',
        'AI CLI 本身是 stateful 的，因此保留原生 session 行為，包含 TUI、權限詢問與上下文延續。',
        'Web 上的 process control 只允許預先定義好的 service，避免遠端介面變成任意 command execution。',
      ],
      en: [
        'Each CLI instance retains its own PTY and native session so different agents do not contaminate one another\'s state.',
        'Discord, Telegram, and Web Dashboard operations all enter the same queue/session-management path so message order and reply attribution remain consistent.',
        'Because AI CLIs are stateful, native session behavior is preserved, including TUI state, permission prompts, and conversational context.',
        'Browser-side process control is limited to predefined services so the remote UI does not become arbitrary command execution.',
      ],
    },
    tradeoffs: {
      zh: [
        '保留各 AI CLI 原生的 stateful session / PTY 行為，不包成 OpenAI-compatible API 或反向代理。整合會更複雜，但能維持 CLI 的完整能力，也比較不容易踩到供應商的使用規範。',
        '公開 repo 只放 sanitized documentation 與 interactive demo，production source、對話、路徑與 topology 保持 private。',
        'Web 端 process control 只允許 code-defined templates；看得到 unmanaged PM2 process，但不能遠端控制或讀 log。',
      ],
      en: [
        'Native stateful session and PTY behavior is preserved instead of wrapping the CLIs as OpenAI-compatible APIs or reverse proxies. The integration is more complex, but it keeps the full CLI behavior and reduces the chance of conflicting with provider usage rules.',
        'The public repository contains sanitized documentation and an interactive demo while production source, conversations, paths, and topology remain private.',
        'Browser-side process control is restricted to code-defined templates; unmanaged PM2 processes are visible but not controllable and their logs are not exposed.',
      ],
    },
    technologies: ['TypeScript', 'Node.js 22', 'PTY', 'Discord', 'Telegram', 'PM2', 'WebSocket', 'Testing'],
    links: [
      { label: 'Public demo repo', href: 'https://github.com/mabyes1/cli-monitor-v2-demo' },
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
    status: ['Private', 'Internal Tool'],
    summary: {
      zh: '以既有 MCP tooling 為基礎，長期客製成個人 AI engineering collaboration layer，讓 Web ChatGPT 等雲端對話型 AI 能在受控沙盒路徑中直接操作本機 workspace、shell、裝置與開發環境。',
      en: 'Built on existing MCP tooling and heavily customized into a personal AI engineering collaboration layer, allowing cloud conversational AI such as Web ChatGPT to work directly with approved local workspaces, shells, devices, and development environments.',
    },
    problem: {
      zh: '讓對話型 AI、Codex / coding agents、本機 execution 與真人操作形成一個可協作、可診斷、可交棒的工程流程。',
      en: 'Create an engineering workflow where conversational AI, Codex / coding agents, local execution, devices, diagnostics, and human intervention can collaborate and hand work off cleanly.',
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
      zh: '我以既有 repo 與工具為起點，在長期真實使用中持續定義痛點、修改 tool contract、驗證模型是否真的會用，並把失敗模式回灌成 diagnostics、session lifecycle 與 human escalation。AI agents 協助 implementation。',
      en: 'I started from existing MCP tooling and, through sustained real use, kept redefining tool contracts around actual model failure modes, then validating whether the changes improved collaboration. AI coding agents assisted with implementation.',
    },
    engineering: {
      zh: [
        '真正關鍵是讓模型先知道 server、workspace、權限、active sessions 與 environment 狀態，再決定下一步。',
        '避免 AI 在權限／Session／GUI 問題上長時間繞路；可辨識真人處理更快的邊界並主動 escalation。',
        '工具設計同時考慮 one-shot execution、自清 session、persistent session 條件與 retained output。',
      ],
      en: [
        'The key is giving the model explicit server, workspace, permission, session-pressure, and environment state before it acts.',
        'The workflow avoids long agent detours around permissions, desktop sessions, or GUI boundaries and escalates when a human is the faster execution node.',
        'Tool design distinguishes one-shot execution, self-cleaning sessions, intentional persistent sessions, and retained output.',
      ],
    },
    tradeoffs: {
      zh: [
        '私人協作基礎設施，不提供 install 或 source；作品重點放在 workflow、tool contract 與長期使用後的設計演進。',
        '工具越多不代表越好，必須讓模型理解何時使用、何時停止、何時交給真人。',
        'Diagnostics 被當成正式產品功能，讓 AI 能自行判斷「command 壞了、MCP 壞了、host 不在，還是 session 爆了」。',
      ],
      en: [
        'It is private collaboration infrastructure, so there is no installer or source release; the portfolio value is in workflow design, tool contracts, and evolution under sustained use.',
        'More tools do not automatically improve an agent. The model needs clear conditions for use, stopping, and human escalation.',
        'Diagnostics are treated as a product capability so the AI can distinguish command failure, MCP failure, host absence, and session pressure.',
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
    engineering: { zh: ['重點放在可追溯的歷史資料與自己的計算口徑；即時看盤不在這個工具的目標內。'], en: ['The focus is traceable historical data and explicit accounting semantics; real-time market display sits outside the scope of this tool.'] },
    tradeoffs: { zh: ['保持 private，避免暴露真實資產、帳號與交易資料。'], en: ['Kept private to avoid exposing real assets, accounts, or transaction data.'] },
    technologies: ['Rust', 'Crawler', 'Email ingestion', 'Reporting'],
  },
  {
    slug: 'paper2ai',
    name: 'Paper2AI',
    featured: false,
    status: ['Private'],
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
    status: ['Public'],
    summary: {
      zh: '用來快速驗證與比較投資策略假設的小型 backtesting 工具。',
      en: 'A small backtesting tool for quickly validating and comparing investment-strategy assumptions.',
    },
    problem: { zh: '想把投資想法變成可重跑、可比較的規則，降低只靠回憶與肉眼看圖的判斷。', en: 'I wanted investment ideas expressed as repeatable, comparable rules so the analysis would rely less on memory and visual chart inspection.' },
    built: { zh: ['策略參數與回測流程。', '結果視覺化與比較。'], en: ['Strategy parameters and backtest flow.', 'Result visualization and comparison.'] },
    role: { zh: '定義要驗證的假設、結果口徑與操作流程；AI 協助實作。', en: 'I define the hypothesis, result semantics, and workflow; AI assists with implementation.' },
    engineering: { zh: ['把策略條件與結果輸出拆開，方便快速修改假設。'], en: ['Separates strategy conditions from result presentation so hypotheses can change quickly.'] },
    tradeoffs: { zh: ['定位為研究工具，不包裝成交易建議產品。'], en: ['Positioned as a research tool, not a trading-advice product.'] },
    technologies: ['Node.js', 'JavaScript', 'Backtesting'],
    links: [{ label: 'GitHub', href: 'https://github.com/mabyes1/BacktestLab' }],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
