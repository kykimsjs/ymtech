import type { Metadata, Viewport } from "next";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { locales } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/locale-context";
import { indexedLocales, siteUrl } from "@/lib/site";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// 모든 페이지 공통 메타데이터. canonical은 하위 페이지까지 상속되므로 각 page에서 지정한다.
export async function generateMetadata(): Promise<Metadata> {
  const [{ meta }, locale] = await Promise.all([getDictionary(), getLocale()]);
  const indexed = (indexedLocales as readonly string[]).includes(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: meta.title, template: `%s | ${meta.siteName}` },
    description: meta.description,
    applicationName: meta.siteName,
    openGraph: {
      type: "website",
      siteName: meta.siteName,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    // 원고가 없는 언어는 검색에서 제외
    robots: indexed ? { index: true, follow: true } : { index: false, follow: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#101a35",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    // data-scroll-behavior: 페이지를 옮길 때는 부드러운 스크롤을 끄고 바로 맨 위로 (globals.css의 smooth는 같은 페이지 안 이동에만)
    <html lang={locale} className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
