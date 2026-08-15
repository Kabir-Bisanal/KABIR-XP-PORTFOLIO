"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { ProfileData } from "@/data/profile";
import { technicalSkills } from "@/data/skills";
import type { PortfolioProject } from "@/data/projects";
import type { WindowPosition } from "@/types/window";

type ResumeWindowProps = {
  projects: PortfolioProject[];
  profile: ProfileData;
  isActive: boolean;
  isMaximized: boolean;
  position: WindowPosition | null;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onTitleBarPointerDown: (
    event: ReactPointerEvent<HTMLElement>,
  ) => void;
};

const resumeFilePath = "/resume/Kabir-Bisanal-Resume-Updated.pdf";

export default function ResumeWindow({
  profile,
  projects,
  isActive,
  isMaximized,
  position,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onTitleBarPointerDown,
}: ResumeWindowProps) {
  return (
    <section
      className={`xp-window resume-window ${
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
      {/* Window title bar */}
      <header
        className="xp-title-bar"
        onPointerDown={onTitleBarPointerDown}
      >
        <div className="xp-title">
          <span className="title-icon" aria-hidden="true">
            📄
          </span>

          {profile.name} - Resume
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize Resume window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore Resume window"
                : "Maximize Resume window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close Resume window"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </header>

      {/* Windows XP menu */}
      <div className="window-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      {/* Resume toolbar */}
      <div className="resume-toolbar">
        <button type="button">← Back</button>

        <button type="button">→ Forward</button>

        <a
          href={resumeFilePath}
          target="_blank"
          rel="noreferrer"
          className="resume-toolbar-link"
        >
          👁️ Open PDF
        </a>

        <a
          href={resumeFilePath}
          download="Kabir-Bisanal-Resume-Updated.pdf"
          className="resume-toolbar-link"
        >
          💾 Download
        </a>
      </div>

      {/* Address bar */}
      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">📄</span>
          C:\Kabir\Portfolio\Resume
        </div>

        <button type="button">Go</button>
      </div>

      <div className="resume-content">
        {/* Left sidebar */}
        <aside className="resume-sidebar">
          <div className="resume-sidebar-box">
            <h3>Resume Sections</h3>

            <div className="resume-navigation-item">
              <span aria-hidden="true">👤</span>
              Professional Summary
            </div>

            <div className="resume-navigation-item">
              <span aria-hidden="true">💼</span>
              Experience
            </div>

            <div className="resume-navigation-item">
              <span aria-hidden="true">🎓</span>
              Education
            </div>

            <div className="resume-navigation-item">
              <span aria-hidden="true">🛠️</span>
              Technical Skills
            </div>

            <div className="resume-navigation-item">
              <span aria-hidden="true">📁</span>
              Projects
            </div>
          </div>

          <div className="resume-sidebar-box">
            <h3>Document Details</h3>

            <p>
              <strong>File:</strong>
              <br />
              Kabir-Bisanal-Resume-Updated.pdf
            </p>

            <p>
              <strong>Document type:</strong>
              <br />
              Professional Resume
            </p>

            <p>
              <strong>Status:</strong>
              <br />
              Available for opportunities
            </p>

            <div className="resume-sidebar-actions">
              <a
                href={resumeFilePath}
                target="_blank"
                rel="noreferrer"
              >
                📄 Open Resume
              </a>

              <a
                href={resumeFilePath}
                download="Kabir-Bisanal-Resume-Updated.pdf"
              >
                💾 Download Resume
              </a>
            </div>
          </div>

          <div className="resume-note">
            This résumé preview is also available as a downloadable PDF.
            Recruiters can open or save the document using the buttons
            above.
          </div>
        </aside>

        {/* Main resume document */}
        <article className="resume-document">
          <header className="resume-header">
            <div>
              <p className="resume-label">Professional Resume</p>

              <h1>{profile.name}</h1>

              <h2>{profile.professionalTitle}</h2>
            </div>

            <div className="resume-initials" aria-hidden="true">
              {profile.initials}
            </div>
          </header>

          {/* Contact information row */}
          <div className="resume-contact-row">
            <span>📍 {profile.location}</span>

            {profile.email ? (
              <a href={`mailto:${profile.email}`}>
                ✉️ {profile.email}
              </a>
            ) : (
              <span>✉️ Email will be added</span>
            )}

            {profile.linkedInUrl ? (
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn
              </a>
            ) : (
              <span>🔗 LinkedIn will be added</span>
            )}

            {profile.githubUrl ? (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                💻 github.com/{profile.githubUsername}
              </a>
            ) : (
              <span>💻 GitHub will be added</span>
            )}
          </div>

          {/* PDF buttons */}
          <div className="resume-document-actions">
            <a
              href={resumeFilePath}
              target="_blank"
              rel="noreferrer"
              className="xp-button resume-action-link"
            >
              Open PDF Resume
            </a>

            <a
              href={resumeFilePath}
              download="Kabir-Bisanal-Resume-Updated.pdf"
              className="xp-button resume-action-link"
            >
              Download Resume
            </a>
          </div>

          {/* Professional summary */}
          <section className="resume-section">
            <h2>Professional Summary</h2>

            <p>{profile.shortIntroduction}</p>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2>Education</h2>

            <div className="resume-entry">
              <div className="resume-entry-heading">
                <div>
                  <h3>{profile.degree}</h3>

                  <h4>{profile.branch}</h4>
                </div>

                <span>Currently pursuing</span>
              </div>

              <p>
                {profile.college}
                <br />
                {profile.university}
              </p>
            </div>
          </section>

          {/* Professional experience */}
          <section className="resume-section">
            <h2>Professional Experience</h2>

            <div className="resume-entry">
              <div className="resume-entry-heading">
                <div>
                  <h3>Software Development Intern</h3>

                  <h4>Company information will be added later</h4>
                </div>

                <span>Current</span>
              </div>

              <ul>
                <li>
                  Learning how software-development tools and databases
                  are used in real projects.
                </li>

                <li>
                  Developing practical knowledge of programming, version
                  control and team-based development.
                </li>

                <li>
                  Exploring database technologies and
                  application-development workflows.
                </li>
              </ul>
            </div>
          </section>

          {/* Technical skills */}
          <section className="resume-section">
            <h2>Technical Skills</h2>

            <div className="resume-skills">
              {technicalSkills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          {/* Featured projects */}
          <section className="resume-section">
  <h2>Featured Projects</h2>

  {projects.slice(0, 3).map((project) => (
    <div className="resume-project" key={project.id}>
      <div
        className="resume-project-icon"
        aria-hidden="true"
      >
        📁
      </div>

      <div>
        <h3>{project.title}</h3>

        <p>{project.description}</p>
      </div>
    </div>
  ))}
</section>

          {/* Career objective */}
          <section className="resume-section">
            <h2>Career Objective</h2>

            <p>
              To gain practical software-development experience,
              contribute to useful projects and grow into a skilled
              developer with strong programming, database and
              problem-solving knowledge.
            </p>
          </section>
        </article>
      </div>

      <footer className="window-status-bar">
        <span>Professional resume preview</span>
        <span>Ready</span>
      </footer>
    </section>
  );
}