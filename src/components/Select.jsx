import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Check } from "lucide-react";

import styles from "./Select.module.css";

/**
 * Custom listbox.
 *
 * A native <select> paints its options with the operating system's own
 * styling — system font, system highlight colour — which no stylesheet can
 * override. This replaces it with a fully styled panel while keeping the
 * behaviour a select is expected to have:
 *
 *   · ARIA listbox semantics with aria-activedescendant
 *   · Up/Down/Home/End to move, Enter/Space to choose, Esc to cancel
 *   · type-ahead — press "h" to jump to Houses
 *   · click-outside and Tab both dismiss
 *   · focus returns to the trigger on close
 *   · collapses to a plain, legible control under reduced motion
 */
export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  tone = "light",
  className = "",
}) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const typeahead = useRef({ term: "", timer: null });
  const reduced = useReducedMotion();

  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  );
  const selected = options[selectedIndex];

  /* Open with the current selection highlighted. */
  const openList = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const close = ({ refocus = true } = {}) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus({ preventScroll: true });
  };

  const commit = (index) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    close();
  };

  /* Dismiss on outside pointer or focus leaving the widget. */
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onFocusIn = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  /* Keep the active option in view when arrowing through a long list. */
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const runTypeahead = (key) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.term += key.toLowerCase();
    state.timer = window.setTimeout(() => {
      state.term = "";
    }, 600);

    const match = options.findIndex((option) =>
      option.label.toLowerCase().startsWith(state.term),
    );
    if (match >= 0) {
      setActiveIndex(match);
      if (!open) onChange(options[match].value);
    }
  };

  const onKeyDown = (event) => {
    const { key } = event;

    if (!open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        event.preventDefault();
        openList();
        return;
      }
      if (key.length === 1 && /\S/.test(key)) {
        event.preventDefault();
        runTypeahead(key);
      }
      return;
    }

    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) {
          event.preventDefault();
          runTypeahead(key);
        }
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.field} ${styles[tone]} ${className}`}
    >
      <span className={styles.label} id={`${uid}-label`}>
        {label}
      </span>

      <div className={styles.control}>
        <button
          ref={triggerRef}
          type="button"
          id={`${uid}-trigger`}
          className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${uid}-label ${uid}-trigger`}
          onClick={() => (open ? close({ refocus: false }) : openList())}
          onKeyDown={onKeyDown}
        >
          <span className={styles.value}>{selected?.label ?? placeholder}</span>
          <span
            className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={`${uid}-label`}
              aria-activedescendant={`${uid}-option-${activeIndex}`}
              className={styles.list}
              onKeyDown={onKeyDown}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={option.value}
                    id={`${uid}-option-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isSelected}
                    className={[
                      styles.option,
                      isActive ? styles.optionActive : "",
                      isSelected ? styles.optionSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => commit(index)}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check size={13} aria-hidden="true" className={styles.tick} />
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
