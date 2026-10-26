// 사이트 공통 SEO 설정.
// 도메인은 NEXT_PUBLIC_SITE_URL 환경 변수가 있으면 그 값을, 없으면 실제 도메인을 쓴다.
// (canonical·sitemap은 미리보기·로컬에서도 실제 도메인을 가리켜야 한다)
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ymforge.site";

// 검색 노출을 허용하는 언어. 영문은 원고가 준비될 때까지 noindex.
export const indexedLocales = ["ko"] as const;

// sitemap lastmod 기준일. 페이지 내용을 크게 바꾸면 갱신한다.
export const contentUpdatedAt = "2026-10-26";

// 회사 정보 — 푸터와 구조화 데이터(JSON-LD)에서 함께 쓴다
export const organization = {
  name: "와이엠이노테크",
  alternateName: "YM INNOTECH",
  logo: "/brand/ym-signature.png",
  ceo: "유영민",
  phone: "010-8681-9434",
  address: {
    region: "전라남도",
    locality: "나주시",
    street: "그린로 370, 411-412호",
  },
};

export const fullAddress = `${organization.address.region} ${organization.address.locality} ${organization.address.street}`;

// 국제 표기 전화번호 (010-8681-9434 → +82-10-8681-9434)
export const phoneE164 = `+82-${organization.phone.replace(/^0/, "")}`;
