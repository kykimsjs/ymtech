import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { icons, type IconName } from "./icons";

export type KeyPointsProps = {
  title?: string;
  items: { label: string; title: string; text: string }[];
  tone?: "light" | "dark";
  id?: string;
};

// 기획안 HOME "핵심 소구점 3가지".
// 참고: 케빈랩 인증 현황의 윗선 + 라벨 + 큰 글씨 구성을 소구점 목록에 맞게 옮겼다.
export function KeyPoints({ title, items, tone = "light", id }: KeyPointsProps) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("py-16 lg:py-24", dark ? "bg-graphite-900 text-white" : "bg-canvas")}>
      <div className="container-page">
        {title && <h2 className="mb-10 text-title font-bold">{title}</h2>}
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <li key={item.title} className={cn("border-t-2 pt-6", dark ? "border-white/80" : "border-ink")}>
              <p className={cn("flex items-baseline gap-3 text-sm font-semibold", dark ? "text-eco-300" : "text-brand-600")}>
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </p>
              <h3 className="mt-4 text-subtitle font-bold">{item.title}</h3>
              <p className={cn("mt-3 text-[0.9375rem] leading-[1.75]", dark ? "text-white/75" : "text-ink-muted")}>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export type QuickActionsProps = {
  title?: string;
  items: { icon: IconName; label: string; text: string; href: string }[];
  tone?: "light" | "dark";
  id?: string;
};

// 기획안 HOME "Quick Actions"(소개서 다운로드 · 도입·실증 문의 · 데모 로그인).
// 참고: 아이오크롭스 상단 "상담 신청" 버튼과 상담 카드의 행동 유도를 세 칸 링크로 펼쳤다.
export function QuickActions({ title, items, tone = "light", id }: QuickActionsProps) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("py-16 lg:py-20", dark ? "bg-graphite-900 text-white" : "bg-surface")}>
      <div className="container-page">
        {title && <h2 className="mb-8 text-title font-bold">{title}</h2>}
        <ul className="grid gap-3 md:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-full items-start gap-5 rounded-card border p-6 transition-colors",
                    dark ? "border-white/15 hover:border-white/50 hover:bg-white/5" : "border-line bg-canvas hover:border-brand-500",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-control",
                      dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-600",
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-2 text-lg font-bold">
                      {item.label}
                      <ArrowUpRight className="size-5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className={cn("mt-1.5 block text-sm leading-6", dark ? "text-white/70" : "text-ink-muted")}>{item.text}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
