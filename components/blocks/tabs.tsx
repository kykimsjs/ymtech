"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

// 탭 블록 공용. 패널은 서버에서 그려서 넘긴다.
//   underline: 여의시스템 적용 분야 탭
//   headline:  안심해 기대효과의 큰 제목 탭
//   segmented: 안심해 설치사례의 버튼형 탭
export function Tabs({
  labels,
  panels,
  look = "underline",
  tone = "light",
}: {
  labels: string[];
  panels: React.ReactNode[];
  look?: "underline" | "headline" | "segmented";
  tone?: "light" | "dark";
}) {
  const [active, setActive] = useState(0);
  const dark = tone === "dark";

  return (
    <div>
      <div
        role="tablist"
        className={cn(
          "flex overflow-x-auto overflow-y-hidden",
          look === "underline" && cn("border-b", dark ? "border-white/20" : "border-line-strong"),
          look === "headline" && cn("gap-8 border-b", dark ? "border-white/15" : "border-line"),
          look === "segmented" && "justify-center",
        )}
      >
        {labels.map((label, i) => {
          const on = i === active;
          return (
            <button
              key={label}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 transition-colors",
                look === "underline" &&
                  cn(
                    "-mb-px border-b-2 px-5 py-4 text-[0.9375rem] font-semibold md:flex-1",
                    on
                      ? dark
                        ? "border-white text-white"
                        : "border-ink text-ink"
                      : cn("border-transparent", dark ? "text-white/60 hover:text-white" : "text-ink-subtle hover:text-ink"),
                  ),
                look === "headline" &&
                  cn(
                    "-mb-px border-b-[3px] pb-4 text-title font-bold",
                    on
                      ? cn("border-brand-500", dark ? "text-white" : "text-ink")
                      : cn("border-transparent", dark ? "text-white/50 hover:text-white/80" : "text-ink-subtle hover:text-ink-muted"),
                  ),
                look === "segmented" &&
                  cn(
                    "min-w-32 border px-5 py-3 text-sm font-semibold first:rounded-l-control last:rounded-r-control [&:not(:first-child)]:-ml-px",
                    on
                      ? "relative z-10 border-brand-500 bg-brand-500 text-white"
                      : dark
                        ? "border-white/20 bg-white/5 text-white/70 hover:text-white"
                        : "border-line-strong bg-canvas text-ink-muted hover:text-ink",
                  ),
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-10 md:pt-12">
        {panels[active]}
      </div>
    </div>
  );
}
