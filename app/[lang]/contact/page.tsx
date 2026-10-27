import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { contactPageBlocks } from "@/content/pages/contact";

const title = "문의";
const description = "에코-비탈 모듈 도입·실증 문의, 대표전화·이메일과 오시는 길 (전남 나주 빛가람동).";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const path = `/${locale}/contact`;
  return {
    title,
    description,
    alternates: { canonical: path, languages: { ko: "/ko/contact" } },
    openGraph: { ...inherited.openGraph, title, description, url: path },
  };
}

export default async function ContactPage() {
  // 영문 원고가 준비되기 전까지 /en 하위 페이지는 없다
  if ((await getLocale()) !== "ko") notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={contactPageBlocks()} />
    </div>
  );
}
