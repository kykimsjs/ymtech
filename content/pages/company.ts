import type { Block } from "@/components/blocks/registry";
import { organization } from "@/lib/site";
import { pageBottom, pageTop } from "./common";

// 회사소개 (1페이지: 인사말 · 비전·미션 · 연혁 · 팀·파트너, 2026-10-27 사이트맵)
// 문구: 인사말·비전·미션·Team & Network는 클라이언트 제공 원고(2026-10-27) 그대로 (기획안 4장과 같음)
//       슬로건은 클라이언트 제공 문안(2026-10-26)
// 시안 3개는 같은 내용을 다른 방향으로 배치한다 (design-taste 1장)

const greeting = {
  title: "인사말",
  quote: "현장의 경험과 기술로, 농업의 전력 안전을 책임집니다.",
  points: [
    { title: "20년 현장 노하우", text: "R&D와 제조 역량을 바탕으로 전력 안전 사각지대 해소" },
    { title: "AIoT 원스톱 솔루션", text: "전력·환경 감지, AI 화재 예방, 자동 차단까지 한 번에" },
    { title: "스마트팜 맞춤 표준", text: "중소 농가와 지자체 공공 사업에 최적화된 저비용·고효율 제공" },
  ],
  signature: { role: "와이엠이노테크 대표이사", name: organization.ceo },
};

const vision = {
  title: "비전·미션",
  vision: "스마트팜의 안전과 효율을 선도하는 AIoT 에너지·안전 관리 표준",
  missions: [
    { key: "SAFETY", title: "안전성 확보", text: "AI 이상감지와 실시간 자동 차단으로 화재 피해 방지" },
    { key: "EFFICIENCY", title: "에너지 효율 최적화", text: "전력·환경 복합 분석을 통한 에너지 사용 절감" },
    { key: "ACCESSIBILITY", title: "보급형 대중화", text: "중소 스마트팜 맞춤형 저비용·고효율 솔루션 보급" },
  ],
};

const history = {
  title: "연혁",
  pending: "연혁 자료 필요: 설립 연월, 연구개발·시험 인증·실증 이력 (연·월·내용)",
};

const team = {
  title: "팀·파트너",
  groups: [
    { title: "경영진", text: "에너지·제조 전문 경영진" },
    { title: "자문", text: "AI 소프트웨어 자문 교수진" },
    { title: "협력 파트너", text: "농업회사법인·KETI 등 협력 파트너" },
  ],
  pending: "자료 필요: 팀원 공개 범위(이름·직함), 협력 기관 이름·로고와 협력 내용",
};

