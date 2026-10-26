import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getLocale } from "@/content/dictionaries";
import { themes } from "@/content/themes";

export const metadata: Metadata = {
  title: "HOME 시안",
  robots: { index: false, follow: false },
};

export default async function DraftsIndex() {
  const locale = await getLocale();

  return (
    <main className="container-page py-12 pb-24">
      <Link href={`/${locale}/design`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="size-4" /> 디자인 시스템
      </Link>
      <h1 className="mt-8 text-display font-bold">HOME 시안 · 색감 비교</h1>
      <p className="mt-4 max-w-2xl text-lg leading-[1.7] text-ink-muted">
        네 시안은 블록 구성과 순서가 같고 색 토큰만 다릅니다. 모두 CI 블루(2117C)와 틸(315C)을 바탕으로 하되, 색의 무게를
        어디에 두는지가 다릅니다. 사진은 임시 이미지입니다.
      </p>

      <ol className="mt-12 grid gap-4 md:grid-cols-2">
        {themes.map((theme) => (
          <li key={theme.id}>
            <Link
              href={`/${locale}/design/drafts/${theme.id}`}
              className="group flex h-full flex-col gap-5 rounded-card border border-line bg-canvas p-6 transition-colors hover:border-ink"
            >
              <div className="flex h-20 overflow-hidden rounded-control">
                {theme.swatches.map((color, i) => (
                  <span key={color} className={i === 0 ? "flex-[2]" : "flex-1"} style={{ background: color }} />
                ))}
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-subtitle font-bold">
                  {theme.key}. {theme.name}
                </h2>
                <ArrowUpRight className="size-5 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-[0.9375rem] leading-[1.75] text-ink-muted">{theme.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
