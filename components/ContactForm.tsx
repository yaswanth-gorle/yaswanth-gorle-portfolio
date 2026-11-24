"use client";

import { FormEvent, useState } from "react";

type Fields = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Fields, string>>;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(v: Record<Fields, string>): Errors {
  const e: Errors = {};
  if (v.name.length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email)) e.email = "Please enter a valid email address.";
  if (v.subject.length < 3) e.subject = "Please add a subject.";
  if (v.message.length < 10) e.message = "Your message should be at least 10 characters.";
  return e;
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "bad"; text: string } | null>(null);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "");
    const values = {
      name: get("name").trim(),
      email: get("email").trim(),
      subject: get("subject").trim(),
      message: get("message").trim(),
    };

    setNotice(null);
    const local = validate(values);
    setErrors(local);
    const first = Object.keys(local)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: get("website") }),
      });
      const body = await res.json();
      if (body.ok) {
        form.reset();
        setNotice({ kind: "ok", text: body.message });
      } else {
        if (body.errors) setErrors(body.errors);
        setNotice({ kind: "bad", text: body.message || "Please check the highlighted fields." });
      }
    } catch {
      setNotice({ kind: "bad", text: "Network error. Please try again, or email me directly." });
    } finally {
      setSending(false);
    }
  }

  const field = (name: Fields, label: string, el: "input" | "textarea", extra: Record<string, unknown> = {}) => (
    <div className={"field" + (errors[name] ? " invalid" : "")}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {el === "input" ? (
        <input id={`f-${name}`} name={name} required {...extra} />
      ) : (
        <textarea id={`f-${name}`} name={name} rows={5} required maxLength={3000} />
      )}
      <small className="err">{errors[name]}</small>
    </div>
  );

  return (
    <form className="card form reveal" onSubmit={onSubmit} noValidate>
      {field("name", "Name", "input", { type: "text", autoComplete: "name", maxLength: 80 })}
      {field("email", "Email", "input", { type: "email", autoComplete: "email", maxLength: 120 })}
      {field("subject", "Subject", "input", { type: "text", maxLength: 120 })}
      {field("message", "Message", "textarea")}
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className={"notice" + (notice ? " " + notice.kind : "")} role="status" aria-live="polite">
        {notice?.text}
      </p>
    </form>
  );
}
