"use client";

import type { PortfolioProject } from "@/data/projects";
import type { PointerEvent as ReactPointerEvent } from "react";

type WindowPosition = {
  x: number;
  y: number;
};

type ProjectDetailsWindowProps = {
  project: PortfolioProject;
  isActive: boolean;
  isMaximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  position: WindowPosition | null;
  onTitleBarPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
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
      <header className="xp-title-bar" onPointerDown={onTitleBarPointerDown}>
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
              isMaximized ? "Restore project window" : "Maximize project window"
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

      <div className="window-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      <div className="project-details-toolbar">
        <button type="button" onClick={onClose}>
          ← Back to Projects
        </button>

        <button type="button">🔍 Search</button>
        <button type="button">📁 Folders</button>
      </div>

      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">📁</span>
          C:\Kabir\Portfolio\Projects\{project.title}
        </div>

        <button type="button">Go</button>
      </div>

      <div className="project-details-content">
        <aside className="project-details-sidebar">
          <div className="project-details-folder" aria-hidden="true">
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
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <div className="project-status-box">
            <h3>Project Links</h3>

            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                View GitHub Repository
              </a>
            ) : (
              <p>GitHub link will be added later.</p>
            )}

            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Open Live Demo
              </a>
            ) : (
              <p>Live demo will be added later.</p>
            )}
          </div>
        </aside>

        <article className="project-details-main">
          <header className="project-details-heading">
            <p>Project information</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </header>

          <section className="project-details-section">
            <h2>Project Overview</h2>
            <p>{project.overview}</p>
          </section>

          <section className="project-details-section">
            <h2>Main Features</h2>

            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="project-details-section">
            <h2>My Contribution</h2>
            <p>{project.contribution}</p>
          </section>

          <section className="project-details-section">
            <h2>Challenges</h2>

            <ul>
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </section>

          <section className="project-details-section">
            <h2>What I Learned</h2>

            <ul>
              {project.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </section>

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
              <button type="button" className="xp-button" disabled>
                GitHub Link Coming Soon
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
              <button type="button" className="xp-button" disabled>
                Live Demo Coming Soon
              </button>
            )}
          </div>
        </article>
      </div>

      <footer className="window-status-bar">
        <span>{project.title}</span>
        <span>{project.status}</span>
      </footer>
    </section>
  );
}
