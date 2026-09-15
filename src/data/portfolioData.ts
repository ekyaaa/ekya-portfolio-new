export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectContribution {
  title: string;
  description: string;
}

export interface TechnicalDecision {
  title: string;
  description: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface GroupedStack {
  category: string;
  technologies: string[];
}

export interface ProjectVideoConfig {
  videoDir: string;
  videoFile: string;
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  number?: string;
  title: string;
  year: string;
  role: string;
  category?: string;
  collaborationType: 'Team Project' | 'Collaborative Tool' | 'Client Project' | 'Solo Tool' | string;
  shortDescription: string;
  description?: string;
  intro: string;
  overview: string[];
  challenge: string[];
  contributions: ProjectContribution[];
  technicalDecisions: TechnicalDecision[];
  keyFeatures?: string[];
  collaborationDetails?: string;
  metrics?: ProjectMetric[];
  outcome?: string;
  images: ProjectImage[];
  videoConfig?: ProjectVideoConfig;
  stack: string[];
  groupedStack?: GroupedStack[];
  liveUrl?: string | null;
  companyUrl?: string | null;
  repositoryUrl?: string | null;
  caseStudyUrl?: string | null;
  confidential?: boolean;
  colorBadge: string;
  featured?: boolean;
}

export interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
  evidence?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}


// Centralized configurable portfolio media directories and filenames
export const PORTFOLIO_MEDIA = {
  deployPackager: {
    videoDir: '/assets/portfolio/03-deploy_packager',
    videoFile: 'demo.mp4',
  },
  lizaMakeup: {
    videoDir: '/assets/portfolio/04-lizamakeup',
    videoFile: 'demo.mp4',
  },
};

// Clean helper to resolve video URL safely without broken UI or invalid paths
export const getProjectVideoUrl = (videoConfig?: { videoDir?: string; videoFile?: string }): string | null => {
  if (!videoConfig) return null;
  const dir = (videoConfig.videoDir || '').trim().replace(/\/+$/, '');
  const file = (videoConfig.videoFile || '').trim().replace(/^\/+/, '');
  if (!dir || !file) return null;
  return `${dir}/${file}`;
};

export const personalDetails = {
  name: "Ekya Muhammad",
  role: "System Analyst and Full-Stack Developer",
  tagline: "I turn ideas and real-world problems into thoughtful, reliable digital products.",
  location: "Indonesia",
  email: "ekyamuhammad@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/ekyaaa" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ekya-muhammad" },
  ],
};

