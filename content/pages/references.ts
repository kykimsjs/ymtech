import type { Block } from "@/components/blocks/registry";
import { pageBottom, pageTop } from "./common";

// 실증 사례 (2026-10-27): 아직 공개할 실증 자료가 없어 "준비 중"으로 연다.
// 자료(현장 사진·기간·규모·결과)가 오면 gallery-tabs·stats-gallery로 채운다 (기획안 7장 Reference, 도입 효과 포함)
export function referencesPageBlocks(): Block[] {
  return [
    ...pageTop(),
    {
      type: "page-title",
      data: {
        title: "실증 사례",
        status: "준비 중",
        description: "현장 실증 사례를 정리하고 있습니다",
        breadcrumb: ["홈", "실증 사례"],
        media: { src: "/images/hero/ai-greenhouse.webp", alt: "유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", focus: "62% 50%" },
      },
    },
    {
      type: "statement",
      data: {
        eyebrow: "실증 사례",
        title: "현장 실증 사례를 준비하고 있습니다",
        paragraphs: ["실증 결과가 정리되는 대로 이곳에 공개합니다.\n도입이나 실증을 검토 중이시라면 문의를 남겨 주세요. 자세히 안내드리겠습니다."],
      },
    },
    ...pageBottom(),
  ];
}
