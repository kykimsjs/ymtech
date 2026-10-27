import type { Block } from "@/components/blocks/registry";
import { featureRows, product, productLight, trustItems } from "@/content/block-catalog";
import { pageBottom, pageTop } from "./common";

// 솔루션 > 에코-비탈 모듈
// 문구 근거: 제품소개 1장(HARDWARE 특징 5개, 제품소개 문구 그대로), 2장(시스템 구성, 적용 분야),
//           기획안 5장(HARDWARE)·6장(±2% KETI, 10초 차단), 클라이언트 제품 소개글(2026-10-26)
// 시안 3개는 같은 내용을 다른 방향으로 배치한다

const name = "지능형 에코-비탈(Eeco-Vital) 모듈";
const breadcrumb = ["홈", "솔루션", "에코-비탈 모듈"];

const pageTitle: Block = {
  type: "page-title",
  data: {
    title: "에코-비탈 모듈",
    description: "분전반 안에 장착하는 AIoT 에너지·화재 관리 모듈",
    breadcrumb,
    media: { src: "/images/home/panel.webp", alt: "차단기가 줄지어 있는 분전반 내부", focus: "50% 50%" },
  },
};

// BI 매뉴얼 BS 09 시그니처 (밝은 바탕용 컬러, 어두운 바탕용 흰색)
const brand = { src: "/brand/modiq-signature.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 };
const brandWhite = { ...brand, src: "/brand/modiq-signature-white.png" };

const intro = {
  brand,
  name,
  title: ["에너지 관리의 효율을 높이는", "YM이노테크의 혁신적인 솔루션"],
  description: "분전반 안에 장착해 전력과 환경을 함께 감지하고,\n이상이 생기면 자동으로 전원을 차단합니다.",
  media: [productLight, product],
};

// 제품소개 1장 HARDWARE 특징 5개 (원문 그대로)
const features = [
  { title: "소형 일체형 Compact 설계", text: "스마트팜 분전반 내부에 직접 장착 가능한 컴팩트 구조" },
  { title: "3상 전력 실시간 감지", text: "Main/Sub MCCB 연동 3상(RST/UVW) 전류 및 전압 밀착 모니터링" },
  { title: "복합 환경·재해 센싱", text: "온·습도는 물론 불꽃, 침수, 진동 감지 센서 다중 연동" },
  { title: "안전 차단 제어 모듈", text: "AC-DC(5V) 변환기 및 SSR(전자식 릴레이)을 통한 비상 시 자동 차단" },
  { title: "유·무선 통합 통신", text: "RS-232, Wi-Fi, LAN 등 다양한 현장 환경에 맞는 유·무선 통신 지원" },
];

const diagram = {
  title: "시스템 구성",
  description: "분전반의 전력과 주변 환경을 감지해 모듈이 판단하고, 유·무선 통신으로 웹 플랫폼에 보냅니다.",
  stages: [
    {
      label: "감지",
      boxes: [
        { title: "Main/Sub MCCB", text: "3상(RST/UVW) 전압·전류" },
        { title: "환경·재해 센서", text: "온·습도, 불꽃, 침수, 진동" },
      ],
    },
    { label: "판단·차단", boxes: [{ title: "에코-비탈 모듈", text: "SBC 제어, AC-DC(5V) 변환기, SSR 차단", highlight: true }] },
    { label: "통신", boxes: [{ title: "유·무선 통신", text: "RS-232 · Wi-Fi · LAN" }] },
    // 웹 플랫폼 준비 중 (2026-10-26)
    { label: "관제", boxes: [{ title: "통합 웹 플랫폼", text: "실시간 대시보드, 경보, 이력 관리", status: "준비 중" }] },
  ],
  feedback: "이상이 감지되면 모듈이 SSR로 전원을 자동 차단합니다 (10초 이내)",
};

// 기획안·제품소개에 적힌 값만. 크기·무게·정격 등은 받으면 추가
const spec = {
  title: "주요 사양",
  rows: [
    { label: "설치 위치", value: "분전반 내부 직접 장착 (일체형)" },
    { label: "연동", value: "Main/Sub MCCB" },
    { label: "전력 감지", value: "3상(RST/UVW) 전압·전류" },
    { label: "측정 정확도", value: "전압·전류 ±2%", note: "KETI 검증" },
    { label: "환경 감지", value: "온·습도, 불꽃, 침수, 진동" },
    { label: "자동 차단", value: "SSR(전자식 릴레이), 이상 감지 후 10초 이내" },
    { label: "전원", value: "AC-DC 변환기 (5V)" },
    { label: "통신", value: "RS-232, Wi-Fi, LAN" },
  ],
  pending: "사양 자료 필요: 크기·무게, 정격 전압·전류, 보호 등급, 사용 온도 범위",
};

const applications = {
  title: "적용 분야",
  description: "공장과 농업 시설의 분전반에 설치합니다.",
  items: [
    { title: "스마트 온실", media: { src: "/images/hero/ai-greenhouse.webp", alt: "유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", focus: "62% 50%" } },
    { title: "축사", pending: "사진 필요: 축사 분전반 또는 축사 전경" },
    { title: "수직농장", media: { src: "/images/home/sensing-farm.webp", alt: "센서와 배선이 설치된 실내 수경재배 시설", focus: "50% 50%" } },
    { title: "공장·산업 시설", pending: "사진 필요: 공장 분전반 또는 설비실" },
  ],
};

const tabs = [
  { label: "제품 개요", target: "overview" },
  { label: "주요 기능", target: "features" },
  { label: "시스템 구성", target: "system" },
  { label: "주요 사양", target: "spec" },
  { label: "적용 분야", target: "applications" },
];

export const ecoVitalDrafts = [
  {
    id: "a",
    key: "A",
    name: "문서형",
    summary: "여의시스템 제품 페이지처럼 흰 바탕에 표와 선으로. 고정 탭으로 개요·기능·구성·사양·적용 분야를 오갑니다. 사양 표가 중심입니다.",
  },
  {
    id: "b",
    key: "B",
    name: "제품형",
    summary: "케빈랩 4ST ZIP처럼 어두운 바탕에 제품과 MODIQ BI를 크게. 특징 5개는 큰 번호 2단, 핵심 수치(±2%, 10초)와 어두운 구성도를 이어 붙입니다.",
  },
  {
    id: "c",
    key: "C",
    name: "흐름형",
    summary: "특징을 감지 → 판단 → 차단 세 단계로 묶어 사진·도식과 함께 보여줍니다 (HOME 펼침 패널의 자세한 판). 뒤에 구성도와 사양 표.",
  },
] as const;

export type EcoVitalDraftId = (typeof ecoVitalDrafts)[number]["id"];

// 운영 페이지(/ko/solutions/eco-vital)는 A안 (2026-10-27 확정). live면 "자료 필요" 상자를 빼고,
// 사진이 없는 적용 분야는 사진이 올 때까지 뺀다.
export function ecoVitalPageBlocks(): Block[] {
  return ecoVitalBlocks("a", { live: true });
}

export function ecoVitalBlocks(draft: EcoVitalDraftId, { live = false }: { live?: boolean } = {}): Block[] {
  if (draft === "b") {
    return [
      ...pageTop(),
      pageTitle,
      {
        type: "product-showcase",
        data: {
          brand: brandWhite,
          label: "주력 제품",
          title: intro.title,
          name,
          description: intro.description,
          media: product,
          actions: [{ label: "제품 소개서 다운로드", href: "#", status: "준비 중" }],
          // 클라이언트 제공 소개글 (2026-10-26)
          features: [
            { title: "에너지 절감", text: "효율적인 에너지 관리로\n운영비 절감" },
            { title: "안정적인 운용", text: "신뢰성 높은 성능으로\n안정적인 시스템 운영" },
            { title: "간편한 설치", text: "산업 현장에 최적화된\n설계와 편리한 설치" },
            { title: "지속가능한 미래", text: "친환경 에너지 관리로\n지속가능한 성장" },
          ],
          id: "overview",
        },
      },
      { type: "feature-list", data: { variant: "grid", title: "주요 기능", items: features, id: "features" } },
      { type: "trust-figures", data: { title: "기술 신뢰성", description: "측정 정확도는 KETI의 검증을 거쳤고,\n전기설비는 KESCO 규격을 따릅니다.", items: trustItems, layout: "numbers" } },
      { type: "system-diagram", data: { ...diagram, tone: "dark", id: "system" } },
      { type: "applications", data: { ...applications, id: "applications" } },
      ...pageBottom(),
    ];
  }

  if (draft === "c") {
    return [
      ...pageTop(),
      pageTitle,
      { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
      { type: "product-intro", data: { ...intro, id: "overview" } },
      { type: "feature-rows", data: { title: "감지부터 차단까지", items: featureRows, id: "features" } },
      { type: "system-diagram", data: { ...diagram, id: "system" } },
      { type: "spec-table", data: { ...spec, id: "spec" } },
      { type: "applications", data: { ...applications, id: "applications" } },
      ...pageBottom(),
    ];
  }

  return [
    ...pageTop(),
    pageTitle,
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    { type: "product-intro", data: { ...intro, id: "overview" } },
    { type: "feature-list", data: { variant: "rows", title: "주요 기능", items: features, id: "features" } },
    { type: "system-diagram", data: { ...diagram, id: "system" } },
    { type: "spec-table", data: { ...spec, pending: live ? undefined : spec.pending, id: "spec" } },
    {
      type: "applications",
      data: { ...applications, items: live ? applications.items.filter((item) => item.media) : applications.items, id: "applications" },
    },
    ...pageBottom(),
  ];
}
