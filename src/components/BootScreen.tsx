"use client";

import { useEffect, useRef, useState } from "react";

type BootScreenProps = {
  onStart: () => void;
  onFinish: () => void;
};

type BootPhase = "checking" | "waiting" | "starting" | "finished";

const BOOT_SESSION_KEY = "xpBootPlayed";
const STARTUP_AUDIO_PATH = "/audio/startup.mp3";
const BOOT_DURATION = 1900;
const REDUCED_MOTION_BOOT_DURATION = 150;

export default function BootScreen({ onStart, onFinish }: BootScreenProps) {
  const [phase, setPhase] = useState<BootPhase>("checking");
  const [audioAvailable, setAudioAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const completionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let componentIsActive = true;
    let skipBoot = false;

    try {
      if (sessionStorage.getItem(BOOT_SESSION_KEY) === "true") {
        skipBoot = true;
      }
    } catch {
      /*
        Some privacy modes disable sessionStorage. The welcome experience
        still works; it will simply be eligible to play again after reload.
      */
    }

    const initializationTimer = window.setTimeout(() => {
      if (!componentIsActive) {
        return;
      }

      if (skipBoot) {
        setPhase("finished");
        onFinish();
        return;
      }

      setPhase("waiting");
    }, 0);

    /*
      Check before mounting the audio element so a missing optional file does
      not create a failed media request or a console error.
    */
    if (!skipBoot) {
      void fetch(STARTUP_AUDIO_PATH, {
        method: "HEAD",
        cache: "no-store",
      })
        .then((response) => {
          if (componentIsActive && response.ok) {
            setAudioAvailable(true);
          }
        })
        .catch(() => {
          /* Missing or unavailable audio must never block the boot flow. */
        });
    }

    return () => {
      componentIsActive = false;
      window.clearTimeout(initializationTimer);

      if (completionTimerRef.current !== null) {
        window.clearTimeout(completionTimerRef.current);
      }
    };
  }, [onFinish]);

  function startBootSequence() {
    if (phase !== "waiting") {
      return;
    }

    setPhase("starting");
    onStart();

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.currentTime = 0;

      try {
        void audioElement.play().catch(() => {
          /* Autoplay policy or decoding failures do not block entry. */
        });
      } catch {
        /* Synchronous media failures are also non-blocking. */
      }
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const bootDuration = prefersReducedMotion
      ? REDUCED_MOTION_BOOT_DURATION
      : BOOT_DURATION;

    completionTimerRef.current = window.setTimeout(() => {
      try {
        sessionStorage.setItem(BOOT_SESSION_KEY, "true");
      } catch {
        /* The desktop still opens when storage is unavailable. */
      }

      setPhase("finished");
      onFinish();
    }, bootDuration);
  }

  return (
    <>
      {audioAvailable && (
        <audio ref={audioRef} src={STARTUP_AUDIO_PATH} preload="auto" hidden />
      )}

      {phase === "checking" && (
        <div className="boot-screen boot-screen-checking" aria-hidden="true" />
      )}

      {(phase === "waiting" || phase === "starting") && (
        <button
          className={`boot-screen ${
            phase === "starting" ? "boot-screen-starting" : ""
          }`}
          type="button"
          aria-label="Windows XP-inspired welcome. Click, tap, or press Enter or Space to continue."
          aria-disabled={phase === "starting"}
          autoFocus={phase === "waiting"}
          onClick={startBootSequence}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              startBootSequence();
            }
          }}
        >
          <span className="boot-screen-center">
            <span className="boot-screen-welcome">Welcome</span>

            <span className="boot-screen-instruction" aria-live="polite">
              {phase === "waiting"
                ? "Click anywhere to continue"
                : "Starting your portfolio..."}
            </span>
          </span>
        </button>
      )}
    </>
  );
}
