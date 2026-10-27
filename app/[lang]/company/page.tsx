import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { companyMeta, companyPageBlocks } from "@/content/pages/company";
import { languageAlternates } from "@/lib/site";

const path = "/company";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const { title, description } = companyMeta(locale);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { ...inherited.openGraph, title, description, url: `/${locale}${path}` },
  };
}

export default async function CompanyPage() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={companyPageBlocks(locale)} />
    </div>
  );
}
