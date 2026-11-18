// Todo o conteúdo do portfólio, em português e inglês.
// Fatos vêm do currículo e dos READMEs dos repositórios em github.com/Gwin14.

export type Lang = "pt" | "en";
export type L = Record<Lang, string>;

export const contact = {
  email: "contato@fabiosantos.dev.br",
  phoneDisplay: "(48) 98450-5685",
  whatsapp: "https://wa.me/5548984505685",
  site: "https://fabiosantos.dev.br",
  linkedin: "https://www.linkedin.com/in/fabio-santos14/",
  github: "https://github.com/Gwin14",
  photography: "https://fotoessencia.fabiosantos.dev.br",
  city: "Florianópolis, SC",
};

export const sections = [
  { id: "inicio", label: { pt: "Início", en: "Intro" } },
  { id: "omnichannel", label: { pt: "IA em produção", en: "AI in production" } },
  { id: "mobile", label: { pt: "Apps mobile", en: "Mobile apps" } },
  { id: "em-uso", label: { pt: "Em uso real", en: "In real use" } },
  { id: "ia", label: { pt: "Como uso IA", en: "How I use AI" } },
  { id: "trajetoria", label: { pt: "Trajetória", en: "Career" } },
  { id: "stack", label: { pt: "Stack", en: "Stack" } },
  { id: "arquivo", label: { pt: "Arquivo", en: "Archive" } },
  { id: "contato", label: { pt: "Contato", en: "Contact" } },
] as const;

export const ui = {
  skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  available: { pt: "Aberto a novas oportunidades", en: "Open to new roles" },
  emailMe: { pt: "Enviar um e-mail", en: "Send an email" },
  seeProjects: { pt: "Ver projetos", en: "See projects" },
  seeCv: { pt: "Ver currículo", en: "See résumé" },
  live: { pt: "Ver ao vivo", en: "See it live" },
  code: { pt: "Ver código", en: "See code" },
  privateRepo: { pt: "Código privado", en: "Private code" },
  copy: { pt: "Copiar e-mail", en: "Copy email" },
  copied: { pt: "Copiado", en: "Copied" },
  palette: { pt: "Buscar ou ir para…", en: "Search or jump to…" },
  paletteHint: { pt: "Atalhos", en: "Shortcuts" },
  menu: { pt: "Menu", en: "Menu" },
  close: { pt: "Fechar", en: "Close" },
  original: { pt: "Original", en: "Original" },
  dragCompare: { pt: "Arraste para comparar", en: "Drag to compare" },
  gradeLabel: { pt: "Escolha um look para a foto", en: "Pick a look for the photo" },
  sunUp: { pt: "Sol a {deg}° acima do horizonte", en: "Sun {deg}° above the horizon" },
  sunDown: { pt: "Sol {deg}° abaixo do horizonte", en: "Sun {deg}° below the horizon" },
  goldenHour: { pt: "Hora dourada agora", en: "Golden hour now" },
};

export const hero = {
  role: { pt: "desenvolvedor full stack e mobile", en: "full stack and mobile developer" },
  lead: {
    pt: "Faço apps, sistemas web e ferramentas com IA que já estão em uso: de uma central de atendimento com Gemini a apps de câmera com módulos nativos em Swift e Kotlin.",
    en: "I build apps, web systems and AI tools that people already use: from a Gemini-powered customer service hub to camera apps with native Swift and Kotlin modules.",
  },
  fact: {
    pt: "TI na Santos Supermercados desde julho de 2024 · Análise e Desenvolvimento de Sistemas no Senac",
    en: "IT at Santos Supermercados since July 2024 · Systems Analysis and Development at Senac",
  },
};

export type Grade = {
  id: string;
  label: L;
  // parâmetros do shader
  exposure: number; // stops
  contrast: number; // 1 = neutro
  saturation: number; // 1 = neutro
  temp: number; // -1 frio … 1 quente
  tint: number; // -1 verde … 1 magenta
  shadows: [number, number, number]; // cor somada nas sombras
  highlights: [number, number, number]; // cor somada nas altas luzes
  fade: number; // levanta os pretos
  grain: number;
  vignette: number;
  bw: number; // 0 cor, 1 preto e branco
};

