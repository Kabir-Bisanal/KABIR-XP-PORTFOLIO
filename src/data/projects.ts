export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  overview: string;
  features: string[];
  contribution: string;
  challenges: string[];
  lessons: string[];
  githubUrl: string;
  demoUrl: string;
};

export const projects: PortfolioProject[] = [
  {
    id: "smartstock",
    title: "SmartStock",
    description:
      "A retail demand forecasting and inventory optimization application built using Python, machine learning, PostgreSQL, Streamlit and Docker.",

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

    overview:
      "SmartStock is an end-to-end retail analytics project that combines demand forecasting with inventory optimization. It uses historical retail sales data to generate future demand forecasts, evaluate multiple forecasting approaches and convert those forecasts into practical inventory decisions such as safety stock, reorder points and recommended order quantities. The completed V1 application includes an interactive Streamlit dashboard, PostgreSQL support, a local CSV fallback and Docker deployment configuration.",

    features: [
      "Processes more than 582,000 retail sales observations.",
      "Uses leakage-safe forecasting and time-based validation.",
      "Compares multiple forecasting baselines and machine-learning models.",
      "Selected a 28-day historical mean after it outperformed more complex models during balanced validation.",
      "Generates demand forecasts used for downstream inventory decisions.",
      "Calculates safety stock and reorder recommendations across 300 item-store combinations.",
      "Includes service-level and cost-optimized inventory strategies.",
      "Provides seven interactive Streamlit application sections.",
      "Supports PostgreSQL as well as a local CSV demo mode.",
      "Includes Docker and Docker Compose configuration for deployment.",
      "Contains automated testing, validation and reproducibility checks.",
    ],

    contribution:
      "I developed the project as an end-to-end data science application, including data validation, feature engineering, forecasting experiments, model comparison, inventory calculations, application development, database integration, automated testing, Docker configuration and project documentation. I also designed the Streamlit interface for exploring sales, forecasts, inventory health, reorder recommendations and scenario analysis.",

    challenges: [
      "Preventing data leakage while creating forecasting features and validation splits.",
      "Comparing simple statistical baselines fairly against more complex machine-learning models.",
      "Converting demand forecasts into practical inventory recommendations.",
      "Maintaining a clear boundary between real retail-derived information and synthetic inventory assumptions.",
      "Supporting both PostgreSQL-backed usage and a reproducible local CSV demo mode.",
      "Keeping the forecasting, inventory, database and application layers modular and testable.",
    ],

    lessons: [
      "Time-series validation and leakage prevention.",
      "Why simple forecasting models can outperform more complex models.",
      "Demand forecasting evaluation using MAE, RMSE, WAPE, RMSSE and bias.",
      "Safety stock, reorder points and inventory optimization concepts.",
      "Building modular data science applications.",
      "PostgreSQL integration with Python applications.",
      "Interactive analytics application development with Streamlit.",
      "Testing, reproducibility, documentation and deployment preparation.",
    ],

    githubUrl: "",
    demoUrl: "",
  },

  {
    id: "windows-xp-portfolio",
    title: "Windows XP Portfolio",

    description:
      "An interactive portfolio website that recreates the Windows XP desktop experience using Next.js, React, TypeScript and custom CSS.",

    technologies: ["Next.js", "React", "TypeScript", "CSS", "Git", "GitHub"],

    status: "In Development",

    overview:
      "The Windows XP Portfolio is an interactive professional portfolio designed around the familiar Windows XP desktop interface. Instead of presenting information as a traditional scrolling website, visitors interact with desktop icons, draggable windows, a Start menu and a taskbar to explore my profile, projects, résumé and contact information.",

    features: [
      "Windows XP-inspired desktop interface using the original-style Bliss wallpaper.",
      "Desktop icons with single-click selection and double-click opening.",
      "Separate Welcome, About, Projects, Resume and Contact windows.",
      "Draggable windows with independent positioning.",
      "Minimize, maximize, restore and close functionality.",
      "Active-window layering and taskbar window switching.",
      "Interactive Windows XP-inspired Start menu.",
      "Quick Launch controls including Show Desktop.",
      "Live taskbar clock and date.",
      "Detailed project-information windows.",
      "Integrated résumé PDF opening and downloading.",
      "Centralized profile, skills and project data.",
      "Responsive layouts for laptops, tablets and mobile devices.",
      "Custom browser metadata and portfolio favicon.",
    ],

    contribution:
      "I designed and developed the portfolio using Next.js, React, TypeScript and custom CSS. I implemented the window-management system, separate state for each application window, taskbar interaction, dragging, minimizing, maximizing, project navigation, résumé integration, responsive behaviour and the Windows XP-inspired visual design.",

    challenges: [
      "Recreating the Windows XP interface while keeping it appropriate for a professional portfolio.",
      "Managing several independently controlled windows using React state.",
      "Implementing active-window layering and correct z-index behaviour.",
      "Supporting draggable window positions without breaking responsive layouts.",
      "Making a desktop-oriented interface usable on mobile devices.",
      "Keeping repeated profile and project information synchronized across components.",
    ],

    lessons: [
      "React state and event handling.",
      "Component-based application architecture.",
      "TypeScript props and shared types.",
      "Managing interactive UI state across several components.",
      "Responsive interface design.",
      "CSS positioning, stacking contexts and z-index behaviour.",
      "Organising reusable profile and project data.",
      "Git and GitHub workflow for an actively developed project.",
    ],

    githubUrl: "https://github.com/Kabir-Bisanal/KABIR-XP-PORTFOLIO",

    demoUrl: "",
  },

  {
    id: "topicora",
    title: "Topicora",

    description:
      "An India-first English editorial publication and content-management platform, built as a feature-complete and locally verified MVP.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Resend",
      "Vercel",
      "Sentry",
    ],

    status:
      "Feature-complete and locally verified MVP - production deployment pending",

    overview:
      "Topicora is an India-first English editorial publication and content-management platform for thoughtful, practical coverage of technology and AI, money and work, culture and media, everyday life and practical guides. It combines a responsive public publication with a protected CMS for administrators and editors. The application, database, publishing workflows, newsletter workflows, security controls, scheduled-job handlers, monitoring hooks, tests and documentation are implemented and locally verified. The code is prepared for production configuration with Supabase, Vercel and Resend, with optional Sentry monitoring, but no confirmed public deployment or GitHub remote exists yet.",

    features: [
      "Responsive public editorial site with homepage, archives, categories, tags, article pages, pagination and PostgreSQL full-text search.",
      "Rich sanitized Markdown articles with tables of contents, reading progress, related content, sharing, print styles and dark mode.",
      "Protected CMS with administrator and editor roles, invite-only onboarding, mandatory TOTP MFA and role-sensitive permissions.",
      "Structured block editor with drafts, publishing, scheduling, archiving, preview links, media uploads, SEO fields and editorial disclosures.",
      "Non-destructive article revision history with review and restore workflows.",
      "Scheduled publishing backed by Row Level Security, a durable job queue, retry handling and authenticated cron routes.",
      "Double-opt-in newsletter subscriptions, signed preference links, campaign scheduling, segmentation, delivery queues and duplicate-delivery prevention.",
      "SEO and discovery support including metadata, canonical URLs, JSON-LD, Open Graph images, sitemap, robots, manifest and RSS.",
      "Administrative dashboards for articles, publishing schedules, campaigns, subscribers, messages, redirects, teams and audit logs.",
      "Security controls including Supabase Row Level Security, server-side role checks, MFA-aware policies, CSP, same-origin validation, rate limiting, signed tokens and append-only audit records.",
      "Locally verified with formatting, ESLint, TypeScript, 27 unit tests across 13 Vitest files, a production build with 75 route entries and 13 browser workflow scenarios.",
    ],

    contribution:
      "I built and locally verified the public editorial experience and protected CMS, including the application architecture, Supabase database and authorization model, publishing and revision workflows, newsletter system, search and SEO features, security controls, scheduled-job infrastructure, automated tests and deployment documentation.",

    challenges: [
      "Enforcing role-based and MFA-aware authorization in both application code and PostgreSQL Row Level Security policies.",
      "Keeping future-dated articles private while coordinating durable scheduled publishing and targeted cache invalidation.",
      "Designing non-destructive article revisions and secure, short-lived draft previews.",
      "Preventing duplicate newsletter delivery while supporting preferences, segmentation, retries and unsubscribe workflows.",
      "Protecting public forms, uploads and rich content with validation, sanitization, rate limits and security headers.",
      "Preparing production integrations without treating credential-dependent services as already active.",
    ],

    lessons: [
      "Designing a full-stack editorial platform with Next.js, Supabase and PostgreSQL.",
      "Layering server-side authorization with Row Level Security and MFA assurance checks.",
      "Building durable publishing and newsletter queues with locking, retries and idempotent delivery.",
      "Creating portable structured content with canonical Markdown output.",
      "Applying security controls to authentication, mutations, uploads, previews and subscriber management.",
      "Testing public and administrative workflows with Vitest and Playwright.",
      "Separating locally verified functionality from credential-dependent integrations and undeployed infrastructure.",
    ],

    githubUrl: "",
    demoUrl: "",
  },
];
