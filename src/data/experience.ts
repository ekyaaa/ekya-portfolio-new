import { Experience, ToolboxCategory } from '../sections/Experience/experience.types';

export const toolboxData: ToolboxCategory[] = [
  {
    category: 'Backend & APIs',
    items: ['Django', 'FastAPI', 'Laravel', 'REST APIs'],
    supporting: ['SQLAlchemy', 'Alembic', 'JWT'],
  },
  {
    category: 'Frontend & Web',
    items: ['React', 'Next.js', 'Astro', 'Tailwind CSS'],
    supporting: ['TypeScript', 'GSAP'],
  },
  {
    category: 'Mobile & Desktop Systems',
    items: ['Flutter', 'Dart', 'Riverpod'],
    supporting: ['Process CLI', 'diff_match_patch'],
  },
  {
    category: 'Data & Storage',
    items: ['PostgreSQL', 'Redis', 'SQLite'],
    supporting: ['Connection Pooling (PgBouncer evaluation)'],
  },
  {
    category: 'Infrastructure & Linux',
    items: ['Ubuntu Server', 'Nginx', 'systemd', 'Git'],
    supporting: ['GitHub Actions'],
  },
  {
    category: 'AI Integration',
    items: ['Ollama', 'LLM APIs', 'DeepSeek', 'MCP'],
    supporting: ['Prompt & Context Engineering'],
  },
];

export const experienceData: Experience[] = [
  {
    id: 'exp-sai',
    company: 'PT Surabaya Autocomp Indonesia',
    companyUrl: 'https://maps.app.goo.gl/KBJZa7vBitTT9ay38',
    affiliation: 'Yazaki Group \u00b7 Japan',
    role: 'Software Developer Intern',
    scope: 'PPC & Inventory Control',
    startDate: '2026-01-01',
    endDate: 'Present',
    current: true,
    featured: true,
    employmentType: 'Internship',
    location: 'On-site',
    remote: false,
    summary:
      'Building and maintaining internal operational software across Production Planning Control (PPC) and Inventory Control (IC), with end-to-end ownership spanning requirement discussions, UI and backend architecture, data-heavy optimizations, and manual Linux server deployment.',
    responsibilities: [
      'Collaborate directly with department supervisors to translate operational challenges into functional UI flows, backend architecture, and database designs.',
      'Manage end-to-end delivery across 8 internal projects: building 4 greenfield applications, executing 1 major Laravel-to-Django refactor, and actively maintaining 3 production systems.',
      'Engineered high-volume data processing workflows for a ~10K-row wide Excel master dataset (extending to column BIS) merged with ~5K operational rows, introducing Redis-backed processing and parallel execution to keep operations responsive.',
      'Investigated database connection bottlenecks across multiple internal applications experiencing request timeouts, presenting PgBouncer as a prospective connection-pooling strategy while evaluating broader PostgreSQL optimization approaches.',
      'Took internal applications from development through manual deployment on Ubuntu servers, handling Nginx reverse proxy configuration, systemd service setup, and production troubleshooting.',
    ],
    metrics: [
      { value: '8', label: 'Projects Handled' },
      { value: '4', label: 'Greenfield Apps' },
      { value: '1', label: 'Laravel \u2192 Django Refactor' },
      { value: '10K+', label: 'Master Data Rows' },
    ],
    tools: ['Django', 'React', 'PostgreSQL', 'Redis', 'Nginx', 'Ubuntu Server'],
    previewImages: ['/assets/experience/sai-documentation.png'],
    previewCaption:
      'With cross-department peers outside the facility \u2014 on-site industrial and office areas are strictly photography-restricted',
  },
  {
    id: 'exp-nexacode',
    company: 'NexaCode',
    companyUrl: 'https://nexacode.dev/',
    role: 'Freelance Software Developer',
    scope: 'Independent Software & Client Solutions',
    startDate: '2025-12-27',
    endDate: 'Present',
    current: true,
    featured: false,
    employmentType: 'Freelance',
    location: 'Remote',
    remote: true,
    summary:
      'Building custom cross-platform software, web applications, and standalone product solutions independently—handling requirement discovery, architecture design, frontend/backend implementation, and iterative client delivery.',
    responsibilities: [
      'Work directly with freelance clients to discover business requirements, design software architecture, and deliver cross-platform mobile/desktop apps and web solutions.',
      'Architected a local-first offline Point of Sale (POS) application engineered to reliably index and query millions of records locally using SQLite without cloud dependence.',
      'Engineered a token-based activation mechanism with a lightweight FastAPI backend (hosted on Vercel) to manage and authorize offline POS installations across client hardware.',
    ],
    metrics: [
      { value: '1M+', label: 'Local SQLite Records' },
      { value: 'Offline', label: 'First POS Architecture' },
    ],
    tools: ['Flutter', 'Next.js', 'FastAPI', 'SQLite', 'Tailwind CSS', 'TypeScript'],
  },
];
