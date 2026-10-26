import type { MetadataRoute } from "next";
import { contentUpdatedAt, indexedLocales, siteUrl } from "@/lib/site";

// 검색에 노출하는 페이지만 넣는다. 하위 페이지를 만들 때마다 여기에 추가한다.
const pages: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedLocales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page.path}`,
      lastModified: contentUpdatedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  );
}
