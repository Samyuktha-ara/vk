import { motion, useReducedMotion } from "framer-motion";
import { EASE, staggerItemVariants } from "../utils/motion";

/* ==========================================================================
   MOTION PRIMITIVES
   Cinematic but restrained. Every primitive collapses to an instant, static
   render when the visitor prefers reduced motion.
   ========================================================================== */

/** Fade + rise. The workhorse reveal. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.85,
  once = true,
  amount = 0.25,
  as = "div",
  className,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Parent for staggered children. Pair with <StaggerItem />. */
export function Stagger({
  children,
  delay = 0,
  step = 0.09,
  once = true,
  amount = 0.25,
  as = "div",
  className,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "shown"}
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, as = "div", className, ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component className={className} variants={staggerItemVariants} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Editorial headline reveal — each line rises from behind a mask.
 * Pass an array of strings, one per visual line.
 */
export function LineReveal({
  lines = [],
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  once = true,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className={lineClassName} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        /* The mask carries whileInView, not the text. The text is translated
           108% down, so observing it would test a box that has been pushed
           out of the viewport — the trigger would never fire and the heading
           would stay permanently hidden. The mask never moves. */
        <motion.span
          key={line}
          style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
          initial="hidden"
          whileInView="shown"
          viewport={{ once, amount: 0.2 }}
        >
          <motion.span
            className={lineClassName}
            style={{ display: "block", willChange: "transform" }}
            variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
            transition={{
              duration: 1.05,
              delay: delay + index * 0.1,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/** A gold hairline that draws itself in. */
export function GoldRule({ delay = 0, className, vertical = false }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        background: "var(--gold-600)",
        transformOrigin: vertical ? "top" : "left",
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 1,
      }}
      initial={reduced ? false : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={reduced ? undefined : { scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}
