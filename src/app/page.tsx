"use client";

import { useEffect, useState } from "react";

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

import {
  projects,
  type PortfolioProject,
} from "@/data/projects";

import { profile } from "@/data/profile";

import type {
  WindowPosition,
  WindowSize,
} from "@/types/window";

type WindowName =
  | "welcome"
  | "about"
  | "projects"
  | "resume"
  | "contact"
  | "projectDetails";

const MIN_VISIBLE_WINDOW_WIDTH = 120;

const TASKBAR_HEIGHT = 42;

const TITLE_BAR_HEIGHT = 34;

const RESIZE_BREAKPOINT = 900;

const RESIZE_HANDLE_SIZE = 22;

const minimumWindowSizes: Record<
  WindowName,
  WindowSize
> = {
  welcome: {
    width: 440,
    height: 320,
  },

  about: {
    width: 560,
    height: 400,
  },

  projects: {
    width: 560,
    height: 400,
  },

  resume: {
    width: 600,
    height: 420,
  },

  contact: {
    width: 560,
    height: 420,
  },

  projectDetails: {
    width: 600,
    height: 420,
  },
};

/*
  Reapplies a manually resized size whenever React renders
  the window again.

  This is especially important after minimizing/restoring
  a window because minimized windows are temporarily removed
  from the DOM.
*/
function useApplyWindowSize(
  selector: string,
  size: WindowSize | null,
  isVisible: boolean,
) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const windowElement =
      document.querySelector<HTMLElement>(selector);

    if (!windowElement) {
      return;
    }

    if (!size) {
      windowElement.classList.remove(
        "user-resized-window",
      );

      windowElement.style.removeProperty("width");
      windowElement.style.removeProperty("height");
      windowElement.style.removeProperty("max-height");

      return;
    }

    windowElement.classList.add(
      "user-resized-window",
    );

    windowElement.style.width = `${size.width}px`;
    windowElement.style.height = `${size.height}px`;
    windowElement.style.maxHeight = "none";
  });
}

