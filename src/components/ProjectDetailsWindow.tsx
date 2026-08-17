"use client";

import type { PortfolioProject } from "@/data/projects";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { WindowPosition } from "@/types/window";

type ProjectDetailsWindowProps = {
  project: PortfolioProject;
  isActive: boolean;
  isMaximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  position: WindowPosition | null;
  onTitleBarPointerDown: (
    event: ReactPointerEvent<HTMLElement>,
  ) => void;
};

export default function ProjectDetailsWindow({
  project,
  isActive,
  isMaximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  position,
  onTitleBarPointerDown,
}: ProjectDetailsWindowProps) {
  return (
    <section
      className={`xp-window project-details-window ${
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
      {/* =====================================
          TITLE BAR
      ====================================== */}

      <header
        className="xp-title-bar"
        onPointerDown={onTitleBarPointerDown}
      >
        <div className="xp-title">
          <span className="title-icon" aria-hidden="true">
            📁
          </span>

          {project.title}
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize project window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore project window"
                : "Maximize project window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close project window"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </header>

      {/* =====================================
          MENU
      ====================================== */}

      <div className="window-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      {/* =====================================
          TOOLBAR
      ====================================== */}

      <div className="project-details-toolbar">
        <button type="button" onClick={onClose}>
          ← Back to Projects
        </button>

        <button type="button">🔍 Search</button>

        <button type="button">📁 Folders</button>
      </div>

      {/* =====================================
          ADDRESS BAR
      ====================================== */}

      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">📁</span>
          C:\Kabir\Portfolio\Projects\{project.title}
        </div>

        <button type="button">Go</button>
      </div>

      <div className="project-details-content">
        {/* =====================================
            SIDEBAR
        ====================================== */}

        <aside className="project-details-sidebar">
          <div
            className="project-details-folder"
            aria-hidden="true"
          >
            📁
          </div>

          <h2>{project.title}</h2>

          <div className="project-status-box">
            <h3>Project Status</h3>

            <p>{project.status}</p>
          </div>

          <div className="project-status-box">
            <h3>Technologies</h3>

            <div className="project-sidebar-technologies">
              {project.technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="project-status-box">
            <h3>Project Links</h3>

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub Repository
              </a>
            ) : (
              <p>Repository not publicly available yet.</p>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Live Demo
              </a>
            ) : (
              <p>Public demo not available yet.</p>
            )}
          </div>
        </aside>

        {/* =====================================
            MAIN PROJECT INFORMATION
        ====================================== */}

        <article className="project-details-main">
          <header className="project-details-heading">
            <p>Project Case Study</p>

            <h1>{project.title}</h1>

            <p>{project.description}</p>
          </header>

          {/* =====================================
              PROBLEM / GOAL
          ====================================== */}

          {project.problem && (
            <section className="project-details-section">
              <h2>Problem / Goal</h2>

              <p>{project.problem}</p>
            </section>
          )}

          {/* =====================================
              PROJECT OVERVIEW
          ====================================== */}

          <section className="project-details-section">
            <h2>What I Built</h2>

            <p>{project.overview}</p>
          </section>

          {/* =====================================
              TECHNICAL DECISIONS
          ====================================== */}

          {project.technicalDecisions &&
            project.technicalDecisions.length > 0 && (
              <section className="project-details-section">
                <h2>Technical Decisions</h2>

                <ul>
                  {project.technicalDecisions.map(
                    (decision) => (
                      <li key={decision}>
                        {decision}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

          {/* =====================================
              MAIN FEATURES
          ====================================== */}

          <section className="project-details-section">
            <h2>Key Features</h2>

            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* =====================================
              RESULTS
          ====================================== */}

          {project.results &&
            project.results.length > 0 && (
              <section className="project-details-section project-results-section">
                <h2>Results & Proof</h2>

                <div className="project-results-grid">
                  {project.results.map((result) => (
                    <div
                      className="project-result-card"
                      key={result}
                    >
                      <span aria-hidden="true">✓</span>

                      <p>{result}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* =====================================
              MY CONTRIBUTION
          ====================================== */}

          <section className="project-details-section">
            <h2>My Contribution</h2>

            <p>{project.contribution}</p>
          </section>

          {/* =====================================
              CHALLENGES
          ====================================== */}

          <section className="project-details-section">
            <h2>Engineering Challenges</h2>

            <ul>
              {project.challenges.map((challenge) => (
                <li key={challenge}>
                  {challenge}
                </li>
              ))}
            </ul>
          </section>

          {/* =====================================
              LESSONS
          ====================================== */}

          <section className="project-details-section">
            <h2>What I Learned</h2>

            <ul>
              {project.lessons.map((lesson) => (
                <li key={lesson}>
                  {lesson}
                </li>
              ))}
            </ul>
          </section>

          {/* =====================================
              PROJECT LINKS
          ====================================== */}

          <div className="project-details-actions">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="xp-button project-action-link"
              >
                View on GitHub
              </a>
            ) : (
              <button
                type="button"
                className="xp-button"
                disabled
              >
                Repository Not Public Yet
              </button>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="xp-button project-action-link"
              >
                Open Live Demo
              </a>
            ) : (
              <button
                type="button"
                className="xp-button"
                disabled
              >
                Public Demo Not Available
              </button>
            )}
          </div>
        </article>
      </div>

      {/* =====================================
          STATUS BAR
      ====================================== */}

      <footer className="window-status-bar">
        <span>{project.title}</span>

        <span>{project.status}</span>
      </footer>
    </section>
  );
}