export const grades: Grade[] = [
  { id: "original", label: { pt: "Original", en: "Original" }, exposure: 0, contrast: 1, saturation: 1, temp: 0, tint: 0, shadows: [0, 0, 0], highlights: [0, 0, 0], fade: 0, grain: 0, vignette: 0, bw: 0 },
  { id: "komorebi", label: { pt: "Komorebi", en: "Komorebi" }, exposure: 0.08, contrast: 0.94, saturation: 0.86, temp: 0.18, tint: -0.06, shadows: [-0.01, 0.03, 0.02], highlights: [0.05, 0.03, -0.02], fade: 0.06, grain: 0.05, vignette: 0.25, bw: 0 },
  { id: "cinema", label: { pt: "Cinema", en: "Cinema" }, exposure: -0.05, contrast: 1.12, saturation: 0.92, temp: 0.05, tint: 0, shadows: [-0.04, 0.02, 0.07], highlights: [0.08, 0.03, -0.05], fade: 0.02, grain: 0.04, vignette: 0.45, bw: 0 },
  { id: "pelicula", label: { pt: "Película", en: "Film stock" }, exposure: 0.02, contrast: 0.9, saturation: 0.8, temp: 0.12, tint: 0.04, shadows: [0.03, 0.01, 0.04], highlights: [0.05, 0.04, 0.0], fade: 0.12, grain: 0.11, vignette: 0.3, bw: 0 },
  { id: "dourada", label: { pt: "Hora dourada", en: "Golden hour" }, exposure: 0.1, contrast: 1.04, saturation: 1.08, temp: 0.42, tint: 0.05, shadows: [0.02, -0.01, -0.02], highlights: [0.1, 0.05, -0.04], fade: 0.03, grain: 0.03, vignette: 0.3, bw: 0 },
  { id: "pb", label: { pt: "P&B", en: "B&W" }, exposure: 0.02, contrast: 1.22, saturation: 0, temp: 0, tint: 0, shadows: [0, 0, 0], highlights: [0, 0, 0], fade: 0.04, grain: 0.09, vignette: 0.35, bw: 1 },
];

export const omnichannel = {
  kicker: { pt: "Projeto principal · Next.js, Supabase e Gemini", en: "Main project · Next.js, Supabase and Gemini" },
  title: { pt: "Central de atendimento omnichannel com IA", en: "Omnichannel customer service hub with AI" },
  lead: {
    pt: "Mensagens do WhatsApp, Instagram, Messenger e do chat do site chegam numa caixa de entrada só. O Gemini responde dentro do que a empresa permite, e a equipe assume quando precisa.",
    en: "Messages from WhatsApp, Instagram, Messenger and the website chat land in one inbox. Gemini answers within what the company allows, and the team takes over when needed.",
  },
  points: [
    { pt: "Multi-tenant desde o início: toda tabela tem tenant_id e RLS no Postgres", en: "Multi-tenant from day one: every table has tenant_id and Postgres RLS" },
    { pt: "Base de conhecimento define o que a IA pode afirmar; proteções barram o resto", en: "A knowledge base sets what the AI may claim; guardrails block the rest" },
    { pt: "Simulador mostra a decisão, as fontes e o que foi barrado, sem enviar nada", en: "A simulator shows the decision, the sources and what was blocked, without sending" },
    { pt: "Login da Meta por OAuth, webhooks, Web Push e cinco papéis de acesso", en: "Meta OAuth login, webhooks, Web Push and five access roles" },
  ],
  stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Gemini API", "Meta Graph API", "Web Push"],
  url: "https://projeto-omnichannel.vercel.app",
};

// Textos da tela de demonstração (UI do produto, recriada em HTML)
export const inboxMock = {
  queues: { pt: ["Abertas", "Minhas", "Com a IA", "Encerradas"], en: ["Open", "Mine", "With AI", "Closed"] },
  convos: [
    { name: "Marina Alves", channel: "whatsapp", preview: { pt: "Vocês abrem no feriado?", en: "Are you open on the holiday?" }, time: "14:02" },
    { name: "@joao.surf", channel: "instagram", preview: { pt: "Tem quarto pra 3 pessoas?", en: "Any room for 3 people?" }, time: "13:47" },
    { name: "Carla M.", channel: "messenger", preview: { pt: "Quero falar com alguém", en: "I want to talk to someone" }, time: "13:30" },
    { name: { pt: "Visitante do site", en: "Website visitor" }, channel: "web", preview: { pt: "Aceitam pet?", en: "Do you allow pets?" }, time: "13:12" },
  ],
  thread: [
    { from: "client", text: { pt: "Oi! Vocês abrem no feriado de sexta?", en: "Hi! Are you open on Friday's holiday?" } },
    { from: "ai", text: { pt: "Oi, Marina! Na sexta abrimos das 8h às 13h. Quer que eu reserve um horário?", en: "Hi, Marina! On Friday we're open 8am to 1pm. Want me to book a slot?" }, source: { pt: "Fonte: Horários e feriados", en: "Source: Hours and holidays" } },
    { from: "client", text: { pt: "Quanto fica o desconto pra grupo?", en: "How much is the group discount?" } },
    { from: "guard", text: { pt: "Proteção ativa: preço fora da base. Conversa passada para a equipe.", en: "Guardrail: price not in the knowledge base. Handed to the team." } },
  ],
  typing: { pt: "IA escrevendo…", en: "AI is typing…" },
  aiOn: { pt: "IA ativa", en: "AI on" },
  handoff: { pt: "Atendente: Fábio", en: "Agent: Fábio" },
};