// 협력 파트너 (docs/협력파트너_정리.md, 2026-10-27). 사용자 결정: 문서의 기관 모두 로고와 함께 싣는다
// 로고는 각 기관 공식 홈페이지에서 받음. 전남은 홈페이지에 글자 이미지뿐이라, ㈜그린에이트·혁신밸리는 로고를 찾지 못해 이름만
// 전남창조경제혁신센터 로고는 흰 글자판이라 글자만 어둡게 바꿔 씀
const partners = {
  title: "협력 파트너",
  description: "연구기관과 함께 기술을 검증하고, 현장과 공공 사업으로 넓혀 갑니다.",
  groups: [
    {
      title: "기술 고도화·시험",
      partners: [
        {
          name: "한국전자기술연구원(KETI)",
          role: "광주지역본부 에너지 ICT 연구센터 · 3상 전력 측정 정확도 고도화, AI 화재 예지 알고리즘 검증",
          logo: { src: "/images/marks/keti.png", width: 900, height: 209 },
        },
        {
          name: "한국전기안전공사(KESCO)",
          role: "전기안전연구원 · 분전반 화재 예방·전기 화재 감지 기준 기술 자문, 실증 필드 테스트",
          logo: { src: "/images/marks/kesco.png", width: 900, height: 194 },
        },
        {
          name: "광주테크노파크",
          role: "시제품 제작 지원, 정부 과제 매칭, 지역 제조·시공 기업 연계 자문",
          logo: { src: "/images/partners/gjtp.png", width: 235, height: 48 },
        },
        {
          name: "전남테크노파크",
          role: "시제품 제작 지원, 정부 과제 매칭, 지역 제조·시공 기업 연계 자문",
          logo: { src: "/images/partners/jntp.png", width: 208, height: 53 },
        },
      ],
    },
    {
      title: "현장 실증·시공",
      partners: [
        { name: "스마트팜 혁신밸리 입주 법인·선도 농가", role: "온실·축사 분전반에 모듈을 설치해 화재 예방·전력 데이터 수집 실증" },
        { name: "㈜그린에이트", role: "신재생에너지·스마트팜 시공 · 스마트팜 시공 시 분전반 옵션으로 모듈 패키지 납품" },
      ],
    },
    {
      title: "공공 보급·판로",
      partners: [
        { name: "전남광주통합특별시(구 전라남도)", role: "스마트농업·재난안전 부서 · 화재 취약 시설 지능형 분전반 보급 사업 기획 자문" },
        {
          name: "나주시",
          role: "스마트농업·재난안전 부서 · 화재 취약 시설 지능형 분전반 보급 사업 기획 자문",
          logo: { src: "/images/partners/naju.png", width: 180, height: 58 },
        },
        {
          name: "중소벤처기업진흥공단",
          role: "스케일업 프로그램, 판로 개척 멘토링, 투자 유치(IR) 컨설팅",
          logo: { src: "/images/partners/kosmes.svg", width: 202, height: 23 },
        },
        {
          name: "전남창조경제혁신센터",
          role: "스케일업 프로그램, 판로 개척 멘토링, 투자 유치(IR) 컨설팅",
          logo: { src: "/images/partners/ccei-jeonnam.png", width: 249, height: 53 },
        },
      ],
    },
  ],
};

const slogan = "스마트한 기술로 더 나은 미래를 만듭니다.";
const breadcrumb = ["홈", "회사소개"];
const tabs = [
  { label: "인사말", target: "greeting" },
  { label: "비전·미션", target: "vision" },
  { label: "연혁", target: "history" },
  { label: "팀·파트너", target: "team" },
  { label: "협력 파트너", target: "partners" },
];
const facts = [
  { label: "회사명", value: `${organization.name} (${organization.alternateName})` },
  { label: "대표이사", value: organization.ceo },
  { label: "사업 분야", value: "AIoT 에너지·화재 관리 솔루션" },
  { label: "소재지", value: `${organization.address.locality} ${organization.address.street.split(",")[0]} (${organization.address.district})` },
  { label: "설립", value: "자료 필요", missing: true },
];

export const companyDrafts = [
  {
    id: "a",
    key: "A",
    name: "문서형",
    summary: "여의시스템·케빈랩 서브처럼 흰 바탕에 표와 선으로 정리합니다. 상단에 회사 개요 표, 고정 탭으로 섹션 이동. 사진 없이도 완성돼 보입니다.",
  },
  {
    id: "b",
    key: "B",
    name: "현장형",
    summary: "아이오크롭스처럼 사진으로 분위기를 잡습니다. 상단 현장 사진, 대표 사진 자리, 온실 사진 위 비전 문장. 대표 사진이 꼭 있어야 하는 안입니다.",
  },
  {
    id: "c",
    key: "C",
    name: "브랜드형",
    summary: "CI 심볼과 슬로건으로 시작해 미션 세 단어(SAFETY·EFFICIENCY·ACCESSIBILITY)를 크게 보여줍니다. 인사말은 편지처럼 좁은 한 단.",
  },
  {
    id: "d",
    key: "D",
    name: "조합",
    summary: "B의 사진 머리 + C의 인사말·비전·미션 (2026-10-27 선택), 연혁(자료 대기)과 팀·파트너는 밝은 바탕으로 이어 붙였습니다.",
  },
] as const;

