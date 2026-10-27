"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale-context";

/** status: 자료가 아직 없을 때 링크 대신 보이는 표시 (예: "준비 중") */
export type AnnouncementBarProps = { text: string; linkLabel: string; href: string; status?: string };

// 닫으면 이 브라우저에서 같은 공지는 다시 띄우지 않는다. 문구나 상태가 바뀌면 키가 달라져 다시 보인다
const storageKey = ({ text, status }: AnnouncementBarProps) => `ym-announcement:${text}:${status ?? "open"}`;

function readClosed(key: string) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    // 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서는 그냥 보인다
    return false;
  }
}

// 다른 탭에서 닫았을 때도 반영
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// 참고: 아이오크롭스 상단 공지 바 (자료 무료 다운로드 유도) + 오른쪽 닫기
export function AnnouncementBar(props: AnnouncementBarProps) {
  const { text, linkLabel, href, status } = props;
  const key = storageKey(props);
  const stored = useSyncExternalStore(subscribe, () => readClosed(key), () => false);
  const [closedNow, setClosedNow] = useState(false);
  const t = ui[useLocale()];

  if (stored || closedNow) return null;

  function close() {
    setClosedNow(true);
    try {
      localStorage.setItem(key, "1");
    } catch {}
  }

  return (
    <div className="bg-eco-50 text-eco-800">
      <div className="container-page relative flex items-center justify-center py-2.5 pr-10 text-sm">
        <p className="text-center">
          {text} <span className="mx-1 text-eco-300">|</span>
          {status ? (
            <span className="inline-flex items-center gap-2 font-semibold">
              {linkLabel}
              <span className="rounded-full border border-eco-800/30 px-2 py-0.5 text-xs">{status}</span>
            </span>
          ) : (
            <Link href={href} className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
              {linkLabel} <ArrowRight className="size-3.5" />
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label={t.closeNotice}
          className="absolute right-3 inline-flex size-8 items-center justify-center rounded-full text-eco-800/70 hover:bg-eco-100 hover:text-eco-800 md:right-6"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
