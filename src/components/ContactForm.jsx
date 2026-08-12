import { useId, useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, CircleAlert } from "lucide-react";

import Button from "./Button";
import Select from "./Select";
import { business, mailHref } from "../data/business";
import { projects } from "../data/projects";
import { budgetBands } from "../data/properties";
import { whatsappLink } from "../utils/whatsapp";
import styles from "./ContactForm.module.css";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  budget: "",
  message: "",
  /* Honeypot — bots fill it, humans never see it. */
  company: "",
};

/**
 * Enquiry form.
 *
 * Six fields, because a seventh costs conversions. Validation runs on blur and
 * on submit, errors are announced, and every field is properly labelled.
 *
 * With no `formEndpoint` configured the validated enquiry is handed to
 * WhatsApp rather than posted into a void — see data/business.js.
 */
export default function ContactForm({ context = "", compact = false, onSuccess }) {
  const uid = useId();
  const [values, setValues] = useState({ ...EMPTY, interest: context });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const setValue = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setField = (key) => (event) => setValue(key, event.target.value);

  const validateField = (key, value) => {
    switch (key) {
      case "name":
        if (!value.trim()) return "Please tell us your name.";
        if (value.trim().length < 2) return "That looks a little short.";
        return undefined;
      case "phone": {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "A phone number lets us call you back.";
        if (digits.length < 10) return "Please enter a complete phone number.";
        return undefined;
      }
      case "email":
        if (!value.trim()) return undefined; // optional
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
          return "Please check the email address.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (key) => (event) => {
    const error = validateField(key, event.target.value);
    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const composeMessage = () => {
    const lines = [
      `Enquiry from ${values.name}`,
      values.interest && `Interested in: ${values.interest}`,
      values.budget && `Budget: ${values.budget}`,
      `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.message && `\n${values.message}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Silently succeed for bots so they do not retry. */
    if (values.company) {
      setStatus("done");
      return;
    }

    const nextErrors = {};
    ["name", "phone", "email"].forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) nextErrors[key] = error;
    });

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    setStatus("sending");

    const endpoint = business.contact.formEndpoint;

    if (!endpoint) {
      /* No backend wired yet — hand the enquiry to WhatsApp so it reaches a
         human rather than disappearing. */
      window.open(
        `https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
          composeMessage(),
        )}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatus("done");
      onSuccess?.(values);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "website", context }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("done");
      onSuccess?.(values);
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        className={styles.success}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        role="status"
      >
        <span className={styles.successMark} aria-hidden="true">
          <Check size={20} />
        </span>
        <h3 className={styles.successTitle}>Thank you — we have your details.</h3>
        <p className={styles.successBody}>
          An advisor will be in touch within one working day. If it is urgent,
          call us directly on{" "}
          <a href={`tel:${business.contact.phoneHref}`}>
            {business.contact.phoneDisplay}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      className={`${styles.form} ${compact ? styles.compact : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.grid}>
        <Field
          id={`${uid}-name`}
          label="Name"
          required
          value={values.name}
          onChange={setField("name")}
          onBlur={handleBlur("name")}
          error={errors.name}
          autoComplete="name"
        />

        <Field
          id={`${uid}-phone`}
          label="Phone"
          type="tel"
          required
          inputMode="tel"
          value={values.phone}
          onChange={setField("phone")}
          onBlur={handleBlur("phone")}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+91"
        />

        <Field
          id={`${uid}-email`}
          label="Email"
          type="email"
          value={values.email}
          onChange={setField("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          autoComplete="email"
          hint="Optional"
        />

        <Select
          label="Project of interest"
          value={values.interest}
          onChange={(next) => setValue("interest", next)}
          options={[
            { value: "", label: "Not sure yet" },
            ...projects.map((project) => ({
              value: project.name,
              label: `${project.name} — ${project.type}`,
            })),
            { value: "Something else", label: "Something else" },
          ]}
        />

        <Select
          label="Budget"
          value={values.budget}
          onChange={(next) => setValue("budget", next)}
          options={[
            { value: "", label: "Prefer not to say" },
            ...budgetBands
              .filter((band) => band.id !== "any")
              .map((band) => ({ value: band.label, label: band.label })),
          ]}
        />

        <p className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor={`${uid}-message`} className={styles.label}>
            Message <span className={styles.hint}>Optional</span>
          </label>
          <textarea
            id={`${uid}-message`}
            className={styles.textarea}
            rows={compact ? 3 : 4}
            value={values.message}
            onChange={setField("message")}
            placeholder="What are you looking for, and by when?"
          />
        </p>
      </div>

      {/* Honeypot */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={setField("company")}
        />
      </div>

      {status === "error" && (
        <p className={styles.formError} role="alert">
          <CircleAlert size={15} aria-hidden="true" />
          Something went wrong sending that. Please{" "}
          <a href={whatsappLink(context)} target="_blank" rel="noopener noreferrer">
            message us on WhatsApp
          </a>{" "}
          or email <a href={mailHref}>{business.contact.email}</a>.
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" variant="solid" size="lg" arrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request a Consultation"}
        </Button>

        <a
          href={whatsappLink(context)}
          className={styles.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={15} aria-hidden="true" />
          Or message on WhatsApp
        </a>
      </div>

      <p className={styles.consent}>
        By sending this you agree that we may contact you about your enquiry.
        We do not sell or share your details. See our{" "}
        <a href="/privacy-policy">privacy policy</a>.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function Field({ id, label, error, hint, required, ...rest }) {
  const errorId = `${id}-error`;
  return (
    <p className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : hint ? (
          <span className={styles.hint}>{hint}</span>
        ) : null}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
        {...rest}
      />
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </p>
  );
}
