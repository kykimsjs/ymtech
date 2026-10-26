"use client";

import { Children, useEffect, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
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

// 히어로 배경 사진을 천천히 겹쳐 바꾸고, 왼쪽 아래에 점 내비게이션을 둔다.
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = !paused && !reducedMotion && slides.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearTimeout(timer);
  }, [autoplay, index, interval, slides.length]);

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
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 lg:bottom-10">
          <div className="container-page flex items-center gap-2">
            <div role="group" aria-label="배경 사진" className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${i + 1}번째 사진: ${labels[i]}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                      i === index ? "w-8 bg-white" : "w-1.5 bg-white/45 group-hover:bg-white/80",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "사진 넘김 다시 시작" : "사진 넘김 멈춤"}
              className="ml-2 flex size-6 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
            >
              {paused ? <Play className="size-3.5" fill="currentColor" /> : <Pause className="size-3.5" fill="currentColor" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
