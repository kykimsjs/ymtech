import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { homeBlocks } from "@/content/pages/home";
import { languageAlternates, organization, phoneE164, siteUrl } from "@/lib/site";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  return {
    alternates: {
      canonical: `/${locale}`,
      // 검색에 노출하는 언어만 짝을 짓는다 (lib/site indexedLocales)
      languages: languageAlternates(""),
    },
    // openGraph는 얕게 합쳐지므로 레이아웃 값(type, siteName, locale, 이미지)을 이어받고 url만 더한다
    openGraph: { ...inherited.openGraph, url: `/${locale}` },
  };
}

// 검색엔진·AI가 회사와 사이트를 이해하도록 돕는 구조화 데이터
async function StructuredData() {
  const [{ meta }, locale] = await Promise.all([getDictionary(), getLocale()]);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: organization.name,
        alternateName: organization.alternateName,
        url: siteUrl,
        logo: `${siteUrl}${organization.logo}`,
        description: meta.description,
        telephone: phoneE164,
        email: organization.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "KR",
          postalCode: organization.address.postalCode,
          addressRegion: organization.address.region,
          addressLocality: organization.address.locality,
          streetAddress: organization.address.street,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/${locale}`,
        name: meta.siteName,
        inLanguage: locale === "en" ? "en-US" : "ko-KR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home() {
  const locale = await getLocale();
  return (
    <div data-site className="bg-canvas text-ink">
      <StructuredData />
      <Blocks items={homeBlocks({ locale })} />
    </div>
  );
}
