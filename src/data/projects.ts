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
    id: "vtu-result-collector",
    title: "VTU Result Collector",
    description:
      "A C# and Playwright automation project that collects student result information from the VTU result website.",
    technologies: ["C#", ".NET", "Playwright", "Automation"],
    status: "In Development",
    overview:
      "The VTU Result Collector is a browser-automation project created to reduce the repetitive work involved in checking and collecting student results. It opens the VTU result portal, enters a student USN, waits for manual CAPTCHA entry and collects the displayed result information.",
    features: [
      "Automatically opens the VTU result website.",
      "Enters student USNs using Playwright.",
      "Supports manual CAPTCHA entry.",
      "Reads student and subject-result information.",
      "Can be extended to export information to Excel or PDF.",
    ],
    contribution:
      "I designed the project structure, created the Playwright browser workflow and worked on parsing student and subject-result information from the result page.",
    challenges: [
      "Handling CAPTCHA-protected result pages.",
      "Finding reliable selectors for result-page elements.",
      "Organising the extracted student and subject information.",
    ],
    lessons: [
      "Browser automation with Playwright.",
      "Asynchronous programming in C#.",
      "Working with HTML elements and page selectors.",
      "Structuring a practical automation project.",
    ],
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "windows-xp-portfolio",
    title: "Windows XP Portfolio",
    description:
      "A professional portfolio website designed as a Windows XP-inspired desktop interface.",
    technologies: ["Next.js", "React", "TypeScript", "CSS"],
    status: "In Development",
    overview:
      "This project is an interactive professional portfolio designed to resemble a Windows XP desktop. Visitors can open different windows to view my profile, projects, résumé and contact information.",
    features: [
      "Windows XP-inspired desktop interface.",
      "Interactive Start menu and taskbar.",
      "Separate About, Projects, Resume and Contact windows.",
      "Live taskbar clock and date.",
      "Responsive design for different screen sizes.",
    ],
    contribution:
      "I am building the complete interface using Next.js, React, TypeScript and custom CSS while learning component-based web development.",
    challenges: [
      "Recreating the Windows XP appearance using CSS.",
      "Managing multiple open windows using React state.",
      "Keeping the interface useful and professional.",
    ],
    lessons: [
      "React state management.",
      "Reusable component creation.",
      "TypeScript types and component properties.",
      "Responsive interface design.",
    ],
    githubUrl: "https://github.com/Kabir-Bisanal/KABIR-XP-PORTFOLIO",
    demoUrl: "",
  },
  {
    id: "student-result-analytics",
    title: "Student Result Analytics",
    description:
      "A planned analytics dashboard for comparing student performance, GPA, backlogs and subject results.",
    technologies: ["SQL", "Data Analysis", "Dashboard"],
    status: "Planning",
    overview:
      "This project is a planned academic-result analytics system. Its purpose is to organise student-result data and create dashboards showing performance patterns across students, subjects, colleges and semesters.",
    features: [
      "Student ranking based on academic performance.",
      "College-level and university-level comparisons.",
      "Subject pass and failure analysis.",
      "Backlog and GPA statistics.",
      "Interactive dashboard visualisations.",
    ],
    contribution:
      "I developed the project idea and planned the result-collection, database and dashboard workflow.",
    challenges: [
      "Obtaining reliable result data.",
      "Protecting student information.",
      "Designing fair and useful academic comparisons.",
    ],
    lessons: [
      "Database planning.",
      "Data-analysis requirements.",
      "Dashboard design.",
      "Privacy and responsible data handling.",
    ],
    githubUrl: "",
    demoUrl: "",
  },
];
