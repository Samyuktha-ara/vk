import { useState } from "react";
import { srcSetFor } from "../data/media";
import styles from "./Media.module.css";

/**
 * Art-directed image frame.
 *
 * - reserves aspect ratio so nothing shifts while loading (CLS = 0)
 * - fades in from a deep navy plate rather than flashing white
 * - `priority` marks the LCP image: eager + high fetch priority, no lazy
 * - everything else is lazily decoded off the main thread
 */
export default function Media({
  image,
  ratio,
  sizes = "100vw",
  priority = false,
  className = "",
  imgClassName = "",
  caption,
  zoom = false,
  cover = true,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  if (!image) return null;

  const aspect = ratio ?? image.ratio ?? 3 / 2;

  const frame = (
    <div
      className={`${styles.frame} ${zoom ? styles.zoomFrame : ""} ${className}`}
      style={{ "--aspect": aspect }}
    >
      <img
        src={image.src}
        srcSet={srcSetFor(image)}
        sizes={sizes}
        alt={image.alt ?? ""}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`${styles.img} ${loaded ? styles.loaded : ""} ${
          cover ? styles.cover : styles.contain
        } ${imgClassName}`}
        draggable="false"
      />
      {children}
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className={styles.figure}>
      {frame}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
