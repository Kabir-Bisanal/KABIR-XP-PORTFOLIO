"use client";

import TaskbarClock from "@/components/TaskbarClock";

type TaskbarProps = {
  startMenuOpen: boolean;

  welcomeOpen: boolean;
  welcomeMinimized: boolean;

  aboutOpen: boolean;
  aboutMinimized: boolean;

  projectsOpen: boolean;
  projectsMinimized: boolean;

  resumeOpen: boolean;
  resumeMinimized: boolean;

  contactOpen: boolean;
  contactMinimized: boolean;

  projectDetailsOpen: boolean;
  projectDetailsMinimized: boolean;
  selectedProjectTitle: string;

  activeWindow: string;

  onToggleStartMenu: () => void;
  onShowDesktop: () => void;
  onOpenWelcome: () => void;

  onWelcomeTaskbarClick: () => void;
  onAboutTaskbarClick: () => void;
  onProjectsTaskbarClick: () => void;
  onResumeTaskbarClick: () => void;
  onContactTaskbarClick: () => void;
  onProjectDetailsTaskbarClick: () => void;
};

export default function Taskbar({
  startMenuOpen,

  welcomeOpen,
  welcomeMinimized,

  aboutOpen,
  aboutMinimized,

  projectsOpen,
  projectsMinimized,

  resumeOpen,
  resumeMinimized,

  contactOpen,
  contactMinimized,

  projectDetailsOpen,
  projectDetailsMinimized,
  selectedProjectTitle,

  activeWindow,

  onToggleStartMenu,
  onShowDesktop,
  onOpenWelcome,

  onWelcomeTaskbarClick,
  onAboutTaskbarClick,
  onProjectsTaskbarClick,
  onResumeTaskbarClick,
  onContactTaskbarClick,
  onProjectDetailsTaskbarClick,
}: TaskbarProps) {
  return (
    <footer className="taskbar">
      <button
        className={`start-button ${
          startMenuOpen ? "start-button-open" : ""
        }`}
        type="button"
        aria-expanded={startMenuOpen}
        aria-label="Open Start menu"
        onClick={onToggleStartMenu}
      >
        <span className="start-symbol" aria-hidden="true">
          ◆
        </span>

        <span>start</span>
      </button>

      <div className="quick-launch">
        <button
          type="button"
          aria-label="Show desktop"
          title="Show Desktop"
          onClick={onShowDesktop}
        >
          <span aria-hidden="true">🖥️</span>
        </button>

        <button
          type="button"
          aria-label="Open Kabir's Portfolio"
          title="Kabir's Portfolio"
          onClick={onOpenWelcome}
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
          onClick={onWelcomeTaskbarClick}
        >
          <span aria-hidden="true">💻</span>
          Kabir&apos;s Portfolio
        </button>
      )}

      {aboutOpen && (
        <button
          className={`active-task ${
            activeWindow === "about" && !aboutMinimized
              ? "selected-task"
              : ""
          }`}
          type="button"
          onClick={onAboutTaskbarClick}
        >
          <span aria-hidden="true">👤</span>
          About Me
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
          onClick={onProjectsTaskbarClick}
        >
          <span aria-hidden="true">📁</span>
          My Projects
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
          onClick={onResumeTaskbarClick}
        >
          <span aria-hidden="true">📄</span>
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
          onClick={onContactTaskbarClick}
        >
          <span aria-hidden="true">✉️</span>
          Contact Me
        </button>
      )}

      {projectDetailsOpen && (
        <button
          className={`active-task ${
            activeWindow === "projectDetails" &&
            !projectDetailsMinimized
              ? "selected-task"
              : ""
          }`}
          type="button"
          onClick={onProjectDetailsTaskbarClick}
        >
          <span aria-hidden="true">📁</span>
          {selectedProjectTitle}
        </button>
      )}

      <TaskbarClock />
    </footer>
  );
}