import type { Block } from "@/components/blocks/registry";
import { organization, fullAddress, phoneE164 } from "@/lib/site";
import { pageBottom, pageTop } from "./common";

// 문의 (1페이지: 문의 폼 · 오시는 길, 2026-10-27 사이트맵)
// 기획안 7장 Contact: 도입·실증 문의 폼, 오시는 길(지도). 공지사항은 빼기로 함(2026-10-26)
// 페이지 자체가 문의라 페이지 끝 문의 섹션(closing-cta)은 넣지 않는다

const pageTitle: Block = {
  type: "page-title",
  data: {
    title: "문의",
    description: "도입·실증 문의를 남겨 주시면 확인 후 연락드립니다",
    breadcrumb: ["홈", "문의"],
    media: { src: "/images/home/closing-greenhouse.webp", alt: "환기팬이 달린 온실에서 자라는 잎채소", focus: "50% 50%" },
  },
};

const contacts = [
  { label: "대표전화", value: organization.phone, href: `tel:${phoneE164}`, icon: "phone" as const },
  { label: "이메일", value: organization.email, href: `mailto:${organization.email}`, icon: "mail" as const },
];

const form = {
  topics: ["도입 문의", "실증 문의", "제품 소개서 요청", "기타"],
  // 보유 기간: 답변 후 바로 파기 (2026-10-27 확정)
  privacy: {
    items: "이름, 소속, 연락처, 이메일, 설치 장소, 문의 내용",
    purpose: "문의 확인과 답변",
    retention: "답변 완료 후 지체 없이 파기",
  },
};

const section = {
  title: "도입·실증 문의",
  description: "농가, 시공사, 지자체 담당자 모두 문의하실 수 있습니다. 전화나 이메일로 바로 연락하셔도 됩니다.",
  contacts,
  form,
  id: "inquiry",
};

// 지도 앱 검색어는 도로명 주소 (새 광역 이름은 지도 검색에 아직 없을 수 있어 시·도로명만)
const mapQuery = `${organization.address.locality} ${organization.address.street.split(",")[0]}`;

function location(): Block {
  return {
    type: "contact-location",
    data: {
      title: "오시는 길",
      address: fullAddress,
      mapLinks: [
        { label: "네이버 지도", href: `https://map.naver.com/p/search/${encodeURIComponent(mapQuery)}` },
        { label: "카카오맵", href: `https://map.kakao.com/?q=${encodeURIComponent(mapQuery)}` },
      ],
      // 구글 지도 퍼가기: API 키 없이 동작 (2026-10-27 "지도 넣어야지"). 카카오맵으로 바꾸려면 JavaScript 키가 필요
      embed: {
        src: `https://maps.google.com/maps?q=${encodeURIComponent(`전라남도 ${mapQuery}`)}&z=16&hl=ko&output=embed`,
        title: `와이엠이노테크 위치 지도: ${fullAddress}`,
      },
      id: "location",
    },
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
export function contactPageBlocks(): Block[] {
  return contactBlocks("a");
}

export function contactBlocks(draft: ContactDraftId): Block[] {
  return [
    ...pageTop(),
    pageTitle,
    { type: "contact-section", data: { variant: draft === "b" ? "stacked" : "split", ...section } },
    location(),
    ...pageBottom({ closing: false }),
  ];
}
