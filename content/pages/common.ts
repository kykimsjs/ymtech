import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { fullAddress, organization, organizationEn, phoneE164 } from "@/lib/site";
import { footerColumnsFor, navFor, quickActionsFor, translator } from "../shared";

// 모든 페이지가 같이 쓰는 블록: 상단 공지 바 · 헤더 / 문의 섹션 · 푸터
// path: 언어를 뺀 지금 페이지 주소 (예: "/company"). KR/EN 전환이 같은 페이지끼리 오가게 한다

type PageOptions = { locale?: Locale; path?: string };

export function pageTop({ headerTone = "light", locale = "ko", path = "" }: PageOptions & { headerTone?: "light" | "dark" } = {}): Block[] {
  const t = translator(locale);
  return [
    {
      // 소개서 PDF를 받으면 status를 빼고 href에 PDF 주소를 넣는다
      type: "announcement-bar",
      data: {
        text: t("에코-비탈 모듈 제품 소개서", "Eeco-Vital module brochure"),
        linkLabel: t("PDF 받기", "Download PDF"),
        href: "#",
        status: t("준비 중", "Coming soon"),
        // 지금은 닫아도 새로고침하면 다시 보인다 (2026-10-27). 다음 방문까지 기억하려면 true
        remember: false,
      },
    },
    {
      type: "site-header",
      data: {
        nav: navFor(locale),
        cta: { label: t("도입 문의", "Contact us"), href: `/${locale}/contact` },
        tone: headerTone,
        sticky: true,
        locales: [
          { label: "KR", href: `/ko${path}`, active: locale === "ko" },
          { label: "EN", href: `/en${path}`, active: locale === "en" },
        ],
      },
    },
  ];
}

// 문의 페이지처럼 페이지 자체가 문의일 때는 문의 섹션 없이 푸터만
export function pageBottom({ closing = true, locale = "ko" }: PageOptions & { closing?: boolean } = {}): Block[] {
  return [...(closing ? [closingCta(locale)] : []), footer(locale)];
}

function closingCta(locale: Locale): Block {
  const t = translator(locale);
  const actions = quickActionsFor(locale);
  const phone = locale === "en" ? phoneE164 : organization.phone;
  return {
    // 기획안 HOME Quick Actions를 페이지 끝 문의 섹션 안에 넣었다
    // 사진: Pexels 32146752 (온실 내부), Pexels 라이선스
    type: "closing-cta",
    data: {
      title: t("우리 농장 분전반에도 설치할 수 있을까요?", "Will it fit the distribution panels on your site?"),
      text: t("전화나 이메일로 바로 물어보셔도 되고,\n문의 양식을 남겨 주셔도 됩니다.", "Call or email us directly,\nor send us a message through the inquiry form."),
      contacts: [
        { label: t("대표전화", "Phone"), value: phone, href: `tel:${phoneE164}` },
        { label: t("이메일", "Email"), value: organization.email, href: `mailto:${organization.email}` },
      ],
      // 문의를 맨 위로
      actions: [actions[1], actions[0], actions[2]],
      media: {
        src: "/images/home/closing-greenhouse.webp",
        alt: t("환기팬이 달린 온실에서 자라는 잎채소", "Leafy greens growing in a greenhouse with ventilation fans"),
        focus: "50% 50%",
      },
    },
  };
}

function footer(locale: Locale): Block {
  const t = translator(locale);
  const en = locale === "en";
  return {
    type: "site-footer",
    data: {
      columns: footerColumnsFor(locale),
      // 1줄 회사·대표·주소, 2줄 연락처
      info: [
        [
          { value: en ? organizationEn.name : organization.name },
          { label: t("대표", "CEO"), value: en ? organizationEn.ceo : organization.ceo },
          { value: en ? organizationEn.address : fullAddress },
        ],
        [
          { label: t("대표전화", "Phone"), value: en ? phoneE164 : organization.phone, href: `tel:${phoneE164}` },
          { label: t("이메일", "Email"), value: organization.email, href: `mailto:${organization.email}` },
        ],
      ],
      copyright: "© YM INNOTECH. All rights reserved.",
    },
  };
}
