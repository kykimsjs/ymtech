import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { translator, trustItemsFor } from "@/content/shared";
import { pageBottom, pageTop } from "./common";

// 기술·인증 (1페이지: 기술 차별성 · AI 화재 예지 · 특허·인증, 2026-10-27 사이트맵)
// 문구 근거: 기획안 1장(핵심 메시지 기술 신뢰성), 3장(복합 센싱 & AI 예지), 6장(기존 제품 비교, 10초·AI 예지 알고리즘), KETI 시험성적서(2025.12),
//           제품소개 1장(감지 항목). 기존 제품은 기획안에 적힌 한계("단일 센서 위주")만 쓴다.
// 영문은 국문을 옮긴 번역 초안 (2026-10-27). 인증이 아직 없어 영문 제목은 "Technology"로 둔다

function content(locale: Locale) {
  const t = translator(locale);

  const pageTitle: Block = {
    type: "page-title",
    data: {
      title: t("기술·인증", "Technology"),
      description: t("전력과 환경을 함께 보고, AI로 미리 알고, 스스로 차단합니다", "It watches power and environment together, predicts with AI, and cuts power on its own"),
      breadcrumb: [t("홈", "Home"), t("기술·인증", "Technology")],
      media: { src: "/images/home/sensing-farm.webp", alt: t("센서와 배선이 설치된 실내 수경재배 시설", "Indoor hydroponic facility with sensors and wiring"), focus: "50% 50%" },
    },
  };

  const compare: Block = {
    type: "tech-compare",
    data: {
      title: t("기술 차별성", "What sets it apart"),
      description: t(
        "지금 쓰이는 제품은 대부분 센서 하나로 한 가지만 잽니다. 에코-비탈 모듈은 감지부터 차단까지 모듈 하나에 넣었습니다.",
        "Most products on the market measure just one thing with a single sensor. The Eeco-Vital module puts everything from sensing to cut-off into one module.",
      ),
      before: {
        label: t("기존 제품", "Existing products"),
        title: t("단일 센서 위주", "Single-sensor focus"),
        text: t("온습도 또는 전력 계측 중 하나", "Measure either temperature and humidity, or power"),
      },
      after: {
        label: t("와이엠이노테크 에코-비탈 모듈", "YM INNOTECH Eeco-Vital module"),
        title: t("전력 + 환경 + AI 분석 + 자동 차단을 단일 모듈로 통합", "Power + environment + AI analysis + automatic cut-off in a single module"),
        items: [
          { title: t("전력 감지", "Power sensing"), text: t("Main/Sub MCCB 연동 3상(RST/UVW) 전압·전류", "3-phase (RST/UVW) voltage·current, linked to main/sub MCCBs") },
          { title: t("환경·재해 감지", "Environment & hazard sensing"), text: t("온·습도, 불꽃, 침수, 진동", "Temperature·humidity, flame, flooding, vibration") },
          { title: t("AI 분석", "AI analysis"), text: t("화재로 이어질 이상 징후를 미리 탐지", "Detects warning signs before they lead to a fire") },
          { title: t("자동 차단", "Automatic cut-off"), text: t("SSR(전자식 릴레이)로 10초 이내 차단", "Cut-off within 10 seconds via SSR (solid-state relay)") },
        ],
      },
      id: "difference",
    },
  };

  // 기획안 6장 "AI 화재 예지 알고리즘 — 정상 데이터와 화재 연출 데이터 비교·분석(예지 보전)"
  const aiBlock = (tone: "light" | "dark", live: boolean): Block => ({
    type: "system-diagram",
    data: {
      title: t("AI 화재 예지", "AI fire prediction"),
      description: t(
        "정상 데이터와 화재 연출 데이터를 비교·분석해, 화재로 이어질 이상 징후를 미리 찾습니다(예지 보전).",
        "By comparing normal data with data from staged fire scenarios, it finds warning signs before they turn into a fire (predictive maintenance).",
      ),
      stages: [
        {
          label: t("데이터", "Data"),
          boxes: [
            { title: t("정상 데이터", "Normal data"), text: t("평상시 전력·환경 측정값", "Power and environmental readings in normal conditions") },
            { title: t("화재 연출 데이터", "Staged fire data"), text: t("화재 상황을 연출해 얻은 측정값", "Readings taken while simulating fire conditions") },
          ],
        },
        {
          label: t("분석", "Analysis"),
          boxes: [{ title: t("AI 비교·분석", "AI comparison"), text: t("두 데이터의 차이로 이상 패턴을 찾음", "Finds abnormal patterns from the difference between the two"), highlight: true }],
        },
        {
          label: t("판단", "Decision"),
          boxes: [{ title: t("이상 징후 조기 탐지", "Early warning"), text: t("화재로 번지기 전에 위험을 알림", "Flags the risk before it becomes a fire") }],
        },
      ],
      feedback: t("이상 징후가 보이면 경보를 울리고, 모듈이 전원을 자동 차단합니다", "When warning signs appear, it raises an alarm and the module cuts power automatically"),
      pending: live ? undefined : "자료 필요: 알고리즘 설명, 시험 방법, 정확도·오탐률",
      tone,
      id: "ai",
    },
  });

  // 숫자 근거 + 기관 마크 (2026-10-26: 마크는 HOME에서 빼고 이 페이지로)
  const trustBlock = (layout: "rows" | "strip"): Block => ({
    type: "trust-figures",
    data: {
      title: t("검증과 인증", "Testing & standards"),
      description: t(
        "측정 정확도는 KETI에서 시험했고,\n전기설비는 KESCO 규격을 따릅니다.",
        "Measurement accuracy was tested by KETI,\nand the electrical installation follows KESCO standards.",
      ),
      items: trustItemsFor(locale),
      layout,
      id: "certification",
    },
  });

  // 2026-10-27: 기술 시험성적서는 보유, 인증은 아직 없음(준비 중).
  // 성적서 파일·이미지는 올리지 않는다 (성적서 비고 2·3항: 사본 무효, 홍보·광고 사용 불가). 필요한 곳에는 원본을 따로 보낸다
  const documents: Block = {
    type: "spec-table",
    data: {
      title: t("시험·인증 현황", "Test reports & certification"),
      rows: [
        {
          label: t("시험성적서", "Test report"),
          value: t("보유", "On file"),
          note: t("한국전자기술연구원 광주지역본부 · 2025.12 · 필요하시면 문의해 주세요", "Korea Electronics Technology Institute, Gwangju · Dec 2025 · available on request"),
        },
        { label: t("인증", "Certification"), value: t("준비 중", "In preparation") },
      ],
      id: "documents",
    },
  };

  const tabs = [
    { label: t("기술 차별성", "What sets it apart"), target: "difference" },
    { label: t("AI 화재 예지", "AI fire prediction"), target: "ai" },
    { label: t("검증과 인증", "Testing & standards"), target: "certification" },
    { label: t("시험·인증 현황", "Test reports"), target: "documents" },
  ];

  return { pageTitle, compare, aiBlock, trustBlock, documents, tabs };
}

