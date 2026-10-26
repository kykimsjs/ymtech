import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Blocks } from "@/components/blocks/registry";
import { Logo } from "@/components/ui/logo";
import { catalog } from "@/content/block-catalog";
import { getLocale } from "@/content/dictionaries";

export const metadata: Metadata = {
  title: "Blocks",
  robots: { index: false, follow: false },
};

const groups = [...new Set(catalog.map((entry) => entry.group))];

export default async function BlockCatalogPage() {
  const locale = await getLocale();

  return (
    <div className="bg-surface-strong">
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur">
        <div className="container-page flex h-14 items-center gap-4">
          <Link href={`/${locale}/design`} className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
            <ArrowLeft className="size-4" /> 디자인 시스템
          </Link>
          <span className="flex items-center gap-2 font-bold">
            <Logo type="symbol" className="w-6" /> 블록 카탈로그
          </span>
          <nav className="ml-auto hidden gap-1 text-sm text-ink-muted md:flex">
            {groups.map((group) => (
              <a key={group} href={`#group-${group}`} className="rounded-control px-3 py-1.5 hover:bg-surface hover:text-ink">
                {group}
              </a>
            ))}
          </nav>
          <Link
            href={`/${locale}/design/drafts`}
            className="ml-auto rounded-control bg-ink px-3 py-1.5 text-sm font-semibold text-white md:ml-0"
          >
            HOME 시안
          </Link>
        </div>
      </header>

      <div className="container-page py-10">
        <p className="max-w-3xl text-sm leading-6 text-ink-muted">
          블록 {catalog.length}개. 페이지는 이 블록들을 순서대로 이어 붙여 만듭니다. 각 블록 위 띠에 참고한 레퍼런스 섹션을
          적었습니다. 사진과 연도·고객사·주소처럼 자료가 없는 값은 비워 두었습니다.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group} id={`group-${group}`} className="scroll-mt-14">
          <h2 className="container-page pt-6 pb-2 text-xs font-bold tracking-wider text-ink-subtle">{group}</h2>
          {catalog
            .filter((entry) => entry.group === group)
            .map((entry) => {
              const index = catalog.indexOf(entry) + 1;
              return (
                <article key={entry.name} className="mb-10">
                  <div className="container-page flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3 text-sm">
                    <span className="font-semibold text-ink-subtle tabular-nums">{String(index).padStart(2, "0")}</span>
                    <span className="font-bold">{entry.name}</span>
                    <code className="rounded-sm bg-canvas px-1.5 py-0.5 text-xs text-ink-muted">{entry.block.type}</code>
                    <span className="text-ink-subtle">참고: {entry.ref}</span>
                  </div>
                  <div className="border-y border-line-strong bg-canvas">
                    <Blocks items={[entry.block]} />
                  </div>
                </article>
              );
            })}
        </section>
      ))}
    </div>
  );
}
