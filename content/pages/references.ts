import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { translator } from "@/content/shared";
import { pageBottom, pageTop } from "./common";

// 실증 사례 (2026-10-27): 아직 공개할 실증 자료가 없어 "준비 중"으로 연다.
// 자료(현장 사진·기간·규모·결과)가 오면 gallery-tabs·stats-gallery로 채운다 (기획안 7장 Reference, 도입 효과 포함)
// 영문은 국문을 옮긴 번역 초안 (2026-10-27)
export function referencesPageBlocks(locale: Locale): Block[] {
  const t = translator(locale);
  return [
    ...pageTop({ locale, path: "/references" }),
    {
      type: "page-title",
      data: {
        title: t("실증 사례", "References"),
        status: t("준비 중", "Coming soon"),
        description: t("현장 실증 사례를 정리하고 있습니다", "We are putting together our field pilot results"),
        breadcrumb: [t("홈", "Home"), t("실증 사례", "References")],
        media: {
          src: "/images/hero/ai-greenhouse.webp",
          alt: t("유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", "Long rows of raised strawberry beds inside a glass greenhouse"),
          focus: "62% 50%",
        },
      },
    },
    {
      type: "statement",
      data: {
        eyebrow: t("실증 사례", "References"),
        title: t("현장 실증 사례를 준비하고 있습니다", "Field pilot results are on the way"),
        paragraphs: [
          t(
            "실증 결과가 정리되는 대로 이곳에 공개합니다.\n도입이나 실증을 검토 중이시라면 문의를 남겨 주세요. 자세히 안내드리겠습니다.",
            "We will publish our pilot results here as soon as they are ready.\nIf you are considering an installation or a pilot, please get in touch and we will walk you through it.",
          ),
        ],
      },
    },
    ...pageBottom({ locale }),
  ];
}

export function referencesMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("실증 사례", "References"),
    description: t("와이엠이노테크 에코-비탈 모듈 현장 실증 사례 (준비 중).", "Field pilot results for the YM INNOTECH Eeco-Vital module (coming soon)."),
  };
}
