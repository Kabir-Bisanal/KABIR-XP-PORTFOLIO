"use client";

import { useState } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import WelcomeWindow from "@/components/WelcomeWindow";
import ResumeWindow from "@/components/ResumeWindow";
import ContactWindow from "@/components/ContactWindow";
import AboutWindow from "@/components/AboutWindow";
import ProjectsWindow from "@/components/ProjectsWindow";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import ProjectDetailsWindow from "@/components/ProjectDetailsWindow";
import DesktopIcons, {
  type DesktopIconId,
} from "@/components/DesktopIcons";
import { projects, type PortfolioProject } from "@/data/projects";
import { profile } from "@/data/profile";
import type { WindowPosition } from "@/types/window";type WindowName =
  "welcome" | "about" | "projects" | "resume" | "contact" | "projectDetails";

export default function Home() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [welcomeMinimized, setWelcomeMinimized] = useState(false);
  const [welcomeMaximized, setWelcomeMaximized] = useState(false);
  const [welcomePosition, setWelcomePosition] = useState<WindowPosition | null>(
    null,
  );

  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutMinimized, setAboutMinimized] = useState(false);
  const [aboutMaximized, setAboutMaximized] = useState(false);
  const [aboutPosition, setAboutPosition] = useState<WindowPosition | null>(
    null,
  );

  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsMinimized, setProjectsMinimized] = useState(false);
  const [projectsMaximized, setProjectsMaximized] = useState(false);
  const [projectsPosition, setProjectsPosition] =
    useState<WindowPosition | null>(null);

  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeMinimized, setResumeMinimized] = useState(false);
  const [resumeMaximized, setResumeMaximized] = useState(false);
  const [resumePosition, setResumePosition] = useState<WindowPosition | null>(
    null,
  );

  const [contactOpen, setContactOpen] = useState(false);
  const [contactMinimized, setContactMinimized] = useState(false);
  const [contactMaximized, setContactMaximized] = useState(false);
  const [contactPosition, setContactPosition] = useState<WindowPosition | null>(
    null,
  );

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const [selectedDesktopIcon, setSelectedDesktopIcon] =
  useState<DesktopIconId | null>(null);

  const [projectDetailsMinimized, setProjectDetailsMinimized] = useState(false);
  const [projectDetailsMaximized, setProjectDetailsMaximized] = useState(false);
  const [activeWindow, setActiveWindow] = useState<WindowName>("welcome");
  const [projectDetailsPosition, setProjectDetailsPosition] =
    useState<WindowPosition | null>(null);

function handleWelcomeTaskbarClick() {
  if (
    activeWindow === "welcome" &&
    !welcomeMinimized
  ) {
    minimizeWelcomeWindow();
  } else {
    openWelcomeWindow();
  }
}

function handleAboutTaskbarClick() {
  if (
    activeWindow === "about" &&
    !aboutMinimized
  ) {
    minimizeAboutWindow();
  } else {
    openAboutWindow();
  }
}

function handleProjectsTaskbarClick() {
  if (
    activeWindow === "projects" &&
    !projectsMinimized
  ) {
    minimizeProjectsWindow();
  } else {
    openProjectsWindow();
  }
}

function handleResumeTaskbarClick() {
  if (
    activeWindow === "resume" &&
    !resumeMinimized
  ) {
    minimizeResumeWindow();
  } else {
    openResumeWindow();
  }
}

function handleContactTaskbarClick() {
  if (
    activeWindow === "contact" &&
    !contactMinimized
  ) {
    minimizeContactWindow();
  } else {
    openContactWindow();
  }
}

function handleProjectDetailsTaskbarClick() {
  if (
    activeWindow === "projectDetails" &&
    !projectDetailsMinimized
  ) {
    minimizeProjectDetails();
  } else {
    restoreProjectDetails();
  }
}

