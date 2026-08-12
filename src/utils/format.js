/**
 * Indian currency formatting — lakh / crore conventions.
 * Returns null for missing values so callers can hide the element entirely
 * rather than printing a zero.
 */
export const formatINR = (amount, { prefix = "₹" } = {}) => {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null;

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `${prefix}${trim(cr, cr >= 10 ? 1 : 2)} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `${prefix}${trim(lakh, lakh >= 10 ? 1 : 2)} L`;
  }
  return `${prefix}${amount.toLocaleString("en-IN")}`;
};

/** Full precision, for detail pages and structured data. */
export const formatINRExact = (amount) =>
  typeof amount === "number" && Number.isFinite(amount)
    ? `₹${amount.toLocaleString("en-IN")}`
    : null;

const trim = (value, decimals) =>
  Number(value.toFixed(decimals)).toLocaleString("en-IN");

export const formatArea = (value, unit = "sq.ft") =>
  typeof value === "number" ? `${value.toLocaleString("en-IN")} ${unit}` : null;

export const formatRange = (min, max, unit = "sq.ft") => {
  if (typeof min !== "number") return null;
  if (typeof max !== "number" || max === min) return formatArea(min, unit);
  return `${min.toLocaleString("en-IN")} – ${max.toLocaleString("en-IN")} ${unit}`;
};

/** "01", "02" … editorial numbering. */
export const pad2 = (n) => String(n).padStart(2, "0");

export const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
