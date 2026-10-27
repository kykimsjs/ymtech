import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getLocale } from "@/content/dictionaries";
import { contactDrafts } from "@/content/pages/contact";

export const metadata: Metadata = {
  title: "문의 시안",
  robots: { index: false, follow: false },
};

export default async function ContactDraftsIndex() {
  const locale = await getLocale();

  return (
    <main className="container-page py-12 pb-24">
      <Link href={`/${locale}/design`} className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft className="size-4" /> 디자인 시스템
      </Link>
      <h1 className="mt-8 text-display font-bold">문의 시안</h1>
      <p className="mt-4 max-w-2xl text-lg leading-[1.7] text-ink-muted">
        두 시안은 내용(문의 폼 · 연락처 · 오시는 길)이 같고 폼 배치만 다릅니다. 받지 못한 자료는 점선 상자에 무엇이
        필요한지 적어 두었습니다.
      </p>

      <ol className="mt-12 grid gap-4 md:grid-cols-2">
        {contactDrafts.map((draft) => (
          <li key={draft.id}>
            <Link
              href={`/${locale}/design/contact/${draft.id}`}
              className="group flex h-full flex-col gap-4 rounded-card border border-line bg-canvas p-6 transition-colors hover:border-ink"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-subtitle font-bold">
                  {draft.key}. {draft.name}
                </h2>
                <ArrowUpRight className="size-5 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="text-[0.9375rem] leading-[1.75] text-ink-muted">{draft.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
