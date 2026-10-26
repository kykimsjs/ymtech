import type { Metadata, ResolvingMetadata } from "next";
import { Blocks } from "@/components/blocks/registry";
import { Logo } from "@/components/ui/logo";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { homeBlocks } from "@/content/pages/home";
import { organization, phoneE164, siteUrl } from "@/lib/site";

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const [locale, inherited] = await Promise.all([getLocale(), parent]);
  return {
    alternates: {
      canonical: `/${locale}`,
      // 영문 원고가 생기면 en과 x-default 매핑을 함께 넣는다
      languages: { ko: "/ko" },
    },
    // openGraph는 얕게 합쳐지므로 레이아웃 값(type, siteName, locale, 이미지)을 이어받고 url만 더한다
    openGraph: { ...inherited.openGraph, url: `/${locale}` },
  };
}

// 검색엔진·AI가 회사와 사이트를 이해하도록 돕는 구조화 데이터
async function StructuredData() {
  const { meta } = await getDictionary();
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
        url: `${siteUrl}/ko`,
        name: meta.siteName,
        inLanguage: "ko-KR",
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

  // 영문 원고가 준비되기 전까지 /en은 안내만 둔다 (검색 제외: layout robots)
  if (locale !== "ko") {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
        <Logo type="vertical" className="w-48" preload />
        <p className="text-ink-muted">Our English website is coming soon.</p>
      </main>
    );
  }

  return (
    <div data-site className="bg-canvas text-ink">
      <StructuredData />
      <Blocks items={homeBlocks()} />
    </div>
  );
}
