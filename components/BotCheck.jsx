"use client";

import { useEffect, useRef } from "react";
import SlidePuzzle from "./SlidePuzzle";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Free human check before submitting. Uses Cloudflare Turnstile when a site
// key is configured; otherwise a built-in slide puzzle. Either way the server
// also checks a hidden honeypot field and how fast the form was filled.
export default function BotCheck({ onToken, onPuzzle, error }) {
  const box = useRef(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let widget;
    const render = () => {
      if (!box.current || !window.turnstile) return;
      widget = window.turnstile.render(box.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (t) => onToken(t),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    if (window.turnstile) render();
    else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = render;
      document.head.appendChild(s);
    }
    return () => widget && window.turnstile?.remove(widget);
  }, [onToken]);

  return (
    <div className="bot-check">
      {SITE_KEY ? (
        <div ref={box} />
      ) : (
<SlidePuzzle onSolved={onPuzzle} />
      )}
      {/* Honeypot: hidden from people, often filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}
