import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { ecoVitalPageBlocks } from "@/content/pages/eco-vital";

const title = "에코-비탈 모듈";
const description = "분전반 안에 장착해 3상 전력과 온·습도·불꽃·침수·진동을 함께 감지하고, 이상이 생기면 10초 안에 자동으로 전원을 차단하는 AIoT 에너지·화재 관리 모듈.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const path = `/${locale}/solutions/eco-vital`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ko: "/ko/solutions/eco-vital" } },
    openGraph: { ...inherited.openGraph, title, description, url: path },
  };
}

export default async function EcoVitalPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={ecoVitalPageBlocks()} />
    </div>
  );
}
