"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, RotateCw, X } from "lucide-react";

const W = 300;
const H = 120;
const P = 44;
const TOLERANCE = 6;
const IMAGE = "/videos/clinic-reception.jpg";

// Slide-the-piece puzzle. Opens from a compact "Verify you're human" row,
// verifies itself the moment the piece lands in the gap, and reports the
// signed answer through onSolved for the server to check.
export default function SlidePuzzle({ onSolved }) {
  const [open, setOpen] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [x, setX] = useState(0);
  const [state, setState] = useState("idle"); // idle | dragging | fail | ok
  const drag = useRef(null);

  const load = useCallback(async () => {
    setX(0);
    setState("idle");
    setChallenge(null);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      setChallenge(await res.json());
    } catch {
      setState("fail");
    }
  }, []);

  useEffect(() => {
    if (open && !challenge && state !== "ok") load();
  }, [open, challenge, state, load]);

  // Reset when the surrounding form is reset after a successful submit.
  const root = useRef(null);
  useEffect(() => {
    const form = root.current?.closest("form");
    if (!form) return;
    const onReset = () => {
      setState("idle");
      setChallenge(null);
      setX(0);
      onSolved(null);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [onSolved]);

  const onDown = (e) => {
    if (!challenge || state === "ok") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX - x, t: performance.now(), moves: 0 };
    setState("dragging");
  };

  const onMove = (e) => {
    if (!drag.current) return;
    drag.current.moves += 1;
    setX(Math.max(0, Math.min(W - P, e.clientX - drag.current.startX)));
  };

  const onUp = () => {
    if (!drag.current) return;
    const { t, moves } = drag.current;
    drag.current = null;
    if (Math.abs(x - challenge.x) <= TOLERANCE) {
      setState("ok");
      onSolved({ token: challenge.token, x: Math.round(x), moves, ms: Math.round(performance.now() - t) });
      setTimeout(() => setOpen(false), 900);
    } else {
      setState("fail");
      setTimeout(load, 700);
    }
  };

  const verified = state === "ok";

  return (
    <div className="puzzle" ref={root}>
      <button
        type="button"
        className={`puzzle__trigger${verified ? " is-ok" : ""}`}
        onClick={() => !verified && setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="puzzle__check" aria-hidden="true">
          {verified && <Check size={14} strokeWidth={3} />}
        </span>
        {verified ? "Verified — you’re human" : "Verify you’re human"}
        <span className="puzzle__badge">Spam protected</span>
      </button>

      {open && (
        <div className="puzzle__panel" role="dialog" aria-label="Slide puzzle verification">
          <div className="puzzle__head">
            <strong>Slide the piece into the gap</strong>
            <span>
              <button type="button" onClick={load} aria-label="New puzzle">
                <RotateCw size={14} />
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={14} />
              </button>
            </span>
          </div>

          <div className={`puzzle__image is-${state}`} style={{ width: W, height: H, backgroundImage: `url(${IMAGE})` }}>
            {challenge && (
              <>
                <span className="puzzle__gap" style={{ left: challenge.x, top: challenge.y, width: P, height: P }} />
                <span
                  className="puzzle__piece"
                  style={{
                    left: x,
                    top: challenge.y,
                    width: P,
                    height: P,
                    backgroundImage: `url(${IMAGE})`,
                    backgroundSize: `${W}px ${H}px`,
                    backgroundPosition: `-${challenge.x}px -${challenge.y}px`,
                  }}
                />
              </>
            )}
            {state === "ok" && (
              <span className="puzzle__result is-ok">
                <Check size={18} /> Verified
              </span>
            )}
            {state === "fail" && <span className="puzzle__result is-fail">Not quite — try again</span>}
          </div>

          <div className="puzzle__track" style={{ width: W }}>
            <span className="puzzle__fill" style={{ width: x + P }} />
            <span className="puzzle__hint">Drag to complete the puzzle</span>
            <button
              type="button"
              className="puzzle__handle"
              style={{ left: x }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              aria-label="Drag slider to complete the puzzle"
              disabled={!challenge || verified}
            >
              {verified ? <Check size={18} /> : <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