export type Project = {
  id: string;
  name: string;
  line: L;
  detail: L;
  tags: string[];
  stack: string[];
  url?: string;
  repo?: string;
  privateRepo?: boolean;
};

export const mobileIntro = {
  title: { pt: "Apps mobile com Expo e módulos nativos", en: "Mobile apps with Expo and native modules" },
  lead: {
    pt: "Cinco apps para iOS e Android em React Native. Onde a câmera, a GPU ou o sistema pedem, escrevo o módulo nativo em Swift ou Kotlin.",
    en: "Five iOS and Android apps in React Native. Where the camera, the GPU or the OS need it, I write the native module in Swift or Kotlin.",
  },
};

export const mobileApps: Project[] = [
  {
    id: "komorebi",
    name: "Komorebi",
    line: { pt: "App de câmera com LUTs e controles manuais", en: "Camera app with LUTs and manual controls" },
    detail: {
      pt: "ISO, obturador e foco manuais, RAW no iOS e LUTs criados por descrição com o Gemini.",
      en: "Manual ISO, shutter and focus, RAW on iOS, and LUTs generated from a text description with Gemini.",
    },
    tags: ["mobile", "ia"],
    stack: ["Expo", "React Native", "Swift", "Kotlin", "Gemini"],
    url: "https://komorebimobile.vercel.app",
    privateRepo: true,
  },
  {
    id: "hikari",
    name: "Hikari",
    line: { pt: "Editor de fotos RAW não destrutivo na GPU", en: "Non-destructive RAW photo editor on the GPU" },
    detail: {
      pt: "Curvas, mixer HSL, máscaras de pessoa e céu com Vision e ML Kit, exportação em TIFF de 16 bits.",
      en: "Curves, HSL mixer, person and sky masks with Vision and ML Kit, 16-bit TIFF export.",
    },
    tags: ["mobile", "ia"],
    stack: ["Expo", "C++", "Swift", "Kotlin"],
    repo: "https://github.com/Gwin14/Hikari",
  },
  {
    id: "lutra",
    name: "Lutra",
    line: { pt: "Color grading de vídeos log em lote", en: "Batch color grading for log footage" },
    detail: {
      pt: "Converte Apple Log, S-Log3 e outros para Rec.709 com a matemática de cada fabricante, com waveform e falsa cor.",
      en: "Converts Apple Log, S-Log3 and others to Rec.709 using each maker's math, with waveform and false color.",
    },
    tags: ["mobile"],
    stack: ["Expo", "Swift", "Kotlin", "TypeScript"],
    repo: "https://github.com/Gwin14/Lutra-lut-applier",
  },
  {
    id: "teto",
    name: "Teto",
    line: { pt: "Condições de voo para drones, de 0 a 100", en: "Drone flight conditions, scored 0 to 100" },
    detail: {
      pt: "Cruza vento por altitude, satélites GNSS, clima espacial da NOAA e aeródromos da ANAC num score de voo.",
      en: "Combines wind by altitude, GNSS satellites, NOAA space weather and ANAC airfields into one flight score.",
    },
    tags: ["mobile"],
    stack: ["Expo", "TypeScript", "RevenueCat", "Widgets iOS"],
    repo: "https://github.com/Gwin14/Teto-condicoes-de-drone",
  },
  {
    id: "solune",
    name: "Solune",
    line: { pt: "Sol, lua e um céu em realidade aumentada", en: "Sun, moon and an augmented reality sky" },
    detail: {
      pt: "Trajeto do sol arrastável, fases da lua, eclipses e um planetário com 1.600 estrelas e as 88 constelações.",
      en: "A draggable sun path, moon phases, eclipses and a planetarium with 1,600 stars and all 88 constellations.",
    },
    tags: ["mobile"],
    stack: ["Expo", "TypeScript", "Swift"],
    url: "https://gwin14.github.io/Solune-sun-tracker/",
    repo: "https://github.com/Gwin14/Solune-sun-tracker",
  },
];

export const inUseIntro = {
  title: { pt: "Software em uso no dia a dia", en: "Software in everyday use" },
  lead: {
    pt: "Parte do que faço resolve problemas da empresa onde trabalho e de negócios da região. São ferramentas instaladas e sites no ar.",
    en: "Part of my work solves problems at the company I work for and at local businesses. These are installed tools and live websites.",
  },
};

