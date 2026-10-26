// 사이트 공통 SEO 설정.
// 실제 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경 변수로 지정한다.
// 없으면 Vercel이 자동으로 넣어 주는 프로덕션 도메인, 로컬에서는 localhost를 쓴다.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

// 검색 노출을 허용하는 언어. 영문은 원고가 준비될 때까지 noindex.
export const indexedLocales = ["ko"] as const;

// sitemap lastmod 기준일. 페이지 내용을 크게 바꾸면 갱신한다.
export const contentUpdatedAt = "2026-10-26";

export const organization = {
  name: "와이엠이노테크",
  alternateName: "YM INNOTECH",
  logo: "/brand/ym-signature.png",
};
