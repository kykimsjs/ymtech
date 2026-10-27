import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { platformScreenMedia, translator } from "@/content/shared";
import { pageBottom, pageTop } from "./common";
import { systemDiagram } from "./eco-vital";

// 솔루션 > 통합 웹 플랫폼 (준비 중, 2026-10-26)
// 문구 근거: 제품소개 3장 SOFTWARE(기능 5개), 기획안 5장 SOFTWARE. 자동 차단 시간은 10초로 확정(제품소개의 30초는 틀린 값)
// 준비 중인 서비스라 작게 만든다 (2026-10-26 "너무 크지 않아도 될 것 같아")
// 영문은 국문을 옮긴 번역 초안 (2026-10-27)

function content(locale: Locale) {
  const t = translator(locale);
  const soon = t("준비 중", "Coming soon");

  const pageTitle: Block = {
    type: "page-title",
    data: {
      title: t("통합 웹 플랫폼", "Integrated Web Platform"),
      status: soon,
      description: t("분전반의 전력과 환경을 한 화면에서 보고, 이상을 알리고 기록합니다", "See your panels' power and environment on one screen, with alerts and records"),
      breadcrumb: [t("홈", "Home"), t("솔루션", "Solutions"), t("통합 웹 플랫폼", "Web Platform")],
      media: platformScreenMedia(locale),
    },
  };

  // HOME 실시간 관제와 같은 화면 4개 (고르면 모니터 속 예시 화면이 바뀐다)
  const tour: Block = {
    type: "dashboard-preview",
    data: {
      title: t("실시간 관제", "Live monitoring"),
      description: t(
        "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다.\n이상이 생기면 경보를 울리고 이력으로 남깁니다.",
        "See power use by panel, hourly trends, and temperature and humidity on one screen.\nWhen something goes wrong, it raises an alarm and keeps a record.",
      ),
      status: soon,
      features: [
        { title: t("실시간 대시보드", "Live dashboard"), text: t("전력 사용량·온습도 그래프", "Power use and climate charts"), screen: "dashboard" },
        { title: t("경보와 자동 차단", "Alarms & automatic cut-off"), text: t("시각·청각 경보, 전원 차단", "Visual and audible alarms, power cut-off"), screen: "alarm" },
        { title: t("이력 관리", "History"), text: t("이상 이력 조회, 엑셀 내려받기", "Anomaly history, Excel export"), screen: "history" },
        { title: t("데이터 보안", "Data security"), text: t("클라우드 저장, 권한별 열람", "Cloud storage, role-based access"), screen: "access" },
      ],
      note: t("예시 화면 · 표시된 수치는 실제 데이터가 아닙니다", "Sample screens · the figures shown are not real data"),
      id: "tour",
    },
  };

  // 제품소개 3장 기능 5개. 개발 용어는 고객이 알아들을 말로, 기술 이름은 아래 기술 구성 표로 보낸다
  const features = [
    { title: t("실시간 대시보드", "Live dashboard"), text: t("전력 사용량과 시간별 변화, 온·습도를 그래프로 보여줍니다", "Charts of power use, hourly changes, temperature and humidity") },
    {
      title: t("경보와 자동 대응", "Alarms & automatic response"),
      text: t(
        "화재 위험이 감지되면 시각·청각 경보를 울리고 10초 안에 자동 차단합니다",
        "Visual and audible alarms when a fire risk is detected, with automatic cut-off within 10 seconds",
      ),
    },
    { title: t("클라우드 저장", "Cloud storage"), text: t("측정 데이터를 클라우드 저장소에 보관합니다", "Measurement data is kept in cloud storage") },
    { title: t("데이터 보안", "Data security"), text: t("사용자 권한에 따라 볼 수 있는 데이터를 나눕니다", "What each user can see depends on their role") },
    { title: t("이력 관리", "History"), text: t("이상 이력을 조회하고 데이터를 엑셀로 내려받습니다", "Look up anomaly history and export data to Excel") },
  ];

  const stack = {
    title: t("기술 구성", "Technology stack"),
    rows: [
      { label: t("화면", "Front end"), value: "React" },
      { label: t("서버", "Server"), value: "NestJS" },
      { label: t("저장소", "Storage"), value: "Cloudflare R2" },
      { label: t("권한 관리", "Access control"), value: t("JWT 기반 RBAC (역할별 접근 권한)", "JWT-based RBAC (role-based access control)") },
      { label: t("파일 접근", "File access"), value: t("Presigned URL (기한이 있는 접근 주소)", "Presigned URLs (time-limited links)") },
    ],
  };

  return { pageTitle, tour, features, stack };
}