function toggleStartMenu() {
  setStartMenuOpen(
    (currentValue) => !currentValue,
  );
}

   function showDesktop() {
  if (welcomeOpen) {
    setWelcomeMinimized(true);
  }

  if (aboutOpen) {
    setAboutMinimized(true);
  }

  if (projectsOpen) {
    setProjectsMinimized(true);
  }

  if (resumeOpen) {
    setResumeMinimized(true);
  }

  if (contactOpen) {
    setContactMinimized(true);
  }

  if (selectedProject) {
    setProjectDetailsMinimized(true);
  }

  setStartMenuOpen(false);
  setSelectedDesktopIcon(null);
  setActiveWindow("welcome");
}
    
  function handleDesktopBackgroundClick(event: ReactMouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setSelectedDesktopIcon(null);
      setStartMenuOpen(false);
    }
  }

  function openWelcomeWindow() {
    setWelcomeOpen(true);
    setWelcomeMinimized(false);
    setActiveWindow("welcome");
    setStartMenuOpen(false);
    setWelcomePosition(null);
  }

  function minimizeWelcomeWindow() {
    setWelcomeMinimized(true);

    if (activeWindow === "welcome") {
      setActiveWindow("welcome");
    }
  }

  function toggleWelcomeMaximize() {
    setWelcomeMaximized((currentValue) => !currentValue);
    setWelcomeMinimized(false);
    setActiveWindow("welcome");
  }

  function closeWelcomeWindow() {
    setWelcomeOpen(false);
    setWelcomeMinimized(false);
    setWelcomeMaximized(false);
  }

  function startDraggingWelcome(event: ReactPointerEvent<HTMLElement>) {
    if (welcomeMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("welcome");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setWelcomePosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openAboutWindow() {
    setAboutOpen(true);
    setAboutMinimized(false);
    setActiveWindow("about");
    setStartMenuOpen(false);
  }

  function minimizeAboutWindow() {
    setAboutMinimized(true);

    if (activeWindow === "about") {
      setActiveWindow("welcome");
    }
  }

  function toggleAboutMaximize() {
    setAboutMaximized((currentValue) => !currentValue);
    setAboutMinimized(false);
    setActiveWindow("about");
  }

  function closeAboutWindow() {
    setAboutOpen(false);
    setAboutMinimized(false);
    setAboutMaximized(false);
    setAboutPosition(null);

    if (activeWindow === "about") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingAbout(event: ReactPointerEvent<HTMLElement>) {
    if (aboutMaximized || window.innerWidth <= 700) {
      return;
    }


    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("about");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setAboutPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openProjectsWindow() {
    setProjectsOpen(true)
    setProjectsMinimized(false);
    setActiveWindow("projects");
    setStartMenuOpen(false);
  }

  function minimizeProjectsWindow() {
    setProjectsMinimized(true);

    if (activeWindow === "projects") {
      setActiveWindow("welcome");
    }
  }

  function toggleProjectsMaximize() {
    setProjectsMaximized((currentValue) => !currentValue);
    setProjectsMinimized(false);
    setActiveWindow("projects");
  }

  function closeProjectsWindow() {
    setProjectsOpen(false);
    setProjectsMinimized(false);
    setProjectsMaximized(false);
    setProjectsPosition(null);

    if (activeWindow === "projects") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjects(event: ReactPointerEvent<HTMLElement>) {
    if (projectsMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("projects");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setProjectsPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openResumeWindow() {
    setResumeOpen(true);
    setResumeMinimized(false);
    setActiveWindow("resume");
    setStartMenuOpen(false);
  }

  function minimizeResumeWindow() {
    setResumeMinimized(true);

    if (activeWindow === "resume") {
      setActiveWindow("welcome");
    }
  }

  function toggleResumeMaximize() {
    setResumeMaximized((currentValue) => !currentValue);
    setResumeMinimized(false);
    setActiveWindow("resume");
  }

  function closeResumeWindow() {
    setResumeOpen(false);
    setResumeMinimized(false);
    setResumeMaximized(false);
    setResumePosition(null);

    if (activeWindow === "resume") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingResume(event: ReactPointerEvent<HTMLElement>) {
    if (resumeMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("resume");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setResumePosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openContactWindow() {
    setContactOpen(true);
    setContactMinimized(false);
    setActiveWindow("contact");
    setStartMenuOpen(false);
  }
  function minimizeContactWindow() {
    setContactMinimized(true);

    if (activeWindow === "contact") {
      setActiveWindow("welcome");
    }
  }

  function toggleContactMaximize() {
    setContactMaximized((currentValue) => !currentValue);
    setContactMinimized(false);
    setActiveWindow("contact");
  }

  function closeContactWindow() {
    setContactOpen(false);
    setContactMinimized(false);
    setContactMaximized(false);
    setContactPosition(null);

    if (activeWindow === "contact") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingContact(event: ReactPointerEvent<HTMLElement>) {
    if (contactMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("contact");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setContactPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function openProjectDetails(project: PortfolioProject) {
    setSelectedProject(project);
    setProjectDetailsMinimized(false);
    setProjectDetailsMaximized(false);
    setActiveWindow("projectDetails");
    setStartMenuOpen(false);
    setProjectDetailsPosition(null);
  }

  function restoreProjectDetails() {
    if (!selectedProject) {
      return;
    }

    setProjectDetailsMinimized(false);
    setActiveWindow("projectDetails");
  }

  function minimizeProjectDetails() {
    setProjectDetailsMinimized(true);

    if (activeWindow === "projectDetails") {
      if (projectsOpen && !projectsMinimized) {
        setActiveWindow("projects");
      } else {
        setActiveWindow("welcome");
      }
    }
  }

  function toggleProjectDetailsMaximize() {
    setProjectDetailsMaximized((currentValue) => !currentValue);

    setProjectDetailsMinimized(false);
    setActiveWindow("projectDetails");
  }

  function closeProjectDetails() {
    setSelectedProject(null);
    setProjectDetailsMinimized(false);
    setProjectDetailsMaximized(false);
    setProjectDetailsPosition(null);

    if (projectsOpen && !projectsMinimized) {
      setActiveWindow("projects");
    } else {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjectDetails(event: ReactPointerEvent<HTMLElement>) {
    if (projectDetailsMaximized || window.innerWidth <= 700) {
      return;
    }

    if ((event.target as HTMLElement).closest(".window-controls")) {
      return;
    }

    const windowElement = event.currentTarget.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    setActiveWindow("projectDetails");

    const windowRectangle = windowElement.getBoundingClientRect();

    const pointerOffsetX = event.clientX - windowRectangle.left;

    const pointerOffsetY = event.clientY - windowRectangle.top;

    function handlePointerMove(moveEvent: PointerEvent) {
      const maximumX = Math.max(0, window.innerWidth - windowRectangle.width);

      const maximumY = Math.max(0, window.innerHeight - 42 - 34);

      setProjectDetailsPosition({
        x: Math.min(Math.max(0, moveEvent.clientX - pointerOffsetX), maximumX),
        y: Math.min(Math.max(0, moveEvent.clientY - pointerOffsetY), maximumY),
      });
    }

    function stopDragging() {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  function handleDesktopIcon(iconId: DesktopIconId) {
    if (iconId === "about") {
      openAboutWindow();
    }

    if (iconId === "projects") {
      openProjectsWindow();
    }

    if (iconId === "resume") {
      openResumeWindow();
    }

    if (iconId === "contact") {
      openContactWindow();
    }
  }

  return (
    <main className="desktop" onMouseDown={handleDesktopBackgroundClick}>
<DesktopIcons
  selectedIcon={selectedDesktopIcon}
  onSelectIcon={setSelectedDesktopIcon}
  onOpenIcon={handleDesktopIcon}
  onClearSelection={() => setSelectedDesktopIcon(null)}
/>
      {/* Welcome window */}
{welcomeOpen && !welcomeMinimized && (
  <WelcomeWindow
  profile={profile}
    isActive={activeWindow === "welcome"}
    isMaximized={welcomeMaximized}
    position={welcomePosition}
    onFocus={() => setActiveWindow("welcome")}
    onClose={closeWelcomeWindow}
    onMinimize={minimizeWelcomeWindow}
    onMaximize={toggleWelcomeMaximize}
    onOpenProjects={openProjectsWindow}
    onOpenResume={openResumeWindow}
    onTitleBarPointerDown={startDraggingWelcome}
  />
)}

      {/* About Me window */}
{aboutOpen && !aboutMinimized && (
  <AboutWindow
  profile={profile}
    isActive={activeWindow === "about"}
    isMaximized={aboutMaximized}
    position={aboutPosition}
    onFocus={() => setActiveWindow("about")}
    onClose={closeAboutWindow}
    onMinimize={minimizeAboutWindow}
    onMaximize={toggleAboutMaximize}
    onTitleBarPointerDown={startDraggingAbout}
  />
)}
      {/* Resume window */}
      {resumeOpen && !resumeMinimized && (
        <ResumeWindow
        profile={profile}
        projects={projects}
          isActive={activeWindow === "resume"}
          isMaximized={resumeMaximized}
          position={resumePosition}
          onFocus={() => setActiveWindow("resume")}
          onClose={closeResumeWindow}
          onMinimize={minimizeResumeWindow}
          onMaximize={toggleResumeMaximize}
          onTitleBarPointerDown={startDraggingResume}
        />
      )}
      {/* Contact window */}
      {contactOpen && !contactMinimized && (
        <ContactWindow
        profile={profile}
          isActive={activeWindow === "contact"}
          isMaximized={contactMaximized}
          position={contactPosition}
          onFocus={() => setActiveWindow("contact")}
          onClose={closeContactWindow}
          onMinimize={minimizeContactWindow}
          onMaximize={toggleContactMaximize}
          onTitleBarPointerDown={startDraggingContact}
        />
      )}

      {/* Projects window */}
{projectsOpen && !projectsMinimized && (
  <ProjectsWindow
    projects={projects}
    isActive={activeWindow === "projects"}
    isMaximized={projectsMaximized}
    position={projectsPosition}
    onFocus={() => setActiveWindow("projects")}
    onClose={closeProjectsWindow}
    onMinimize={minimizeProjectsWindow}
    onMaximize={toggleProjectsMaximize}
    onOpenProject={openProjectDetails}
    onTitleBarPointerDown={startDraggingProjects}
  />
)}
      {/* Project details window */}
      {selectedProject && !projectDetailsMinimized && (
        <ProjectDetailsWindow
          project={selectedProject}
          isActive={activeWindow === "projectDetails"}
          isMaximized={projectDetailsMaximized}
          position={projectDetailsPosition}
          onFocus={() => setActiveWindow("projectDetails")}
          onClose={closeProjectDetails}
          onMinimize={minimizeProjectDetails}
          onMaximize={toggleProjectDetailsMaximize}
          onTitleBarPointerDown={startDraggingProjectDetails}
        />
      )}
      {/* Start menu */}
      <StartMenu
      profile={profile}
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWelcome={openWelcomeWindow}
        onOpenAbout={openAboutWindow}
        onOpenProjects={openProjectsWindow}
        onOpenResume={openResumeWindow}
        onOpenContact={openContactWindow}
      />
 
      {/* Taskbar */}
<Taskbar
  startMenuOpen={startMenuOpen}

  welcomeOpen={welcomeOpen}
  welcomeMinimized={welcomeMinimized}

  aboutOpen={aboutOpen}
  aboutMinimized={aboutMinimized}

  projectsOpen={projectsOpen}
  projectsMinimized={projectsMinimized}

  resumeOpen={resumeOpen}
  resumeMinimized={resumeMinimized}

  contactOpen={contactOpen}
  contactMinimized={contactMinimized}

  projectDetailsOpen={selectedProject !== null}
  projectDetailsMinimized={projectDetailsMinimized}
  selectedProjectTitle={selectedProject?.title ?? ""}

  activeWindow={activeWindow}

  onToggleStartMenu={toggleStartMenu}
  onShowDesktop={showDesktop}
  onOpenWelcome={openWelcomeWindow}

  onWelcomeTaskbarClick={handleWelcomeTaskbarClick}
  onAboutTaskbarClick={handleAboutTaskbarClick}
  onProjectsTaskbarClick={handleProjectsTaskbarClick}
  onResumeTaskbarClick={handleResumeTaskbarClick}
  onContactTaskbarClick={handleContactTaskbarClick}
  onProjectDetailsTaskbarClick={
    handleProjectDetailsTaskbarClick
  }
/>
    </main>
  );
}
