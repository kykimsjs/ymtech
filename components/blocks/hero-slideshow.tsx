"use client";

import { Children, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

// 히어로 배경 사진을 천천히 겹쳐 바꾸고, 왼쪽 아래(제목 시작선) 반투명 캡슐에 번호·진행 막대·이전/다음·정지 버튼을 둔다.
// 진행 막대 애니메이션이 끝나면 다음 사진으로 넘어간다 (정지하면 막대도 그 자리에서 멈췄다가 이어서 찬다).
// 슬라이드(사진)는 서버에서 그려 children으로 넘긴다.
export function HeroSlideshow({
  children,
  labels,
  interval = 6000,
}: {
  children: React.ReactNode;
  labels: string[];
  interval?: number;
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  // 본 적 있는 사진과 바로 다음 사진만 그린다: 처음에 사진 네 장을 한꺼번에 받지 않도록
  const [seen, setSeen] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = !reducedMotion && count > 1;
  const go = (next: number) => {
    const target = (next + count) % count;
    setIndex(target);
    setSeen((list) => (list.includes(target) ? list : [...list, target]));
  };
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            {(seen.includes(i) || i === (index + 1) % count) && slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 lg:bottom-10">
          <div className="container-page flex">
            <div
              role="group"
              aria-label="배경 사진 넘김"
              className="flex items-center gap-1 rounded-full bg-black/50 py-1.5 pr-1.5 pl-2 text-white backdrop-blur-sm"
            >
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="이전 사진"
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <ChevronLeft className="size-4" />
              </button>

              <p className="flex items-center gap-1.5 px-1 text-sm tabular-nums" aria-live={autoplay && !paused ? "off" : "polite"}>
                <span className="sr-only">{`${count}장 중 ${index + 1}번째: ${labels[index]}`}</span>
                <span aria-hidden className="font-semibold">{pad(index + 1)}</span>
                <span aria-hidden className="text-white/60">/ {pad(count)}</span>
              </p>

              {/* 진행 막대: 자동 넘김일 때는 interval 동안 차오르고, 아니면 현재 위치만큼 채워 둔다 */}
              <span aria-hidden className="relative mx-2 h-0.5 w-16 overflow-hidden rounded-full bg-white/30 sm:w-24">
                {autoplay ? (
                  <span
                    key={index}
                    onAnimationEnd={() => go(index + 1)}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                    style={{ animation: `hero-progress ${interval}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }}
                  />
                ) : (
                  <span className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${((index + 1) / count) * 100}%` }} />
                )}
              </span>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="다음 사진"
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <ChevronRight className="size-4" />
              </button>

              {autoplay && (
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? "사진 넘김 다시 시작" : "사진 넘김 멈춤"}
                  className="ml-1 flex size-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                >
                  {paused ? <Play className="size-3.5" fill="currentColor" /> : <Pause className="size-3.5" fill="currentColor" />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
