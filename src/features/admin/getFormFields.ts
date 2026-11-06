import "server-only";
import type { Field } from "@/features/admin/fields";
import { getDb } from "@/server/db";

/** Fills category dropdowns from the database, so new categories appear immediately. */
export async function getFormFields(fields: Field[]): Promise<Field[]> {
  const db = await getDb();
  const categories = await db.collection("categories").find().sort({ label: 1 }).toArray();

  return fields.map((field) => {
    if (!field.categoryGroups) return field;

    const groups = field.categoryGroups;
    const seen = new Set<string>();
    const options = categories
      .filter(({ group, slug }) => {
        const include = groups.includes(group) && !seen.has(slug);
        if (include) seen.add(slug);
        return include;
      })
      .map(({ slug, label }) => ({ value: slug, label }));

    return { ...field, options };
  });
}
