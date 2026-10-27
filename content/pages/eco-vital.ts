import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { featureRows, product, trustItems } from "@/content/block-catalog";
import { productLightMedia, productMedia, translator } from "@/content/shared";
import { pageBottom, pageTop } from "./common";

// 솔루션 > 에코-비탈 모듈
// 문구 근거: 제품소개 1장(HARDWARE 특징 5개, 제품소개 문구 그대로), 2장(시스템 구성, 적용 분야),
//           기획안 5장(HARDWARE)·6장(10초 차단), KETI 시험성적서(2025.12), 클라이언트 제품 소개글(2026-10-26)
// 시안 3개는 같은 내용을 다른 방향으로 배치한다

// 영문은 국문을 옮긴 번역 초안 (2026-10-27). 시안 B·C는 국문만 쓴다
// BI 매뉴얼 BS 09 시그니처 (밝은 바탕용 컬러, 어두운 바탕용 흰색)
const brand = { src: "/brand/modiq-signature.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 };
const brandWhite = { ...brand, src: "/brand/modiq-signature-white.png" };

// 시스템 구성도. focus: 강조할 상자 (에코-비탈 페이지는 모듈, 웹 플랫폼 페이지는 플랫폼)
// 근거: 제품소개 2장 Technology – System Architecture
export function systemDiagram(focus: "module" | "platform" = "module", locale: Locale = "ko") {
  const t = translator(locale);
  return {
    title: t("시스템 구성", "System architecture"),
    description: t(
      "분전반의 전력과 주변 환경을 감지해 모듈이 판단하고, 유·무선 통신으로 웹 플랫폼에 보냅니다.",
      "The module senses power and the surrounding environment in the panel, makes the call, and reports to the web platform over wired or wireless links.",
    ),
    stages: [
      {
        label: t("감지", "Sense"),
        boxes: [
          { title: "Main/Sub MCCB", text: t("3상(RST/UVW) 전압·전류", "3-phase (RST/UVW) voltage·current") },
          { title: t("환경·재해 센서", "Environment & hazard sensors"), text: t("온·습도, 불꽃, 침수, 진동", "Temperature·humidity, flame, flooding, vibration") },
        ],
      },
      {
        label: t("판단·차단", "Decide & cut off"),
        boxes: [
          {
            title: t("에코-비탈 모듈", "Eeco-Vital module"),
            text: t("SBC 제어, AC-DC(5V) 변환기, SSR 차단", "SBC control, AC-DC (5V) converter, SSR cut-off"),
            highlight: focus === "module",
          },
        ],
      },
      { label: t("통신", "Communicate"), boxes: [{ title: t("유·무선 통신", "Wired & wireless"), text: "RS-232 · Wi-Fi · LAN" }] },
      // 웹 플랫폼 준비 중 (2026-10-26)
      {
        label: t("관제", "Monitor"),
        boxes: [
          {
            title: t("통합 웹 플랫폼", "Web platform"),
            text: t("실시간 대시보드, 경보, 이력 관리", "Live dashboard, alarms, history"),
            status: t("준비 중", "Coming soon"),
            highlight: focus === "platform",
          },
        ],
      },
    ],
    feedback: t("이상이 감지되면 모듈이 SSR로 전원을 자동 차단합니다 (10초 이내)", "When an anomaly is detected, the module cuts power automatically via SSR (within 10 seconds)"),
  };
}

function content(locale: Locale) {
  const t = translator(locale);
  const name = t("지능형 에코-비탈(Eeco-Vital) 모듈", "Intelligent Eeco-Vital Module");

  const pageTitle: Block = {
    type: "page-title",
    data: {
      title: t("에코-비탈 모듈", "Eeco-Vital Module"),
      description: t("분전반 안에 장착하는 AIoT 에너지·화재 관리 모듈", "An AIoT energy and fire management module that mounts inside the distribution panel"),
      breadcrumb: [t("홈", "Home"), t("솔루션", "Solutions"), t("에코-비탈 모듈", "Eeco-Vital Module")],
      media: { src: "/images/home/panel.webp", alt: t("차단기가 줄지어 있는 분전반 내부", "Rows of circuit breakers inside a distribution panel"), focus: "50% 50%" },
    },
  };

  const intro = {
    brand,
    name,
    title: [t("에너지 관리의 효율을 높이는", "YM INNOTECH's innovative solution"), t("YM이노테크의 혁신적인 솔루션", "for more efficient energy management")],
    description: t(
      "분전반 안에 장착해 전력과 환경을 함께 감지하고,\n이상이 생기면 자동으로 전원을 차단합니다.",
      "Installed inside the distribution panel, it monitors power and environment together and cuts power automatically when something goes wrong.",
    ),
    media: [productLightMedia(locale), productMedia(locale)],
  };

  // 제품소개 1장 HARDWARE 특징 5개 (국문은 원문 그대로)
  const features = [
    {
      title: t("소형 일체형 Compact 설계", "Compact all-in-one design"),
      text: t("스마트팜 분전반 내부에 직접 장착 가능한 컴팩트 구조", "A compact build that mounts directly inside smart farm distribution panels"),
    },
    {
      title: t("3상 전력 실시간 감지", "Real-time 3-phase power sensing"),
      text: t("Main/Sub MCCB 연동 3상(RST/UVW) 전류 및 전압 밀착 모니터링", "Close monitoring of 3-phase (RST/UVW) current and voltage, linked to main/sub MCCBs"),
    },
    {
      title: t("복합 환경·재해 센싱", "Combined environment & hazard sensing"),
      text: t("온·습도는 물론 불꽃, 침수, 진동 감지 센서 다중 연동", "Temperature and humidity, plus flame, flooding and vibration sensors working together"),
    },
    {
      title: t("안전 차단 제어 모듈", "Safety cut-off control"),
      text: t("AC-DC(5V) 변환기 및 SSR(전자식 릴레이)을 통한 비상 시 자동 차단", "Automatic emergency cut-off through an AC-DC (5V) converter and an SSR (solid-state relay)"),
    },
    {
      title: t("유·무선 통합 통신", "Wired & wireless communication"),
      text: t("RS-232, Wi-Fi, LAN 등 다양한 현장 환경에 맞는 유·무선 통신 지원", "RS-232, Wi-Fi and LAN to suit different site conditions"),
    },
  ];

  // 기획안·제품소개에 적힌 값만. 크기·무게·정격 등은 받으면 추가
  const spec = {
    title: t("주요 사양", "Key specifications"),
    rows: [
      { label: t("설치 위치", "Installation"), value: t("분전반 내부 직접 장착 (일체형)", "Mounted directly inside the distribution panel (all-in-one)") },
      { label: t("연동", "Integration"), value: "Main/Sub MCCB" },
      { label: t("전력 감지", "Power sensing"), value: t("3상(RST/UVW) 전압·전류", "3-phase (RST/UVW) voltage·current") },
      {
        label: t("측정 정확도", "Measurement accuracy"),
        value: t("전압·전력 모니터링 정확도 시험", "Voltage·power monitoring accuracy tested"),
        note: t("KETI 광주지역본부 · 2025.12", "KETI Gwangju · Dec 2025"),
      },
      { label: t("환경 감지", "Environmental sensing"), value: t("온·습도, 불꽃, 침수, 진동", "Temperature·humidity, flame, flooding, vibration") },
      { label: t("자동 차단", "Automatic cut-off"), value: t("SSR(전자식 릴레이), 이상 감지 후 10초 이내", "SSR (solid-state relay), within 10 seconds of detection") },
      { label: t("전원", "Power supply"), value: t("AC-DC 변환기 (5V)", "AC-DC converter (5V)") },
      { label: t("통신", "Communication"), value: "RS-232, Wi-Fi, LAN" },
    ],
    pending: "사양 자료 필요: 크기·무게, 정격 전압·전류, 보호 등급, 사용 온도 범위",
  };

  const applications = {
    title: t("적용 분야", "Applications"),
    description: t("공장과 농업 시설의 분전반에 설치합니다.", "Installed in the distribution panels of factories and agricultural facilities."),
    items: [
      {
        title: t("스마트 온실", "Smart greenhouses"),
        media: {
          src: "/images/hero/ai-greenhouse.webp",
          alt: t("유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", "Long rows of raised strawberry beds inside a glass greenhouse"),
          focus: "62% 50%",
        },
      },
      { title: t("축사", "Livestock barns"), pending: "사진 필요: 축사 분전반 또는 축사 전경" },
      {
        title: t("수직농장", "Vertical farms"),
        media: { src: "/images/home/sensing-farm.webp", alt: t("센서와 배선이 설치된 실내 수경재배 시설", "Indoor hydroponic facility with sensors and wiring"), focus: "50% 50%" },
      },
      { title: t("공장·산업 시설", "Factories & industrial facilities"), pending: "사진 필요: 공장 분전반 또는 설비실" },
    ],
  };

  const tabs = [
    { label: t("제품 개요", "Overview"), target: "overview" },
    { label: t("주요 기능", "Features"), target: "features" },
    { label: t("시스템 구성", "Architecture"), target: "system" },
    { label: spec.title, target: "spec" },
    { label: applications.title, target: "applications" },
  ];

  return { name, pageTitle, intro, features, diagram: systemDiagram("module", locale), spec, applications, tabs };
}

export function ecoVitalMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("에코-비탈 모듈", "Eeco-Vital Module"),
    description: t(
      "분전반 안에 장착해 3상 전력과 온·습도·불꽃·침수·진동을 함께 감지하고, 이상이 생기면 10초 안에 자동으로 전원을 차단하는 AIoT 에너지·화재 관리 모듈.",
      "An AIoT energy and fire management module that mounts inside the distribution panel, senses 3-phase power together with temperature, humidity, flame, flooding and vibration, and cuts power within 10 seconds when an anomaly is detected.",
    ),
  };
}

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
    summary: "케빈랩 4ST ZIP처럼 어두운 바탕에 제품과 MODIQ BI를 크게. 특징 5개는 큰 번호 2단, 핵심 수치(10초)와 어두운 구성도를 이어 붙입니다.",
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
export function ecoVitalPageBlocks(locale: Locale): Block[] {
  return ecoVitalBlocks("a", { live: true, locale });
}

