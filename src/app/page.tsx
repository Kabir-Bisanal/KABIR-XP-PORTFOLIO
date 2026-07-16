"use client";

import { useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import ResumeWindow from "@/components/ResumeWindow";
import ContactWindow from "@/components/ContactWindow";
import StartMenu from "@/components/StartMenu";
import TaskbarClock from "@/components/TaskbarClock";
import ProjectDetailsWindow from "@/components/ProjectDetailsWindow";
import { projects, type PortfolioProject } from "@/data/projects";
type WindowName =
  "welcome" | "about" | "projects" | "resume" | "contact" | "projectDetails";
type WindowPosition = {
  x: number;
  y: number;
};

const desktopIcons = [
  {
    id: "about",
    icon: "👤",
    title: "About Me",
  },
  {
    id: "projects",
    icon: "📁",
    title: "My Projects",
  },
  {
    id: "resume",
    icon: "📄",
    title: "Resume",
  },
  {
    id: "contact",
    icon: "✉️",
    title: "Contact Me",
  },
];

const skills = [
  "C#",
  "Python",
  "SQL",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "GitHub",
  "Playwright",
];

export default function Home() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [welcomeMinimized, setWelcomeMinimized] = useState(false);
  const [welcomeMaximized, setWelcomeMaximized] = useState(false);
  const [welcomePosition, setWelcomePosition] = useState<WindowPosition | null>(
    null,
  );

  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMinimized, setAboutMinimized] = useState(false);
  const [aboutMaximized, setAboutMaximized] = useState(false);
  const [aboutPosition, setAboutPosition] = useState<WindowPosition | null>(
    null,
  );

  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsMinimized, setProjectsMinimized] = useState(false);
  const [projectsMaximized, setProjectsMaximized] = useState(false);
  const [projectsPosition, setProjectsPosition] =
    useState<WindowPosition | null>(null);

  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeMinimized, setResumeMinimized] = useState(false);
  const [resumeMaximized, setResumeMaximized] = useState(false);
  const [resumePosition, setResumePosition] = useState<WindowPosition | null>(
    null,
  );

  const [contactOpen, setContactOpen] = useState(false);
  const [contactMinimized, setContactMinimized] = useState(false);
  const [contactMaximized, setContactMaximized] = useState(false);
  const [contactPosition, setContactPosition] = useState<WindowPosition | null>(
    null,
  );

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(
    null,
  );

  const [projectDetailsMinimized, setProjectDetailsMinimized] = useState(false);
  const [projectDetailsMaximized, setProjectDetailsMaximized] = useState(false);
  const [activeWindow, setActiveWindow] = useState<WindowName>("welcome");
  const [projectDetailsPosition, setProjectDetailsPosition] =
    useState<WindowPosition | null>(null);

   function showDesktop() {
  if (welcomeOpen) {
    setWelcomeMinimized(true);
  }

  if (aboutOpen) {
    setAboutMinimized(true);
  }

  if (projectsOpen) {
    setProjectsMinimized(true);
  }

  if (resumeOpen) {
    setResumeMinimized(true);
  }

  if (contactOpen) {
    setContactMinimized(true);
  }

  if (selectedProject) {
    setProjectDetailsMinimized(true);
  }

  setStartMenuOpen(false);
  setSelectedDesktopIcon(null);
  setActiveWindow("welcome");
}
    
  function handleDesktopBackgroundClick(event: ReactMouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setSelectedDesktopIcon(null);
      setStartMenuOpen(false);
    }
  }

  function openWelcomeWindow() {
    setWelcomeOpen(true);
    setWelcomeMinimized(false);
    setActiveWindow("welcome");
    setStartMenuOpen(false);
    setWelcomePosition(null);
  }

  function minimizeWelcomeWindow() {
    setWelcomeMinimized(true);

    if (activeWindow === "welcome") {
      setActiveWindow("welcome");
    }
  }

  function toggleWelcomeMaximize() {
    setWelcomeMaximized((currentValue) => !currentValue);
    setWelcomeMinimized(false);
    setActiveWindow("welcome");
  }

  function closeWelcomeWindow() {
    setWelcomeOpen(false);
    setWelcomeMinimized(false);
    setWelcomeMaximized(false);
  }

  function startDraggingWelcome(event: ReactPointerEvent<HTMLElement>) {
    if (welcomeMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("welcome");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setWelcomePosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openAboutWindow() {
    setAboutOpen(true);
    setAboutMinimized(false);
    setActiveWindow("about");
    setStartMenuOpen(false);
  }

  function minimizeAboutWindow() {
    setAboutMinimized(true);

    if (activeWindow === "about") {
      setActiveWindow("welcome");
    }
  }

  function toggleAboutMaximize() {
    setAboutMaximized((currentValue) => !currentValue);
    setAboutMinimized(false);
    setActiveWindow("about");
  }

  function closeAboutWindow() {
    setAboutOpen(false);
    setAboutMinimized(false);
    setAboutMaximized(false);
    setAboutPosition(null);

    if (activeWindow === "about") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingAbout(event: ReactPointerEvent<HTMLElement>) {
    if (aboutMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("about");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setAboutPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openProjectsWindow() {
    setProjectsOpen(true);
    setProjectsMinimized(false);
    setActiveWindow("projects");
    setStartMenuOpen(false);
  }

  function minimizeProjectsWindow() {
    setProjectsMinimized(true);

    if (activeWindow === "projects") {
      setActiveWindow("welcome");
    }
  }

  function toggleProjectsMaximize() {
    setProjectsMaximized((currentValue) => !currentValue);
    setProjectsMinimized(false);
    setActiveWindow("projects");
  }

  function closeProjectsWindow() {
    setProjectsOpen(false);
    setProjectsMinimized(false);
    setProjectsMaximized(false);
    setProjectsPosition(null);

    if (activeWindow === "projects") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjects(event: ReactPointerEvent<HTMLElement>) {
    if (projectsMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("projects");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setProjectsPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openResumeWindow() {
    setResumeOpen(true);
    setResumeMinimized(false);
    setActiveWindow("resume");
    setStartMenuOpen(false);
  }

  function minimizeResumeWindow() {
    setResumeMinimized(true);

    if (activeWindow === "resume") {
      setActiveWindow("welcome");
    }
  }

  function toggleResumeMaximize() {
    setResumeMaximized((currentValue) => !currentValue);
    setResumeMinimized(false);
    setActiveWindow("resume");
  }

  function closeResumeWindow() {
    setResumeOpen(false);
    setResumeMinimized(false);
    setResumeMaximized(false);
    setResumePosition(null);

    if (activeWindow === "resume") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingResume(event: ReactPointerEvent<HTMLElement>) {
    if (resumeMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("resume");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setResumePosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openContactWindow() {
    setContactOpen(true);
    setContactMinimized(false);
    setActiveWindow("contact");
    setStartMenuOpen(false);
  }
  function minimizeContactWindow() {
    setContactMinimized(true);

    if (activeWindow === "contact") {
      setActiveWindow("welcome");
    }
  }

  function toggleContactMaximize() {
    setContactMaximized((currentValue) => !currentValue);
    setContactMinimized(false);
    setActiveWindow("contact");
  }

  function closeContactWindow() {
    setContactOpen(false);
    setContactMinimized(false);
    setContactMaximized(false);
    setContactPosition(null);

    if (activeWindow === "contact") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingContact(event: ReactPointerEvent<HTMLElement>) {
    if (contactMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("contact");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setContactPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openProjectDetails(project: PortfolioProject) {
    setSelectedProject(project);
    setProjectDetailsMinimized(false);
    setProjectDetailsMaximized(false);
    setActiveWindow("projectDetails");
    setStartMenuOpen(false);
    setProjectDetailsPosition(null);
  }

  function restoreProjectDetails() {
    if (!selectedProject) {
      return;
    }

    setProjectDetailsMinimized(false);
    setActiveWindow("projectDetails");
  }

  function minimizeProjectDetails() {
    setProjectDetailsMinimized(true);

    if (activeWindow === "projectDetails") {
      if (projectsOpen && !projectsMinimized) {
        setActiveWindow("projects");
      } else {
        setActiveWindow("welcome");
      }
    }
  }

  function toggleProjectDetailsMaximize() {
    setProjectDetailsMaximized((currentValue) => !currentValue);

    setProjectDetailsMinimized(false);
    setActiveWindow("projectDetails");
  }

  function closeProjectDetails() {
    setSelectedProject(null);
    setProjectDetailsMinimized(false);
    setProjectDetailsMaximized(false);
    setProjectDetailsPosition(null);

    if (projectsOpen && !projectsMinimized) {
      setActiveWindow("projects");
    } else {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjectDetails(event: ReactPointerEvent<HTMLElement>) {
    if (projectDetailsMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("projectDetails");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setProjectDetailsPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function handleDesktopIcon(iconId: string) {
    if (iconId === "about") {
      openAboutWindow();
    }

    if (iconId === "projects") {
      openProjectsWindow();
    }

    if (iconId === "resume") {
      openResumeWindow();
    }

    if (iconId === "contact") {
      openContactWindow();
    }
  }

  return (
    <main className="desktop" onMouseDown={handleDesktopBackgroundClick}>
      <section className="desktop-icons" aria-label="Portfolio sections">
        {desktopIcons.map((item) => (
          <button
            className={`desktop-icon ${
              selectedDesktopIcon === item.id ? "desktop-icon-selected" : ""
            }`}
            type="button"
            key={item.id}
            aria-label={`${item.title}. Double-click to open.`}
            aria-pressed={selectedDesktopIcon === item.id}
            onClick={() => setSelectedDesktopIcon(item.id)}
            onDoubleClick={() => {
              setSelectedDesktopIcon(item.id);
              handleDesktopIcon(item.id);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleDesktopIcon(item.id);
              }

              if (event.key === "Escape") {
                setSelectedDesktopIcon(null);
              }
            }}
          >
            <span className="desktop-icon-image" aria-hidden="true">
              {item.icon}
            </span>

            <span className="desktop-icon-title">{item.title}</span>
          </button>
        ))}
      </section>

      {/* Welcome window */}
      {welcomeOpen && !welcomeMinimized && (
        <section
          className={`xp-window welcome-window ${
            activeWindow === "welcome" ? "active-window" : ""
          } ${welcomeMaximized ? "maximized-window" : ""}`}
          style={
            welcomePosition && !welcomeMaximized
              ? {
                  left: `${welcomePosition.x}px`,
                  top: `${welcomePosition.y}px`,
                  transform: "none",
                }
              : undefined
          }
          onMouseDown={() => setActiveWindow("welcome")}
        >
          <header className="xp-title-bar" onPointerDown={startDraggingWelcome}>
            <div className="xp-title">
              <span className="title-icon">💻</span>
              Welcome to Kabir&apos;s Portfolio
            </div>

            <div className="window-controls">
              <button
                type="button"
                aria-label="Minimize Welcome window"
                onClick={minimizeWelcomeWindow}
              >
                _
              </button>

              <button
                type="button"
                aria-label={
                  welcomeMaximized
                    ? "Restore Welcome window"
                    : "Maximize Welcome window"
                }
                onClick={toggleWelcomeMaximize}
              >
                {welcomeMaximized ? "❐" : "□"}
              </button>

              <button
                className="close-button"
                type="button"
                aria-label="Close Welcome window"
                onClick={closeWelcomeWindow}
              >
                ×
              </button>
            </div>
          </header>

          <div className="window-menu">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </div>

          <div className="window-content">
            <div className="profile-placeholder" aria-hidden="true">
              KB
            </div>

            <div className="welcome-information">
              <p className="welcome-label">Welcome!</p>

              <h1>Kabir Bisanal</h1>

              <h2>Software Developer and Computer Science Student</h2>

              <p>
                I build web applications, automation tools and software projects
                using technologies such as C#, Python, SQL and modern web
                development tools.
              </p>

              <div className="welcome-actions">
                <button
                  type="button"
                  className="xp-button"
                  onClick={openProjectsWindow}
                >
                  View My Projects
                </button>

                <button
                  type="button"
                  className="xp-button"
                  onClick={openResumeWindow}
                >
                  View Resume
                </button>
              </div>
            </div>
          </div>

          <footer className="window-status-bar">
            <span>4 portfolio sections</span>
            <span>Ready</span>
          </footer>
        </section>
      )}

      {/* About Me window */}
      {aboutOpen && !aboutMinimized && (
        <section
          className={`xp-window about-window ${
            activeWindow === "about" ? "active-window" : ""
          } ${aboutMaximized ? "maximized-window" : ""}`}
          style={
            aboutPosition && !aboutMaximized
              ? {
                  left: `${aboutPosition.x}px`,
                  top: `${aboutPosition.y}px`,
                  transform: "none",
                }
              : undefined
          }
          onMouseDown={() => setActiveWindow("about")}
        >
          <header className="xp-title-bar" onPointerDown={startDraggingAbout}>
            <div className="xp-title">
              <span className="title-icon">👤</span>
              About Me - Kabir Bisanal
            </div>

            <div className="window-controls">
              <button
                type="button"
                aria-label="Minimize About Me window"
                onClick={minimizeAboutWindow}
              >
                _
              </button>

              <button
                type="button"
                aria-label={
                  aboutMaximized
                    ? "Restore About Me window"
                    : "Maximize About Me window"
                }
                onClick={toggleAboutMaximize}
              >
                {aboutMaximized ? "❐" : "□"}
              </button>

              <button
                className="close-button"
                type="button"
                aria-label="Close About Me window"
                onClick={closeAboutWindow}
              >
                ×
              </button>
            </div>
          </header>

          <div className="window-menu">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Favorites</span>
            <span>Help</span>
          </div>

          <div className="about-toolbar">
            <button type="button">← Back</button>
            <button type="button">→ Forward</button>
            <button type="button">🔍 Search</button>
            <button type="button">📁 Folders</button>
          </div>

          <div className="address-bar">
            <span>Address</span>

            <div className="address-input">
              <span>👤</span>
              C:\Kabir\Portfolio\About Me
            </div>

            <button type="button">Go</button>
          </div>

          <div className="about-content">
            <aside className="about-sidebar">
              <div className="about-profile-picture">KB</div>

              <h2>Kabir Bisanal</h2>

              <p className="about-role">
                Computer Science Student
                <br />
                and Software Developer
              </p>

              <div className="about-sidebar-section">
                <h3>Profile Details</h3>

                <p>
                  <strong>Location:</strong>
                  <br />
                  Karnataka, India
                </p>

                <p>
                  <strong>Education:</strong>
                  <br />
                  Computer Science and Engineering
                </p>

                <p>
                  <strong>University:</strong>
                  <br />
                  Visvesvaraya Technological University
                </p>
              </div>
            </aside>

            <div className="about-main">
              <section className="about-introduction">
                <p className="about-small-heading">Welcome to my profile</p>

                <h1>Hello, I&apos;m Kabir.</h1>

                <p>
                  I am a Computer Science and Engineering student with an
                  interest in software development, web applications, database
                  systems and automation.
                </p>

                <p>
                  I enjoy learning how software works by building practical
                  projects. My current focus includes C#, Python, SQL, ASP.NET
                  Core, web development and browser automation.
                </p>

                <p>
                  I am also gaining professional experience through an
                  internship, where I am learning how development tools,
                  databases and real software projects are used in an
                  organisation.
                </p>
              </section>

              <section className="about-section">
                <h2>Education</h2>

                <div className="about-information-card">
                  <span className="about-card-icon" aria-hidden="true">
                    🎓
                  </span>

                  <div>
                    <h3>Bachelor of Engineering</h3>

                    <p>
                      Computer Science and Engineering
                      <br />
                      SEA College of Engineering and Technology
                      <br />
                      Visvesvaraya Technological University
                    </p>
                  </div>
                </div>
              </section>

              <section className="about-section">
                <h2>Areas of Interest</h2>

                <div className="about-interest-grid">
                  <div className="about-interest">
                    <span>💻</span>
                    <div>
                      <h3>Software Development</h3>
                      <p>Creating useful and maintainable applications.</p>
                    </div>
                  </div>

                  <div className="about-interest">
                    <span>🌐</span>
                    <div>
                      <h3>Web Development</h3>
                      <p>Building responsive and interactive websites.</p>
                    </div>
                  </div>

                  <div className="about-interest">
                    <span>⚙️</span>
                    <div>
                      <h3>Automation</h3>
                      <p>Automating repetitive browser and data tasks.</p>
                    </div>
                  </div>

                  <div className="about-interest">
                    <span>🗄️</span>
                    <div>
                      <h3>Databases</h3>
                      <p>Working with SQL and structured information.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="about-section">
                <h2>Technical Skills</h2>

                <div className="about-skills">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>

              <section className="about-section about-objective">
                <h2>Career Objective</h2>

                <p>
                  My goal is to become a skilled software developer by
                  continuously improving my programming knowledge, working on
                  real projects and gaining practical industry experience.
                </p>
              </section>
            </div>
          </div>

          <footer className="window-status-bar">
            <span>Professional profile information</span>
            <span>Ready</span>
          </footer>
        </section>
      )}
      {/* Resume window */}
      {resumeOpen && !resumeMinimized && (
        <ResumeWindow
          isActive={activeWindow === "resume"}
          isMaximized={resumeMaximized}
          position={resumePosition}
          onFocus={() => setActiveWindow("resume")}
          onClose={closeResumeWindow}
          onMinimize={minimizeResumeWindow}
          onMaximize={toggleResumeMaximize}
          onTitleBarPointerDown={startDraggingResume}
        />
      )}
      {/* Contact window */}
      {contactOpen && !contactMinimized && (
        <ContactWindow
          isActive={activeWindow === "contact"}
          isMaximized={contactMaximized}
          position={contactPosition}
          onFocus={() => setActiveWindow("contact")}
          onClose={closeContactWindow}
          onMinimize={minimizeContactWindow}
          onMaximize={toggleContactMaximize}
          onTitleBarPointerDown={startDraggingContact}
        />
      )}

      {/* Projects window */}
      {projectsOpen && !projectsMinimized && (
        <section
          className={`xp-window projects-window ${
            activeWindow === "projects" ? "active-window" : ""
          } ${projectsMaximized ? "maximized-window" : ""}`}
          style={
            projectsPosition && !projectsMaximized
              ? {
                  left: `${projectsPosition.x}px`,
                  top: `${projectsPosition.y}px`,
                  transform: "none",
                }
              : undefined
          }
          onMouseDown={() => setActiveWindow("projects")}
        >
          <header
            className="xp-title-bar"
            onPointerDown={startDraggingProjects}
          >
            <div className="xp-title">
              <span className="title-icon">📁</span>
              My Projects
            </div>

            <div className="window-controls">
              <button
                type="button"
                aria-label="Minimize projects window"
                onClick={minimizeProjectsWindow}
              >
                _
              </button>

              <button
                type="button"
                aria-label={
                  projectsMaximized
                    ? "Restore projects window"
                    : "Maximize projects window"
                }
                onClick={toggleProjectsMaximize}
              >
                {projectsMaximized ? "❐" : "□"}
              </button>

              <button
                className="close-button"
                type="button"
                aria-label="Close projects window"
                onClick={closeProjectsWindow}
              >
                ×
              </button>
            </div>
          </header>

          <div className="window-menu">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Favorites</span>
            <span>Help</span>
          </div>

          <div className="projects-toolbar">
            <button type="button">← Back</button>
            <button type="button">→ Forward</button>
            <button type="button">🔍 Search</button>
            <button type="button">📁 Folders</button>
          </div>

          <div className="address-bar">
            <span>Address</span>

            <div className="address-input">
              <span>📁</span>
              C:\Kabir\Portfolio\Projects
            </div>

            <button type="button">Go</button>
          </div>

          <div className="projects-content">
            <aside className="projects-sidebar">
              <div className="sidebar-section">
                <h3>Project Tasks</h3>
                <button type="button">View featured projects</button>
                <button type="button">View GitHub repositories</button>
                <button type="button">View project demos</button>
              </div>

              <div className="sidebar-section">
                <h3>Details</h3>
                <p>
                  These projects demonstrate my programming, automation,
                  database and web-development skills.
                </p>
              </div>
            </aside>

            <div className="projects-main">
              <h2>Files Stored in My Projects</h2>

              <div className="project-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.title}>
                    <div className="project-folder-icon" aria-hidden="true">
                      📁
                    </div>

                    <div className="project-information">
                      <h3>{project.title}</h3>

                      <p>{project.description}</p>

                      <div className="project-technologies">
                        {project.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="project-open-button"
                        onClick={() => openProjectDetails(project)}
                      >
                        Open Project
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <footer className="window-status-bar">
            <span>{projects.length} project folders</span>
            <span>Ready</span>
          </footer>
        </section>
      )}
      {/* Project details window */}
      {selectedProject && !projectDetailsMinimized && (
        <ProjectDetailsWindow
          project={selectedProject}
          isActive={activeWindow === "projectDetails"}
          isMaximized={projectDetailsMaximized}
          position={projectDetailsPosition}
          onFocus={() => setActiveWindow("projectDetails")}
          onClose={closeProjectDetails}
          onMinimize={minimizeProjectDetails}
          onMaximize={toggleProjectDetailsMaximize}
          onTitleBarPointerDown={startDraggingProjectDetails}
        />
      )}
      {/* Start menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWelcome={openWelcomeWindow}
        onOpenAbout={openAboutWindow}
        onOpenProjects={openProjectsWindow}
        onOpenResume={openResumeWindow}
        onOpenContact={openContactWindow}
      />

      {/* Taskbar */}
      <footer className="taskbar">
        <button
          className={`start-button ${startMenuOpen ? "start-button-open" : ""}`}
          type="button"
          aria-expanded={startMenuOpen}
          aria-label="Open Start menu"
          onClick={() => setStartMenuOpen((currentValue) => !currentValue)}
        >
          <span className="start-symbol">◆</span>
          <span>start</span>
        </button>
        <div className="quick-launch">
  <button
    type="button"
    aria-label="Show desktop"
    title="Show Desktop"
    onClick={showDesktop}
  >
    <span aria-hidden="true">🖥️</span>
  </button>

  <button
    type="button"
    aria-label="Open Kabir's Portfolio"
    title="Kabir's Portfolio"
    onClick={openWelcomeWindow}
  >
    <span aria-hidden="true">🌐</span>
  </button>
</div>

        {welcomeOpen && (
          <button
            className={`active-task ${
              activeWindow === "welcome" && !welcomeMinimized
                ? "selected-task"
                : ""
            }`}
            type="button"
            onClick={() => {
              if (activeWindow === "welcome" && !welcomeMinimized) {
                minimizeWelcomeWindow();
              } else {
                openWelcomeWindow();
              }
            }}
          >
            <span>💻</span>
            Kabir&apos;s Portfolio
          </button>
        )}

        {aboutOpen && (
          <button
            className={`active-task ${
              activeWindow === "about" && !aboutMinimized ? "selected-task" : ""
            }`}
            type="button"
            onClick={() => {
              if (activeWindow === "about" && !aboutMinimized) {
                minimizeAboutWindow();
              } else {
                openAboutWindow();
              }
            }}
          >
            <span>👤</span>
            About Me
          </button>
        )}

        {resumeOpen && (
          <button
            className={`active-task ${
              activeWindow === "resume" && !resumeMinimized
                ? "selected-task"
                : ""
            }`}
            type="button"
            onClick={() => {
              if (activeWindow === "resume" && !resumeMinimized) {
                minimizeResumeWindow();
              } else {
                openResumeWindow();
              }
            }}
          >
            <span>📄</span>
            Resume
          </button>
        )}

        {contactOpen && (
          <button
            className={`active-task ${
              activeWindow === "contact" && !contactMinimized
                ? "selected-task"
                : ""
            }`}
            type="button"
            onClick={() => {
              if (activeWindow === "contact" && !contactMinimized) {
                minimizeContactWindow();
              } else {
                openContactWindow();
              }
            }}
          >
            <span>✉️</span>
            Contact Me
          </button>
        )}

        {projectsOpen && (
          <button
            className={`active-task ${
              activeWindow === "projects" && !projectsMinimized
                ? "selected-task"
                : ""
            }`}
            type="button"
            onClick={() => {
              if (activeWindow === "projects" && !projectsMinimized) {
                minimizeProjectsWindow();
              } else {
                openProjectsWindow();
              }
            }}
          >
            <span>📁</span>
            My Projects
          </button>
        )}
        {selectedProject && (
          <button
            className={`active-task ${
              activeWindow === "projectDetails" && !projectDetailsMinimized
                ? "selected-task"
                : ""
            }`}
            type="button"
            onClick={() => {
              if (
                activeWindow === "projectDetails" &&
                !projectDetailsMinimized
              ) {
                minimizeProjectDetails();
              } else {
                restoreProjectDetails();
              }
            }}
          >
            <span>📁</span>
            {selectedProject.title}
          </button>
        )}
      </footer>
    </main>
  );
}
