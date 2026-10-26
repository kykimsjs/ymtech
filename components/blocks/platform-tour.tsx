"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { MonitorMockup, platformScreens, type PlatformScreen } from "./platform-screens";

export type PlatformFeature = { title: string; text: string; screen: PlatformScreen };

// 기능 목록 + 모니터 목업. 데스크톱은 마우스를 올리면, 모바일은 누르면 그 기능의 예시 화면으로 바뀐다.
// 키보드로 기능에 포커스해도 바뀐다. 섹션 제목·설명(head)은 서버에서 그려 넘긴다.
export function PlatformTour({ head, features, title, note }: { head: React.ReactNode; features: PlatformFeature[]; title: string; note?: string }) {
  const [active, setActive] = useState(0);
  const current = features[active];

  return (
    <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
      <div className="flex flex-col items-start lg:col-span-5">
        {head}
        <ul className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-2">
          {features.map((feature, i) => {
            const on = i === active;
            return (
              <li key={feature.title}>
                <button
                  type="button"
                  aria-pressed={on}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full border-t-2 pt-3 pb-2 text-left transition-colors duration-200 motion-reduce:transition-none",
                    on ? "border-brand-500" : "border-line-strong hover:border-ink-subtle",
                  )}
                >
                  <span className={cn("block text-[0.9375rem] font-bold", on ? "text-brand-600" : "text-ink")}>{feature.title}</span>
                  <span className="mt-1 block text-sm leading-[1.6] text-ink-muted">{feature.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <MonitorMockup label={`통합 안전관리 웹 플랫폼 ${title} 예시 화면: ${current.title}`}>
          {/* 네 화면을 겹쳐 두고 고른 화면만 보이게 (전환할 때 깜빡이지 않도록) */}
          <div className="relative h-full">
            {features.map((feature, i) => {
              const Screen = platformScreens[feature.screen];
              return (
                <div
                  key={feature.screen}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <Screen />
                </div>
              );
            })}
          </div>
        </MonitorMockup>
        {note && <p className="mt-4 text-center text-xs text-ink-subtle">{note}</p>}
      </div>
    </div>
  );
}
