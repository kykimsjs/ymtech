import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { referencesPageBlocks } from "@/content/pages/references";

const title = "실증 사례";
const description = "와이엠이노테크 에코-비탈 모듈 현장 실증 사례 (준비 중).";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const path = `/${locale}/references`;
  return {
    title,
    description,
    // 준비 중 페이지는 내용이 생길 때까지 검색에서 뺀다
    robots: { index: false, follow: true },
    alternates: { canonical: path, languages: { ko: "/ko/references" } },
    openGraph: { ...inherited.openGraph, title, description, url: path },
  };
}

export default async function ReferencesPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={referencesPageBlocks()} />
    </div>
  );
}
