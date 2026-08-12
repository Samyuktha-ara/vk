import { createContext } from "react";

/**
 * Shared chrome state: whether the current page opens with a dark full-bleed
 * hero, whether it renders its own sticky enquiry bar, and the global enquiry
 * dialog.
 *
 * Lives in a plain module (no components) so the provider file can export only
 * components and stay compatible with fast refresh. Named `chromeStore` rather
 * than `chromeContext` because a filename differing from `ChromeContext.jsx`
 * only by case is ambiguous on case-insensitive filesystems.
 */
export const ChromeContext = createContext({
  immersive: false,
  setImmersive: () => {},
  sticky: false,
  setSticky: () => {},
  enquiry: null,
  openEnquiry: () => {},
  closeEnquiry: () => {},
});

export default ChromeContext;
