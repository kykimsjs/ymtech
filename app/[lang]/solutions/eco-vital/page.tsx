import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { ecoVitalPageBlocks, ecoVitalMeta } from "@/content/pages/eco-vital";
import { languageAlternates } from "@/lib/site";

const path = "/solutions/eco-vital";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const { title, description } = ecoVitalMeta(locale);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { ...inherited.openGraph, title, description, url: `/${locale}${path}` },
  };
}

export default async function EcoVitalPage() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={ecoVitalPageBlocks(locale)} />
    </div>
  );
}
