"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type AnchorTabsProps = {
  items: { label: string; target: string }[];
  sticky?: boolean;
  /** 고정 헤더(h-16)가 있는 페이지에서는 헤더 바로 아래에 붙는다 */
  belowHeader?: boolean;
};

// 참고: 여의시스템 솔루션 페이지의 고정 탭(개요/장점/사례연구/제품 특징/Contact Us)
// 스크롤 위치에 맞춰 현재 탭에 밑줄을 그린다.
export function AnchorTabs({ items, sticky = true, belowHeader = false }: AnchorTabsProps) {
  const [current, setCurrent] = useState(items[0]?.target);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach(({ target }) => {
      const el = document.getElementById(target);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={cn("z-30 border-b border-line bg-surface", sticky && (belowHeader ? "sticky top-16" : "sticky top-0"))} aria-label="페이지 내 이동">
      <ul className="container-page flex overflow-x-auto">
        {items.map((item, i) => (
          <li key={item.target} className="shrink-0">
            <a
              href={`#${item.target}`}
              className={cn(
                "relative block py-4 text-[0.9375rem]",
                i === 0 ? "pr-5" : "px-5",
                current === item.target ? "font-semibold text-eco-600" : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
              {current === item.target && (
                <span className={cn("absolute bottom-0 h-0.5 bg-eco-500", i === 0 ? "right-5 left-0" : "inset-x-5")} />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