export const inUse: Project[] = [
  {
    id: "robobackup",
    name: "RoboBackup",
    line: { pt: "Backup agendado para Windows, sem terminal", en: "Scheduled Windows backups, no terminal" },
    detail: {
      pt: "Interface em português sobre o Robocopy, agendada como SYSTEM, com senhas de rede cifradas por DPAPI. Instalado na pousada.",
      en: "A Portuguese interface over Robocopy, scheduled as SYSTEM, with network passwords encrypted by DPAPI. Installed at the inn.",
    },
    tags: ["desktop"],
    stack: ["Rust", "Tauri", "TypeScript", "SQLite"],
    url: "https://gwin14.github.io/Robocopy-GUI/",
    repo: "https://github.com/Gwin14/Robocopy-GUI",
  },
  {
    id: "teclado-pdv",
    name: "Teclado PDV",
    line: { pt: "Bloqueio de teclas para caixas de supermercado", en: "Key lock for supermarket checkouts" },
    detail: {
      pt: "Roda na bandeja do Windows 7 a 11 e bloqueia Alt, Win, Ctrl e Esc. Manutenção liberada por senha com hash e salt.",
      en: "Runs in the Windows 7 to 11 tray and blocks Alt, Win, Ctrl and Esc. Maintenance unlocks with a salted, hashed password.",
    },
    tags: ["desktop"],
    stack: ["C#", ".NET", "Windows Forms"],
    repo: "https://github.com/Gwin14/Configurador-de-teclado-de-pdv",
  },
  {
    id: "pousada",
    name: "Hotel Pousada Santos",
    line: { pt: "Site oficial em três idiomas com CMS", en: "Official website in three languages with a CMS" },
    detail: {
      pt: "Next.js 16 com Sanity, next-intl em português, inglês e espanhol, e SEO com hreflang por idioma.",
      en: "Next.js 16 with Sanity, next-intl in Portuguese, English and Spanish, and SEO with per-language hreflang.",
    },
    tags: ["web"],
    stack: ["Next.js", "Sanity", "next-intl", "SCSS"],
    url: "https://hotelpousadasantos.com.br",
    privateRepo: true,
  },
  {
    id: "cantos",
    name: "Cantos do Litoral",
    line: { pt: "Guia turístico do litoral de Palhoça", en: "Tourist guide to the Palhoça coast" },
    detail: {
      pt: "PWA com mapas e rotas GPX, portal para estabelecimentos parceiros e posts do Instagram conectados por OAuth.",
      en: "A PWA with maps and GPX routes, a portal for partner businesses and Instagram posts connected via OAuth.",
    },
    tags: ["web"],
    stack: ["Next.js", "Supabase", "PostHog", "Leaflet"],
    url: "https://cantosdolitoral.com.br",
    privateRepo: true,
  },
];

export const aiIntro = {
  title: { pt: "Como uso IA no trabalho", en: "How I use AI at work" },
  lead: {
    pt: "Uso IA em duas frentes: dentro dos produtos, com limites claros, e no meu fluxo de desenvolvimento, com agentes que escrevem e revisam código comigo.",
    en: "I use AI on two fronts: inside products, with clear limits, and in my development workflow, with agents that write and review code with me.",
  },
  items: [
    {
      title: { pt: "Respostas presas a uma base de conhecimento", en: "Answers tied to a knowledge base" },
      body: { pt: "Na central omnichannel, o Gemini só afirma o que está na base. Cada decisão fica registrada para revisão.", en: "In the omnichannel hub, Gemini only states what is in the knowledge base. Every decision is logged for review." },
    },
    {
      title: { pt: "Recursos de IA dentro de apps", en: "AI features inside apps" },
      body: { pt: "LUTs gerados por descrição e análise de composição no Komorebi; resumos automáticos de páginas no Snaption.", en: "LUTs generated from a description and composition analysis in Komorebi; automatic page summaries in Snaption." },
    },
    {
      title: { pt: "Agentes e MCP no desenvolvimento", en: "Agents and MCP in development" },
      body: { pt: "Trabalho com agentes de código como o Claude Code. A arte de um jogo meu foi gerada por servidores MCP sobre o Aseprite.", en: "I work with coding agents like Claude Code. The art for one of my games was generated through MCP servers on top of Aseprite." },
    },
  ],
  askTitle: { pt: "Pergunte sobre mim", en: "Ask about me" },
  askLead: {
    pt: "Este chat usa a API do Claude e responde só com o que está neste portfólio.",
    en: "This chat uses the Claude API and answers only from what is in this portfolio.",
  },
  askPlaceholder: { pt: "Escreva uma pergunta", en: "Write a question" },
  askLabel: { pt: "Sua pergunta", en: "Your question" },
  askSend: { pt: "Enviar pergunta", en: "Send question" },
  askOffline: {
    pt: "Modo offline: a resposta abaixo vem de um índice local, sem IA.",
    en: "Offline mode: the answer below comes from a local index, without AI.",
  },
  askError: { pt: "Não consegui responder agora. Tente de novo em alguns segundos.", en: "I couldn't answer right now. Try again in a few seconds." },
  suggestions: {
    pt: ["Quais projetos usam IA?", "Ele trabalha com React Native?", "Qual a experiência com backend?", "Ele fala inglês?"],
    en: ["Which projects use AI?", "Does he work with React Native?", "What backend experience does he have?", "Does he speak English?"],
  },
};

