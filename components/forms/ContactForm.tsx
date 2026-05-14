"use client";

import { useState } from "react";
import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
      setStatus("submitting");
      setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Please check the form and try again.");
      }

      setStatus("success");
      setMessage(payload.message || "Thanks. We received your message.");
      trackEvent(siteConfig.events.submitContactForm);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call the facility for help.",
      );
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Name <span className="text-brand-600">*</span>
          <Input name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Phone <span className="text-brand-600">*</span>
          <Input name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email <span className="text-brand-600">*</span>
        <Input
          name="email"
          type="text"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          autoCapitalize="none"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Preferred unit size
        <Input name="preferredUnitSize" placeholder="Optional, such as 10x10" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Message <span className="text-brand-600">*</span>
        <Textarea name="message" required />
      </label>
      {message ? (
        <div
          className={
            status === "success"
              ? "flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900"
              : "flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-900"
          }
          role="status"
          aria-live={status === "success" ? "polite" : "assertive"}
        >
          {status === "success" ? (
            <CheckCircle className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
          ) : (
            <WarningCircle className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
          )}
          <p>{message}</p>
        </div>
      ) : null}
      <Button className="w-full sm:w-fit" disabled={status === "submitting"}>
        <PaperPlaneTilt className="h-4 w-4" aria-hidden="true" />
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
