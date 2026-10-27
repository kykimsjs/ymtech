import type { Block } from "@/components/blocks/registry";
import { trustItems } from "@/content/block-catalog";
import { pageBottom, pageTop } from "./common";

// 기술·인증 (1페이지: 기술 차별성 · AI 화재 예지 · 특허·인증, 2026-10-27 사이트맵)
// 문구 근거: 기획안 1장(핵심 메시지 기술 신뢰성), 3장(복합 센싱 & AI 예지), 6장(기존 제품 비교, 10초·AI 예지 알고리즘), KETI 시험성적서(2025.12),
//           제품소개 1장(감지 항목). 기존 제품은 기획안에 적힌 한계("단일 센서 위주")만 쓴다.

const pageTitle: Block = {
  type: "page-title",
  data: {
    title: "기술·인증",
    description: "전력과 환경을 함께 보고, AI로 미리 알고, 스스로 차단합니다",
    breadcrumb: ["홈", "기술·인증"],
    media: { src: "/images/home/sensing-farm.webp", alt: "센서와 배선이 설치된 실내 수경재배 시설", focus: "50% 50%" },
  },
};

const compare: Block = {
  type: "tech-compare",
  data: {
    title: "기술 차별성",
    description: "지금 쓰이는 제품은 대부분 센서 하나로 한 가지만 잽니다. 에코-비탈 모듈은 감지부터 차단까지 모듈 하나에 넣었습니다.",
    before: { label: "기존 제품", title: "단일 센서 위주", text: "온습도 또는 전력 계측 중 하나" },
    after: {
      label: "와이엠이노테크 에코-비탈 모듈",
      title: "전력 + 환경 + AI 분석 + 자동 차단을 단일 모듈로 통합",
      items: [
        { title: "전력 감지", text: "Main/Sub MCCB 연동 3상(RST/UVW) 전압·전류" },
        { title: "환경·재해 감지", text: "온·습도, 불꽃, 침수, 진동" },
        { title: "AI 분석", text: "화재로 이어질 이상 징후를 미리 탐지" },
        { title: "자동 차단", text: "SSR(전자식 릴레이)로 10초 이내 차단" },
      ],
    },
    id: "difference",
  },
};

// 기획안 6장 "AI 화재 예지 알고리즘 — 정상 데이터와 화재 연출 데이터 비교·분석(예지 보전)"
function aiBlock(tone: "light" | "dark", live: boolean): Block {
  return {
    type: "system-diagram",
    data: {
      title: "AI 화재 예지",
      description: "정상 데이터와 화재 연출 데이터를 비교·분석해, 화재로 이어질 이상 징후를 미리 찾습니다(예지 보전).",
      stages: [
        {
          label: "데이터",
          boxes: [
            { title: "정상 데이터", text: "평상시 전력·환경 측정값" },
            { title: "화재 연출 데이터", text: "화재 상황을 연출해 얻은 측정값" },
          ],
        },
        { label: "분석", boxes: [{ title: "AI 비교·분석", text: "두 데이터의 차이로 이상 패턴을 찾음", highlight: true }] },
        { label: "판단", boxes: [{ title: "이상 징후 조기 탐지", text: "화재로 번지기 전에 위험을 알림" }] },
      ],
      feedback: "이상 징후가 보이면 경보를 울리고, 모듈이 전원을 자동 차단합니다",
      pending: live ? undefined : "자료 필요: 알고리즘 설명, 시험 방법, 정확도·오탐률",
      tone,
      id: "ai",
    },
  };
}

// 숫자 근거 + 기관 마크 (2026-10-26: 마크는 HOME에서 빼고 이 페이지로)
function trustBlock(layout: "rows" | "strip"): Block {
  return {
    type: "trust-figures",
    data: {
      title: "검증과 인증",
      description: "측정 정확도는 KETI에서 시험했고,\n전기설비는 KESCO 규격을 따릅니다.",
      items: trustItems,
      layout,
      id: "certification",
    },
  };
}

// 2026-10-27: 기술 시험성적서는 보유, 인증은 아직 없음(준비 중).
// 성적서 파일·이미지는 올리지 않는다 (성적서 비고 2·3항: 사본 무효, 홍보·광고 사용 불가). 필요한 곳에는 원본을 따로 보낸다
const documents: Block = {
  type: "spec-table",
  data: {
    title: "시험·인증 현황",
    rows: [
      { label: "시험성적서", value: "보유", note: "한국전자기술연구원 광주지역본부 · 2025.12 · 필요하시면 문의해 주세요" },
      { label: "인증", value: "준비 중" },
    ],
    id: "documents",
  },
};

const tabs = [
  { label: "기술 차별성", target: "difference" },
  { label: "AI 화재 예지", target: "ai" },
  { label: "검증과 인증", target: "certification" },
  { label: "시험·인증 현황", target: "documents" },
];

export const technologyDrafts = [
  {
    id: "a",
    key: "A",
    name: "차별성 먼저",
    summary: "기존 제품과의 비교 → AI 화재 예지 흐름 → 검증 수치와 KETI·KESCO 마크(행 목록) 순. 에코-비탈 페이지와 같은 문서형 결, 섹션 이동 탭 있음.",
  },
  {
    id: "b",
    key: "B",
    name: "증거 먼저",
    summary: "10초 큰 숫자와 기관 마크 띠로 시작해 신뢰부터 보여주고(B2G 타깃), 비교와 어두운 AI 흐름도로 이어갑니다.",
  },
] as const;

export type TechnologyDraftId = (typeof technologyDrafts)[number]["id"];

// 운영 페이지(/ko/technology)는 A안 (2026-10-27 확정). live면 "자료 필요" 안내와 문서 자리 표시를 뺀다
export function technologyPageBlocks(): Block[] {
  return technologyBlocks("a", { live: true });
}

export function technologyBlocks(draft: TechnologyDraftId, { live = false }: { live?: boolean } = {}): Block[] {
  if (draft === "b") {
    return [
      ...pageTop(),
      pageTitle,
      trustBlock("strip"),
      compare,
      aiBlock("dark", live),
      documents,
      ...pageBottom(),
    ];
  }

  return [
    ...pageTop(),
    pageTitle,
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    compare,
    aiBlock("light", live),
    trustBlock("rows"),
    documents,
    ...pageBottom(),
  ];
}
