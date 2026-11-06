import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type InputProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, ...props }: InputProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-strong">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={note ? noteId : undefined}
        className={cn(
          "h-12 w-full rounded-control border bg-surface px-4 text-base text-strong transition duration-200",
          "placeholder:text-ink-500 hover:border-ink-300 focus:shadow-soft disabled:bg-sand-100",
          error ? "border-danger" : "border-sand-300",
        )}
        {...props}
      />
      {note && (
        <p id={noteId} className={cn("mt-1.5 text-sm", error ? "text-danger" : "text-muted")}>
          {note}
        </p>
      )}
    </div>
  );
}
