import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a safe button by default", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" }).getAttribute("type")).toBe("button");
  });

  it("renders a link when given an href", () => {
    render(<Button href="/explore">Explore</Button>);
    expect(screen.getByRole("link", { name: "Explore" }).getAttribute("href")).toBe("/explore");
  });
});
