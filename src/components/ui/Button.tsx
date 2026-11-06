import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-soft hover:bg-saffron-700 hover:shadow-glow",
  secondary: "border border-sand-300 bg-surface text-strong hover:border-ink-300 hover:shadow-soft",
  ghost: "text-strong hover:bg-sand-100",
  light: "border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  children: ReactNode;
};

type ButtonProps = StyleProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "children">)
  );

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap",
    "transition duration-300 ease-out-soft hover:-translate-y-0.5 active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const content = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;
  return (
    <button type={type} {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
