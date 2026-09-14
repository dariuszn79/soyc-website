"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/**
 * Renders a form managed by the form-builder plugin (Members & Forms → Forms)
 * and posts submissions to the plugin's /api/form-submissions endpoint.
 * Used by the `formEmbed` page block.
 */

type Option = { label: string; value: string };

export type EmbedFormField = {
  id?: string;
  blockType?: string;
  name?: string;
  label?: string;
  required?: boolean | null;
  width?: number | null;
  defaultValue?: string | number | boolean | null;
  placeholder?: string | null;
  options?: Option[] | null;
  message?: unknown;
};

export type EmbedForm = {
  id: number | string;
  title?: string | null;
  fields?: EmbedFormField[] | null;
  submitButtonLabel?: string | null;
  confirmationType?: "message" | "redirect" | null;
  confirmationMessage?: unknown;
  redirect?: { url?: string | null } | null;
};

const inputClass =
  "h-14 w-full border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-2 font-gill text-body leading-body text-brand-ink placeholder:text-[#afafaf] transition-colors focus:border-brand-secondary-100 focus:outline-none focus:ring-1 focus:ring-brand-secondary-100";

const inputTypeFor = (blockType?: string) =>
  blockType === "email" || blockType === "number" || blockType === "date"
    ? blockType
    : "text";

/** Extract plain text from a Lexical rich-text JSON payload. */
function richTextToPlainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: string; children?: unknown[]; root?: unknown };
  if (typeof n.text === "string") return n.text;
  if (n.root) return richTextToPlainText(n.root);
  if (Array.isArray(n.children))
    return n.children.map(richTextToPlainText).filter(Boolean).join("\n");
  return "";
}

