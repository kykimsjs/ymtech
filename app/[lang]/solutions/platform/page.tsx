import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { platformPageBlocks } from "@/content/pages/platform";

const title = "통합 웹 플랫폼";
const description = "에코-비탈 모듈이 보낸 분전반의 전력·환경 데이터를 한 화면에서 보고, 이상을 알리고 기록하는 웹 플랫폼 (준비 중).";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const path = `/${locale}/solutions/platform`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ko: "/ko/solutions/platform" } },
    openGraph: { ...inherited.openGraph, title, description, url: path },
  };
}

export default async function PlatformPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={platformPageBlocks()} />
    </div>
  );
}
