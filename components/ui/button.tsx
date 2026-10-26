import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700",
  secondary: "bg-eco-500 text-white hover:bg-eco-600 active:bg-eco-700",
  dark: "bg-ink text-white hover:bg-ink/85",
  outline: "border border-line-strong bg-canvas text-ink hover:border-ink",
  ghost: "text-brand-600 hover:bg-brand-50",
  // 어두운 배경 위
  inverse: "bg-white text-ink hover:bg-white/85",
  "inverse-outline": "border border-white/50 text-white hover:border-white hover:bg-white/10",
} as const;

// 레퍼런스 실측: 버튼 높이 41~47px
const sizes = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-11 gap-2 px-5 text-[0.9375rem]",
  lg: "h-12 gap-2.5 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

// 기본 6px(아이오크롭스), pill(케빈랩), square(여의시스템·지노시스)
const shapes = {
  default: "rounded-control",
  pill: "rounded-full",
  square: "rounded-none",
} as const;

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: keyof typeof shapes;
};

export function buttonStyles({ variant = "primary", size = "md", shape = "default" }: StyleProps = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
    "disabled:pointer-events-none disabled:opacity-50",
    shapes[shape],
    variants[variant],
    sizes[size],
  );
}

export function Button({
  variant,
  size,
  shape,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size, shape }), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  shape,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonStyles({ variant, size, shape }), className)} {...props} />;
}
