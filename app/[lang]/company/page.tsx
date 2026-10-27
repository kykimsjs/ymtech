import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { companyPageBlocks } from "@/content/pages/company";

const description = "와이엠이노테크 대표이사 인사말, 기업 비전과 미션, 팀과 협력 파트너를 소개합니다.";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  return {
    title: "회사소개",
    description,
    alternates: { canonical: `/${locale}/company`, languages: { ko: "/ko/company" } },
    openGraph: { ...inherited.openGraph, title: "회사소개", description, url: `/${locale}/company` },
  };
}

export default async function CompanyPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={companyPageBlocks()} />
    </div>
  );
}
