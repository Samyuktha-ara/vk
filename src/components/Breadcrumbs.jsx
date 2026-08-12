import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

/** Visible breadcrumb trail. Pair with `breadcrumbSchema()` for JSON-LD. */
export default function Breadcrumbs({ trail = [], tone = "light" }) {
  if (trail.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${styles[tone]}`}>
      <ol className={styles.list}>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.to} className={styles.item}>
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.to}>{crumb.label}</Link>
                  <ChevronRight size={12} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
