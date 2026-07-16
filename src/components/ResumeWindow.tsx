"use client";
import type { PointerEvent as ReactPointerEvent } from "react";

type WindowPosition = {
  x: number;
  y: number;
};

type ResumeWindowProps = {
  isActive: boolean;
  isMaximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  position: WindowPosition | null;
  onTitleBarPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
};

const technicalSkills = [
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

export default function ResumeWindow({
  isActive,
  isMaximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  position,
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
      <header className="xp-title-bar" onPointerDown={onTitleBarPointerDown}>
        <div className="xp-title">
          <span className="title-icon" aria-hidden="true">
            📄
          </span>
          Kabir Bisanal - Resume
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
              isMaximized ? "Restore Resume window" : "Maximize Resume window"
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

      <div className="window-menu">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      <div className="resume-toolbar">
        <button type="button">← Back</button>
        <button type="button">→ Forward</button>
        <button type="button">🔍 Search</button>
        <button type="button">📁 Folders</button>
      </div>

      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">📄</span>
          C:\Kabir\Portfolio\Resume
        </div>

        <button type="button">Go</button>
      </div>

      <div className="resume-content">
        <aside className="resume-sidebar">
          <div className="resume-sidebar-box">
            <h3>Resume Sections</h3>

            <div className="resume-navigation-item">
              <span>👤</span>
              Professional Summary
            </div>

            <div className="resume-navigation-item">
              <span>💼</span>
              Experience
            </div>

            <div className="resume-navigation-item">
              <span>🎓</span>
              Education
            </div>

            <div className="resume-navigation-item">
              <span>🛠️</span>
              Technical Skills
            </div>

            <div className="resume-navigation-item">
              <span>📁</span>
              Projects
            </div>
          </div>

          <div className="resume-sidebar-box">
            <h3>Document Details</h3>

            <p>
              <strong>File:</strong>
              <br />
              Kabir_Bisanal_Resume.pdf
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
          </div>

          <div className="resume-note">
            The downloadable PDF version will be connected after your final
            résumé is added to the project.
          </div>
        </aside>

        <article className="resume-document">
          <header className="resume-header">
            <div>
              <p className="resume-label">Professional Resume</p>

              <h1>Kabir Bisanal</h1>

              <h2>Computer Science Student and Software Developer</h2>
            </div>

            <div className="resume-initials" aria-hidden="true">
              KB
            </div>
          </header>

          <div className="resume-contact-row">
            <span>📍 Karnataka, India</span>
            <span>✉️ Email will be added</span>
            <span>🔗 LinkedIn will be added</span>
            <span>💻 GitHub will be added</span>
          </div>

          <section className="resume-section">
            <h2>Professional Summary</h2>

            <p>
              Computer Science and Engineering student interested in software
              development, web applications, database systems and automation. I
              enjoy building practical projects and continuously improving my
              programming and problem-solving skills.
            </p>
          </section>

          <section className="resume-section">
            <h2>Education</h2>

            <div className="resume-entry">
              <div className="resume-entry-heading">
                <div>
                  <h3>Bachelor of Engineering</h3>

                  <h4>Computer Science and Engineering</h4>
                </div>

                <span>Currently pursuing</span>
              </div>

              <p>
                SEA College of Engineering and Technology
                <br />
                Visvesvaraya Technological University
              </p>
            </div>
          </section>

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
                  Learning how software-development tools and databases are used
                  in real projects.
                </li>

                <li>
                  Developing practical knowledge of programming, version control
                  and team-based development.
                </li>

                <li>
                  Exploring database technologies and application-development
                  workflows.
                </li>
              </ul>
            </div>
          </section>

          <section className="resume-section">
            <h2>Technical Skills</h2>

            <div className="resume-skills">
              {technicalSkills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>Featured Projects</h2>

            <div className="resume-project">
              <div className="resume-project-icon">📁</div>

              <div>
                <h3>VTU Result Collector</h3>

                <p>
                  Browser-automation project using C# and Playwright to collect
                  and organise student result information.
                </p>
              </div>
            </div>

            <div className="resume-project">
              <div className="resume-project-icon">📁</div>

              <div>
                <h3>Windows XP Portfolio</h3>

                <p>
                  Interactive portfolio website developed with Next.js, React,
                  TypeScript and custom Windows XP-inspired CSS.
                </p>
              </div>
            </div>

            <div className="resume-project">
              <div className="resume-project-icon">📁</div>

              <div>
                <h3>Student Result Analytics</h3>

                <p>
                  Analytics-dashboard concept for comparing academic
                  performance, subject results, GPA and backlogs.
                </p>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <h2>Career Objective</h2>

            <p>
              To gain practical software-development experience, contribute to
              useful projects and grow into a skilled developer with strong
              programming, database and problem-solving knowledge.
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
