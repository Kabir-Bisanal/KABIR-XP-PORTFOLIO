"use client";

import { useEffect, useRef, useState } from "react";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export type DesktopIconId =
  "about" | "projects" | "topicora" | "smartstock" | "resume" | "contact";

type DesktopIconPosition = {
  x: number;
  y: number;
};

type DesktopIconsProps = {
  selectedIcon: DesktopIconId | null;
  onSelectIcon: (iconId: DesktopIconId) => void;
  onOpenIcon: (iconId: DesktopIconId) => void;
  onClearSelection: () => void;
};

const DESKTOP_BREAKPOINT = 700;
const DRAG_THRESHOLD = 5;
const GRID_COLUMN_WIDTH = 100;
const GRID_ROW_HEIGHT = 90;
const GRID_ORIGIN = { x: 12, y: 18 };

const desktopIcons: {
  id: DesktopIconId;
  icon: string;
  title: string;
  initialPosition: DesktopIconPosition;
}[] = [
  {
    id: "about",
    icon: "👤",
    title: "About Me",
    initialPosition: { x: 12, y: 18 },
  },
  {
    id: "projects",
    icon: "📁",
    title: "My Projects",
    initialPosition: { x: 12, y: 108 },
  },
  {
    id: "topicora",
    icon: "📰",
    title: "Topicora",
    initialPosition: { x: 12, y: 198 },
  },
  {
    id: "smartstock",
    icon: "📊",
    title: "SmartStock",
    initialPosition: { x: 12, y: 288 },
  },
  {
    id: "resume",
    icon: "📄",
    title: "Resume",
    initialPosition: { x: 12, y: 378 },
  },
  {
    id: "contact",
    icon: "✉️",
    title: "Contact Me",
    initialPosition: { x: 12, y: 468 },
  },
];

const initialIconPositions = desktopIcons.reduce(
  (positions, item) => {
    positions[item.id] = item.initialPosition;
    return positions;
  },
  {} as Record<DesktopIconId, DesktopIconPosition>,
);

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(minimum, value), maximum);
}

function snapIconToGrid(
  position: DesktopIconPosition,
  desktopWidth: number,
  desktopHeight: number,
  iconWidth: number,
  iconHeight: number,
): DesktopIconPosition {
  const maximumX = Math.max(0, desktopWidth - iconWidth);
  const maximumY = Math.max(0, desktopHeight - iconHeight);

  const maximumColumn = Math.max(
    0,
    Math.floor((maximumX - GRID_ORIGIN.x) / GRID_COLUMN_WIDTH),
  );

  const maximumRow = Math.max(
    0,
    Math.floor((maximumY - GRID_ORIGIN.y) / GRID_ROW_HEIGHT),
  );

  const column = clamp(
    Math.round((position.x - GRID_ORIGIN.x) / GRID_COLUMN_WIDTH),
    0,
    maximumColumn,
  );

  const row = clamp(
    Math.round((position.y - GRID_ORIGIN.y) / GRID_ROW_HEIGHT),
    0,
    maximumRow,
  );

  return {
    x: Math.min(GRID_ORIGIN.x + column * GRID_COLUMN_WIDTH, maximumX),
    y: Math.min(GRID_ORIGIN.y + row * GRID_ROW_HEIGHT, maximumY),
  };
}

