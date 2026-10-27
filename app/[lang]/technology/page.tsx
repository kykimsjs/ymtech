import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { technologyPageBlocks, technologyMeta } from "@/content/pages/technology";
import { languageAlternates } from "@/lib/site";

const path = "/technology";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const { title, description } = technologyMeta(locale);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { ...inherited.openGraph, title, description, url: `/${locale}${path}` },
  };
}

export default async function TechnologyPage() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={technologyPageBlocks(locale)} />
    </div>
  );
}
