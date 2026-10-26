"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// 정해진 크기(designWidth × designHeight)로 그린 화면을 부모 폭에 맞춰 통째로 축소한다.
// 모니터 목업 속 대시보드처럼, 화면 크기와 상관없이 같은 모양(캡처처럼)으로 보여야 할 때 쓴다.
export function ScaledScreen({
  designWidth,
  designHeight,
  className,
  style,
  children,
}: {
  designWidth: number;
  designHeight: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / designWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidth]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} style={style}>
      <div
        // 크기를 재기 전에는 숨겨서 원래 크기로 번쩍 보이지 않게
        style={{ width: designWidth, height: designHeight, transform: `scale(${scale})`, transformOrigin: "0 0", visibility: scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
