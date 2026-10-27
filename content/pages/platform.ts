import type { Block } from "@/components/blocks/registry";
import { platformScreen } from "@/content/block-catalog";
import { pageBottom, pageTop } from "./common";
import { systemDiagram } from "./eco-vital";

// 솔루션 > 통합 웹 플랫폼 (준비 중, 2026-10-26)
// 문구 근거: 제품소개 3장 SOFTWARE(기능 5개), 기획안 5장 SOFTWARE. 자동 차단 시간은 10초로 확정(제품소개의 30초는 틀린 값)
// 준비 중인 서비스라 작게 만든다 (2026-10-26 "너무 크지 않아도 될 것 같아")

const pageTitle: Block = {
  type: "page-title",
  data: {
    title: "통합 웹 플랫폼",
    status: "준비 중",
    description: "분전반의 전력과 환경을 한 화면에서 보고, 이상을 알리고 기록합니다",
    breadcrumb: ["홈", "솔루션", "통합 웹 플랫폼"],
    media: platformScreen,
  },
};

// HOME 실시간 관제와 같은 화면 4개 (고르면 모니터 속 예시 화면이 바뀐다)
const tour: Block = {
  type: "dashboard-preview",
  data: {
    title: "실시간 관제",
    description: "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다.\n이상이 생기면 경보를 울리고 이력으로 남깁니다.",
    status: "준비 중",
    features: [
      { title: "실시간 대시보드", text: "전력 사용량·온습도 그래프", screen: "dashboard" },
      { title: "경보와 자동 차단", text: "시각·청각 경보, 전원 차단", screen: "alarm" },
      { title: "이력 관리", text: "이상 이력 조회, 엑셀 내려받기", screen: "history" },
      { title: "데이터 보안", text: "클라우드 저장, 권한별 열람", screen: "access" },
    ],
    note: "예시 화면 · 표시된 수치는 실제 데이터가 아닙니다",
    id: "tour",
  },
};

// 제품소개 3장 기능 5개. 개발 용어는 고객이 알아들을 말로, 기술 이름은 아래 기술 구성 표로 보낸다
const features = [
  { title: "실시간 대시보드", text: "전력 사용량과 시간별 변화, 온·습도를 그래프로 보여줍니다" },
  { title: "경보와 자동 대응", text: "화재 위험이 감지되면 시각·청각 경보를 울리고 10초 안에 자동 차단합니다" },
  { title: "클라우드 저장", text: "측정 데이터를 클라우드 저장소에 보관합니다" },
  { title: "데이터 보안", text: "사용자 권한에 따라 볼 수 있는 데이터를 나눕니다" },
  { title: "이력 관리", text: "이상 이력을 조회하고 데이터를 엑셀로 내려받습니다" },
];

const stack = {
  title: "기술 구성",
  rows: [
    { label: "화면", value: "React" },
    { label: "서버", value: "NestJS" },
    { label: "저장소", value: "Cloudflare R2" },
    { label: "권한 관리", value: "JWT 기반 RBAC (역할별 접근 권한)" },
    { label: "파일 접근", value: "Presigned URL (기한이 있는 접근 주소)" },
  ],
};

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
export function platformPageBlocks(): Block[] {
  return platformBlocks("b");
}

export function platformBlocks(draft: PlatformDraftId): Block[] {
  if (draft === "b") {
    return [
      ...pageTop(),
      pageTitle,
      { type: "system-diagram", data: { ...systemDiagram("platform"), id: "system" } },
      tour,
      { type: "spec-table", data: { ...stack, id: "stack" } },
      ...pageBottom(),
    ];
  }

  return [
    ...pageTop(),
    pageTitle,
    tour,
    { type: "feature-list", data: { variant: "rows", title: "주요 기능", items: features, tone: "white", id: "features" } },
    { type: "spec-table", data: { ...stack, id: "stack" } },
    ...pageBottom(),
  ];
}
