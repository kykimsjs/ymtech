"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, X } from "lucide-react";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale-context";

export type AnnouncementBarProps = {
  text: string;
  linkLabel: string;
  href: string;
  /** 자료가 아직 없을 때 링크 대신 보이는 표시 (예: "준비 중") */
  status?: string;
  /**
   * 닫은 것을 브라우저에 기억할지.
   * false(기본): 닫으면 페이지를 옮겨 다녀도 숨겨 두고, 새로고침하면 다시 보인다 (메모리에만 기록)
   * true: localStorage에 남겨 다음 방문에도 숨긴다. 화면을 그리기 전에 도는 짧은 스크립트가 먼저 숨겨 깜빡임이 없다
   */
  remember?: boolean;
};

// 문구나 상태가 바뀌면 키가 달라져 다시 보인다
const storageKey = ({ text, status }: AnnouncementBarProps) => `ym-announcement:${text}:${status ?? "open"}`;

// 이번 페이지 로드 동안 닫은 공지 (새로고침하면 비워진다)
const closedInMemory = new Set<string>();
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // remember 모드에서 다른 탭에서 닫았을 때도 반영
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function isClosed(key: string, remember: boolean) {
  if (closedInMemory.has(key)) return true;
  if (!remember) return false;
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    // 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서는 그냥 보인다
    return false;
  }
}

function markClosed(key: string, remember: boolean) {
  closedInMemory.add(key);
  if (remember) {
    try {
      localStorage.setItem(key, "1");
    } catch {}
  }
  listeners.forEach((listener) => listener());
}

// 참고: 아이오크롭스 상단 공지 바 (자료 무료 다운로드 유도) + 오른쪽 닫기
export function AnnouncementBar(props: AnnouncementBarProps) {
  const { text, linkLabel, href, status, remember = false } = props;
  const key = storageKey(props);
  const closed = useSyncExternalStore(subscribe, () => isClosed(key, remember), () => false);
  const t = ui[useLocale()];

  if (closed) return null;

  return (
    <>
      {/* remember 모드에서 이미 닫은 방문자는 아래 스크립트가 hidden을 붙여 두므로 hydration 차이를 무시한다 */}
      <div className="bg-eco-50 text-eco-800" suppressHydrationWarning>
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
            onClick={() => markClosed(key, remember)}
            aria-label={t.closeNotice}
            className="absolute right-3 inline-flex size-8 items-center justify-center rounded-full text-eco-800/70 hover:bg-eco-100 hover:text-eco-800 md:right-6"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      {remember && (
        <script
          // HTML을 읽는 도중 바로 실행돼, 바로 앞의 공지 바를 화면에 그리기 전에 숨긴다
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem(${JSON.stringify(key)})==="1"){var b=document.currentScript.previousElementSibling;if(b)b.hidden=true}}catch(e){}`,
          }}
        />
      )}
    </>
  );
}