export default function Home() {
  /* =========================================
     WELCOME WINDOW STATE
  ========================================= */

  const [welcomeOpen, setWelcomeOpen] =
    useState(true);

  const [welcomeMinimized, setWelcomeMinimized] =
    useState(false);

  const [welcomeMaximized, setWelcomeMaximized] =
    useState(false);

  const [welcomePosition, setWelcomePosition] =
    useState<WindowPosition | null>(null);

  const [welcomeSize, setWelcomeSize] =
    useState<WindowSize | null>(null);

  /* =========================================
     ABOUT WINDOW STATE
  ========================================= */

  const [aboutOpen, setAboutOpen] =
    useState(false);

  const [aboutMinimized, setAboutMinimized] =
    useState(false);

  const [aboutMaximized, setAboutMaximized] =
    useState(false);

  const [aboutPosition, setAboutPosition] =
    useState<WindowPosition | null>(null);

  const [aboutSize, setAboutSize] =
    useState<WindowSize | null>(null);

  /* =========================================
     PROJECTS WINDOW STATE
  ========================================= */

  const [projectsOpen, setProjectsOpen] =
    useState(false);

  const [projectsMinimized, setProjectsMinimized] =
    useState(false);

  const [projectsMaximized, setProjectsMaximized] =
    useState(false);

  const [projectsPosition, setProjectsPosition] =
    useState<WindowPosition | null>(null);

  const [projectsSize, setProjectsSize] =
    useState<WindowSize | null>(null);

  /* =========================================
     RESUME WINDOW STATE
  ========================================= */

  const [resumeOpen, setResumeOpen] =
    useState(false);

  const [resumeMinimized, setResumeMinimized] =
    useState(false);

  const [resumeMaximized, setResumeMaximized] =
    useState(false);

  const [resumePosition, setResumePosition] =
    useState<WindowPosition | null>(null);

  const [resumeSize, setResumeSize] =
    useState<WindowSize | null>(null);

  /* =========================================
     CONTACT WINDOW STATE
  ========================================= */

  const [contactOpen, setContactOpen] =
    useState(false);

  const [contactMinimized, setContactMinimized] =
    useState(false);

  const [contactMaximized, setContactMaximized] =
    useState(false);

  const [contactPosition, setContactPosition] =
    useState<WindowPosition | null>(null);

  const [contactSize, setContactSize] =
    useState<WindowSize | null>(null);

  /* =========================================
     PROJECT DETAILS STATE
  ========================================= */

  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const [
    projectDetailsMinimized,
    setProjectDetailsMinimized,
  ] = useState(false);

  const [
    projectDetailsMaximized,
    setProjectDetailsMaximized,
  ] = useState(false);

  const [
    projectDetailsPosition,
    setProjectDetailsPosition,
  ] = useState<WindowPosition | null>(null);

  const [
    projectDetailsSize,
    setProjectDetailsSize,
  ] = useState<WindowSize | null>(null);

  /* =========================================
     DESKTOP / START MENU STATE
  ========================================= */

  const [startMenuOpen, setStartMenuOpen] =
    useState(false);

  const [
    selectedDesktopIcon,
    setSelectedDesktopIcon,
  ] = useState<DesktopIconId | null>(null);

  const [activeWindow, setActiveWindow] =
    useState<WindowName>("welcome");

  /* =========================================
     REAPPLY CUSTOM WINDOW SIZES
  ========================================= */

  useApplyWindowSize(
    ".welcome-window",
    welcomeSize,
    welcomeOpen && !welcomeMinimized,
  );

  useApplyWindowSize(
    ".about-window",
    aboutSize,
    aboutOpen && !aboutMinimized,
  );

  useApplyWindowSize(
    ".projects-window",
    projectsSize,
    projectsOpen && !projectsMinimized,
  );

  useApplyWindowSize(
    ".resume-window",
    resumeSize,
    resumeOpen && !resumeMinimized,
  );

  useApplyWindowSize(
    ".contact-window",
    contactSize,
    contactOpen && !contactMinimized,
  );

  useApplyWindowSize(
    ".project-details-window",
    projectDetailsSize,
    selectedProject !== null &&
      !projectDetailsMinimized,
  );

  /* =========================================
     RESIZE HELPERS
  ========================================= */

  function getWindowNameFromElement(
    windowElement: HTMLElement,
  ): WindowName | null {
    if (
      windowElement.classList.contains(
        "welcome-window",
      )
    ) {
      return "welcome";
    }

    if (
      windowElement.classList.contains(
        "about-window",
      )
    ) {
      return "about";
    }

    if (
      windowElement.classList.contains(
        "projects-window",
      )
    ) {
      return "projects";
    }

    if (
      windowElement.classList.contains(
        "resume-window",
      )
    ) {
      return "resume";
    }

    if (
      windowElement.classList.contains(
        "contact-window",
      )
    ) {
      return "contact";
    }

    if (
      windowElement.classList.contains(
        "project-details-window",
      )
    ) {
      return "projectDetails";
    }

    return null;
  }

  function saveWindowSize(
    windowName: WindowName,
    size: WindowSize,
  ) {
    if (windowName === "welcome") {
      setWelcomeSize(size);
      return;
    }

    if (windowName === "about") {
      setAboutSize(size);
      return;
    }

    if (windowName === "projects") {
      setProjectsSize(size);
      return;
    }

    if (windowName === "resume") {
      setResumeSize(size);
      return;
    }

    if (windowName === "contact") {
      setContactSize(size);
      return;
    }

    setProjectDetailsSize(size);
  }

  function handleWindowResizePointerDown(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    /*
      Manual resizing is disabled on smaller screens.
      Responsive CSS controls window size there.
    */
    if (window.innerWidth <= RESIZE_BREAKPOINT) {
      return;
    }

    const target = event.target as HTMLElement;

    const windowElement = target.closest(
      ".xp-window",
    ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    if (
      windowElement.classList.contains(
        "maximized-window",
      )
    ) {
      return;
    }

    const windowRectangle =
      windowElement.getBoundingClientRect();

    /*
      Only begin resizing when the pointer is in the
      bottom-right resize area.
    */
    const insideRightResizeArea =
      event.clientX >=
      windowRectangle.right - RESIZE_HANDLE_SIZE;

    const insideBottomResizeArea =
      event.clientY >=
      windowRectangle.bottom - RESIZE_HANDLE_SIZE;

    if (
      !insideRightResizeArea ||
      !insideBottomResizeArea
    ) {
      return;
    }

   const windowName =
  getWindowNameFromElement(windowElement);

if (!windowName) {
  return;
}

/*
  Store the already-validated values in non-null constants.
  TypeScript can safely use these inside the nested
  pointer-move function.
*/
const resizingWindow = windowElement;
const resizingWindowName = windowName;

event.preventDefault();
event.stopPropagation();

setActiveWindow(resizingWindowName);

    const startingPointerX = event.clientX;
    const startingPointerY = event.clientY;

    const startingWidth =
      windowRectangle.width;

    const startingHeight =
      windowRectangle.height;

    const minimumSize =
      minimumWindowSizes[windowName];

    const previousUserSelect =
      document.body.style.userSelect;

    const previousCursor =
      document.body.style.cursor;

    document.body.style.userSelect = "none";
    document.body.style.cursor = "nwse-resize";

    windowElement.classList.add(
      "user-resized-window",
    );

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const widthChange =
        moveEvent.clientX - startingPointerX;

      const heightChange =
        moveEvent.clientY - startingPointerY;

      const requestedWidth =
        startingWidth + widthChange;

      const requestedHeight =
        startingHeight + heightChange;

      /*
        The available dimensions stop resizing at the
        right side of the browser and above the taskbar.
      */
      const availableWidth = Math.max(
        220,
        window.innerWidth -
          windowRectangle.left -
          4,
      );

      const availableHeight = Math.max(
        180,
        window.innerHeight -
          TASKBAR_HEIGHT -
          windowRectangle.top -
          4,
      );

      const effectiveMinimumWidth =
        Math.min(
          minimumSize.width,
          availableWidth,
        );

      const effectiveMinimumHeight =
        Math.min(
          minimumSize.height,
          availableHeight,
        );

      const nextWidth = Math.min(
        Math.max(
          effectiveMinimumWidth,
          requestedWidth,
        ),
        availableWidth,
      );

      const nextHeight = Math.min(
        Math.max(
          effectiveMinimumHeight,
          requestedHeight,
        ),
        availableHeight,
      );

      const nextSize: WindowSize = {
        width: nextWidth,
        height: nextHeight,
      };

      /*
        Update the DOM immediately so resizing feels
        smooth while also saving the value in React.
      */
      resizingWindow.style.width =
  `${nextWidth}px`;

resizingWindow.style.height =
  `${nextHeight}px`;

resizingWindow.style.maxHeight = "none";

saveWindowSize(
  resizingWindowName,
  nextSize,
);
    }

    function stopResizing() {
      document.body.style.userSelect =
        previousUserSelect;

      document.body.style.cursor =
        previousCursor;

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopResizing,
      );

      window.removeEventListener(
        "pointercancel",
        stopResizing,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopResizing,
    );

    window.addEventListener(
      "pointercancel",
      stopResizing,
    );
  }

  /* =========================================
     TASKBAR FUNCTIONS
  ========================================= */

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

  /* =========================================
     START MENU
  ========================================= */

  function toggleStartMenu() {
    setStartMenuOpen(
      (currentValue) => !currentValue,
    );
  }

  /* =========================================
     SHOW DESKTOP
  ========================================= */

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

  /* =========================================
     DESKTOP BACKGROUND
  ========================================= */

  function handleDesktopBackgroundClick(
    event: ReactMouseEvent<HTMLElement>,
  ) {
    if (event.target === event.currentTarget) {
      setSelectedDesktopIcon(null);
      setStartMenuOpen(false);
    }
  }

  /* =========================================
     WELCOME WINDOW
  ========================================= */

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
    setWelcomeMaximized(
      (currentValue) => !currentValue,
    );

    setWelcomeMinimized(false);
    setActiveWindow("welcome");
  }

  function closeWelcomeWindow() {
    setWelcomeOpen(false);
    setWelcomeMinimized(false);
    setWelcomeMaximized(false);

    /*
      Closing resets custom size.
    */
    setWelcomeSize(null);
  }

  function startDraggingWelcome(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      welcomeMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("welcome");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setWelcomePosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }

  /* =========================================
     ABOUT WINDOW
  ========================================= */

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
    setAboutMaximized(
      (currentValue) => !currentValue,
    );

    setAboutMinimized(false);
    setActiveWindow("about");
  }

  function closeAboutWindow() {
    setAboutOpen(false);
    setAboutMinimized(false);
    setAboutMaximized(false);
    setAboutPosition(null);
    setAboutSize(null);

    if (activeWindow === "about") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingAbout(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      aboutMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("about");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setAboutPosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }

  /* =========================================
     PROJECTS WINDOW
  ========================================= */

  function openProjectsWindow() {
    setProjectsOpen(true);
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
    setProjectsMaximized(
      (currentValue) => !currentValue,
    );

    setProjectsMinimized(false);
    setActiveWindow("projects");
  }

  function closeProjectsWindow() {
    setProjectsOpen(false);
    setProjectsMinimized(false);
    setProjectsMaximized(false);
    setProjectsPosition(null);
    setProjectsSize(null);

    if (activeWindow === "projects") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjects(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      projectsMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("projects");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setProjectsPosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }

  /* =========================================
     RESUME WINDOW
  ========================================= */

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
    setResumeMaximized(
      (currentValue) => !currentValue,
    );

    setResumeMinimized(false);
    setActiveWindow("resume");
  }

  function closeResumeWindow() {
    setResumeOpen(false);
    setResumeMinimized(false);
    setResumeMaximized(false);
    setResumePosition(null);
    setResumeSize(null);

    if (activeWindow === "resume") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingResume(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      resumeMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("resume");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setResumePosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }

  /* =========================================
     CONTACT WINDOW
  ========================================= */

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
    setContactMaximized(
      (currentValue) => !currentValue,
    );

    setContactMinimized(false);
    setActiveWindow("contact");
  }

  function closeContactWindow() {
    setContactOpen(false);
    setContactMinimized(false);
    setContactMaximized(false);
    setContactPosition(null);
    setContactSize(null);

    if (activeWindow === "contact") {
      setActiveWindow("welcome");
    }
  }

  function startDraggingContact(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      contactMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("contact");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setContactPosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }

  /* =========================================
     PROJECT DETAILS WINDOW
  ========================================= */

  function openProjectDetails(
    project: PortfolioProject,
  ) {
    setSelectedProject(project);

    setProjectDetailsMinimized(false);
    setProjectDetailsMaximized(false);

    setActiveWindow("projectDetails");

    setStartMenuOpen(false);

    setProjectDetailsPosition(null);

    /*
      A different project opens at the
      default Project Details size.
    */
    setProjectDetailsSize(null);
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

    if (
      activeWindow === "projectDetails"
    ) {
      if (
        projectsOpen &&
        !projectsMinimized
      ) {
        setActiveWindow("projects");
      } else {
        setActiveWindow("welcome");
      }
    }
  }

  function toggleProjectDetailsMaximize() {
    setProjectDetailsMaximized(
      (currentValue) => !currentValue,
    );

    setProjectDetailsMinimized(false);
    setActiveWindow("projectDetails");
  }

  function closeProjectDetails() {
    setSelectedProject(null);

    setProjectDetailsMinimized(false);

    setProjectDetailsMaximized(false);

    setProjectDetailsPosition(null);

    setProjectDetailsSize(null);

    if (
      projectsOpen &&
      !projectsMinimized
    ) {
      setActiveWindow("projects");
    } else {
      setActiveWindow("welcome");
    }
  }

  function startDraggingProjectDetails(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (
      projectDetailsMaximized ||
      window.innerWidth <= 700
    ) {
      return;
    }

    if (
      (event.target as HTMLElement).closest(
        ".window-controls",
      )
    ) {
      return;
    }

    const windowElement =
      event.currentTarget.closest(
        ".xp-window",
      ) as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();

    setActiveWindow("projectDetails");

    const windowRectangle =
      windowElement.getBoundingClientRect();

    const pointerOffsetX =
      event.clientX - windowRectangle.left;

    const pointerOffsetY =
      event.clientY - windowRectangle.top;

    function handlePointerMove(
      moveEvent: PointerEvent,
    ) {
      const minimumX =
        -(
          windowRectangle.width -
          MIN_VISIBLE_WINDOW_WIDTH
        );

      const maximumX =
        window.innerWidth -
        MIN_VISIBLE_WINDOW_WIDTH;

      const maximumY = Math.max(
        0,
        window.innerHeight -
          TASKBAR_HEIGHT -
          TITLE_BAR_HEIGHT,
      );

      const newX =
        moveEvent.clientX - pointerOffsetX;

      const newY =
        moveEvent.clientY - pointerOffsetY;

      setProjectDetailsPosition({
        x: Math.min(
          Math.max(minimumX, newX),
          maximumX,
        ),

        y: Math.min(
          Math.max(0, newY),
          maximumY,
        ),
      });
    }

    function stopDragging() {
      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      window.removeEventListener(
        "pointerup",
        stopDragging,
      );

      window.removeEventListener(
        "pointercancel",
        stopDragging,
      );
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    window.addEventListener(
      "pointerup",
      stopDragging,
    );

    window.addEventListener(
      "pointercancel",
      stopDragging,
    );
  }
function handleWindowTitleBarDoubleClick(
  event: ReactMouseEvent<HTMLElement>,
) {
  const target = event.target as HTMLElement;

  /*
    Only respond when the user double-clicks
    somewhere inside a window title bar.
  */
  const titleBar = target.closest(".xp-title-bar");

  if (!titleBar) {
    return;
  }

  /*
    Double-clicking minimize, maximize or close
    buttons must not trigger another maximize action.
  */
  if (target.closest(".window-controls")) {
    return;
  }

  const windowElement = titleBar.closest(
    ".xp-window",
  ) as HTMLElement | null;

  if (!windowElement) {
    return;
  }

  const windowName =
    getWindowNameFromElement(windowElement);

  if (!windowName) {
    return;
  }

  if (windowName === "welcome") {
    toggleWelcomeMaximize();
    return;
  }

  if (windowName === "about") {
    toggleAboutMaximize();
    return;
  }

  if (windowName === "projects") {
    toggleProjectsMaximize();
    return;
  }

  if (windowName === "resume") {
    toggleResumeMaximize();
    return;
  }

  if (windowName === "contact") {
    toggleContactMaximize();
    return;
  }

  if (windowName === "projectDetails") {
    toggleProjectDetailsMaximize();
  }
}
  /* =========================================
     DESKTOP ICONS
  ========================================= */

  function handleDesktopIcon(
  iconId: DesktopIconId,
) {
  if (iconId === "about") {
    openAboutWindow();
    return;
  }

  if (iconId === "projects") {
    openProjectsWindow();
    return;
  }

  if (iconId === "topicora") {
    const topicoraProject = projects.find(
      (project) => project.id === "topicora",
    );

    if (topicoraProject) {
      openProjectDetails(topicoraProject);
    }

    return;
  }

  if (iconId === "resume") {
    openResumeWindow();
    return;
  }

  if (iconId === "contact") {
    openContactWindow();
  }
}

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main
  className="desktop"
  onMouseDown={handleDesktopBackgroundClick}
  onPointerDownCapture={
    handleWindowResizePointerDown
  }
  onDoubleClickCapture={
    handleWindowTitleBarDoubleClick
  }
>
      <DesktopIcons
        selectedIcon={selectedDesktopIcon}
        onSelectIcon={setSelectedDesktopIcon}
        onOpenIcon={handleDesktopIcon}
        onClearSelection={() =>
          setSelectedDesktopIcon(null)
        }
      />

      {/* Welcome window */}

      {welcomeOpen && !welcomeMinimized && (
        <WelcomeWindow
          profile={profile}
          isActive={
            activeWindow === "welcome"
          }
          isMaximized={welcomeMaximized}
          position={welcomePosition}
          onFocus={() =>
            setActiveWindow("welcome")
          }
          onClose={closeWelcomeWindow}
          onMinimize={minimizeWelcomeWindow}
          onMaximize={toggleWelcomeMaximize}
          onOpenProjects={openProjectsWindow}
          onOpenResume={openResumeWindow}
          onTitleBarPointerDown={
            startDraggingWelcome
          }
        />
      )}

      {/* About Me window */}

      {aboutOpen && !aboutMinimized && (
        <AboutWindow
          profile={profile}
          isActive={activeWindow === "about"}
          isMaximized={aboutMaximized}
          position={aboutPosition}
          onFocus={() =>
            setActiveWindow("about")
          }
          onClose={closeAboutWindow}
          onMinimize={minimizeAboutWindow}
          onMaximize={toggleAboutMaximize}
          onTitleBarPointerDown={
            startDraggingAbout
          }
        />
      )}

      {/* Resume window */}

      {resumeOpen && !resumeMinimized && (
        <ResumeWindow
          profile={profile}
          projects={projects}
          isActive={
            activeWindow === "resume"
          }
          isMaximized={resumeMaximized}
          position={resumePosition}
          onFocus={() =>
            setActiveWindow("resume")
          }
          onClose={closeResumeWindow}
          onMinimize={minimizeResumeWindow}
          onMaximize={toggleResumeMaximize}
          onTitleBarPointerDown={
            startDraggingResume
          }
        />
      )}

      {/* Contact window */}

      {contactOpen && !contactMinimized && (
        <ContactWindow
          profile={profile}
          isActive={
            activeWindow === "contact"
          }
          isMaximized={contactMaximized}
          position={contactPosition}
          onFocus={() =>
            setActiveWindow("contact")
          }
          onClose={closeContactWindow}
          onMinimize={minimizeContactWindow}
          onMaximize={toggleContactMaximize}
          onTitleBarPointerDown={
            startDraggingContact
          }
        />
      )}

      {/* Projects window */}

      {projectsOpen && !projectsMinimized && (
        <ProjectsWindow
          projects={projects}
          isActive={
            activeWindow === "projects"
          }
          isMaximized={projectsMaximized}
          position={projectsPosition}
          onFocus={() =>
            setActiveWindow("projects")
          }
          onClose={closeProjectsWindow}
          onMinimize={minimizeProjectsWindow}
          onMaximize={
            toggleProjectsMaximize
          }
          onOpenProject={openProjectDetails}
          onTitleBarPointerDown={
            startDraggingProjects
          }
        />
      )}

      {/* Project details window */}

      {selectedProject &&
        !projectDetailsMinimized && (
          <ProjectDetailsWindow
            project={selectedProject}
            isActive={
              activeWindow ===
              "projectDetails"
            }
            isMaximized={
              projectDetailsMaximized
            }
            position={projectDetailsPosition}
            onFocus={() =>
              setActiveWindow(
                "projectDetails",
              )
            }
            onClose={closeProjectDetails}
            onMinimize={
              minimizeProjectDetails
            }
            onMaximize={
              toggleProjectDetailsMaximize
            }
            onTitleBarPointerDown={
              startDraggingProjectDetails
            }
          />
        )}

      {/* Start menu */}

      <StartMenu
        profile={profile}
        isOpen={startMenuOpen}
        onClose={() =>
          setStartMenuOpen(false)
        }
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
        projectsMinimized={
          projectsMinimized
        }
        resumeOpen={resumeOpen}
        resumeMinimized={resumeMinimized}
        contactOpen={contactOpen}
        contactMinimized={
          contactMinimized
        }
        projectDetailsOpen={
          selectedProject !== null
        }
        projectDetailsMinimized={
          projectDetailsMinimized
        }
        selectedProjectTitle={
          selectedProject?.title ?? ""
        }
        activeWindow={activeWindow}
        onToggleStartMenu={toggleStartMenu}
        onShowDesktop={showDesktop}
        onOpenWelcome={openWelcomeWindow}
        onWelcomeTaskbarClick={
          handleWelcomeTaskbarClick
        }
        onAboutTaskbarClick={
          handleAboutTaskbarClick
        }
        onProjectsTaskbarClick={
          handleProjectsTaskbarClick
        }
        onResumeTaskbarClick={
          handleResumeTaskbarClick
        }
        onContactTaskbarClick={
          handleContactTaskbarClick
        }
        onProjectDetailsTaskbarClick={
          handleProjectDetailsTaskbarClick
        }
      />
    </main>
  );
}