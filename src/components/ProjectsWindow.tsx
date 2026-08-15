"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { PortfolioProject } from "@/data/projects";
import type { WindowPosition } from "@/types/window";

type ProjectsWindowProps = {
  projects: PortfolioProject[];
  isActive: boolean;
  isMaximized: boolean;
  position: WindowPosition | null;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onOpenProject: (project: PortfolioProject) => void;
  onTitleBarPointerDown: (
    event: ReactPointerEvent<HTMLElement>,
  ) => void;
};

export default function ProjectsWindow({
  projects,
  isActive,
  isMaximized,
  position,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onOpenProject,
  onTitleBarPointerDown,
}: ProjectsWindowProps) {
  return (
    <section
      className={`xp-window projects-window ${
        isActive ? "active-window" : ""
      } ${isMaximized ? "maximized-window" : ""}`}
      style={
        position && !isMaximized
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "none",
            }
          : undefined
      }
      onMouseDown={onFocus}
    >
      <header
        className="xp-title-bar"
        onPointerDown={onTitleBarPointerDown}
      >
        <div className="xp-title">
          <span className="title-icon" aria-hidden="true">
            📁
          </span>

          My Projects
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize Projects window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore Projects window"
                : "Maximize Projects window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close Projects window"
            onClick={onClose}
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
          <span aria-hidden="true">📁</span>
          C:\Kabir\Portfolio\Projects
        </div>

        <button type="button">Go</button>
      </div>

      <div className="projects-content">
        <aside className="projects-sidebar">
          <div className="sidebar-section">
            <h3>Project Tasks</h3>

            <button type="button">
              View featured projects
            </button>

            <button type="button">
              View GitHub repositories
            </button>

            <button type="button">
              View project demos
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Details</h3>

            <p>
              These projects demonstrate my programming,
              automation, database and web-development skills.
            </p>
          </div>
        </aside>

        <div className="projects-main">
          <h2>Files Stored in My Projects</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.id}
              >
                <div
                  className="project-folder-icon"
                  aria-hidden="true"
                >
                  📁
                </div>

                <div className="project-information">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ),
                    )}
                  </div>

                  <button
                    type="button"
                    className="project-open-button"
                    onClick={() => onOpenProject(project)}
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
  );
}