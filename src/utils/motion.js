/**
 * Shared motion constants.
 *
 * Kept out of component files so those can export components only, which is
 * what fast refresh needs to swap a module without remounting the tree.
 */

/** The house easing curve — a long, settled deceleration. */
export const EASE = [0.22, 1, 0.36, 1];

/** Standard fade-and-rise used by staggered children. */
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
