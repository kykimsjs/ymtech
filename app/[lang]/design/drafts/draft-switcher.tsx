"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

// 시안끼리 오가는 검토용 도구. 시안 디자인에는 포함되지 않는다.
// segment: 시안 묶음의 경로 이름 (HOME 색 시안은 drafts, 회사소개 시안은 company)
export function DraftSwitcher({ items, segment = "drafts" }: { items: { id: string; key: string; name: string }[]; segment?: string }) {
  const pathname = usePathname();
  const base = pathname.split(`/${segment}`)[0];

  return (
    <nav
      aria-label="시안 전환"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#111]/90 p-1 text-sm whitespace-nowrap text-white shadow-lg backdrop-blur"
    >
      <Link href={`${base}/${segment}`} className="rounded-full px-3 py-1.5 text-white/70 hover:text-white">
        목록
      </Link>
      {items.map((item) => {
        const active = pathname.endsWith(`/${segment}/${item.id}`);
        return (
          <Link
            key={item.id}
            href={`${base}/${segment}/${item.id}`}
            aria-current={active ? "page" : undefined}
            className={cn("rounded-full px-3 py-1.5 font-semibold", active ? "bg-white text-[#111]" : "text-white/75 hover:text-white")}
          >
            {item.key}
            <span className="max-sm:hidden"> {item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
