import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
  it("connects its label to the field", () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText("Name").tagName).toBe("INPUT");
  });

  it("announces an error", () => {
    render(<Input label="Email" error="Enter a valid email." />);
    const field = screen.getByLabelText("Email");

    expect(field.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(field.getAttribute("aria-describedby")!)?.textContent).toBe(
      "Enter a valid email.",
    );
  });
});
