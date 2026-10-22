"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import LazyVideo from "./LazyVideo";

// Audience card whose still image gives way to footage on hover or focus.
export default function VideoCard({ title, text, icon, image, video }) {
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);

  // Touch screens have no hover, so footage simply plays while in view.
  useEffect(() => setTouch(window.matchMedia("(hover: none)").matches), []);

  return (
    <div
      className={`card spotlight video-card${hover || touch ? " is-playing" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="media media--mono">
        <img src={image} alt="" loading="lazy" />
        {video && <LazyVideo {...video} className="video-card__video" active={hover || touch} />}
        <span className="video-card__hint" aria-hidden="true">
          Hover to play
        </span>
      </div>
      <div className="card__body">
        <span className="card__icon">
          <Icon name={icon} size={20} />
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
