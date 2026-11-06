import type { Field } from "@/features/admin/fields";

export type FormValues = Record<string, string | boolean>;

function readPath(record: object, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>((value, key) => (value as Record<string, unknown>)?.[key], record);
}

function writePath(record: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  const last = keys.pop() as string;
  let target = record;

  for (const key of keys) {
    target[key] ??= {};
    target = target[key] as Record<string, unknown>;
  }
  target[last] = value;
}

/** Flattens a saved record into the form's values. */
export function toFormValues(fields: Field[], record: object = {}): FormValues {
  const values: FormValues = {};

  for (const { name, type } of fields) {
    const value = readPath(record, name);
    if (type === "checkbox") values[name] = Boolean(value);
    else if (Array.isArray(value)) values[name] = value.join("\n");
    else values[name] = value === undefined ? "" : String(value);
  }
  return values;
}

/** Builds the record to save. Empty fields are left out, so optional groups stay absent. */
export function toRecord(fields: Field[], values: FormValues): Record<string, unknown> {
  const record: Record<string, unknown> = {};

  for (const { name, type } of fields) {
    const value = values[name];

    if (type === "checkbox") {
      if (value || name === "active") writePath(record, name, Boolean(value));
    } else if (typeof value === "string" && value.trim() !== "") {
      if (type === "number") writePath(record, name, Number(value));
      else if (type === "list") {
        writePath(
          record,
          name,
          value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
        );
      } else writePath(record, name, value.trim());
    }
  }
  return record;
}
