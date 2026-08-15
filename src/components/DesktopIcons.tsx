"use client";

export type DesktopIconId =
  | "about"
  | "projects"
  | "resume"
  | "contact";

type DesktopIconsProps = {
  selectedIcon: DesktopIconId | null;
  onSelectIcon: (iconId: DesktopIconId) => void;
  onOpenIcon: (iconId: DesktopIconId) => void;
  onClearSelection: () => void;
};

const desktopIcons: {
  id: DesktopIconId;
  icon: string;
  title: string;
}[] = [
  {
    id: "about",
    icon: "👤",
    title: "About Me",
  },
  {
    id: "projects",
    icon: "📁",
    title: "My Projects",
  },
  {
    id: "resume",
    icon: "📄",
    title: "Resume",
  },
  {
    id: "contact",
    icon: "✉️",
    title: "Contact Me",
  },
];

export default function DesktopIcons({
  selectedIcon,
  onSelectIcon,
  onOpenIcon,
  onClearSelection,
}: DesktopIconsProps) {
  return (
    <section
      className="desktop-icons"
      aria-label="Portfolio sections"
    >
      {desktopIcons.map((item) => (
        <button
          className={`desktop-icon ${
            selectedIcon === item.id
              ? "desktop-icon-selected"
              : ""
          }`}
          type="button"
          key={item.id}
          aria-label={`${item.title}. Double-click to open.`}
          aria-pressed={selectedIcon === item.id}
          onClick={() => onSelectIcon(item.id)}
          onDoubleClick={() => {
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
          <span
            className="desktop-icon-image"
            aria-hidden="true"
          >
            {item.icon}
          </span>

          <span className="desktop-icon-title">
            {item.title}
          </span>
        </button>
      ))}
    </section>
  );
}