export const experience = [
  {
    role: { pt: "TI", en: "IT" },
    org: "Santos Supermercados",
    period: { pt: "Jul 2024 – hoje", en: "Jul 2024 – now" },
    items: {
      pt: ["Manutenção de computadores, impressoras e rede", "Suporte à infraestrutura das unidades", "Acompanhamento de novas tecnologias para o processo interno", "Desenvolvimento de sites e programas para uso interno"],
      en: ["Computer, printer and network maintenance", "Infrastructure support for the stores", "Evaluating new technology for internal processes", "Building websites and programs for internal use"],
    },
  },
  {
    role: { pt: "Designer de estampas", en: "Print designer" },
    org: "Kharitas",
    period: { pt: "Ago 2023 – Mar 2024", en: "Aug 2023 – Mar 2024" },
    items: {
      pt: ["Criação de designs para sublimação no CorelDRAW", "Produção e venda de canecas e outros produtos", "Atendimento ao cliente"],
      en: ["Sublimation designs in CorelDRAW", "Producing and selling mugs and other products", "Customer service"],
    },
  },
  {
    role: { pt: "Copeiro", en: "Pantry staff" },
    org: "Hotel Pousada Santos",
    period: { pt: "Out 2022 – Fev 2023", en: "Oct 2022 – Feb 2023" },
    items: {
      pt: ["Serviço de copa e atendimento interno"],
      en: ["Pantry service and guest support"],
    },
  },
];

export const education = [
  { course: { pt: "Análise e Desenvolvimento de Sistemas", en: "Systems Analysis and Development (associate degree)" }, org: "Senac Santa Catarina", period: { pt: "2024 – hoje", en: "2024 – now" } },
  { course: { pt: "Técnico Integrado em Desenvolvimento de Jogos Digitais", en: "Technical high school in Digital Game Development" }, org: "Senac Santa Catarina", period: { pt: "2020 – 2022", en: "2020 – 2022" } },
];

export const certifications = [
  { name: { pt: "Modelagem de Software", en: "Software Modeling" }, org: "Unisul" },
  { name: { pt: "Programação de Soluções Computacionais", en: "Computational Solutions Programming" }, org: "Unisul" },
  { name: { pt: "Hackatruck MakerSpace", en: "Hackatruck MakerSpace" }, org: "IBM · Hackatruck" },
  { name: { pt: "Inglês Avançado", en: "Advanced English" }, org: "Rockfeller" },
];