// 소프트웨어 구성도 (2026-10-27): 현장 모듈 → Wi-Fi·LAN → 웹 플랫폼(기능 4 + 서버 ⇄ 저장소) → 권한별 접근 → 사용자
// 근거: 제품소개 3장 SOFTWARE(NestJS·React·Cloudflare R2·JWT RBAC), docs/시스템구성도.png
export function softwareArchitecture(locale: Locale): Block {
  const t = translator(locale);
  return {
    type: "software-architecture",
    data: {
      title: t("시스템 구성", "System architecture"),
      description: t(
        "현장 모듈이 보낸 데이터를 웹 플랫폼이 받아 저장하고, 권한에 맞는 화면으로 보여줍니다.",
        "The web platform receives and stores data from the field module, and shows each user the screens their role allows.",
      ),
      source: {
        label: t("현장", "On site"),
        title: t("에코-비탈 모듈", "Eeco-Vital module"),
        text: t("분전반의 전력·환경 데이터와 이상 감지 신호", "Power and environmental data from the panel, plus anomaly signals"),
      },
      uplink: "Wi-Fi · LAN",
      platform: {
        label: t("통합 웹 플랫폼", "Web platform"),
        status: t("준비 중", "Coming soon"),
        functions: [
          { title: t("실시간 대시보드", "Live dashboard"), icon: "dashboard" },
          { title: t("경보·자동 대응", "Alarms & response"), icon: "alarm" },
          { title: t("이력·엑셀", "History & Excel"), icon: "history" },
          { title: t("권한 관리", "Access control"), icon: "access" },
        ],
        server: { title: t("서버", "Server"), text: "NestJS" },
        storage: { title: t("클라우드 저장소", "Cloud storage"), text: "Cloudflare R2" },
      },
      access: t("권한별 접근", "Role-based access"),
      users: {
        label: t("사용자", "Users"),
        title: t("웹 화면", "Web screens"),
        text: t("권한(JWT 기반 RBAC)에 따라 볼 수 있는 화면과 데이터가 나뉩니다", "What each user can see depends on their role (JWT-based RBAC)"),
      },
      id: "system",
    },
  };
}

export function platformMeta(locale: Locale) {
  const t = translator(locale);
  return {
    title: t("통합 웹 플랫폼", "Integrated Web Platform"),
    description: t(
      "에코-비탈 모듈이 보낸 분전반의 전력·환경 데이터를 한 화면에서 보고, 이상을 알리고 기록하는 웹 플랫폼 (준비 중).",
      "A web platform (coming soon) that shows the power and environmental data from the Eeco-Vital module on one screen, raises alerts and keeps records.",
    ),
  };
}

export const platformDrafts = [
  {
    id: "a",
    key: "A",
    name: "화면 중심",
    summary: "관제 화면 둘러보기(HOME과 같은 모니터 4화면)를 맨 앞에, 아래에 기능 5개와 기술 구성 표. 에코-비탈 페이지와 같은 문서형 결.",
  },
  {
    id: "b",
    key: "B",
    name: "구성 중심",
    summary: "모듈 → 통신 → 웹 플랫폼 구성도(플랫폼 강조)로 시작해 플랫폼의 자리를 먼저 보여주고, 관제 화면 둘러보기와 기술 구성 표로 마무리. 기능 5개 목록은 화면 둘러보기로 갈음.",
  },
] as const;

export type PlatformDraftId = (typeof platformDrafts)[number]["id"];

// 운영 페이지(/ko/solutions/platform)는 B안 (2026-10-27 확정)
export function platformPageBlocks(locale: Locale): Block[] {
  return platformBlocks("b", locale);
}

export function platformBlocks(draft: PlatformDraftId, locale: Locale = "ko", { newArchitecture = false }: { newArchitecture?: boolean } = {}): Block[] {
  const { pageTitle, tour, features, stack } = content(locale);
  const top = pageTop({ locale, path: "/solutions/platform" });
  const bottom = pageBottom({ locale });

  if (draft === "b") {
    return [
      ...top,
      pageTitle,
      newArchitecture ? softwareArchitecture(locale) : { type: "system-diagram", data: { ...systemDiagram("platform", locale), id: "system" } },
      tour,
      { type: "spec-table", data: { ...stack, id: "stack" } },
      ...bottom,
    ];
  }

  return [
    ...top,
    pageTitle,
    tour,
    { type: "feature-list", data: { variant: "rows", title: translator(locale)("주요 기능", "Features"), items: features, tone: "white", id: "features" } },
    { type: "spec-table", data: { ...stack, id: "stack" } },
    ...bottom,
  ];
}
