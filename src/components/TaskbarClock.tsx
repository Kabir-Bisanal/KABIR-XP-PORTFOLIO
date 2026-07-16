"use client";

import { useEffect, useState } from "react";

export default function TaskbarClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    function updateClock() {
      setCurrentTime(new Date());
    }

    updateClock();

    const clockInterval = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(clockInterval);
    };
  }, []);

  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "--:--";

  const formattedDate = currentTime
    ? currentTime.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "--/--/----";

  const fullDate = currentTime
    ? currentTime.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Loading date";

  return (
    <div className="system-tray taskbar-clock" title={fullDate}>
      <span className="tray-volume" aria-hidden="true">
        🔊
      </span>

      <div className="taskbar-clock-information">
        <time dateTime={currentTime?.toISOString()}>{formattedTime}</time>

        <span className="taskbar-clock-date">{formattedDate}</span>
      </div>
    </div>
  );
}
