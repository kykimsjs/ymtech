import type { Metadata } from "next";
import Link from "next/link";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { homeBlocks } from "@/content/pages/home";

export const metadata: Metadata = {
  title: "HOME 시안",
  robots: { index: false, follow: false },
};

// 실제 /ko에 올리기 전 확인용. 운영 시 숨길 블록도 표시해서 보여준다.
export default async function HomeDraftPage() {
  const locale = await getLocale();
  const blocks = homeBlocks();
  const hiddenCount = blocks.filter((block) => block.hidden).length;

  return (
    <>
      <Blocks items={blocks} showHidden />
      <nav
        aria-label="시안 검토"
        className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#111]/90 p-1 text-sm whitespace-nowrap text-white shadow-lg backdrop-blur"
      >
        <span className="px-3 py-1.5 font-semibold">
          HOME 시안<span className="max-sm:hidden"> · 숨김 {hiddenCount}개 표시 중</span>
        </span>
        <Link href={`/${locale}/design`} className="rounded-full px-3 py-1.5 text-white/75 hover:text-white">
          디자인 시스템
        </Link>
        <Link href={`/${locale}/design/blocks`} className="rounded-full px-3 py-1.5 text-white/75 hover:text-white max-sm:hidden">
          블록
        </Link>
        <Link href={`/${locale}/design/drafts`} className="rounded-full px-3 py-1.5 text-white/75 hover:text-white max-sm:hidden">
          색감 비교
        </Link>
      </nav>
    </>
  );
}
