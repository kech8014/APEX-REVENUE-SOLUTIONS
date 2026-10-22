"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { contact, services, specialties } from "@/lib/data";

const sizes = ["Solo physician", "2–5 providers", "6–20 providers", "21+ providers", "Healthcare organization"];
const serviceOptions = ["Full revenue cycle management", ...services.map((s) => s.title), "Not sure yet"];

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
    data.services = fd.getAll("services").filter(Boolean);

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

  const select = (name, placeholder, options) => (
    <select defaultValue="" {...fieldProps(name)}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <form className="form form--compact" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="field">
          <label htmlFor="name">
            Full name <span className="req">*</span>
          </label>
          <input type="text" autoComplete="name" placeholder="Jane Smith" {...fieldProps("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="email">
            Work email <span className="req">*</span>
          </label>
          <input type="email" autoComplete="email" placeholder="jane@practice.com" {...fieldProps("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="organization">
            Practice / organization <span className="req">*</span>
          </label>
          <input type="text" autoComplete="organization" placeholder="Practice name" {...fieldProps("organization")} />
          {err("organization")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input type="tel" autoComplete="tel" placeholder="(555) 555-5555" {...fieldProps("phone")} />
        </div>
        <div className="field">
          <label htmlFor="size">Practice size</label>
          {select("size", "Select size", sizes)}
        </div>
        <div className="field">
          <label htmlFor="specialty">Specialty</label>
          {select("specialty", "Select specialty", [...specialties, "Other"])}
        </div>
        <div className="field form__full">
          <label htmlFor="services">Service of interest</label>
          {select("services", "What can we help with?", serviceOptions)}
        </div>
        <div className="field form__full">
          <label htmlFor="message">Message</label>
          <textarea
            rows={3}
            placeholder="Tell us about your practice and what you’d like to improve."
            {...fieldProps("message")}
          />
        </div>
      </div>

      <div className="form__footer">
        <p className="form__note">No patient health information, please. We reply within one business day.</p>
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
            Something went wrong sending your request. Please try again, email us at{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> or call {contact.phone}.
          </p>
        )}
      </div>
    </form>
  );
}
