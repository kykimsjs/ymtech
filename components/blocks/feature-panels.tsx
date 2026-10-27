"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { BreakText } from "@/components/ui/break-text";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale-context";
import type { FeatureRowsProps } from "./feature-rows";
import { Media } from "./media";

export type FeaturePanelsProps = FeatureRowsProps;

// 핵심 소구점 3개를 세로로 쪼갠 패널. 데스크톱은 마우스를 올리거나 포커스한 칸이 넓어지며 설명이 나타나고,
// 모바일·태블릿은 위아래로 쌓인 아코디언(누른 칸이 펼쳐짐)이 된다.
// 참고: 레퍼런스 사이트들의 사업 영역 확장형 패널(expandable panels)
export function FeaturePanels({ title, items, id }: FeaturePanelsProps) {
  const [active, setActive] = useState(0);

  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page">
        {title && <h2 className="max-w-[16em] text-display font-bold">{title}</h2>}
        <ol className={cn("flex flex-col gap-2 lg:h-[36rem] lg:flex-row lg:gap-3", title && "mt-10 lg:mt-14")}>
          {items.map((item, i) => {
            const open = i === active;
            const number = String(i + 1).padStart(2, "0");
            const diagram = !("media" in item.visual);
            return (
              <li
                key={item.title}
                onMouseEnter={() => setActive(i)}
                style={{ flexGrow: open ? 3.2 : 1 }}
                className={cn(
                  "relative isolate overflow-hidden rounded-card bg-graphite-900 text-white transition-[flex-grow,height] duration-500 ease-out motion-reduce:transition-none lg:h-auto lg:basis-0",
                  open ? "h-[33rem] sm:h-[30rem]" : "h-[4.75rem]",
                )}
              >
                {"media" in item.visual && (
                  <Media media={item.visual.media} tone="dark" sizes="(min-width: 1024px) 760px, 100vw" fill className="-z-20" />
                )}
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 transition-colors duration-500 motion-reduce:transition-none",
                    diagram
                      ? "bg-transparent"
                      : open
                        ? "bg-linear-to-t from-black/90 from-20% via-black/65 via-55% to-black/10"
                        : "bg-black/60",
                  )}
                />

                {/* 접힌 칸 전체를 누르거나 포커스하면 펼친다 (모바일 아코디언·키보드) */}
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`${id ?? "feature"}-panel-${i}`}
                  className={cn("absolute inset-0 z-10 flex items-start justify-between p-5 text-left lg:p-7", open && "pointer-events-none")}
                >
                  <span className={cn("flex min-w-0 items-baseline gap-3 transition-opacity duration-300", open && "opacity-0")}>
                    <span className="shrink-0 text-sm font-semibold text-eco-300 tabular-nums">{number}</span>
                    <span className="truncate text-lg leading-snug font-bold lg:w-[9rem] lg:overflow-visible lg:whitespace-normal">{item.title}</span>
                  </span>
                  <Plus
                    aria-hidden
                    className={cn("mt-0.5 size-5 shrink-0 transition-[rotate,opacity] duration-300 lg:hidden", open && "rotate-45 opacity-0")}
                  />
                </button>

                {diagram && <CutoffTimeline open={open} />}

                {/* 펼친 칸의 설명. 폭을 고정해 칸이 넓어지는 동안 줄바꿈이 흔들리지 않게 한다 */}
                <div
                  id={`${id ?? "feature"}-panel-${i}`}
                  aria-hidden={!open}
                  inert={!open}
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-5 transition-opacity motion-reduce:transition-none sm:p-7 lg:p-9",
                    open ? "opacity-100 delay-200 duration-500" : "opacity-0 duration-150",
                  )}
                >
                  <div className="w-full max-w-[30rem] lg:w-[30rem]">
                    <p className="flex items-baseline gap-3 text-eyebrow font-semibold text-eco-300">
                      <span className="tabular-nums">{number}</span>
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-title font-bold">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.7] text-white/85 sm:text-base">
                      <BreakText text={item.text} />
                    </p>
                    {item.facts && (
                      <dl className="mt-5 border-t border-white/25 text-sm sm:text-[0.9375rem]">
                        {item.facts.map((fact) => (
                          <div key={fact.label} className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-white/25 py-2.5">
                            <dt className="text-white/70">{fact.label}</dt>
                            <dd className="font-medium">{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// 3번 칸 위쪽 도식: 이상 감지(0초)에서 자동 차단(10초 이내)까지. 사양 외 수치는 넣지 않는다.
function CutoffTimeline({ open }: { open: boolean }) {
  const t = ui[useLocale()].cutoff;
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-x-0 top-0 p-5 pt-20 transition-opacity motion-reduce:transition-none sm:p-7 sm:pt-20 lg:p-9 lg:pt-12",
        open ? "opacity-100 delay-200 duration-500" : "opacity-0 duration-150",
      )}
    >
      <div className="w-full max-w-[30rem] lg:w-[30rem]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-white/70">{t.detect}</p>
            <p className="mt-1 font-bold">{t.detectWhat}</p>
          </div>
          <p className="text-right font-bold">
            <span className="text-[3rem] leading-none tabular-nums lg:text-[4rem]">10</span>
            {t.within}
            <span className="block text-sm font-normal text-white/70">{t.cut}</span>
          </p>
        </div>
        <div className="relative mt-5">
          <div className="h-1.5 rounded-full bg-linear-to-r from-brand-400 to-brand-300" />
          <span className="absolute top-1/2 left-0 size-3.5 -translate-y-1/2 rounded-full border-2 border-graphite-900 bg-white" />
          <span className="absolute top-1/2 right-0 size-5 -translate-y-1/2 rounded-full border-4 border-graphite-900 bg-brand-300" />
        </div>
        <ol className="mt-3 flex justify-between text-xs text-white/60 tabular-nums">
          {[0, 2, 4, 6, 8, 10].map((tick) => (
            <li key={tick}>
              {tick}
              {t.second}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
