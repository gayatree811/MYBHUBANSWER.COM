import { describe, expect, it } from "vitest";
import type { Field } from "@/features/admin/fields";
import { toFormValues, toRecord } from "@/features/admin/formValues";

const FIELDS: Field[] = [
  { name: "name", label: "Name" },
  { name: "source.url", label: "Source" },
  { name: "coordinates.lat", label: "Latitude", type: "number" },
  { name: "cuisines", label: "Cuisines", type: "list" },
  { name: "active", label: "Active", type: "checkbox" },
];

describe("admin form values", () => {
  it("flattens nested records", () => {
    const values = toFormValues(FIELDS, {
      name: "A",
      source: { url: "https://a.test" },
      cuisines: ["Odia", "Vegetarian"],
    });

    expect(values["source.url"]).toBe("https://a.test");
    expect(values.cuisines).toBe("Odia\nVegetarian");
    expect(values.active).toBe(false);
  });

  it("rebuilds nested records and converts types", () => {
    const record = toRecord(FIELDS, {
      name: " A ",
      "source.url": "",
      "coordinates.lat": "20.2",
      cuisines: "Odia\n\n Vegetarian ",
      active: true,
    });

    expect(record).toEqual({
      name: "A",
      coordinates: { lat: 20.2 },
      cuisines: ["Odia", "Vegetarian"],
      active: true,
    });
  });

  it("leaves out empty optional groups", () => {
    expect(toRecord(FIELDS, { name: "A", "source.url": "  " })).toEqual({
      name: "A",
      active: false,
    });
  });
});
