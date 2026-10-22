"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

const sizes = ["Solo physician", "2–5 providers", "6–20 providers", "21+ providers", "Healthcare organization"];

function validate(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "Please enter your name.";
  if (!data.organization?.trim()) errors.organization = "Please enter your practice or organization.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) errors.email = "Please enter a valid email address.";
  return errors;
}

export default function ConsultForm() {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.services = fd.getAll("services");

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const fieldProps = (name) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const err = (name) =>
    errors[name] && (
      <p className="field__error" id={`${name}-error`}>
        {errors[name]}
      </p>
    );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field">
          <label htmlFor="name">
            Full name <span className="req">*</span>
          </label>
          <input type="text" autoComplete="name" {...fieldProps("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="title">Role / title</label>
          <input type="text" autoComplete="organization-title" {...fieldProps("title")} />
        </div>
        <div className="field">
          <label htmlFor="organization">
            Practice / organization <span className="req">*</span>
          </label>
          <input type="text" autoComplete="organization" {...fieldProps("organization")} />
          {err("organization")}
        </div>
        <div className="field">
          <label htmlFor="size">Practice size</label>
          <select defaultValue="" {...fieldProps("size")}>
            <option value="" disabled>
              Select…
            </option>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="email">
            Work email <span className="req">*</span>
          </label>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
        </div>
        <div className="field form__full">
          <label htmlFor="specialty">Specialty</label>
          <input type="text" placeholder="e.g. Internal Medicine" {...fieldProps("specialty")} />
        </div>
        <fieldset className="field form__full" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="legend">Services of interest</legend>
          <div className="checks">
            {services.map((s) => (
              <label className="check" key={s.slug}>
                <input type="checkbox" name="services" value={s.title} />
                {s.title}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field form__full">
          <label htmlFor="message">How can we help?</label>
          <textarea
            placeholder="Tell us about your practice, current billing setup and what you’d like to improve."
            {...fieldProps("message")}
          />
        </div>
      </div>

      <div className="form__footer">
        <p className="form__note">
          Please don’t include patient health information in this form. We’ll respond within one business day.
        </p>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request Consultation"} <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>

      <div aria-live="polite">
        {status === "sent" && (
          <p className="form__status">Thank you — your request has been received. Our team will be in touch shortly.</p>
        )}
        {status === "error" && (
          <p className="form__status form__status--error">
            Something went wrong sending your request. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
