"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { ProfileData } from "@/data/profile";
type WindowPosition = {
  x: number;
  y: number;
};

type WelcomeWindowProps = {
  profile: ProfileData;
  isActive: boolean;
  isMaximized: boolean;
  position: WindowPosition | null;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onTitleBarPointerDown: (
    event: ReactPointerEvent<HTMLElement>,
  ) => void;
};

export default function WelcomeWindow({
  profile,
  isActive,
  isMaximized,
  position,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onOpenProjects,
  onOpenResume,
  onTitleBarPointerDown,
}: WelcomeWindowProps) {
  return (
    <section
      className={`xp-window welcome-window ${
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
            💻
          </span>

          Welcome to Kabir&apos;s Portfolio
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize Welcome window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore Welcome window"
                : "Maximize Welcome window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close Welcome window"
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
        <span>Help</span>
      </div>

      <div className="window-content">
        <div
  className="profile-placeholder"
  aria-hidden="true"
>
  {profile.initials}
</div>

        <div className="welcome-information">
          <p className="welcome-label">Welcome!</p>

          <h1>{profile.name}</h1>

          <h2>
            {profile.professionalTitle}
          </h2>

          <p>
            {profile.shortIntroduction}
          </p>

          <div className="welcome-actions">
            <button
              type="button"
              className="xp-button"
              onClick={onOpenProjects}
            >
              View My Projects
            </button>

            <button
              type="button"
              className="xp-button"
              onClick={onOpenResume}
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
  );
}