export type CompanyDraftId = (typeof companyDrafts)[number]["id"];

// 운영 페이지(/ko/company)는 D안 (2026-10-27 확정). live면 자료가 없는 연혁은 숨기고(탭에서도 뺌),
// 팀·파트너의 "자료 필요" 상자는 시안에서만 보인다.
export function companyPageBlocks(): Block[] {
  return companyBlocks("d", { live: true });
}

export function companyBlocks(draft: CompanyDraftId, { live = false }: { live?: boolean } = {}): Block[] {
  // 사진 머리 바로 다음에 어두운 비전이 오면 답답해서 인사말을 먼저 둔다 (2026-10-27)
  if (draft === "d") {
    return [
      ...pageTop(),
      {
        type: "page-title",
        data: {
          title: "회사소개",
          description: slogan,
          breadcrumb,
          media: { src: "/images/hero/ai-panel.webp", alt: "안전모를 쓴 기술자가 온실 분전반의 차단기를 점검하고 있다", focus: "72% 45%" },
        },
      },
      { type: "anchor-tabs", data: { items: live ? tabs.filter((t) => t.target !== "history") : tabs, belowHeader: true } },
      { type: "ceo-message", data: { variant: "letter", ...greeting, id: "greeting" } },
      { type: "vision-mission", data: { variant: "words", ...vision, id: "vision" } },
      // 연혁은 옅은 회색 바탕: 어두운 비전과 흰 팀·파트너 사이를 나눈다
      { type: "history-pending", hidden: live ? "연혁 자료 대기" : undefined, data: { ...history, tone: "surface", id: "history" } },
      { type: "team-network", data: { variant: "columns", ...team, pending: live ? undefined : team.pending, id: "team" } },
      { type: "partner-groups", data: { ...partners, id: "partners" } },
      ...pageBottom(),
    ];
  }

  if (draft === "b") {
    return [
      ...pageTop(),
      {
        type: "page-title",
        data: {
          title: "회사소개",
          description: slogan,
          breadcrumb,
          media: { src: "/images/hero/ai-panel.webp", alt: "안전모를 쓴 기술자가 온실 분전반의 차단기를 점검하고 있다", focus: "72% 45%" },
        },
      },
      { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
      { type: "ceo-message", data: { variant: "portrait", ...greeting, portraitHint: "사진 필요: 대표 사진 (세로 4:5, 현장 또는 사무실)", id: "greeting" } },
      {
        type: "vision-mission",
        data: {
          variant: "photo",
          ...vision,
          media: { src: "/images/hero/ai-greenhouse.webp", alt: "유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", focus: "62% 50%" },
          id: "vision",
        },
      },
      { type: "history-pending", data: { ...history, id: "history" } },
      { type: "team-network", data: { variant: "columns", ...team, id: "team" } },
      ...pageBottom(),
    ];
  }

  if (draft === "c") {
    return [
      ...pageTop(),
      { type: "company-header", data: { variant: "brand", title: "회사소개", slogan, breadcrumb, facts: facts.filter((f) => f.label !== "회사명") } },
      { type: "vision-mission", data: { variant: "words", ...vision, id: "vision" } },
      { type: "ceo-message", data: { variant: "letter", ...greeting, id: "greeting" } },
      { type: "history-pending", data: { ...history, tone: "dark", id: "history" } },
      { type: "team-network", data: { variant: "columns", ...team, id: "team" } },
      ...pageBottom(),
    ];
  }

  return [
    ...pageTop(),
    { type: "company-header", data: { variant: "doc", title: "회사소개", slogan, breadcrumb, facts } },
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    { type: "ceo-message", data: { variant: "doc", ...greeting, id: "greeting" } },
    { type: "vision-mission", data: { variant: "table", ...vision, id: "vision" } },
    { type: "history-pending", data: { ...history, id: "history" } },
    { type: "team-network", data: { variant: "rows", ...team, id: "team" } },
    ...pageBottom(),
  ];
}
