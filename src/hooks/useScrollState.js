import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a threshold, and which way it is
 * moving. Reads are batched into rAF so the navigation never causes jank.
 */
export function useScrollState(threshold = 24) {
  const [state, setState] = useState({ scrolled: false, direction: "up" });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const direction = y > lastY && y > threshold * 4 ? "down" : "up";
      const scrolled = y > threshold;

      setState((prev) =>
        prev.scrolled === scrolled && prev.direction === direction
          ? prev
          : { scrolled, direction },
      );

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}

export default useScrollState;
