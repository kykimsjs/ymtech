import type { Block } from "@/components/blocks/registry";
import { footerColumns, nav, quickActions } from "@/content/block-catalog";
import { fullAddress, organization, phoneE164 } from "@/lib/site";

// 모든 페이지가 같이 쓰는 블록: 상단 공지 바 · 헤더 / 문의 섹션 · 푸터

export function pageTop({ headerTone = "light" }: { headerTone?: "light" | "dark" } = {}): Block[] {
  return [
    {
      // 소개서 PDF를 받으면 status를 빼고 href에 PDF 주소를 넣는다
      type: "announcement-bar",
      data: { text: "에코-비탈 모듈 제품 소개서", linkLabel: "PDF 받기", href: "#", status: "준비 중" },
    },
    {
      type: "site-header",
      data: {
        nav,
        cta: { label: "도입 문의", href: "/ko/contact" },
        tone: headerTone,
        sticky: true,
        locales: [
          { label: "KR", href: "/ko", active: true },
          { label: "EN", href: "/en" },
        ],
      },
    },
  ];
}

// 문의 페이지처럼 페이지 자체가 문의일 때는 문의 섹션 없이 푸터만
export function pageBottom({ closing = true }: { closing?: boolean } = {}): Block[] {
  return [
    ...(closing ? [closingCta] : []),
    footer,
  ];
}

const closingCta: Block = {
  // 기획안 HOME Quick Actions를 페이지 끝 문의 섹션 안에 넣었다
  // 사진: Pexels 32146752 (온실 내부), Pexels 라이선스
  type: "closing-cta",
  data: {
    title: "우리 농장 분전반에도 설치할 수 있을까요?",
    text: "전화나 이메일로 바로 물어보셔도 되고,\n문의 양식을 남겨 주셔도 됩니다.",
    contacts: [
      { label: "대표전화", value: organization.phone, href: `tel:${phoneE164}` },
      { label: "이메일", value: organization.email, href: `mailto:${organization.email}` },
    ],
    // 문의를 맨 위로
    actions: [quickActions[1], quickActions[0], quickActions[2]],
    media: { src: "/images/home/closing-greenhouse.webp", alt: "환기팬이 달린 온실에서 자라는 잎채소", focus: "50% 50%" },
  },
};

const footer: Block = {
  type: "site-footer",
  data: {
    columns: footerColumns,
    // 1줄 회사·대표·주소, 2줄 연락처 (사업자등록번호는 받으면 2줄 맨 앞에)
    info: [
      [{ value: organization.name }, { label: "대표", value: organization.ceo }, { value: fullAddress }],
      [
        { label: "대표전화", value: organization.phone, href: `tel:${phoneE164}` },
        { label: "이메일", value: organization.email, href: `mailto:${organization.email}` },
      ],
    ],
    copyright: "© YM INNOTECH. All rights reserved.",
  },
};
