import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { organization, organizationEn } from "@/lib/site";
import { translator } from "../shared";
import { pageBottom, pageTop } from "./common";

// 회사소개 (1페이지: 인사말 · 비전·미션 · 연혁 · 팀·파트너, 2026-10-27 사이트맵)
// 문구: 인사말·비전·미션·Team & Network는 클라이언트 제공 원고(2026-10-27) 그대로 (기획안 4장과 같음)
//       슬로건은 클라이언트 제공 문안(2026-10-26)
// 시안 3개는 같은 내용을 다른 방향으로 배치한다 (design-taste 1장)

// 영문은 국문을 옮긴 번역 초안 (2026-10-27). 시안(A~C)은 국문만 쓴다
function content(locale: Locale) {
  const t = translator(locale);
  const en = locale === "en";

  const greeting = {
    title: t("인사말", "Message from the CEO"),
    quote: t("현장의 경험과 기술로, 농업의 전력 안전을 책임집니다.", "With field experience and technology, we take responsibility for power safety in agriculture."),
    points: [
      {
        title: t("20년 현장 노하우", "20 years of field know-how"),
        text: t("R&D와 제조 역량을 바탕으로 전력 안전 사각지대 해소", "Closing power safety blind spots with our R&D and manufacturing capabilities"),
      },
      {
        title: t("AIoT 원스톱 솔루션", "One-stop AIoT solution"),
        text: t("전력·환경 감지, AI 화재 예방, 자동 차단까지 한 번에", "Power and environmental sensing, AI fire prevention and automatic cut-off, all in one"),
      },
      {
        title: t("스마트팜 맞춤 표준", "A standard built for smart farms"),
        text: t(
          "중소 농가와 지자체 공공 사업에 최적화된 저비용·고효율 제공",
          "Low-cost, high-efficiency solutions tailored to small and mid-sized farms and local government programs",
        ),
      },
    ],
    signature: { role: t("와이엠이노테크 대표이사", "CEO, YM INNOTECH"), name: en ? organizationEn.ceo : organization.ceo },
  };

  const vision = {
    title: t("비전·미션", "Vision & Mission"),
    vision: t("스마트팜의 안전과 효율을 선도하는 AIoT 에너지·안전 관리 표준", "The AIoT energy and safety management standard leading safety and efficiency in smart farming"),
    missions: [
      {
        key: "SAFETY",
        title: t("안전성 확보", "Ensuring safety"),
        text: t("AI 이상감지와 실시간 자동 차단으로 화재 피해 방지", "Preventing fire damage with AI anomaly detection and real-time automatic cut-off"),
      },
      {
        key: "EFFICIENCY",
        title: t("에너지 효율 최적화", "Optimizing energy efficiency"),
        text: t("전력·환경 복합 분석을 통한 에너지 사용 절감", "Reducing energy use through combined analysis of power and environmental data"),
      },
      {
        key: "ACCESSIBILITY",
        title: t("보급형 대중화", "Making it widely available"),
        text: t("중소 스마트팜 맞춤형 저비용·고효율 솔루션 보급", "Delivering low-cost, high-efficiency solutions tailored to small and mid-sized smart farms"),
      },
    ],
  };

  const history = {
    title: t("연혁", "History"),
    pending: "연혁 자료 필요: 설립 연월, 연구개발·시험 인증·실증 이력 (연·월·내용)",
  };

  // 팀·파트너 (클라이언트 원고 2026-10-27 그대로, 영문은 번역 초안)
  const team = {
    title: t("팀·파트너", "Team & Partners"),
    groups: [
      {
        title: t("경영진 & R&D", "Leadership & R&D"),
        icon: "factory" as const,
        text: t("에너지·제조 전문 경영진", "Executives specializing in energy and manufacturing"),
        items: [
          { label: t("소속 / 특성", "Background"), value: t("20년 현장 실무 노하우", "20 years of hands-on field experience") },
          { label: t("전력 제어", "Power control"), value: t("3상 전력 및 모듈 직접 제조", "3-phase power and modules built in-house") },
          { label: t("현장 커스텀", "Field customization"), value: t("분전반 특화 콤팩트 설계를 주도", "Leads compact designs tailored to distribution panels") },
        ],
      },
      {
        title: t("AI 연구 & 기술 자문", "AI research & technical advisory"),
        icon: "chartLine" as const,
        text: t("AI 소프트웨어 자문 교수진", "Professors advising on AI software"),
        items: [
          { label: t("소속 / 특성", "Background"), value: t("전남대 AI융합대학 연구팀", "Research team, College of AI Convergence, Chonnam National University") },
          { label: t("예지 보전", "Predictive maintenance"), value: t("시계열 데이터 기반 화재 예측", "Fire prediction based on time-series data") },
          { label: t("알고리즘", "Algorithm"), value: t("온·습도와 전력 변화 복합 분석", "Combined analysis of temperature, humidity and power changes") },
        ],
      },
      {
        title: t("기술 검증 & 실증 파트너", "Validation & field partners"),
        icon: "shield" as const,
        text: t("농업회사법인·KETI 등 협력 파트너", "Partners including agricultural corporations and KETI"),
        items: [
          { label: t("소속 / 특성", "Background"), value: t("KETI 및 전문 시공 파트너", "KETI and specialist construction partners") },
          { label: t("오차 검증", "Accuracy validation"), value: t("KETI 연계 3상 전력 계측 검증", "3-phase power measurement validated with KETI") },
          { label: t("필드 테스트", "Field testing"), value: t("전남도내 농업회사법인 및 파트너사 연동", "With agricultural corporations and partners across Jeollanam-do") },
        ],
      },
    ],
    pending: "자료 필요: 팀원 공개 범위(이름·직함), 협력 기관 이름·로고와 협력 내용",
  };

  // 협력 파트너 (docs/협력파트너_정리.md, 2026-10-27). 사용자 결정: 문서의 기관 모두 로고와 함께 싣는다
  // 로고는 각 기관 공식 홈페이지에서 받음. 전남은 홈페이지에 글자 이미지뿐이라, ㈜그린에이트·혁신밸리는 로고를 찾지 못해 이름만
  // 전남창조경제혁신센터 로고는 흰 글자판이라 글자만 어둡게 바꿔 씀. ㈜그린에이트 영문 표기는 확인 필요
  const technopark = t("시제품 제작 지원, 정부 과제 매칭, 지역 제조·시공 기업 연계 자문", "Prototype development support, government project matching, links to local manufacturing and construction firms");
  const publicRole = t(
    "스마트농업·재난안전 부서 · 화재 취약 시설 지능형 분전반 보급 사업 기획 자문",
    "Smart agriculture and disaster safety departments · advising on programs to supply intelligent panels to fire-vulnerable facilities",
  );
  const scaleUp = t("스케일업 프로그램, 판로 개척 멘토링, 투자 유치(IR) 컨설팅", "Scale-up programs, market development mentoring, investment (IR) consulting");
  const partners = {
    title: t("협력 파트너", "Partners"),
    description: t(
      "연구기관과 함께 기술을 검증하고, 현장과 공공 사업으로 넓혀 갑니다.",
      "We validate our technology with research institutes and expand it into the field and public programs.",
    ),
    groups: [
      {
        title: t("기술 고도화·시험", "Technology & testing"),
        partners: [
          {
            name: t("한국전자기술연구원(KETI)", "Korea Electronics Technology Institute (KETI)"),
            role: t(
              "광주지역본부 에너지 ICT 연구센터 · 3상 전력 측정 정확도 고도화, AI 화재 예지 알고리즘 검증",
              "Gwangju Regional Division, Energy ICT Research Center · advancing 3-phase power measurement accuracy, validating the AI fire prediction algorithm",
            ),
            logo: { src: "/images/marks/keti.png", width: 900, height: 209 },
          },
          {
            name: t("한국전기안전공사(KESCO)", "Korea Electrical Safety Corporation (KESCO)"),
            role: t(
              "전기안전연구원 · 분전반 화재 예방·전기 화재 감지 기준 기술 자문, 실증 필드 테스트",
              "Electrical Safety Research Institute · technical advice on panel fire prevention and electrical fire detection criteria, field testing",
            ),
            logo: { src: "/images/marks/kesco.png", width: 900, height: 194 },
          },
          { name: t("광주테크노파크", "Gwangju Technopark"), role: technopark, logo: { src: "/images/partners/gjtp.png", width: 235, height: 48 } },
          { name: t("전남테크노파크", "Jeonnam Technopark"), role: technopark, logo: { src: "/images/partners/jntp.png", width: 208, height: 53 } },
        ],
      },
      {
        title: t("현장 실증·시공", "Field pilots & construction"),
        partners: [
          {
            name: t("스마트팜 혁신밸리 입주 법인·선도 농가", "Smart Farm Innovation Valley tenants and leading farms"),
            role: t(
              "온실·축사 분전반에 모듈을 설치해 화재 예방·전력 데이터 수집 실증",
              "Pilots installing the module in greenhouse and livestock barn panels for fire prevention and power data collection",
            ),
          },
          {
            name: t("㈜그린에이트", "Green Eight Co., Ltd."),
            role: t(
              "신재생에너지·스마트팜 시공 · 스마트팜 시공 시 분전반 옵션으로 모듈 패키지 납품",
              "Renewable energy and smart farm construction · supplying the module as a distribution panel option in smart farm builds",
            ),
          },
        ],
      },
      {
        title: t("공공 보급·판로", "Public programs & market access"),
        partners: [
          { name: t("전남광주통합특별시(구 전라남도)", "Jeonnam-Gwangju Integrated Special City (formerly Jeollanam-do)"), role: publicRole },
          { name: t("나주시", "Naju City"), role: publicRole, logo: { src: "/images/partners/naju.png", width: 180, height: 58 } },
          { name: t("중소벤처기업진흥공단", "Korea SMEs and Startups Agency (KOSME)"), role: scaleUp, logo: { src: "/images/partners/kosmes.svg", width: 202, height: 23 } },
          {
            name: t("전남창조경제혁신센터", "Jeonnam Center for Creative Economy & Innovation"),
            role: scaleUp,
            logo: { src: "/images/partners/ccei-jeonnam.png", width: 249, height: 53 },
          },
        ],
      },
    ],
  };

  const slogan = t("스마트한 기술로 더 나은 미래를 만듭니다.", "Building a better future with smart technology.");
  const breadcrumb = [t("홈", "Home"), t("회사소개", "Company")];
  const tabs = [
    { label: greeting.title, target: "greeting" },
    { label: vision.title, target: "vision" },
    { label: history.title, target: "history" },
    { label: team.title, target: "team" },
    { label: partners.title, target: "partners" },
  ];
  const pageTitle: Block = {
    type: "page-title",
    data: {
      title: t("회사소개", "Company"),
      description: slogan,
      breadcrumb,
      media: {
        src: "/images/hero/ai-panel.webp",
        alt: t("안전모를 쓴 기술자가 온실 분전반의 차단기를 점검하고 있다", "A technician in a hard hat checks the breakers in a greenhouse distribution panel"),
        focus: "72% 45%",
      },
    },
  };
  return { greeting, vision, history, team, partners, slogan, breadcrumb, tabs, pageTitle };
}

