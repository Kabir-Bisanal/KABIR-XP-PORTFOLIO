"use client";
import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { ProfileData } from "@/data/profile";
import { technicalSkills } from "@/data/skills";
import type { WindowPosition } from "@/types/window";

type AboutWindowProps = {
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


export default function AboutWindow({
  profile,
  isActive,
  isMaximized,
  position,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onTitleBarPointerDown,
}: AboutWindowProps) {
  return (
    <section
      className={`xp-window about-window ${
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
            👤
          </span>

          About Me - Kabir Bisanal
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize About Me window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore About Me window"
                : "Maximize About Me window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close About Me window"
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

      <div className="about-toolbar">
        <button type="button">← Back</button>
        <button type="button">→ Forward</button>
        <button type="button">🔍 Search</button>
        <button type="button">📁 Folders</button>
      </div>

      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">👤</span>
          C:\Kabir\Portfolio\About Me
        </div>

        <button type="button">Go</button>
      </div>

      <div className="about-content">
        <aside className="about-sidebar">
<div className="about-profile-picture">
  <Image
    src="/images/profile-kabir.jpeg"
    alt={`${profile.name} profile picture`}
    width={125}
    height={140}
    className="about-profile-image"
  />
</div>
          <h2>{profile.name}</h2>

          <p className="about-role">
            {profile.professionalTitle}
            <br />
            and Software Developer
          </p>

          <div className="about-sidebar-section">
            <h3>Profile Details</h3>

            <p>
              <strong>Location:</strong>
              <br />
              {profile.location}
            </p>

            <p>
              <strong>Education:</strong>
              <br />
              {profile.branch}
            </p>

            <p>
              <strong>University:</strong>
              <br />
              {profile.university}
            </p>
          </div>
        </aside>

        <div className="about-main">
          <section className="about-introduction">
            <p className="about-small-heading">
              Welcome to my profile
            </p>

            <h1>Hello, I&apos;m Kabir.</h1>

            <p>
              {profile.shortIntroduction}
            </p>

            <p>
              I enjoy learning how software works by building practical
              projects. My current focus includes C#, Python, SQL,
              ASP.NET Core, web development and browser automation.
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
                <h3>{profile.degree}</h3>

<p>
  {profile.branch}
  <br />
  {profile.college}
  <br />
  {profile.university}
</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Areas of Interest</h2>

            <div className="about-interest-grid">
              <div className="about-interest">
                <span aria-hidden="true">💻</span>

                <div>
                  <h3>Software Development</h3>
                  <p>
                    Creating useful and maintainable applications.
                  </p>
                </div>
              </div>

              <div className="about-interest">
                <span aria-hidden="true">🌐</span>

                <div>
                  <h3>Web Development</h3>
                  <p>
                    Building responsive and interactive websites.
                  </p>
                </div>
              </div>

              <div className="about-interest">
                <span aria-hidden="true">⚙️</span>

                <div>
                  <h3>Automation</h3>
                  <p>
                    Automating repetitive browser and data tasks.
                  </p>
                </div>
              </div>

              <div className="about-interest">
                <span aria-hidden="true">🗄️</span>

                <div>
                  <h3>Databases</h3>
                  <p>
                    Working with SQL and structured information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technical Skills</h2>

            <div className="about-skills">
              {technicalSkills.map((skill) => (
  <span key={skill}>{skill}</span>
))}
            </div>
          </section>

          <section className="about-section about-objective">
            <h2>Career Objective</h2>

            <p>
              My goal is to become a skilled software developer by
              continuously improving my programming knowledge, working
              on real projects and gaining practical industry
              experience.
            </p>
          </section>
        </div>
      </div>

      <footer className="window-status-bar">
        <span>Professional profile information</span>
        <span>Ready</span>
      </footer>
    </section>
  );
}