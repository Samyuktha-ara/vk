import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids is currently in view.
 *
 * Uses an IntersectionObserver rather than a scroll handler, and keeps the
 * last match when the viewport sits between two sections — otherwise the
 * navigation would flicker back to nothing in the gaps.
 *
 * `offset` should match the navigation height so a section counts as active
 * once it clears the bar, not once it touches the top of the window.
 */
export function useScrollSpy(ids, { offset = 120 } = {}) {
  /* Join to a primitive so a new array each render does not restart the
     observer on every commit. */
  const key = ids.join("|");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (!visible.size) return; // between sections — hold the last one
        const [topMost] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        setActiveId(topMost);
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key, offset]);

  return activeId;
}

export default useScrollSpy;
