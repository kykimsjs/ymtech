"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export type SiteHeaderProps = {
  nav: NavItem[];
  cta: { label: string; href: string };
  locales?: { label: string; href: string; active?: boolean }[];
  /** dark: 어두운 히어로 위(아이오크롭스), light: 흰 바탕(케빈랩 서브) */
  tone?: "light" | "dark";
  sticky?: boolean;
};

// 참고: 아이오크롭스 GNB(로고·메뉴·상담 신청 버튼·언어), 케빈랩 하위 메뉴 드롭다운과 모바일 + 펼침
export function SiteHeader({ nav, cta, locales = [], tone = "light", sticky = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const dark = tone === "dark";

  return (
    <header
      className={cn(
        "z-40 border-b",
        sticky && "sticky top-0",
        dark ? "border-white/10 bg-graphite-900 text-white" : "border-line bg-canvas text-ink",
      )}
    >
      <div className="container-page flex h-16 items-center gap-10">
        <Link href="#" aria-label="와이엠이노테크 홈">
          <Logo tone={dark ? "white" : "color"} className="w-36" />
        </Link>

        <nav className="hidden h-full items-stretch lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative flex items-center">
              <Link
                href={item.href}
                className={cn(
                  "flex h-full items-center px-5 text-[0.9375rem] font-semibold",
                  dark ? "text-white/85 hover:text-white" : "text-ink hover:text-brand-600",
                )}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute top-full left-0 min-w-44 pt-px opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className={cn("border py-2 text-sm", dark ? "border-white/10 bg-graphite-900" : "border-line bg-canvas shadow-card")}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block px-5 py-2.5",
                            dark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-ink-muted hover:bg-surface hover:text-ink",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link href={cta.href} className={cn(buttonStyles({ variant: dark ? "inverse" : "dark", size: "sm" }), "max-sm:hidden")}>
            {cta.label} <ArrowRight className="size-4" />
          </Link>
          {locales.length > 0 && (
            <div className="hidden items-center gap-2 text-sm font-semibold lg:flex">
              {locales.map((locale, i) => (
                <span key={locale.label} className="flex items-center gap-2">
                  {i > 0 && <span className={dark ? "text-white/25" : "text-line-strong"}>|</span>}
                  <Link
                    href={locale.href}
                    className={locale.active ? "" : dark ? "text-white/60 hover:text-white" : "text-ink-subtle hover:text-ink"}
                  >
                    {locale.label}
                  </Link>
                </span>
              ))}
            </div>
          )}
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={cn("border-t lg:hidden", dark ? "border-white/10" : "border-line")}>
          <ul className="container-page py-2">
            {nav.map((item) => {
              const isOpen = expanded === item.label;
              return (
                <li key={item.label} className={cn("border-b last:border-b-0", dark ? "border-white/10" : "border-line")}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left font-semibold"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                  >
                    {item.label}
                    {item.children && <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />}
                  </button>
                  {isOpen && item.children && (
                    <ul className={cn("flex flex-col gap-3 pb-4 pl-3 text-sm", dark ? "text-white/70" : "text-ink-muted")}>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href}>{child.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="container-page pb-6">
            <Link href={cta.href} className={cn(buttonStyles({ variant: dark ? "inverse" : "dark" }), "w-full")}>
              {cta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
