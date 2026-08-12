import { useMemo, useState } from "react";
import { ChromeContext } from "./chromeStore";

/**
 * Provides shared chrome state to the navigation, floating action and enquiry
 * dialog.
 *
 * The context object itself lives in `chromeStore.js` so this file exports only
 * components, which is what fast refresh needs to swap a module without
 * remounting the tree.
 */
export function ChromeProvider({ children }) {
  const [immersive, setImmersive] = useState(false);
  /** True while a page renders its own sticky enquiry bar. */
  const [sticky, setSticky] = useState(false);
  /** `enquiry` holds the context string for the modal, or null when closed. */
  const [enquiry, setEnquiry] = useState(null);

  const value = useMemo(
    () => ({
      immersive,
      setImmersive,
      sticky,
      setSticky,
      enquiry,
      openEnquiry: (context = "") => setEnquiry({ context }),
      closeEnquiry: () => setEnquiry(null),
    }),
    [immersive, sticky, enquiry],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export default ChromeProvider;
