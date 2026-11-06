"use client";

import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import { sendJson } from "@/features/admin/client";
import type { Field } from "@/features/admin/fields";
import { toFormValues, toRecord, type FormValues } from "@/features/admin/formValues";

type ResourceFormProps = {
  resource: string;
  singular: string;
  fields: Field[];
  record?: object & { id?: string };
  canDelete: boolean;
};

const controlClass =
  "w-full rounded-control border bg-surface px-4 py-3 text-base text-strong transition duration-200 hover:border-ink-300";

export function ResourceForm({ resource, singular, fields, record, canDelete }: ResourceFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(() => toFormValues(fields, record));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const listUrl = `/admin/${resource}`;
  const apiUrl = `/api/v1/admin/${resource}`;
  const setValue = (name: string, value: string | boolean) =>
    setValues((current) => ({ ...current, [name]: value }));

  const toReadableError = ({ field, message: text }: { field: string; message: string }) => {
    const label = fields.find(({ name }) => name === field)?.label ?? "A photo credit field";
    return `${label}: ${text.startsWith("Invalid input") ? "this is required." : text}`;
  };

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setErrors({});
    setMessage("");

    const body = toRecord(fields, values);
    const result = record?.id
      ? await sendJson(`${apiUrl}/${record.id}`, "PUT", body)
      : await sendJson(apiUrl, "POST", body);

    if (result.success) {
      router.push(listUrl);
      router.refresh();
      return;
    }

    setErrors(Object.fromEntries(result.details.map(({ field, message: text }) => [field, text])));
    setMessage([result.message, ...result.details.map(toReadableError)].filter(Boolean).join(" "));
    setBusy(false);
  }

  async function remove() {
    if (!record?.id || !window.confirm(`Delete this ${singular}? This can't be undone.`)) return;

    setBusy(true);
    const result = await sendJson(`${apiUrl}/${record.id}`, "DELETE");
    if (result.success) {
      router.push(listUrl);
      router.refresh();
    } else {
      setMessage(result.message);
      setBusy(false);
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>, prefix: string) {
    const file = event.target.files?.[0];
    if (!file) return;

    setMessage("Uploading…");
    const form = new FormData();
    form.set("file", file);

    const response = await fetch("/api/v1/admin/uploads", { method: "POST", body: form });
    const json = await response.json();

    if (json.success) {
      setValue(`${prefix}.src`, json.data.src);
      setValue(`${prefix}.width`, String(json.data.width));
      setValue(`${prefix}.height`, String(json.data.height));
      setMessage("Image uploaded. Add its credit details before saving.");
    } else {
      setMessage(json.error.message);
    }
  }

  function renderField(field: Field) {
    const { name, label, type = "text", required, hint, options } = field;
    const value = values[name];
    const error = errors[name];
    const onChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setValue(name, event.target.value);

    if (type === "checkbox") {
      return (
        <label key={name} className="flex min-h-11 items-center gap-3 font-semibold">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => setValue(name, event.target.checked)}
            className="size-5 accent-saffron-600"
          />
          {label}
        </label>
      );
    }

    if (type === "textarea" || type === "list" || type === "select") {
      const id = `field-${name}`;
      const describe = cn(controlClass, error ? "border-danger" : "border-sand-300");

      return (
        <div key={name} className={type === "select" ? "" : "md:col-span-2"}>
          <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-strong">
            {label}
          </label>
          {type === "select" ? (
            <select
              id={id}
              required={required}
              value={String(value)}
              onChange={onChange}
              className={describe}
            >
              <option value="">Choose</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <textarea
              id={id}
              required={required}
              rows={type === "list" ? 6 : 4}
              value={String(value)}
              onChange={onChange}
              className={describe}
            />
          )}
          {(error ?? hint) && (
            <p className={cn("mt-1.5 text-sm", error ? "text-danger" : "text-muted")}>
              {error ?? hint}
            </p>
          )}
        </div>
      );
    }

    return (
      <div key={name}>
        <Input
          label={label}
          type={type === "image" ? "url" : type}
          step={type === "number" ? "any" : undefined}
          required={required}
          hint={hint}
          error={error}
          value={String(value)}
          onChange={onChange}
          autoComplete={type === "password" ? "new-password" : undefined}
        />
        {type === "image" && (
          <input
            type="file"
            aria-label={`Upload ${label.toLowerCase()}`}
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => upload(event, name.replace(/\.src$/, ""))}
            className="mt-2 block w-full text-sm text-muted"
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={save} className="grid gap-5 md:grid-cols-2">
      {fields.map(renderField)}
      {message && (
        <p role="alert" className="text-sm font-semibold text-danger md:col-span-2">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-3 md:col-span-2">
        <Button type="submit" disabled={busy}>
          Save {singular}
        </Button>
        <Button href={listUrl} variant="secondary">
          Cancel
        </Button>
        {record?.id && canDelete && (
          <Button variant="ghost" onClick={remove} disabled={busy} className="text-danger">
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
