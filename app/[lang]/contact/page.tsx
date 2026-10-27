import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getLocale } from "@/content/dictionaries";
import { contactPageBlocks, contactMeta } from "@/content/pages/contact";
import { languageAlternates } from "@/lib/site";

const path = "/contact";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  const { title, description } = contactMeta(locale);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages: languageAlternates(path) },
    openGraph: { ...inherited.openGraph, title, description, url: `/${locale}${path}` },
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={contactPageBlocks(locale)} />
    </div>
  );
}
