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
  email: "dol-7@hanmail.net",
  // 우편번호·참고항목(빛가람동)은 주소정보누리집(juso.go.kr) 조회 결과 (2026-10-26)
  address: {
    postalCode: "58324",
    region: "전남광주통합특별시",
    locality: "나주시",
    street: "그린로 370, 411-412호",
    district: "빛가람동",
  },
};

export const fullAddress = `(${organization.address.postalCode}) ${organization.address.region} ${organization.address.locality} ${organization.address.street} (${organization.address.district})`;

// 국제 표기 전화번호 (010-8681-9434 → +82-10-8681-9434)
export const phoneE164 = `+82-${organization.phone.replace(/^0/, "")}`;

// 영문 표기 (2026-10-27 번역 초안). 대표 이름 로마자는 클라이언트 확인 필요.
// 새 광역 이름(전남광주통합특별시)은 공식 영문 명칭이 아직 없어 도로명·시·우편번호로만 적는다
export const organizationEn = {
  name: "YM INNOTECH",
  ceo: "Yoo Young-min",
  address: "411-412, 370 Green-ro, Naju-si, 58324, Republic of Korea",
};

// hreflang 짝. 검색에 노출하는 언어만 넣는다 (영문은 클라이언트 검토 후 indexedLocales에 en을 넣으면 자동으로 붙는다)
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of indexedLocales) languages[locale] = `/${locale}${path}`;
  if (indexedLocales.length > 1) languages["x-default"] = `/ko${path}`;
  return languages;
}
