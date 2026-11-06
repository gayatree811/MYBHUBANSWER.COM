import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

describe("page states", () => {
  it("shows an empty message", () => {
    render(<EmptyState title="Nothing here" description="Check back later." />);
    expect(screen.getByRole("heading", { name: "Nothing here" })).toBeTruthy();
  });

  it("announces errors to assistive technology", () => {
    render(<ErrorState title="Failed" description="Try again." />);
    expect(screen.getByRole("alert").textContent).toContain("Failed");
  });

  it("announces loading and shows the requested cards", () => {
    const { container } = render(<LoadingState cards={2} />);
    expect(screen.getByRole("status").textContent).toContain("Loading");
    expect(container.querySelectorAll(".aspect-4\\/3")).toHaveLength(2);
  });
});
