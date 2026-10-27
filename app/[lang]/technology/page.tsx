import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { technologyPageBlocks } from "@/content/pages/technology";

const title = "기술·인증";
const description = "전력·환경 감지, AI 화재 예지, 자동 차단을 한 모듈에 담은 에코-비탈의 기술 차별성과 KETI 시험, KESCO 규격 준수.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const path = `/${locale}/technology`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ko: "/ko/technology" } },
    openGraph: { ...inherited.openGraph, title, description, url: path },
  };
}

export default async function TechnologyPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={technologyPageBlocks()} />
    </div>
  );
}
