"use client";

import Image from "next/image";
import type { ProfileData } from "@/data/profile";

type StartMenuProps = {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onOpenWelcome: () => void;
  onOpenAbout: () => void;
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
};

export default function StartMenu({
  profile,
  isOpen,
  onClose,
  onOpenWelcome,
  onOpenAbout,
  onOpenProjects,
  onOpenResume,
  onOpenContact,
}: StartMenuProps) {
  if (!isOpen) {
    return null;
  }

  function runAction(action: () => void) {
    action();
    onClose();
  }

  return (
    <section className="start-menu" aria-label="Portfolio Start menu">
      <header className="start-menu-header">
<div className="start-menu-avatar">
  <Image
    src="/images/profile-kabir.jpeg"
    alt={`${profile.name} profile picture`}
    width={49}
    height={49}
    className="start-menu-avatar-image"
  />
</div>
        <div>
          <h2>{profile.name}</h2>
<p>{profile.professionalTitle}</p>
        </div>
      </header>

      <div className="start-menu-body">
        <div className="start-menu-left">
          <button
            type="button"
            className="start-menu-item featured-start-item"
            onClick={() => runAction(onOpenWelcome)}
          >
            <span className="start-menu-icon">💻</span>

            <span>
              <strong>Kabir&apos;s Portfolio</strong>
              <small>Return to the welcome page</small>
            </span>
          </button>

          <button
            type="button"
            className="start-menu-item"
            onClick={() => runAction(onOpenAbout)}
          >
            <span className="start-menu-icon">👤</span>

            <span>
              <strong>About Me</strong>
              <small>Professional profile and education</small>
            </span>
          </button>

          <button
            type="button"
            className="start-menu-item"
            onClick={() => runAction(onOpenProjects)}
          >
            <span className="start-menu-icon">📁</span>

            <span>
              <strong>My Projects</strong>
              <small>View software and development projects</small>
            </span>
          </button>

          <button
            type="button"
            className="start-menu-item"
            onClick={() => runAction(onOpenResume)}
          >
            <span className="start-menu-icon">📄</span>

            <span>
              <strong>Resume</strong>
              <small>Education, skills and experience</small>
            </span>
          </button>

          <button
            type="button"
            className="start-menu-item"
            onClick={() => runAction(onOpenContact)}
          >
            <span className="start-menu-icon">✉️</span>

            <span>
              <strong>Contact Me</strong>
              <small>Send a professional message</small>
            </span>
          </button>

          <div className="start-menu-divider" />

          <div className="all-programs">
            <span>All Portfolio Sections</span>
            <span aria-hidden="true">▶</span>
          </div>
        </div>

        <div className="start-menu-right">
          <button
            type="button"
            className="start-menu-system-item"
            onClick={() => runAction(onOpenAbout)}
          >
            <span>👤</span>
            <strong>My Profile</strong>
          </button>

          <button
            type="button"
            className="start-menu-system-item"
            onClick={() => runAction(onOpenProjects)}
          >
            <span>📂</span>
            <strong>My Documents</strong>
          </button>

          <button
            type="button"
            className="start-menu-system-item"
            onClick={() => runAction(onOpenResume)}
          >
            <span>📄</span>
            <strong>My Resume</strong>
          </button>

          <div className="start-menu-right-divider" />

          <div className="start-menu-system-information">
            <span>🛠️</span>
            <span>
              <strong>Technical Skills</strong>
              <small>C#, Python, SQL and web development</small>
            </span>
          </div>

          <div className="start-menu-system-information">
            <span>🎓</span>
            <span>
              <strong>Education</strong>
              <small>{profile.branch}</small>
            </span>
          </div>

          <div className="start-menu-right-divider" />

          <button
            type="button"
            className="start-menu-system-item"
            onClick={() => runAction(onOpenContact)}
          >
            <span>❓</span>
            <strong>Help and Contact</strong>
          </button>
        </div>
      </div>

      <footer className="start-menu-footer">
        <div className="start-footer-status">
          <span>🟢</span>
          Portfolio online
        </div>

        <button type="button" onClick={onClose}>
          <span>❌</span>
          Close Menu
        </button>
      </footer>
    </section>
  );
}
