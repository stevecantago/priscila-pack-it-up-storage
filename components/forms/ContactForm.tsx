"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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
          Name
          <Input name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Phone
          <Input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Email
        <Input name="email" type="email" autoComplete="email" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Preferred unit size
        <Input name="preferredUnitSize" placeholder="Optional, such as 10x10" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Message
        <Textarea name="message" required />
      </label>
      {message ? (
        <p
          className={
            status === "success"
              ? "rounded-md bg-brand-50 p-3 text-sm font-semibold text-brand-700"
              : "rounded-md bg-brand-50 p-3 text-sm font-semibold text-brand-800"
          }
          role="status"
        >
          {message}
        </p>
      ) : null}
      <Button className="w-full sm:w-fit" disabled={status === "submitting"}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