export function technologyMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("기술·인증", "Technology"),
    description: t(
      "전력·환경 감지, AI 화재 예지, 자동 차단을 한 모듈에 담은 에코-비탈의 기술 차별성과 KETI 시험, KESCO 규격 준수.",
      "How the Eeco-Vital module combines power and environmental sensing, AI fire prediction and automatic cut-off, tested by KETI and built to KESCO standards.",
    ),
  };
}

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

// 운영 페이지(/ko/technology)는 A안 (2026-10-27 확정). live면 "자료 필요" 안내를 뺀다
export function technologyPageBlocks(locale: Locale): Block[] {
  return technologyBlocks("a", { live: true, locale });
}

export function technologyBlocks(draft: TechnologyDraftId, { live = false, locale = "ko" }: { live?: boolean; locale?: Locale } = {}): Block[] {
  const { pageTitle, compare, aiBlock, trustBlock, documents, tabs } = content(locale);
  const top = pageTop({ locale, path: "/technology" });
  const bottom = pageBottom({ locale });

  if (draft === "b") {
    return [...top, pageTitle, trustBlock("strip"), compare, aiBlock("dark", live), documents, ...bottom];
  }

  return [
    ...top,
    pageTitle,
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    compare,
    aiBlock("light", live),
    trustBlock("rows"),
    documents,
    ...bottom,
  ];
}