export const projectsData: Project[] = [
  {
    id: "git-trace",
    slug: "git-trace",
    index: "01",
    number: "01",
    title: "GitTrace",
    year: "2026",
    role: "Architecture, Core Development & AI Integration",
    category: "Academic Tool · AI · Git",
    collaborationType: "Team Project",
    shortDescription: "A student productivity tool that transforms Git history into structured internship logbooks, originally built to reduce the repetitive documentation required during my POLINEMA internship.",
    description: "A student productivity tool that transforms Git history into structured internship logbooks, originally built to reduce the repetitive documentation required during my POLINEMA internship.",
    intro: "The idea was straightforward: if Git already remembers what I worked on, why should I rewrite everything manually?\n\nGitTrace was born out of a real problem during my POLINEMA internship. Required to compile periodic logbooks documenting my development work, I found the process repetitive because my activity was already recorded in Git through commits, timestamps, and code changes. GitTrace turns that raw repository history into structured, readable internship logbooks, keeping documentation grounded in actual development activity.",
    overview: [
      "GitTrace started from a simple problem: I was tired of manually writing my internship logbook.",
      "As a POLINEMA student, I needed to document my development activities during an internship, but most of the work was already reflected across Git commits, repository history, and day-to-day development progress. GitTrace was built to turn that fragmented history into a more structured and readable internship logbook, reducing repetitive documentation work while keeping the report grounded in actual development activity.",
      "By extracting repository records directly and applying structured prompt boundaries, GitTrace formats verified activity trails into institutional Word documents (.docx), Excel spreadsheets (.xlsx), and print-ready PDFs—helping students stay compliant without fabricating unrecorded work."
    ],
    challenge: [
      "Translating raw commit streams into meaningful logbook entries presents real technical hurdles. Commits are often shorthand phrases rather than descriptive summaries, and daily engineering tasks can be scattered across multiple local repositories.",
      "Furthermore, student developers need offline privacy so proprietary repository code never leaves their laptops. The system had to run smoothly on consumer hardware with local Ollama models, enforcing strict JSON schemas so AI acts strictly to make recorded history readable without hallucinating or inventing activities that did not occur."
    ],
    contributions: [
      {
        title: "System Architecture & MVP",
        description: "Designed the initial application architecture using Flutter and Riverpod state management, including local repository discovery and an interactive monthly calendar interface."
      },
      {
        title: "LLM Context & Prompt Engineering",
        description: "Engineered the AI context preparation pipeline, structuring multi-repo commit batches into bounded JSON schemas to run on consumer GPU VRAM and keep summaries strictly anchored to actual commit data."
      },
      {
        title: "Draft Review & Manual Annotation",
        description: "Implemented an editable draft timeline so students retain full manual control to review, refine, and add context to their activities before document export."
      },
      {
        title: "CI/CD & Multi-Platform Delivery",
        description: "Configured automated GitHub Actions workflows compiling and releasing standalone native desktop installers for Windows and macOS."
      }
    ],
    technicalDecisions: [
      {
        title: "Direct Git CLI subprocess traversal",
        description: "Executed native Git binary commands via Dart's Process.run rather than compiling heavy C-bindings (libgit2), achieving instantaneous multi-repo directory traversal across deep file trees."
      },
      {
        title: "Strict JSON infill and schema constraints",
        description: "Enforced rigid prompt boundaries that force LLM responses into structured JSON arrays, allowing seamless programmatic fallback when local models experience token truncation."
      },
      {
        title: "Local encrypted draft persistence",
        description: "Decoupled raw Git commit parsing from user-editable draft entries using local encrypted storage, enabling students to customize descriptions prior to document export."
      }
    ],
    keyFeatures: [
      "Recursive local workspace scanner detecting all active .git repositories automatically.",
      "Interactive monthly calendar with distinct per-repository color identification badges.",
      "AI intelligence engine supporting local offline Ollama models (DeepSeek) as well as cloud API providers.",
      "Editable draft timeline allowing students to review and manually supplement activity notes without data duplication.",
      "Multi-format document generation supporting customized Word (.docx) templates, styled Excel (.xlsx), and print-perfect A4 PDFs."
    ],
    collaborationDetails: "I led the project from inception—planning product direction, architecting the desktop system, defining the MVP, and building the core LLM prompt/context pipeline. To deliver within tight deadlines, selected features were delegated to my teammate AlexanderDev2004, who implemented docx/pdf export bug fixes, duplicate commit resolution, author filtering, and dark mode UI styling.",
    images: [
      {
        src: "/assets/portfolio/02-git_trace/home.png",
        alt: "GitTrace interactive monthly calendar dashboard and multi-repository selector",
        caption: "01 — Interactive monthly calendar dashboard & multi-repository activity view"
      },
      {
        src: "/assets/portfolio/02-git_trace/export-page-raw.png",
        alt: "GitTrace working hours and raw commit inspection table",
        caption: "02 — Daily hours & raw commit inspection table"
      },
      {
        src: "/assets/portfolio/02-git_trace/ai-result.png",
        alt: "GitTrace AI generated daily activity logbook entries",
        caption: "03 — Contextual AI daily activity logbook synthesis"
      },
      {
        src: "/assets/portfolio/02-git_trace/result-pdf.png",
        alt: "Exported POLINEMA internship logbook PDF",
        caption: "04 — Automated PDF logbook export ready for institutional submission"
      }
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Ollama", "DeepSeek", "Git CLI"],
    groupedStack: [
      { category: "Desktop & UI", technologies: ["Flutter 3.x", "Dart 3.x", "Flutter Riverpod", "Material Design"] },
      { category: "AI & Intelligence", technologies: ["Ollama (Local LLM)", "DeepSeek API", "Prompt Engineering", "JSON Schema Infill"] },
      { category: "Document Engines", technologies: ["Excel (.xlsx) Writer", "Word (.docx) Template Engine", "PDF Generator"] },
      { category: "DevOps & CI/CD", technologies: ["GitHub Actions", "Windows InnoSetup", "macOS Bundler", "Git Subprocesses"] }
    ],
    liveUrl: null,
    companyUrl: null,
    repositoryUrl: "https://github.com/ekyaaa/git_trace",
    confidential: false,
    colorBadge: "#3D4769",
    featured: true,
  },
  {
    id: "deploy-packager",
    slug: "deploy-packager",
    index: "02",
    number: "02",
    title: "Deploy Packager",
    year: "2026",
    role: "Creator & Core Developer",
    category: "Developer Tooling & DevOps",
    collaborationType: "Collaborative Tool",
    shortDescription: "Automates Git-based change extraction and directory structure preservation for air-gapped and local-server deployment pipelines.",
    description: "Automates Git-based change extraction and directory structure preservation for air-gapped and local-server deployment pipelines.",
    intro: "A specialized Flutter desktop utility created to eliminate one of the most frustrating bottlenecks in my internship: deploying software updates to isolated on-premise servers with no internet or GitHub access. Deploy Packager inspects Git commit diffs, extracts only the modified files, and packages them into the exact folder structure required for immediate, error-free offline server updates.",
    overview: [
      "In air-gapped or restricted local-server environments, automated cloud CI/CD pipelines cannot be used. Every release required manually examining Git commits, tracking down dozens of modified files across complex folder trees, creating matching directories by hand on the target server, and copying each file one by one.",
      "Deploy Packager automates this repetitive cycle: select a commit range, review the detected changes in a clean table, and package the files with their complete folder hierarchy preserved in a single click."
    ],
    challenge: [
      "Manual copy-pasting across large codebases carries severe operational risks: overlooking a single configuration file, nested component, or migration script causes silent runtime failures on production servers.",
      "The engineering challenge was building a desktop tool that could parse Git history reliably on client machines, preserve arbitrary directory structures across Windows and Linux path formats, and handle edge cases like deleted files, project build artifacts, and output path changes without performance lag."
    ],
    contributions: [
      {
        title: "Product Conception & Core Build",
        description: "Identified the workflow pain, formulated the solution, and built the original Flutter desktop product and UI from scratch."
      },
      {
        title: "Git Change Detection Engine",
        description: "Implemented diff-tree analysis using the native Git CLI to accurately isolate modified, added, and deleted files between selected commits."
      },
      {
        title: "Subtree Preservation Packaging",
        description: "Engineered recursive folder packaging that mirrors exact relative project paths into the target deployment bundle."
      },
      {
        title: "Persistent Workflow State",
        description: "Implemented workspace path memory and project-specific export preferences so repetitive deployments require zero re-configuration."
      }
    ],
    technicalDecisions: [
      {
        title: "Native filesystem path preservation",
        description: "Normalized POSIX and Windows path delimiters during file copying, ensuring generated deployment packages deploy identically to Linux servers or Windows test environments."
      },
      {
        title: "Commit-bounded diff parsing",
        description: "Utilized targeted git diff-tree queries with commit ranges rather than unindexed folder comparisons, reducing file detection time to milliseconds even in repositories with thousands of files."
      },
      {
        title: "Extensible pre-build hooks",
        description: "Supported optional build triggers (such as frontend bundling or static asset collection) directly prior to packaging, ensuring server-ready dist folders are packaged in one pipeline."
      }
    ],
    keyFeatures: [
      "Interactive Git commit selector with multi-commit range inspection.",
      "Automatic extraction of modified files preserving nested directory trees.",
      "Visual change review table with support for modified, added, and deleted file statuses.",
      "Project-specific export destination persistence with global fallback.",
      "Optional build triggers for frontend (npm/pnpm) and backend (Django collectstatic) workflows."
    ],
    collaborationDetails: "I conceptualized the tool, designed the workflow, and implemented the core application and Git extraction logic. As the tool became an everyday part of our team's deployment routine, my friend and collaborator Oktavian Eka Ramadhan contributed useful extensions: automated build execution (npm/pnpm and collectstatic), flush destination folder options, deleted file status tracking, and release-please automation.",
    videoConfig: PORTFOLIO_MEDIA.deployPackager,
    images: [
      {
        src: "/assets/portfolio/02-git_trace/home.png",
        alt: "Deploy Packager workflow preview",
        caption: "01 — Deploy Packager automated file extraction workflow"
      }
    ],
    stack: ["Flutter", "Dart", "Git CLI", "Desktop", "DevOps Tooling"],
    groupedStack: [
      { category: "Application", technologies: ["Flutter Desktop", "Dart 3.x", "Material 3 Design"] },
      { category: "Version Control", technologies: ["Git CLI Subprocesses", "Commit Diff Parsing", "Path Normalization"] },
      { category: "Automation & Tooling", technologies: ["InnoSetup Windows Installer", "Release-Please", "GitHub Actions"] }
    ],
    liveUrl: null,
    companyUrl: null,
    repositoryUrl: "https://github.com/ekyaaa/deploy_packager",
    confidential: false,
    colorBadge: "#62635B",
    featured: true,
  },
  {
    id: "resurva",
    slug: "resurva",
    index: "03",
    number: "03",
    title: "Resurva",
    year: "2026",
    role: "Backend Architecture & AI Integration",
    category: "Backend Systems & AI Agents",
    collaborationType: "Team Project (BytesFest 2026)",
    shortDescription: "Modular monolith FastAPI backend across 18 domain modules, featuring FEFO batch inventory deduction, escrow wallet transactions, real-time SSE streaming, and a 12-tool MCP AI orchestrator.",
    description: "Modular monolith FastAPI backend across 18 domain modules, featuring FEFO batch inventory deduction, escrow wallet transactions, real-time SSE streaming, and a 12-tool MCP AI orchestrator.",
    intro: "An enterprise smart business management platform and surplus food marketplace engineered to curb food waste among culinary MSMEs across Solo Raya. Developed for BytesFest 2026 by Team NexaCode, I served as Lead Backend Developer, architecting a modular FastAPI service with PostgreSQL, real-time Server-Sent Events (SSE) order streaming, and an AI intelligence system built on the Model Context Protocol (MCP).",
    overview: [
      "Indonesia produces an estimated 23–48 million tons of food waste annually, resulting in immense economic losses while contributing significantly to greenhouse gas emissions. In Solo Raya, local culinary MSMEs face constant inventory imbalances due to manual tracking and lack of structured restocking protocols.",
      "Resurva bridges merchant inventory management and consumer demand. I designed and implemented the core backend services that coordinate merchant POS transactions, consumer surplus purchases, inventory lifecycle tracking, automated store summaries, and environmental carbon savings calculations."
    ],
    challenge: [
      "Building a dual-sided marketplace with an intelligent assistant required managing complex concurrency: inventory quantities needed instantaneous locking during reservation checkout, order status changes had to reach merchant dashboards in real-time, and AI-assisted queries had to access transactional databases safely without risky unconstrained queries.",
      "The engineering objective was designing a modular monolith backend that kept database access cleanly separated, supported typed AI tool executions via MCP, and scaled reliably on lightweight cloud infrastructure without microservice orchestration overhead."
    ],
    contributions: [
      {
        title: "Backend Architecture & 18 Domain Modules",
        description: "Engineered the entire FastAPI REST API using the Route-Service-Repository pattern across 18 isolated domain modules, including inventory, orders, escrow wallets, cart reservations, and audit logging."
      },
      {
        title: "FEFO Inventory Deduction & Escrow Wallet Engine",
        description: "Engineered First-Expired-First-Out (FEFO) batch inventory deduction to prioritize clearance of nearest-expiry foods, combined with an Escrow Wallet mechanism holding transaction funds until in-person pickup verification."
      },
      {
        title: "Database Modeling & Migrations",
        description: "Designed normalized PostgreSQL relational schemas using SQLAlchemy ORM, managing database evolutions through strictly audited Alembic migration scripts."
      },
      {
        title: "MCP AI Agent Framework & 12-Tool Suite",
        description: "Architected a custom Model Context Protocol (MCP) orchestrator and implemented 12 specialized tools for sales summarization, expiry alerts, inventory audits, and carbon analytics."
      },
      {
        title: "Real-Time Order Streaming (SSE)",
        description: "Implemented Server-Sent Events (SSE) infrastructure for low-latency, persistent status streaming from consumer checkouts directly into merchant kitchen screens."
      },
      {
        title: "Automated Deployment Pipeline",
        description: "Authored continuous deployment automation using GitHub Actions with SSH agent forwarding to manage seamless zero-downtime VPS backend rollouts."
      }
    ],
    technicalDecisions: [
      {
        title: "Route-Service-Repository separation",
        description: "Decoupled business rules from database queries and HTTP serialization, creating isolated service layers that can be unit-tested without mocking the entire web framework."
      },
      {
        title: "FEFO Batch Inventory & Escrow Wallet Mechanics",
        description: "Applied First-Expired-First-Out (FEFO) batch deduction on perishable goods to ensure items closest to expiration sell first, paired with escrow wallet mechanics that safeguard buyer payments until physical verification."
      },
      {
        title: "Pluggable MCP tool registry pattern",
        description: "Encapsulated AI tool capabilities into typed base classes registered at runtime, enabling the agent orchestrator to discover schemas dynamically without hardcoded agent logic."
      },
      {
        title: "Server-Sent Events for order streams",
        description: "Selected SSE over bidirectional WebSockets for order notifications, providing automatic browser reconnection and lower server resource consumption for one-way event streams."
      }
    ],
    keyFeatures: [
      "12-Tool Model Context Protocol (MCP) agent framework for automated merchant business intelligence.",
      "First-Expired-First-Out (FEFO) automated batch inventory clearance engine.",
      "Dual-sided Escrow Wallet with reservation locking and instant refund protection.",
      "Real-time order lifecycle streaming via Server-Sent Events (SSE) to merchant kitchen dashboards.",
      "Dynamic multi-provider LLM integration (OpenAI, Anthropic, DeepSeek) for store review sentiment summaries.",
      "Quantified environmental carbon savings conversion based on rescued food weights.",
      "Secure digital wallet ledger, balance reservation locks, and comprehensive transaction audit trails."
    ],
    collaborationDetails: "Developed as Team NexaCode for BytesFest 2026. I had end-to-end ownership of the backend system architecture, API services, database design, AI/MCP orchestrator, and server deployment. Teammate Khoirotun Nisa' led UI/UX design and Next.js frontend development, while Nathanael Juan Gracedo led product management and the Flutter mobile application.",
    images: [
      {
        src: "/assets/portfolio/01-resurva/arsitektur.png",
        alt: "Resurva full system architecture diagram",
        caption: "01 — System architecture: Web, Mobile, FastAPI modular services, & MCP agent pipeline"
      },
      {
        src: "/assets/portfolio/01-resurva/resurva-ecosystem-hero.png",
        alt: "Resurva ecosystem overview",
        caption: "02 — Full ecosystem overview: Smart Inventory, POS, & Surplus Food Marketplace"
      }
    ],
    stack: ["FastAPI", "Python", "PostgreSQL", "MCP", "SQLAlchemy", "SSE", "AI Integration"],
    groupedStack: [
      { category: "Backend Architecture", technologies: ["FastAPI (Python 3.12+)", "Route-Service-Repo Pattern", "Pydantic v2", "Alembic"] },
      { category: "Database & Storage", technologies: ["PostgreSQL", "SQLAlchemy ORM", "Valkey / Redis", "S3 Storage"] },
      { category: "AI & MCP Tooling", technologies: ["Model Context Protocol (MCP)", "Tool Orchestrator", "DeepSeek", "OpenAI API"] },
      { category: "Real-Time & Infrastructure", technologies: ["Server-Sent Events (SSE)", "Docker", "Linux VPS", "GitHub Actions CI/CD"] }
    ],
    liveUrl: "https://resurva.my.id/",
    companyUrl: null,
    repositoryUrl: "https://github.com/Nexa-Code-Studio/resurva-docs",
    confidential: false,
    colorBadge: "#3D4769",
    featured: true,
  },
  {
    id: "liza-makeup",
    slug: "liza-makeup",
    index: "04",
    number: "04",
    title: "Liza Makeup",
    year: "2025",
    role: "Designer & Developer",
    category: "Creative Web & Brand Presence",
    collaborationType: "Client Project",
    shortDescription: "Luxury editorial digital presence and interactive portfolio for an East Java MUA business, engineered with Astro v5, GSAP motion, and WhatsApp booking.",
    description: "Luxury editorial digital presence and interactive portfolio for an East Java MUA business, engineered with Astro v5, GSAP motion, and WhatsApp booking.",
    intro: "An end-to-end client engagement created for my cousin's professional Makeup Artist (MUA) business in Jombang, East Java. Rather than assembling a generic social link page, I translated the brand's aesthetic into an editorial digital portfolio with high-performance animations, rich structured data SEO, and direct WhatsApp date booking.",
    overview: [
      "Independent beauty and bridal professionals often rely solely on Instagram, where valuable portfolio work is lost in infinite feeds, pricing transparency is difficult to maintain, and local Google search visibility is virtually zero.",
      "Liza Makeup required a bespoke digital home that reflected the elegance of bridal artistry, displayed high-resolution photography without sluggish page loads, and guided prospective clients smoothly from visual inspiration to date consultation."
    ],
    challenge: [
      "Bridal imagery requires crisp visual fidelity, yet image-heavy portfolios often suffer from severe performance penalties and mobile layout shifts. The technical challenge was achieving top-tier visual elegance and complex typography animations while maintaining near-perfect mobile performance scores and strict local SEO visibility."
    ],
    contributions: [
      {
        title: "Visual Direction & Brand Identity",
        description: "Established the luxury editorial aesthetic combining warm champagne, soft nude, and charcoal with refined typography (Playfair Display and Montserrat)."
      },
      {
        title: "Astro v5 Frontend Architecture",
        description: "Engineered the site with Astro v5 and Tailwind CSS, outputting optimized static HTML with zero unnecessary client-side JavaScript."
      },
      {
        title: "Motion Choreography (GSAP & Lenis)",
        description: "Implemented scroll-triggered text splitting, subtle grain overlays, smooth parallax sections, and integrated Lenis smooth scroll with GSAP's ticker loop."
      },
      {
        title: "Structured Data SEO & Conversion Flow",
        description: "Authored JSON-LD Schema.org BeautySalon structured metadata for Google Search and built seamless WhatsApp booking integration with pre-filled consultation details."
      }
    ],
    technicalDecisions: [
      {
        title: "Static HTML generation via Astro islands",
        description: "Leveraged Astro's zero-JS-by-default architecture to pre-render every page element statically, ensuring sub-second First Contentful Paint even on constrained cellular networks."
      },
      {
        title: "Synchronized Lenis and GSAP animation ticker",
        description: "Bound Lenis smooth scroll callbacks directly into the GSAP ticker loop, eliminating micro-stutters between typography line masks and viewport scroll position."
      },
      {
        title: "Optimized WebP asset pipeline with lightbox zoom",
        description: "Converted all portfolio photography into responsive WebP formats with native lazy-loading and custom full-screen lightbox preview."
      }
    ],
    keyFeatures: [
      "Curated bridal and event categories (Akad, Resepsi, Formal, Carnaval) with full-screen lightbox.",
      "Transparent package breakdown tables detailing bridal services and inclusions.",
      "Interactive context-aware custom cursor and smooth typography line reveals.",
      "Direct WhatsApp booking routing with dynamic consultation pre-fill.",
      "Rich Schema.org BeautySalon JSON-LD structured data for local search authority."
    ],
    collaborationDetails: "This was a solo client project where I took full responsibility for both visual design and frontend engineering, working in close collaboration with the business owner to curate photography and organize package offerings.",
    videoConfig: PORTFOLIO_MEDIA.lizaMakeup,
    images: [
      {
        src: "/assets/portfolio/04-lizamakeup/primary-model.webp",
        alt: "Liza Makeup editorial hero visual",
        caption: "01 — Luxury editorial hero presentation & brand typography"
      },
      {
        src: "/assets/portfolio/04-lizamakeup/bride-portfolio-1.webp",
        alt: "High-resolution wedding portfolio photo",
        caption: "02 — High-resolution wedding portfolio showcase"
      }
    ],
    stack: ["Astro", "Tailwind CSS", "GSAP", "Lenis", "SEO", "Creative Dev"],
    groupedStack: [
      { category: "Frontend", technologies: ["Astro v5.1", "Tailwind CSS v3.4", "HTML5 Semantic Architecture"] },
      { category: "Motion & Interaction", technologies: ["GSAP 3.12", "ScrollTrigger", "Lenis Smooth Scroll", "Text Splitter"] },
      { category: "Media & Optimization", technologies: ["WebP Image Pipeline", "Dynamic Canvas Favicon", "Fullscreen Lightbox"] },
      { category: "SEO & Integration", technologies: ["Schema.org JSON-LD", "OpenGraph Protocol", "WhatsApp Business Routing"] }
    ],
    liveUrl: "https://lizamakeup.vercel.app/",
    companyUrl: null,
    repositoryUrl: "https://github.com/ekyaaa/lizamakeup",
    confidential: false,
    colorBadge: "#C1B0A0",
    featured: false,
  },
  {
    id: "folder-sync-inspector",
    slug: "folder-sync-inspector",
    index: "05",
    number: "05",
    title: "Folder Sync Inspector",
    year: "2026",
    role: "Creator & Desktop Tool Developer",
    category: "Developer Tooling & Verification",
    collaborationType: "Solo Tool",
    shortDescription: "Desktop verification utility comparing directories and Git commit tree integrity via SHA-256 checksums and line-by-line diffing.",
    description: "Desktop verification utility comparing directories and Git commit tree integrity via SHA-256 checksums and line-by-line diffing.",
    intro: "A developer desktop utility built with Flutter to verify directory synchronization and validate Git commit integrity before releasing updates to offline servers. Conceived as the direct precursor to Deploy Packager, it solved the critical need to confirm that manually extracted release packages exactly matched their corresponding Git commits before touching production infrastructure.",
    overview: [
      "Prior to building Deploy Packager, deploying to air-gapped on-premise servers required executing manual shell scripts (such as git diff-tree coupled with xargs cp --parents) to generate a folder containing only changed files. However, there was no quick way to audit that the resulting folder accurately captured all commit modifications without silent omissions.",
      "Folder Sync Inspector was created to bridge this verification gap: it compares source and target directories using cryptographic SHA-256 checksums, inspects Git commit trees, and presents line-by-line visual differences directly within a clean desktop interface."
    ],
    challenge: [
      "Comparing folders solely through file modification timestamps is notoriously unreliable across operating systems, as file copy and extraction operations update timestamps arbitrarily. The utility needed to compute cryptographic content hashes rapidly across hundreds of files without freezing the UI and provide a clean visual diff viewer for code discrepancies."
    ],
    contributions: [
      {
        title: "Desktop Utility Conception & UI",
        description: "Designed and developed the Flutter desktop application with a focused Material 3 layout, folder selection pickers, and real-time path filtering."
      },
      {
        title: "Cryptographic SHA-256 Verification",
        description: "Implemented high-speed SHA-256 checksum comparison across directory trees, accurately categorizing files into Match, Different, and Missing states."
      },
      {
        title: "Git Commit Tree Validation",
        description: "Built the commit inspection routine that cross-references a prepared folder's file manifest against the file list extracted from specific Git commit hashes."
      },
      {
        title: "Embedded Visual Code Diff",
        description: "Integrated an in-app side-by-side and inline syntax diff viewer using diff_match_patch with dual line numbering and change highlighting."
      }
    ],
    technicalDecisions: [
      {
        title: "Content hashing over timestamp comparison",
        description: "Utilized SHA-256 content hashing rather than filesystem modified dates, completely eliminating false positives caused by file copy and transfer processes."
      },
      {
        title: "In-app line-by-line diff rendering",
        description: "Integrated the diff_match_patch algorithm directly inside a custom modal viewer, allowing immediate inspection of differing lines without launching external comparison software."
      },
      {
        title: "The evolutionary catalyst for Deploy Packager",
        description: "Using Folder Sync Inspector confirmed that while verification was essential, the manual shell extraction step was still the core operational bottleneck. This realization directly inspired the development of Deploy Packager two days later, combining extraction, tree preservation, and packaging into a unified tool."
      }
    ],
    keyFeatures: [
      "High-speed dual directory comparison powered by cryptographic SHA-256 checksums.",
      "Git commit tree validation verifying prepared folders against specific commit changes.",
      "Code-editor style line-by-line visual difference viewer with dual line numbers.",
      "Instant status filters (Match, Different, Missing) and real-time search.",
      "Persistent folder selection and dark/light theme preferences."
    ],
    collaborationDetails: "Conceived, architected, and built independently as a personal developer productivity tool to solve local verification challenges during offline deployment workflows.",
    images: [
      {
        src: "/assets/portfolio/05-folder_sync_inspector/icon.png",
        alt: "Folder Sync Inspector application workspace icon",
        caption: "01 — Folder Sync Inspector application icon & verification workspace"
      }
    ],
    stack: ["Flutter", "Dart", "SHA-256", "diff_match_patch", "Desktop Tool"],
    groupedStack: [
      { category: "Application", technologies: ["Flutter Desktop", "Dart 3.x", "Flutter Riverpod", "Material 3"] },
      { category: "Diffing & Hashing", technologies: ["SHA-256 Cryptography", "diff_match_patch", "File Manifest Comparison"] },
      { category: "System & Tooling", technologies: ["File Selector", "Path Provider", "SharedPreferences"] }
    ],
    liveUrl: null,
    companyUrl: null,
    repositoryUrl: "https://github.com/ekyaaa/folder_sync_inspector",
    confidential: false,
    colorBadge: "#817A75",
    featured: false,
  },
];

export const expertiseData: ExpertiseItem[] = [
  {
    id: "backend-architecture",
    number: "01",
    title: "Backend & System Architecture",
    description:
      "Designing backend systems around real operational requirements, from API and database structure to integration, refactoring, and long-term maintainability.",
    skills: ["Architecture", "API Design", "Database Design", "Integration"],
    evidence: [
      "4 greenfield operational apps & 1 Laravel \u2192 Django refactor (SAI)",
      "Backend architecture, API design & MCP integration (Resurva)",
      "PostgreSQL connection pooling & database timeout investigation",
    ],
  },
  {
    id: "product-development",
    number: "02",
    title: "Full-Stack Product Development",
    description:
      "Turning requirements into working software across the full development lifecycle, including interface design, backend implementation, deployment, and ongoing iteration.",
    skills: ["Requirements", "UI \u2192 Backend", "End-to-End Delivery", "Maintenance"],
    evidence: [
      "Direct supervisor requirement discovery translated to software",
      "End-to-end client platform delivery from UI to SEO (Liza Makeup)",
      "Independent client application delivery cycles (NexaCode)",
    ],
  },
  {
    id: "data-performance",
    number: "03",
    title: "Data Processing & Performance",
    description:
      "Building data-heavy workflows that stay responsive, from operational datasets with thousands of records to offline applications designed around large local databases.",
    skills: ["Redis", "Parallel Processing", "Large Datasets", "SQLite"],
    evidence: [
      "Redis & parallel processing for ~10K wide Excel + ~5K operational rows",
      "Offline-first POS engineered for millions of local SQLite records",
      "Query optimization & connection management under production load",
    ],
  },
  {
    id: "tooling-deployment",
    number: "04",
    title: "Deployment & Developer Tooling",
    description:
      "Improving how software gets delivered and understood through Linux deployment, workflow automation, Git-based tooling, and internal developer utilities.",
    skills: ["Linux Deployment", "Automation", "Git Workflows", "Internal Tools"],
    evidence: [
      "Manual Ubuntu Server deployment with Nginx & systemd services",
      "Deploy Packager & Folder Sync for local air-gapped deployments",
      "GitTrace context pipelines & local/cloud LLM activity summaries",
    ],
  },
];

export const processData: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Deconstruct",
    subtitle: "Understanding the Core Narrative",
    description: "Analyzing goals, stripping away unnecessary visual noise, and establishing an editorial typography hierarchy and layout grid.",
  },
  {
    number: "02",
    title: "Prototype & Choreograph",
    subtitle: "Motion Token Scripting",
    description: "Defining GSAP motion tokens, easing functions, and interactive wireframes before writing production components.",
  },
  {
    number: "03",
    title: "Craft & Architect",
    subtitle: "Clean React + TS Build",
    description: "Developing lightweight, accessible UI components with CSS variables and scoped GSAP useGSAP hooks.",
  },
  {
    number: "04",
    title: "Polish & Audit",
    subtitle: "Performance & Smooth Scroll",
    description: "Refining Lenis scroll synchronization, optimizing image assets, and ensuring 60fps smooth rendering across viewports.",
  },
];

export const getAllProjects = (): Project[] => projectsData;

export const getProjectBySlug = (slug: string): Project | undefined => {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  return projectsData.find((p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean);
};


