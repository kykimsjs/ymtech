import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { translator } from "@/content/shared";
import { fullAddress, organization, organizationEn, phoneE164 } from "@/lib/site";
import { pageBottom, pageTop } from "./common";

// 문의 (1페이지: 문의 폼 · 오시는 길, 2026-10-27 사이트맵)
// 기획안 7장 Contact: 도입·실증 문의 폼, 오시는 길(지도). 공지사항은 빼기로 함(2026-10-26)
// 페이지 자체가 문의라 페이지 끝 문의 섹션(closing-cta)은 넣지 않는다
// 영문은 국문을 옮긴 번역 초안 (2026-10-27). 영문 지도 링크는 구글 지도

// 지도 검색어는 도로명 주소 (새 광역 이름은 지도 검색에 아직 없을 수 있어 시·도로명만)
const mapQuery = `${organization.address.locality} ${organization.address.street.split(",")[0]}`;

function content(locale: Locale) {
  const t = translator(locale);
  const en = locale === "en";

  const pageTitle: Block = {
    type: "page-title",
    data: {
      title: t("문의", "Contact"),
      description: t("도입·실증 문의를 남겨 주시면 확인 후 연락드립니다", "Send us an installation or pilot inquiry and we will get back to you"),
      breadcrumb: [t("홈", "Home"), t("문의", "Contact")],
      media: {
        src: "/images/home/closing-greenhouse.webp",
        alt: t("환기팬이 달린 온실에서 자라는 잎채소", "Leafy greens growing in a greenhouse with ventilation fans"),
        focus: "50% 50%",
      },
    },
  };

  const section = {
    title: t("도입·실증 문의", "Installation & pilot inquiries"),
    description: t(
      "농가, 시공사, 지자체 담당자 모두 문의하실 수 있습니다. 전화나 이메일로 바로 연락하셔도 됩니다.",
      "Farms, contractors and public agencies are all welcome. You can also call or email us directly.",
    ),
    contacts: [
      { label: t("대표전화", "Phone"), value: en ? phoneE164 : organization.phone, href: `tel:${phoneE164}`, icon: "phone" as const },
      { label: t("이메일", "Email"), value: organization.email, href: `mailto:${organization.email}`, icon: "mail" as const },
    ],
    form: {
      topics: en ? ["Installation", "Pilot project", "Brochure request", "Other"] : ["도입 문의", "실증 문의", "제품 소개서 요청", "기타"],
      // 보유 기간: 답변 후 바로 파기 (2026-10-27 확정)
      privacy: {
        items: t("이름, 소속, 연락처, 이메일, 설치 장소, 문의 내용", "Name, organization, phone, email, installation site, message"),
        purpose: t("문의 확인과 답변", "Reviewing and answering your inquiry"),
        retention: t("답변 완료 후 지체 없이 파기", "Deleted without delay once we have answered"),
      },
    },
    id: "inquiry",
  };

  const address = en ? organizationEn.address : fullAddress;
  const location: Block = {
    type: "contact-location",
    data: {
      title: t("오시는 길", "Location"),
      address,
      mapLinks: en
        ? [{ label: "Google Maps", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mapQuery} 전라남도`)}` }]
        : [
            { label: "네이버 지도", href: `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}` },
            { label: "카카오맵", href: `https://map.kakao.com/?q=${encodeURIComponent(mapQuery)}` },
          ],
      // 구글 지도 퍼가기: API 키 없이 동작 (2026-10-27 "지도 넣어야지"). 카카오맵으로 바꾸려면 JavaScript 키가 필요
      embed: {
        src: `https://maps.google.com/maps?q=${encodeURIComponent(`전라남도 ${mapQuery}`)}&z=16&hl=${locale}&output=embed`,
        title: t(`와이엠이노테크 위치 지도: ${fullAddress}`, `Map of YM INNOTECH: ${organizationEn.address}`),
      },
      id: "location",
    },
  };

  return { pageTitle, section, location };
}

export function contactMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("문의", "Contact"),
    description: t(
      "에코-비탈 모듈 도입·실증 문의, 대표전화·이메일과 오시는 길 (전남 나주 빛가람동).",
      "Installation and pilot inquiries for the Eeco-Vital module, with phone, email and directions (Naju, Korea).",
    ),
  };
}

export const contactDrafts = [
  {
    id: "a",
    key: "A",
    name: "나란히",
    summary: "왼쪽에 안내 문구와 대표전화·이메일, 오른쪽에 문의 폼. 폼을 쓰지 않는 사람도 바로 전화·메일로 갈 수 있습니다.",
  },
  {
    id: "b",
    key: "B",
    name: "위아래",
    summary: "위에 안내와 연락처를 한 줄로, 아래에 가운데 넓은 폼. 폼에 집중하는 배치입니다.",
  },
] as const;

export type ContactDraftId = (typeof contactDrafts)[number]["id"];

// 운영 페이지(/ko/contact)는 A안 (2026-10-27 확정)
export function contactPageBlocks(locale: Locale): Block[] {
  return contactBlocks("a", locale);
}

export function contactBlocks(draft: ContactDraftId, locale: Locale = "ko"): Block[] {
  const { pageTitle, section, location } = content(locale);
  return [
    ...pageTop({ locale, path: "/contact" }),
    pageTitle,
    { type: "contact-section", data: { variant: draft === "b" ? "stacked" : "split", ...section } },
    location,
    ...pageBottom({ closing: false, locale }),
  ];
}
