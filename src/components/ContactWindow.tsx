"use client";

import { useState } from "react";
import type { FormEvent, PointerEvent as ReactPointerEvent } from "react";

type WindowPosition = {
  x: number;
  y: number;
};

type ContactWindowProps = {
  isActive: boolean;
  isMaximized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  position: WindowPosition | null;
  onTitleBarPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
};

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactWindow({
  isActive,
  isMaximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  position,
  onTitleBarPointerDown,
}: ContactWindowProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const [statusMessage, setStatusMessage] = useState("");

  /*
    Add your real email address between the quotation marks later.

    Example:
    const portfolioEmail = "kabir@example.com";
  */
  const portfolioEmail = "";

  function handleInputChange(field: keyof ContactFormData, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setStatusMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!portfolioEmail) {
      setStatusMessage(
        "The form is working. Add your email address in ContactWindow.tsx to activate email sending.",
      );

      return;
    }

    const emailSubject = encodeURIComponent(
      formData.subject.trim() || `Portfolio enquiry from ${formData.name}`,
    );

    const emailBody = encodeURIComponent(
      `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`,
    );

    setStatusMessage("Opening your email application...");

    window.location.href =
      `mailto:${portfolioEmail}` +
      `?subject=${emailSubject}` +
      `&body=${emailBody}`;
  }

  function clearForm() {
    setFormData(initialFormData);
    setStatusMessage("");
  }

  return (
    <section
      className={`xp-window contact-window ${
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
            ✉️
          </span>
          Contact Me - Kabir Bisanal
        </div>

        <div className="window-controls">
          <button
            type="button"
            aria-label="Minimize Contact Me window"
            onClick={onMinimize}
          >
            _
          </button>

          <button
            type="button"
            aria-label={
              isMaximized
                ? "Restore Contact Me window"
                : "Maximize Contact Me window"
            }
            onClick={onMaximize}
          >
            {isMaximized ? "❐" : "□"}
          </button>

          <button
            type="button"
            className="close-button"
            aria-label="Close Contact Me window"
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

      <div className="contact-toolbar">
        <button type="button">← Back</button>
        <button type="button">→ Forward</button>
        <button type="button">🔍 Search</button>
        <button type="button">📁 Folders</button>
      </div>

      <div className="address-bar">
        <span>Address</span>

        <div className="address-input">
          <span aria-hidden="true">✉️</span>
          C:\Kabir\Portfolio\Contact Me
        </div>

        <button type="button">Go</button>
      </div>

      <div className="contact-content">
        <aside className="contact-sidebar">
          <div className="contact-sidebar-box">
            <h3>Contact Information</h3>

            <div className="contact-detail">
              <span aria-hidden="true">✉️</span>

              <div>
                <strong>Email</strong>
                <p>Add your email later</p>
              </div>
            </div>

            <div className="contact-detail">
  <span aria-hidden="true">💻</span>

  <div>
    <strong>GitHub</strong>

    <a
      className="contact-profile-link"
      href="https://github.com/Kabir-Bisanal"
      target="_blank"
      rel="noreferrer"
    >
      github.com/Kabir-Bisanal
    </a>
  </div>
</div>

            <div className="contact-detail">
              <span aria-hidden="true">🔗</span>

              <div>
                <strong>LinkedIn</strong>
                <p>Add your LinkedIn link later</p>
              </div>
            </div>

            <div className="contact-detail">
              <span aria-hidden="true">📍</span>

              <div>
                <strong>Location</strong>
                <p>Karnataka, India</p>
              </div>
            </div>
          </div>

          <div className="contact-sidebar-box">
            <h3>Availability</h3>

            <div className="availability-status">
              <span className="availability-dot" />
              Available for opportunities
            </div>

            <p className="availability-description">
              Open to internships, entry-level software-development
              opportunities and project collaborations.
            </p>
          </div>

          <div className="contact-tip">
            Recruiters can use this form to prepare an email after your
            professional email address is connected.
          </div>
        </aside>

        <main className="contact-main">
          <header className="contact-heading">
            <p>Send a message</p>

            <h1>Let&apos;s get in touch</h1>

            <p>
              Have an opportunity, project idea or question? Fill in the form
              below to contact me.
            </p>
          </header>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="contact-name">
                  Your name <span>*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    handleInputChange("name", event.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="contact-email">
                  Your email <span>*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleInputChange("email", event.target.value)
                  }
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-subject">Subject</label>

              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(event) =>
                  handleInputChange("subject", event.target.value)
                }
                placeholder="Reason for contacting me"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="contact-message">
                Message <span>*</span>
              </label>

              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(event) =>
                  handleInputChange("message", event.target.value)
                }
                placeholder="Write your message here..."
                rows={8}
                required
              />
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="xp-button">
                Send Message
              </button>

              <button type="button" className="xp-button" onClick={clearForm}>
                Clear Form
              </button>
            </div>

            {statusMessage && (
              <div className="contact-status-message" role="status">
                <span aria-hidden="true">ℹ️</span>
                {statusMessage}
              </div>
            )}
          </form>
        </main>
      </div>

      <footer className="window-status-bar">
        <span>Contact form and professional links</span>
        <span>Ready</span>
      </footer>
    </section>
  );
}