export function ecoVitalBlocks(draft: EcoVitalDraftId, { live = false, locale = "ko" }: { live?: boolean; locale?: Locale } = {}): Block[] {
  const { name, pageTitle, intro, features, diagram, spec, applications, tabs } = content(locale);
  const top = pageTop({ locale, path: "/solutions/eco-vital" });
  const bottom = pageBottom({ locale });
  if (draft === "b") {
    return [
      ...top,
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
      { type: "trust-figures", data: { title: "기술 신뢰성", description: "측정 정확도는 KETI에서 시험했고,\n전기설비는 KESCO 규격을 따릅니다.", items: trustItems, layout: "numbers" } },
      { type: "system-diagram", data: { ...diagram, tone: "dark", id: "system" } },
      { type: "applications", data: { ...applications, id: "applications" } },
      ...bottom,
    ];
  }

  if (draft === "c") {
    return [
      ...top,
      pageTitle,
      { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
      { type: "product-intro", data: { ...intro, id: "overview" } },
      { type: "feature-rows", data: { title: "감지부터 차단까지", items: featureRows, id: "features" } },
      { type: "system-diagram", data: { ...diagram, id: "system" } },
      { type: "spec-table", data: { ...spec, id: "spec" } },
      { type: "applications", data: { ...applications, id: "applications" } },
      ...bottom,
    ];
  }

  return [
    ...top,
    pageTitle,
    { type: "anchor-tabs", data: { items: tabs, belowHeader: true } },
    { type: "product-intro", data: { ...intro, id: "overview" } },
    { type: "feature-list", data: { variant: "rows", title: translator(locale)("주요 기능", "Features"), items: features, id: "features" } },
    { type: "system-diagram", data: { ...diagram, id: "system" } },
    { type: "spec-table", data: { ...spec, pending: live ? undefined : spec.pending, id: "spec" } },
    {
      type: "applications",
      data: { ...applications, items: live ? applications.items.filter((item) => item.media) : applications.items, id: "applications" },
    },
    ...bottom,
  ];
}