export default function DesktopIcons({
  selectedIcon,
  onSelectIcon,
  onOpenIcon,
  onClearSelection,
}: DesktopIconsProps) {
  const desktopIconsRef = useRef<HTMLElement>(null);
  const suppressedClickRef = useRef<DesktopIconId | null>(null);

  const [iconPositions, setIconPositions] = useState(initialIconPositions);

  const [draggingIcon, setDraggingIcon] = useState<DesktopIconId | null>(null);

  /*
    Keep saved session positions recoverable when the browser is resized.
    Mobile uses its CSS grid instead of these coordinates.
  */
  useEffect(() => {
    function keepIconsInsideDesktop() {
      if (window.innerWidth <= DESKTOP_BREAKPOINT) {
        return;
      }

      const desktopElement = desktopIconsRef.current;

      if (!desktopElement) {
        return;
      }

      const desktopRectangle = desktopElement.getBoundingClientRect();

      setIconPositions((currentPositions) => {
        const nextPositions = { ...currentPositions };
        let positionsChanged = false;

        desktopElement
          .querySelectorAll<HTMLElement>("[data-desktop-icon-id]")
          .forEach((iconElement) => {
            const iconId = iconElement.dataset.desktopIconId as
              DesktopIconId | undefined;

            if (!iconId) {
              return;
            }

            const nextPosition = snapIconToGrid(
              currentPositions[iconId],
              desktopRectangle.width,
              desktopRectangle.height,
              iconElement.offsetWidth,
              iconElement.offsetHeight,
            );

            if (
              nextPosition.x !== currentPositions[iconId].x ||
              nextPosition.y !== currentPositions[iconId].y
            ) {
              nextPositions[iconId] = nextPosition;
              positionsChanged = true;
            }
          });

        return positionsChanged ? nextPositions : currentPositions;
      });
    }

    keepIconsInsideDesktop();
    window.addEventListener("resize", keepIconsInsideDesktop);

    return () => {
      window.removeEventListener("resize", keepIconsInsideDesktop);
    };
  }, []);

  function startDraggingIcon(
    event: ReactPointerEvent<HTMLButtonElement>,
    iconId: DesktopIconId,
  ) {
    if (event.button !== 0 || window.innerWidth <= DESKTOP_BREAKPOINT) {
      return;
    }

    const desktopElement = desktopIconsRef.current;

    if (!desktopElement) {
      return;
    }

    const desktopDragArea = desktopElement;

    onSelectIcon(iconId);

    const pointerId = event.pointerId;
    const startingPointerX = event.clientX;
    const startingPointerY = event.clientY;
    const startingPosition = iconPositions[iconId];
    const iconElement = event.currentTarget;
    const iconWidth = iconElement.offsetWidth;
    const iconHeight = iconElement.offsetHeight;
    let latestPosition = startingPosition;
    let dragStarted = false;
    let previousUserSelect = "";

    function handlePointerMove(moveEvent: PointerEvent) {
      if (moveEvent.pointerId !== pointerId) {
        return;
      }

      const movementX = moveEvent.clientX - startingPointerX;
      const movementY = moveEvent.clientY - startingPointerY;

      if (!dragStarted && Math.hypot(movementX, movementY) <= DRAG_THRESHOLD) {
        return;
      }

      if (!dragStarted) {
        dragStarted = true;
        previousUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = "none";
        setDraggingIcon(iconId);
      }

      moveEvent.preventDefault();

      const desktopRectangle = desktopDragArea.getBoundingClientRect();

      const maximumX = Math.max(0, desktopRectangle.width - iconWidth);

      const maximumY = Math.max(0, desktopRectangle.height - iconHeight);

      latestPosition = {
        x: clamp(startingPosition.x + movementX, 0, maximumX),
        y: clamp(startingPosition.y + movementY, 0, maximumY),
      };

      setIconPositions((currentPositions) => ({
        ...currentPositions,
        [iconId]: latestPosition,
      }));
    }

    function stopDragging(stopEvent: PointerEvent) {
      if (stopEvent.pointerId !== pointerId) {
        return;
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);

      if (!dragStarted) {
        return;
      }

      document.body.style.userSelect = previousUserSelect;
      setDraggingIcon(null);

      const desktopRectangle = desktopDragArea.getBoundingClientRect();

      const snappedPosition = snapIconToGrid(
        latestPosition,
        desktopRectangle.width,
        desktopRectangle.height,
        iconWidth,
        iconHeight,
      );

      setIconPositions((currentPositions) => ({
        ...currentPositions,
        [iconId]: snappedPosition,
      }));

      /*
        The browser emits click after pointerup. Ignore only that click so
        releasing a real drag can never open or re-trigger the icon.
      */
      suppressedClickRef.current = iconId;
      window.setTimeout(() => {
        if (suppressedClickRef.current === iconId) {
          suppressedClickRef.current = null;
        }
      }, 0);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
  }

  return (
    <section
      ref={desktopIconsRef}
      className="desktop-icons"
      aria-label="Portfolio sections"
    >
      {desktopIcons.map((item) => {
        const position = iconPositions[item.id];

        return (
          <button
            className={`desktop-icon ${
              selectedIcon === item.id ? "desktop-icon-selected" : ""
            } ${draggingIcon === item.id ? "desktop-icon-dragging" : ""}`}
            style={
              {
                "--desktop-icon-x": `${position.x}px`,
                "--desktop-icon-y": `${position.y}px`,
              } as CSSProperties
            }
            type="button"
            key={item.id}
            data-desktop-icon-id={item.id}
            aria-label={`${item.title}. Double-click or press Enter to open.`}
            aria-pressed={selectedIcon === item.id}
            onPointerDown={(event) => startDraggingIcon(event, item.id)}
            onClick={() => {
              if (suppressedClickRef.current === item.id) {
                return;
              }

              onSelectIcon(item.id);
            }}
            onDoubleClick={() => {
              if (suppressedClickRef.current === item.id) {
                return;
              }

              onSelectIcon(item.id);
              onOpenIcon(item.id);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onOpenIcon(item.id);
              }

              if (event.key === "Escape") {
                onClearSelection();
              }
            }}
          >
            <span className="desktop-icon-image" aria-hidden="true">
              {item.icon}
            </span>

            <span className="desktop-icon-title">{item.title}</span>
          </button>
        );
      })}
    </section>
  );
}