export function FormEmbed({ form, heading }: { form: EmbedForm; heading?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [files, setFiles] = useState<Record<string, FileList | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const fields = (form.fields ?? []).filter(Boolean);
  const dataFields = fields.filter(
    (f) => f.name && f.blockType !== "message" && f.blockType !== "upload",
  );
  const uploadFields = fields.filter((f) => f.name && f.blockType === "upload");

  const updateText =
    (name: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((current) => ({ ...current, [name]: event.target.value }));
    };

  const updateCheck = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setChecks((current) => ({ ...current, [name]: event.target.checked }));
  };

  const updateFile = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFiles((current) => ({ ...current, [name]: event.target.files }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const submissionData = dataFields.map((f) => ({
      field: f.name as string,
      value: String(
        f.blockType === "checkbox"
          ? Boolean(checks[f.name as string] ?? f.defaultValue)
          : values[f.name as string] ?? f.defaultValue ?? "",
      ),
    }));

    const hasFiles = uploadFields.some((f) => files[f.name as string]?.length);
    const payload = { form: form.id, submissionData };

    try {
      let res: Response;
      if (hasFiles) {
        const body = new FormData();
        body.append("_payload", JSON.stringify(payload));
        for (const f of uploadFields) {
          const list = files[f.name as string];
          if (list) Array.from(list).forEach((file) => body.append(f.name as string, file));
        }
        res = await fetch("/api/form-submissions", { method: "POST", body });
      } else {
        res = await fetch("/api/form-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        setError("Sorry, something went wrong submitting the form. Please try again.");
        setSubmitting(false);
        return;
      }

      if (form.confirmationType === "redirect" && form.redirect?.url) {
        window.location.href = form.redirect.url;
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Sorry, something went wrong submitting the form. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[720px] border border-[#e2e2e2] bg-brand-tertiary-100 p-5 sm:p-9">
        <p className="font-gill text-body leading-body text-brand-ink">
          {richTextToPlainText(form.confirmationMessage) ||
            "Thank you — your submission has been received."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[960px] border border-[#e2e2e2] bg-brand-tertiary-100 p-5 sm:p-9"
    >
      {(heading || form.title) && (
        <div className="flex flex-col items-start pb-6 pt-4">
          <h2 className="font-baskerville text-4xl leading-[1.08] text-brand-secondary-100 sm:text-[60px] sm:leading-[64px]">
            {heading || form.title}
          </h2>
        </div>
      )}

      <div className="-mx-3 flex flex-wrap">
        {fields.map((field, i) => {
          const width = field.width ?? 100;
          const wrapStyle = { "--w": `${width}%` } as React.CSSProperties;
          const wrapClass = "w-full px-3 py-2 sm:w-[var(--w)]";
          const key = field.id ?? field.name ?? i;

          if (field.blockType === "message") {
            return (
              <div key={key} style={wrapStyle} className={wrapClass}>
                <p className="whitespace-pre-line font-gill text-body leading-body text-brand-ink">
                  {richTextToPlainText(field.message)}
                </p>
              </div>
            );
          }

          if (field.blockType === "checkbox") {
            return (
              <div key={key} style={wrapStyle} className={wrapClass}>
                <label className="flex cursor-pointer items-start gap-3 border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-4 transition-colors has-[:checked]:border-brand-secondary-100">
                  <input
                    type="checkbox"
                    name={field.name}
                    required={field.required ?? false}
                    checked={checks[field.name ?? ""] ?? Boolean(field.defaultValue)}
                    onChange={field.name ? updateCheck(field.name) : undefined}
                    className="mt-0.5 size-6 shrink-0 accent-brand-secondary-100"
                  />
                  <span className="font-gill text-body leading-body text-brand-ink">
                    {field.label}
                    {field.required ? <span className="text-brand-primary-100">*</span> : null}
                  </span>
                </label>
              </div>
            );
          }

          const control = (() => {
            if (field.blockType === "textarea") {
              return (
                <textarea
                  name={field.name}
                  required={field.required ?? false}
                  value={values[field.name ?? ""] ?? String(field.defaultValue ?? "")}
                  onChange={field.name ? updateText(field.name) : undefined}
                  placeholder={field.placeholder ?? undefined}
                  className={`min-h-28 w-full resize-y border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-2 font-gill text-body leading-body text-brand-ink placeholder:text-[#afafaf] transition-colors focus:border-brand-secondary-100 focus:outline-none focus:ring-1 focus:ring-brand-secondary-100`}
                />
              );
            }
            if (
              (field.blockType === "select" ||
                field.blockType === "country" ||
                field.blockType === "state" ||
                field.blockType === "radio") &&
              field.options?.length
            ) {
              return (
                <select
                  name={field.name}
                  required={field.required ?? false}
                  value={values[field.name ?? ""] ?? String(field.defaultValue ?? "")}
                  onChange={field.name ? updateText(field.name) : undefined}
                  className={inputClass}
                >
                  <option value="">{field.placeholder ?? "Please select"}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
            }
            if (field.blockType === "upload") {
              return (
                <input
                  type="file"
                  name={field.name}
                  required={field.required ?? false}
                  onChange={field.name ? updateFile(field.name) : undefined}
                  className="w-full font-gill text-body leading-body text-brand-ink file:mr-4 file:border file:border-brand-secondary-100 file:bg-brand-tertiary-100 file:px-6 file:py-3 file:font-button file:text-button file:text-brand-secondary-100"
                />
              );
            }
            return (
              <input
                type={inputTypeFor(field.blockType)}
                name={field.name}
                required={field.required ?? false}
                value={values[field.name ?? ""] ?? String(field.defaultValue ?? "")}
                onChange={field.name ? updateText(field.name) : undefined}
                placeholder={field.placeholder ?? undefined}
                className={inputClass}
              />
            );
          })();

          return (
            <div key={key} style={wrapStyle} className={wrapClass}>
              <div className="flex min-w-0 flex-col gap-1.5">
                <label className="font-gill text-base font-medium leading-[18px] text-brand-secondary-100">
                  {field.label}
                  {field.required ? <span className="text-brand-primary-100">*</span> : null}
                </label>
                {control}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="px-3 pt-3 font-gill text-body text-brand-primary-100" role="alert">
          {error}
        </p>
      )}

      <div className="px-3 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[48px] items-center justify-center bg-brand-primary-100 px-spacing-md py-spacing-xs font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover disabled:opacity-60"
        >
          {submitting ? "Submitting…" : (form.submitButtonLabel ?? "Submit")}
        </button>
      </div>
    </form>
  );
}