// 시안 A·C의 회사 개요 표 (국문)
const facts = [
  { label: "회사명", value: `${organization.name} (${organization.alternateName})` },
  { label: "대표이사", value: organization.ceo },
  { label: "사업 분야", value: "AIoT 에너지·화재 관리 솔루션" },
  { label: "소재지", value: `${organization.address.locality} ${organization.address.street.split(",")[0]} (${organization.address.district})` },
  { label: "설립", value: "자료 필요", missing: true },
];

export function companyMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("회사소개", "Company"),
    description: t(
      "와이엠이노테크 대표이사 인사말, 기업 비전과 미션, 팀과 협력 파트너를 소개합니다.",
      "A message from the CEO, our vision and mission, and the team and partners behind YM INNOTECH.",
    ),
  };
}

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
export function companyPageBlocks(locale: Locale): Block[] {
  return companyBlocks("d", { live: true, locale });
}

export function companyBlocks(draft: CompanyDraftId, { live = false, locale = "ko" }: { live?: boolean; locale?: Locale } = {}): Block[] {
  const { greeting, vision, history, team, partners, slogan, breadcrumb, tabs, pageTitle } = content(locale);
  const top = pageTop({ locale, path: "/company" });
  const bottom = pageBottom({ locale });
  // 사진 머리 바로 다음에 어두운 비전이 오면 답답해서 인사말을 먼저 둔다 (2026-10-27)
  if (draft === "d") {
    return [
      ...top,
      pageTitle,
      { type: "anchor-tabs", data: { items: live ? tabs.filter((t) => t.target !== "history") : tabs, belowHeader: true } },
      { type: "ceo-message", data: { variant: "letter", ...greeting, id: "greeting" } },
      { type: "vision-mission", data: { variant: "words", ...vision, id: "vision" } },
      // 연혁은 옅은 회색 바탕: 어두운 비전과 흰 팀·파트너 사이를 나눈다
      { type: "history-pending", hidden: live ? "연혁 자료 대기" : undefined, data: { ...history, tone: "surface", id: "history" } },
      { type: "team-network", data: { variant: "columns", ...team, pending: live ? undefined : team.pending, id: "team" } },
      { type: "partner-groups", data: { ...partners, id: "partners" } },
      ...bottom,
    ];
  }

  if (draft === "b") {
    return [
      ...top,
      pageTitle,
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
      ...bottom,
    ];
  }

  if (draft === "c") {
    return [
      ...top,
      { type: "company-header", data: { variant: "brand", title: "회사소개", slogan, breadcrumb, facts: facts.filter((f) => f.label !== "회사명") } },
      { type: "vision-mission", data: { variant: "words", ...vision, id: "vision" } },
      { type: "ceo-message", data: { variant: "letter", ...greeting, id: "greeting" } },
      { type: "history-pending", data: { ...history, tone: "dark", id: "history" } },
      { type: "team-network", data: { variant: "columns", ...team, id: "team" } },
      ...bottom,
    ];
  }

  return [
    ...top,
    { type: "company-header", data: { variant: "doc", title: "회사소개", slogan, breadcrumb, facts } },
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    { type: "ceo-message", data: { variant: "doc", ...greeting, id: "greeting" } },
    { type: "vision-mission", data: { variant: "table", ...vision, id: "vision" } },
    { type: "history-pending", data: { ...history, id: "history" } },
    { type: "team-network", data: { variant: "rows", ...team, id: "team" } },
    ...bottom,
  ];
}
