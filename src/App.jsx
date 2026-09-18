import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "./hooks/useReducedMotion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import WhatsAppFab from "./components/WhatsAppFab";
import InquiryModal from "./components/InquiryModal";
import { JsonLd } from "./components/Seo";
import { ChromeProvider } from "./context/ChromeProvider.jsx";
import { organizationSchema, websiteSchema } from "./utils/seo";

import Home from "./pages/Home";
import "./styles/global.css";

/* The site is one page. Only the legal routes and the 404 are split out, and
   they are lazy because almost nobody loads them. */
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Browser entry — the shell inside a history-backed router. */
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

/**
 * Everything below the router. Exported separately so the prerender step can
 * wrap it in a StaticRouter (see src/entry-server.jsx).
 */
export function AppShell() {
  return (
    <>
      <ChromeProvider>
        <Preloader />
        <ScrollToTop />

        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {/* Site-wide structured data */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />

        <Navbar />

        <main id="main">
          <AnimatedRoutes />
        </main>

        <Footer />
        <WhatsAppFab />
        <InquiryModal />
      </ChromeProvider>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

/** Holds the viewport height so a lazy route never collapses the layout. */
function RouteFallback() {
  return (
    <div
      style={{ minHeight: "70svh" }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    />
  );
}
