"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

// Muted looping video that only downloads once near the viewport, plays while
// visible and pauses off-screen. `active` lets a parent pause it (e.g. tabs or
// hover cards); `controls` adds an accessible play/pause toggle.
export default function LazyVideo({ src, poster, className = "", active = true, controls = false, label, ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setUserPaused(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldPlay = loaded && inView && active && !userPaused;

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (shouldPlay) el.play().catch(() => {});
    else el.pause();
  }, [shouldPlay, loaded]);

  return (
    <>
      <video
        ref={ref}
        className={className}
        poster={poster}
        src={loaded ? src : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={label ? undefined : "true"}
        aria-label={label}
        {...rest}
      />
      {controls && (
        <button
          type="button"
          className="video-toggle"
          onClick={() => setUserPaused((v) => !v)}
          aria-label={userPaused ? "Play background video" : "Pause background video"}
        >
          {userPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{userPaused ? "Play" : "Pause"}</span>
        </button>
      )}
    </>
  );
}
