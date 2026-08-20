export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;

  problem?: string;

  overview: string;

  technicalDecisions?: string[];

  features: string[];

  results?: string[];

  contribution: string;
  challenges: string[];
  lessons: string[];

  githubUrl: string;
  demoUrl: string;
};

export const projects: PortfolioProject[] = [
  /* =========================================
     SMARTSTOCK
  ========================================= */

  {
    id: "smartstock",

    title: "SmartStock",

    description:
      "An end-to-end retail demand forecasting and inventory optimization application built with Python, machine learning, PostgreSQL, Streamlit and Docker.",

    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "PostgreSQL",
      "Streamlit",
      "Docker",
    ],

    status: "Completed - V1.0.0",

    problem:
      "Retail inventory decisions depend on understanding future demand, but inaccurate forecasts can lead to either excess stock or shortages. The goal of SmartStock was to build an end-to-end system that turns historical sales data into demand forecasts and then converts those forecasts into practical inventory recommendations.",

    overview:
      "SmartStock is a complete retail analytics application that combines demand forecasting, inventory optimization, database integration and an interactive Streamlit interface. Historical retail sales data is validated, transformed into forecasting features, evaluated using leakage-safe time-based validation and then used to generate downstream inventory decisions including safety stock, reorder points and recommended order quantities.",

    technicalDecisions: [
      "Used time-based validation rather than random train-test splitting to prevent future information from leaking into historical forecasting experiments.",

      "Compared simple statistical baselines against machine-learning approaches instead of assuming that a more complex model would automatically perform better.",

      "Selected the 28-day historical mean as the production forecaster after it performed best during balanced validation.",

      "Separated forecasting logic, inventory calculations, database access, application code and utilities into modular packages.",

      "Maintained a strict distinction between M5-derived sales information and synthetic inventory assumptions.",

      "Supported both PostgreSQL-backed operation and a local CSV demo mode so the application remains reproducible without requiring a database server.",

      "Added Docker and Docker Compose configuration to prepare the system for reproducible deployment.",
    ],

    features: [
      "Processes more than 582,000 retail sales observations.",

      "Leakage-safe time-series feature engineering and model validation.",

      "Comparison of multiple forecasting baselines and machine-learning models.",

      "Recursive demand forecasting for future inventory planning.",

      "Safety-stock and reorder-point calculations.",

      "Service-level and cost-optimized inventory strategies.",

      "Inventory decisions across 300 item-store combinations.",

      "Seven Streamlit application sections including forecasting, inventory health, reorder recommendations and scenario planning.",

      "PostgreSQL data-access layer with a local CSV fallback.",

      "Docker and Docker Compose deployment configuration.",

      "Automated validation, reproducibility and testing checks.",
    ],

    results: [
      "582K+ retail sales observations processed.",

      "86 automated tests passed with 0 failures.",

      "Locked-test MAE of 1.382 and RMSE of 2.387.",

      "300 item-store inventory decisions generated.",

      "Seven complete Streamlit application sections.",

      "The simple 28-day historical mean outperformed more complex models during balanced validation.",
    ],

    contribution:
      "I developed SmartStock as an end-to-end data science application. My work covered data validation, feature engineering, forecasting experiments, model comparison, inventory calculations, PostgreSQL integration, Streamlit application development, testing, Docker preparation and technical documentation.",

    challenges: [
      "Preventing data leakage during time-series feature engineering and model evaluation.",

      "Comparing simple forecasting baselines fairly against machine-learning models.",

      "Converting statistical forecasts into inventory recommendations that are understandable from a business perspective.",

      "Designing inventory experiments while clearly separating real retail-derived information from synthetic assumptions.",

      "Supporting both PostgreSQL and a reproducible CSV fallback without duplicating application logic.",

      "Keeping forecasting, inventory, database and UI layers modular and testable.",
    ],

    lessons: [
      "Time-series validation and leakage prevention.",

      "Why simpler forecasting models can outperform more complex machine-learning approaches.",

      "Forecast evaluation using MAE, RMSE, WAPE, RMSSE and bias.",

      "Safety stock, reorder points and inventory optimization.",

      "Modular data science application architecture.",

      "PostgreSQL integration with Python.",

      "Interactive analytics application development with Streamlit.",

      "Testing, reproducibility, documentation and deployment preparation.",
    ],

    githubUrl: "",

    demoUrl: "",
  },

  /* =========================================
     TOPICORA
  ========================================= */

  {
    id: "topicora",

    title: "Topicora",

    description:
      "A full-stack editorial publishing and content-management platform built with Next.js, Supabase, PostgreSQL and TypeScript.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Resend",
      "Playwright",
      "Vitest",
    ],

    status:
      "Live - Production Deployed",

    problem:
      "Topicora was created to provide a complete editorial publishing workflow rather than only a public blog interface. The goal was to support readers, editors and administrators through one system that handles article publishing, authentication, scheduling, revisions, newsletters, search, SEO, security and editorial operations.",

    overview:
      "Topicora is an India-first English editorial publication and content-management platform. It contains both a responsive public publication for readers and a protected CMS for editorial staff. The application supports article creation and publishing, scheduled publication, revisions, role-based administration, MFA-aware authorization, full-text search, newsletters, media storage, SEO metadata, RSS, audit logging and production-oriented security controls.",

    technicalDecisions: [
      "Used the Next.js App Router with React Server Components, Server Actions and Route Handlers to keep public reads and trusted mutations primarily on the server.",

      "Used Supabase PostgreSQL directly instead of introducing a separate ORM, keeping database policies, triggers and functions close to the underlying PostgreSQL model.",

      "Combined application-level role checks with Supabase Row Level Security so privileged operations are protected at multiple layers.",

      "Required MFA assurance for sensitive staff workflows instead of treating successful password authentication alone as sufficient authorization.",

      "Implemented non-destructive article revisions so restoring an older version creates additional history rather than deleting later revision records.",

      "Designed scheduled publishing using both exact-time database visibility rules and a durable publication-job queue for cache refresh operations.",

      "Stored structured editor blocks as JSON while generating canonical Markdown for public rendering, search, RSS and portability.",

      "Stored hashes of newsletter confirmation tokens rather than raw confirmation secrets.",

      "Separated production-dependent integrations such as Resend, Sentry and Vercel cron execution from locally testable application workflows.",
    ],

    features: [
      "Responsive public editorial homepage, article archive, categories and tags.",

      "PostgreSQL full-text article search with result highlighting.",

      "Rich sanitized Markdown article rendering with table of contents and reading progress.",

      "Protected administrator and editor CMS.",

      "Article creation, editing, publishing, scheduling, archiving and restoration.",

      "Structured block-based article editor.",

      "Non-destructive article revision history.",

      "Signed and expiring draft-preview links.",

      "Role-based staff management and invitation workflow.",

      "TOTP multi-factor authentication for invited staff.",

      "Double-opt-in newsletter subscription system.",

      "Newsletter campaigns, segmentation and delivery queues.",

      "Contact-message workflow with rate limiting and abuse controls.",

      "Supabase Storage integration for article media.",

      "Dynamic metadata, JSON-LD, Open Graph, sitemap, robots and RSS.",

      "Append-only administrative audit logs.",

      "Authenticated scheduled-publication and campaign workers.",

      "Optional Sentry and Vercel Analytics integrations.",
    ],

    results: [
  "27 unit tests passing across 13 Vitest files.",

  "13 verified browser workflow scenarios.",

  "Next.js production build succeeds with 75 generated route entries.",

  "Production PostgreSQL migrations successfully applied to Supabase.",

  "Protected administrator CMS authenticated and verified in production.",

  "Article creation, category management and public publishing verified end-to-end.",

  "Contact submissions persist to the CMS and send real email notifications through Resend.",

  "Public production deployment available at topicora.kabirbisanal.com.",
],

    contribution:
      "I worked on Topicora as a full-stack publishing platform covering the public reader experience, protected CMS, authentication, database architecture, publishing workflows, newsletters, revisions, SEO, security controls, scheduled jobs, testing and deployment preparation.",

    challenges: [
      "Designing authorization that combines application roles, MFA assurance and PostgreSQL Row Level Security.",

      "Keeping scheduled content private until the exact publication timestamp while still supporting cache refresh jobs.",

      "Preserving complete revision history while allowing editors to restore older article versions.",

      "Designing newsletter workflows that prevent duplicate delivery and safely manage subscription preferences.",

      "Handling public forms without relying only on client-side anti-abuse mechanisms.",

      "Supporting optional production integrations without making local development dependent on external credentials.",

      "Maintaining clear boundaries between public, authenticated and privileged operations.",
    ],

    lessons: [
      "Designing full-stack systems with Next.js Server Components, Server Actions and Route Handlers.",

      "PostgreSQL Row Level Security and database-level authorization.",

      "Supabase authentication, storage and database architecture.",

      "Role-based access control and MFA-aware authorization.",

      "Non-destructive revision systems and administrative audit trails.",

      "Reliable background-job and scheduled-publication workflows.",

      "Newsletter subscription and delivery architecture.",

      "Security-focused validation and server-side mutation handling.",

      "Testing complex full-stack workflows with Vitest and Playwright.",

      "Preparing an application for production deployment without falsely treating local verification as production operation.",
    ],

    /*
      Topicora currently has a local Git repository,
      but no configured GitHub remote.
    */
    githubUrl: "https://github.com/Kabir-Bisanal/topicora",

    /*
      Topicora is not publicly deployed yet.
    */
    demoUrl: "https://topicora.kabirbisanal.com",
  },

  /* =========================================
     WINDOWS XP PORTFOLIO
  ========================================= */

  {
    id: "windows-xp-portfolio",

    title: "Windows XP Portfolio",

    description:
      "An interactive professional portfolio that recreates the Windows XP desktop experience using Next.js, React, TypeScript and custom CSS.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS",
      "Git",
      "GitHub",
      "Vercel",
    ],

    status: "Live - Actively Improved",

    problem:
      "Traditional developer portfolios often use very similar scrolling layouts. I wanted to build a portfolio that remained professional while creating a memorable interaction model inspired by the Windows XP desktop environment.",

    overview:
      "The Windows XP Portfolio is an interactive professional portfolio designed as a functioning desktop environment rather than a traditional scrolling website. Visitors can interact with desktop icons, draggable and resizable windows, a Start menu, taskbar controls and project case studies while exploring my profile, projects, résumé and contact information.",

    technicalDecisions: [
      "Used separate React state for each major window so minimize, maximize, dragging, resizing and closing behavior could be controlled independently.",

      "Built the Windows XP visual system using custom CSS instead of relying on a prebuilt desktop UI library.",

      "Separated major windows into reusable React components while keeping shared profile, skills, project and window types centralized.",

      "Implemented active-window layering using an explicit active-window state rather than fixed z-index ordering.",

      "Allowed desktop windows to move partially outside the viewport while keeping enough of each window visible for recovery.",

      "Added desktop-only manual resizing while preserving responsive CSS-driven layouts on tablets and phones.",

      "Used Next.js static metadata routes for favicon, robots, sitemap and Open Graph support.",

      "Connected GitHub main-branch pushes to Vercel automatic deployments.",
    ],

    features: [
      "Real Windows XP-inspired desktop wallpaper.",

      "Desktop icons with selection and double-click opening.",

      "Welcome, About, Projects, Resume and Contact windows.",

      "Dedicated project case-study windows.",

      "Independent minimize, maximize, restore and close controls.",

      "Draggable desktop windows.",

      "Partial off-screen window positioning.",

      "Bottom-right manual window resizing.",

      "Double-click title bar to maximize and restore.",

      "Active-window layering.",

      "Taskbar window switching.",

      "Show Desktop quick-launch functionality.",

      "Interactive Windows XP-inspired Start menu.",

      "Live taskbar clock and date.",

      "Integrated résumé PDF viewing and downloading.",

      "Responsive laptop, tablet and mobile layouts.",

      "Centralized profile, skills and project information.",

      "Custom metadata, sitemap, robots and Open Graph support.",
    ],

    results: [
      "Publicly available at kabirbisanal.com.",

      "Custom domain connected to Vercel.",

      "Automatic GitHub main branch to Vercel deployment workflow.",

      "Responsive desktop, tablet and mobile layouts.",

      "Working desktop-style window management including dragging, resizing, minimizing and maximizing.",

      "Production Next.js build successfully generates static portfolio routes.",
    ],

    contribution:
      "I designed and developed the complete portfolio using Next.js, React, TypeScript and custom CSS. I implemented the Windows XP-inspired interface, component architecture, window state management, dragging, resizing, taskbar interaction, Start menu, project navigation, résumé integration, responsive behavior, metadata configuration and deployment workflow.",

    challenges: [
      "Recreating a recognizable Windows XP experience without making the portfolio feel like a visual gimmick.",

      "Managing multiple independently interactive windows using React state.",

      "Implementing correct active-window layering when several windows overlap.",

      "Supporting draggable and resizable windows while preserving maximize and restore behavior.",

      "Allowing windows to move partially outside the viewport without letting users permanently lose them.",

      "Making a desktop-oriented interaction model usable on mobile screens.",

      "Maintaining consistent profile and project information across multiple components.",
    ],

    lessons: [
      "React state and event handling for complex interactive interfaces.",

      "TypeScript props and reusable shared types.",

      "Pointer events for desktop-style dragging and resizing.",

      "CSS positioning, stacking contexts and responsive design.",

      "Component-based frontend architecture.",

      "Separating application data from presentation components.",

      "Git and GitHub workflow.",

      "Vercel deployment and custom-domain integration.",

      "Balancing visual creativity with usability and recruiter accessibility.",
    ],

    githubUrl:
      "https://github.com/Kabir-Bisanal/KABIR-XP-PORTFOLIO",

    demoUrl: "https://kabirbisanal.com",
  },
];