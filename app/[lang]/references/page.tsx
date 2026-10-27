import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { referencesPageBlocks, referencesMeta } from "@/content/pages/references";
import { languageAlternates } from "@/lib/site";

const path = "/references";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const { title, description } = referencesMeta(locale);
  return {
    title,
    description,
    // 준비 중 페이지는 내용이 생길 때까지 검색에서 뺀다
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { ...inherited.openGraph, title, description, url: `/${locale}${path}` },
  };
}

export default async function ReferencesPage() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={referencesPageBlocks(locale)} />
    </div>
  );
}
