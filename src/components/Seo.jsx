import { business } from "../data/business";
import { absoluteUrl } from "../utils/seo";

/**
 * Per-page metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree
 * into <head>, so no helmet library is required. Render exactly one <Seo />
 * per route.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  children,
}) {
  const brand = business.brand.name;
  const fullTitle = title?.includes(brand) ? title : `${title} | ${brand}`;
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? business.site.defaultOgImage);
  const ogSize = image ? null : business.site.defaultOgImageSize;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={brand} />
      <meta property="og:locale" content={business.site.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      {ogSize && <meta property="og:image:width" content={String(ogSize.width)} />}
      {ogSize && <meta property="og:image:height" content={String(ogSize.height)} />}
      <meta property="og:image:alt" content={fullTitle} />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {business.site.twitterHandle && (
        <meta name="twitter:site" content={business.site.twitterHandle} />
      )}

      {/* Local relevance */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Thanjavur" />
      <meta
        name="geo.position"
        content={`${business.address.geo.lat};${business.address.geo.lng}`}
      />

      {children}
    </>
  );
}

/** Renders a JSON-LD graph. Pass one object or an array; nulls are dropped. */
export function JsonLd({ schema }) {
  const payload = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);
  if (!payload.length) return null;

  return (
    <script
      type="application/ld+json"
      // Schema objects are built in-app from typed data, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload),
      }}
    />
  );
}
