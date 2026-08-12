import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Uses useSyncExternalStore rather than state + effect so there is no
 * cascading render on mount and no flash of the wrong branch.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  /* Nothing is rendered on a server today, but this keeps the hook honest. */
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