export const languages = [
  { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
  { name: { pt: "Inglês", en: "English" }, level: { pt: "Avançado", en: "Advanced" } },
];

export const careerIntro = {
  title: { pt: "Experiência e formação", en: "Experience and education" },
  work: { pt: "Experiência", en: "Experience" },
  edu: { pt: "Formação", en: "Education" },
  certs: { pt: "Certificações", en: "Certifications" },
  langs: { pt: "Idiomas", en: "Languages" },
};

export const stackIntro = {
  title: { pt: "Linguagens e ferramentas", en: "Languages and tools" },
  lead: {
    pt: "O que uso nos projetos acima, agrupado por área. Comecei com jogos na Unity e na Godot e hoje passo a maior parte do tempo em TypeScript.",
    en: "What I use in the projects above, grouped by area. I started with games in Unity and Godot and now spend most of my time in TypeScript.",
  },
};

// Ícones: chaves do pacote simple-icons
export const stackGroups: { title: L; items: { name: string; icon?: string }[] }[] = [
  {
    title: { pt: "Linguagens", en: "Languages" },
    items: [
      { name: "TypeScript", icon: "siTypescript" },
      { name: "JavaScript", icon: "siJavascript" },
      { name: "Python", icon: "siPython" },
      { name: "Java", icon: "siOpenjdk" },
      { name: "Rust", icon: "siRust" },
      { name: "C#", icon: "siDotnet" },
      { name: "Swift", icon: "siSwift" },
      { name: "Kotlin", icon: "siKotlin" },
    ],
  },
  {
    title: { pt: "Web e back-end", en: "Web and back end" },
    items: [
      { name: "Next.js", icon: "siNextdotjs" },
      { name: "React", icon: "siReact" },
      { name: "Tailwind CSS", icon: "siTailwindcss" },
      { name: "Node.js", icon: "siNodedotjs" },
      { name: "Django", icon: "siDjango" },
      { name: "Spring Boot", icon: "siSpringboot" },
      { name: "Hono", icon: "siHono" },
      { name: "Angular", icon: "siAngular" },
    ],
  },
  {
    title: { pt: "Mobile e desktop", en: "Mobile and desktop" },
    items: [
      { name: "Expo", icon: "siExpo" },
      { name: "React Native", icon: "siReact" },
      { name: "Tauri", icon: "siTauri" },
      { name: "Flutter", icon: "siFlutter" },
    ],
  },
  {
    title: { pt: "Dados e infraestrutura", en: "Data and infrastructure" },
    items: [
      { name: "Supabase", icon: "siSupabase" },
      { name: "PostgreSQL", icon: "siPostgresql" },
      { name: "SQLite", icon: "siSqlite" },
      { name: "MySQL", icon: "siMysql" },
      { name: "Docker", icon: "siDocker" },
      { name: "Vercel", icon: "siVercel" },
      { name: "Git", icon: "siGit" },
    ],
  },
  {
    title: { pt: "IA", en: "AI" },
    items: [
      { name: "Gemini API", icon: "siGooglegemini" },
      { name: "Claude", icon: "siClaude" },
      { name: "OpenRouter", icon: "siOpenrouter" },
    ],
  },
  {
    title: { pt: "Jogos e design", en: "Games and design" },
    items: [
      { name: "Godot", icon: "siGodotengine" },
      { name: "Unity", icon: "siUnity" },
      { name: "Figma", icon: "siFigma" },
      { name: "CorelDRAW", icon: "siCoreldraw" },
    ],
  },
];

export const archiveIntro = {
  title: { pt: "Outros projetos", en: "Other projects" },
  lead: { pt: "Extensões, jogos, ferramentas de foto e trabalhos do curso.", en: "Extensions, games, photo tools and coursework." },
  filters: [
    { id: "todos", label: { pt: "Todos", en: "All" } },
    { id: "ia", label: { pt: "IA", en: "AI" } },
    { id: "web", label: { pt: "Web", en: "Web" } },
    { id: "mobile", label: { pt: "Mobile", en: "Mobile" } },
    { id: "desktop", label: { pt: "Desktop", en: "Desktop" } },
    { id: "jogos", label: { pt: "Jogos", en: "Games" } },
  ],
};

export const archive: Project[] = [
  {
    id: "snaption",
    name: "Snaption Web Clipper",
    line: { pt: "Extensão do Chrome que salva páginas no Notion com resumo por IA", en: "Chrome extension that saves pages to Notion with an AI summary" },
    detail: { pt: "", en: "" },
    tags: ["ia", "web"],
    stack: ["JavaScript", "Django", "Notion OAuth", "OpenRouter"],
    url: "https://chromewebstore.google.com/detail/snaption-web-clipper/meipogighgcadggclemlpnngdabahebd",
    repo: "https://github.com/Gwin14/Notion-Web-Clipper",
  },
  {
    id: "myndshelf",
    name: "MyndShelf",
    line: { pt: "Monorepo com app desktop, mobile e servidor próprio para guardar ideias", en: "Monorepo with desktop, mobile and self-hosted server for saving ideas" },
    detail: { pt: "", en: "" },
    tags: ["desktop", "mobile", "ia"],
    stack: ["Tauri", "Expo", "Hono", "SQLite"],
    repo: "https://github.com/Gwin14/MyndShelf",
  },
  {
    id: "prismo",
    name: "Prismo",
    line: { pt: "Hub para conversar com LLMs e gerar imagens", en: "Hub for chatting with LLMs and generating images" },
    detail: { pt: "", en: "" },
    tags: ["ia", "web"],
    stack: ["React", "Django", "Docker"],
    url: "https://frontend-7iys.onrender.com/",
    repo: "https://github.com/Gwin14/Prismo",
  },
  {
    id: "lote",
    name: "Lote",
    line: { pt: "Renomeador de arquivos em lote com prévia ao vivo e desfazer", en: "Batch file renamer with live preview and undo" },
    detail: { pt: "", en: "" },
    tags: ["mobile"],
    stack: ["Expo", "TypeScript"],
    url: "https://gwin14.github.io/Lote-batch-renamer/",
    repo: "https://github.com/Gwin14/Lote-batch-renamer",
  },
  {
    id: "click",
    name: "Click! Click Here!",
    line: { pt: "Jogo educativo sobre phishing e engenharia social", en: "Educational game about phishing and social engineering" },
    detail: { pt: "", en: "" },
    tags: ["jogos"],
    stack: ["Godot 4.5", "GDScript"],
    url: "https://gwin14.github.io/Click_Click_Here/Index.html",
    repo: "https://github.com/Gwin14/Click_Click_Here",
  },
  {
    id: "kharitas",
    name: "Compositor de Kharitas",
    line: { pt: "Monta palavras num sistema de escrita visual em órbitas", en: "Builds words in an orbital visual writing system" },
    detail: { pt: "", en: "" },
    tags: ["web"],
    stack: ["JavaScript", "SVG"],
    url: "https://compositor-de-kharitas.vercel.app",
    privateRepo: true,
  },
  {
    id: "exif",
    name: "Criador de EXIF Frame",
    line: { pt: "Molduras para fotos geradas a partir dos metadados", en: "Photo frames generated from each photo's metadata" },
    detail: { pt: "", en: "" },
    tags: ["web"],
    stack: ["JavaScript", "Node.js"],
    url: "https://criador-de-exif-frame.onrender.com",
    repo: "https://github.com/Gwin14/Criador-de-exif-frame",
  },
  {
    id: "hermes",
    name: "Hermes",
    line: { pt: "Publica em várias redes sociais ao mesmo tempo", en: "Posts to several social networks at once" },
    detail: { pt: "", en: "" },
    tags: ["web"],
    stack: ["Python", "Django", "Docker"],
    repo: "https://github.com/Gwin14/Hermes",
  },
  {
    id: "pizzaria",
    name: "Pizzaria full stack",
    line: { pt: "Sistema de pedidos com API em Spring Boot e front em React", en: "Ordering system with a Spring Boot API and a React front end" },
    detail: { pt: "", en: "" },
    tags: ["web"],
    stack: ["Java", "Spring Boot", "React"],
    repo: "https://github.com/Gwin14/pizzaria-fullstack",
  },
  {
    id: "tarefas",
    name: "App de tarefas",
    line: { pt: "App em React Native com API em Node.js", en: "React Native app with a Node.js API" },
    detail: { pt: "", en: "" },
    tags: ["mobile"],
    stack: ["Expo", "Node.js"],
    repo: "https://github.com/Gwin14/App-de-tarefas-react-native",
  },
  {
    id: "fotoessencia",
    name: "fotoessencia",
    line: { pt: "Meu portfólio de fotografia", en: "My photography portfolio" },
    detail: { pt: "", en: "" },
    tags: ["web"],
    stack: ["JavaScript"],
    url: "https://fotoessencia.fabiosantos.dev.br",
    repo: "https://github.com/Gwin14/fotoessencia",
  },
];

export const contactIntro = {
  title: { pt: "Vamos conversar", en: "Let's talk" },
  lead: {
    pt: "Procuro vagas de desenvolvimento full stack ou mobile, remoto ou na Grande Florianópolis. O jeito mais rápido de falar comigo é por e-mail.",
    en: "I'm looking for full stack or mobile developer roles, remote or in Greater Florianópolis. Email is the fastest way to reach me.",
  },
  whatsapp: { pt: "WhatsApp", en: "WhatsApp" },
  outside: {
    pt: "Fora do código, fotografo e piloto drones no litoral catarinense. É de onde vêm boa parte das ideias dos apps.",
    en: "Away from code, I shoot photos and fly drones on the Santa Catarina coast. That's where many of my app ideas come from.",
  },
  photoLink: { pt: "Ver fotografias", en: "See photographs" },
};

export const footer = {
  made: {
    pt: "Feito com Next.js 16, React 19, WebGL e a API do Claude. Código no GitHub.",
    en: "Built with Next.js 16, React 19, WebGL and the Claude API. Code on GitHub.",
  },
  repo: "https://github.com/Gwin14/Eu__Fabio-Dos-Santos",
};

// Ficha de fatos usada pelo chat (servidor) e pelo índice offline (cliente).
export const factSheet = `
Nome: Fábio Santos (Fábio dos Santos). Desenvolvedor full stack e mobile em Florianópolis, SC, Brasil.
Contato: ${contact.email} · WhatsApp ${contact.phoneDisplay} · site ${contact.site} · LinkedIn ${contact.linkedin} · GitHub ${contact.github} (usuário Gwin14).
Situação: aberto a vagas de desenvolvimento full stack ou mobile, remoto ou na Grande Florianópolis.

Experiência:
- TI na Santos Supermercados, julho de 2024 até hoje: manutenção de computadores, impressoras e rede; suporte à infraestrutura das unidades; acompanhamento de novas tecnologias para o processo interno; desenvolvimento de sites e programas para uso interno (por exemplo o Teclado PDV, em C#, para caixas).
- Designer de estampas na Kharitas, agosto de 2023 a março de 2024: designs para sublimação no CorelDRAW, produção e venda de canecas, atendimento ao cliente.
- Copeiro no Hotel Pousada Santos, outubro de 2022 a fevereiro de 2023.

Formação: Análise e Desenvolvimento de Sistemas no Senac Santa Catarina (2024 até hoje). Técnico Integrado em Desenvolvimento de Jogos Digitais no Senac Santa Catarina (2020 a 2022).
Certificações: Modelagem de Software (Unisul); Programação de Soluções Computacionais (Unisul); Hackatruck MakerSpace (desenvolvimento em nuvem com Swift, API REST); Inglês Avançado (Rockfeller).
Idiomas: português nativo, inglês avançado.

Linguagens: TypeScript, JavaScript, Python, Java, Rust, C#, Swift, Kotlin, GDScript, C++.
Web e back-end: Next.js, React, Tailwind CSS, Node.js, Django, Spring Boot, Hono, Angular, Sanity, next-intl.
Mobile e desktop: Expo, React Native com módulos nativos em Swift e Kotlin, Tauri, Flutter (estudo), Windows Forms.
Dados e infra: Supabase (Postgres, RLS, Realtime, Edge Functions), PostgreSQL, SQLite, MySQL, Docker, Vercel, Git, PostHog.
IA: Gemini API em produção, Claude e agentes de código como o Claude Code, OpenRouter, servidores MCP.
Jogos e design: Godot, Unity, Figma, CorelDRAW.

Projetos:
- Central de atendimento omnichannel com IA (projeto principal): WhatsApp, Instagram, Messenger e chat do site numa caixa de entrada; Gemini responde dentro da base de conhecimento da empresa, com proteções e registro de cada decisão; multi-tenant com tenant_id e RLS; simulador; login da Meta por OAuth; Web Push; cinco papéis de acesso; painel de métricas e custos. Next.js, TypeScript, Supabase. ${omnichannel.url}
- Komorebi: app de câmera (Expo, React Native, módulos nativos) com controles manuais, RAW/ProRAW no iOS, LUTs, EXIF, galeria, LUTs gerados por descrição com Gemini e análise de composição com Apple Vision + Gemini.
- Hikari: editor de fotos RAW não destrutivo na GPU para iOS e Android, máscaras com Vision/ML Kit, LibRaw via JNI no Android, exportação TIFF 16 bits, sidecar XMP compatível com Lightroom.
- Lutra: app de color grading em lote para vídeos log (Apple Log, S-Log3, V-Log, LogC…) para Rec.709, scopes, falsa cor, exportação H.264/HEVC/AV1, Live Activity no iOS.
- Teto: condições de voo para drones com score 0–100, vento por altitude, satélites GNSS (CelesTrak), clima espacial da NOAA, cintilação ionosférica do INPE, aeródromos da ANAC, widgets e Live Activity, assinatura com RevenueCat, em português, inglês e espanhol.
- Solune: sol e lua, trajetos, fases, eclipses, céu em realidade aumentada e planetário com 1.600 estrelas.
- RoboBackup: programa de backup para Windows em Rust + Tauri sobre o Robocopy, agendado pelo Agendador de Tarefas, instalado no Hotel Pousada Santos.
- Teclado PDV: utilitário em C# para bloquear teclas em caixas de supermercado (Windows 7 a 11), senha com hash e salt.
- Site do Hotel Pousada Santos: Next.js 16, Sanity, next-intl em 3 idiomas.
- Cantos do Litoral: guia turístico e PWA do litoral de Palhoça com Next.js 16, Supabase, PostHog, Resend, Leaflet.
- Snaption Web Clipper: extensão do Chrome publicada na Chrome Web Store que salva páginas no Notion com resumo por IA (OpenRouter), backend Django para OAuth.
- MyndShelf: monorepo com Tauri, Expo e servidor Hono + SQLite, com Gemini para etiquetas.
- Prismo: hub web para conversar com LLMs e gerar imagens (React + Django).
- Click! Click Here!: jogo educativo de segurança cibernética em Godot 4.5.
- Um jogo de luta 2D multiplayer online no navegador com servidor WebSocket autoritativo e simulação determinística a 60 Hz; a arte foi gerada com o aseprite-mcp.
- Outros: Lote (renomeador em lote), Criador de EXIF Frame, Hermes (postagem em várias redes), pizzaria full stack em Spring Boot + React, app de tarefas em React Native + Node.
Fora do código: fotografia (portfólio fotoessencia) e drone.
Este portfólio: Next.js 16, React 19, WebGL para o color grading da foto, e a API do Claude neste chat.
`.trim();
