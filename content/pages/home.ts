import type { Block } from "@/components/blocks/registry";
import { keyPoints, nav, photo, product, quickActions } from "@/content/block-catalog";

// HOME 블록 순서 (2026-10-26 확정)
//   헤더 → 히어로(제품 좌우 분할) → 핵심 소구점 → 증거(숫자) → 솔루션 바로가기 → 실시간 관제 → (적용 분야·실증) → Quick Actions → 푸터
// 자료가 없는 블록은 hidden에 이유를 적어 운영 화면에서 뺀다. 시안 화면에서는 표시해서 보여준다.
export function homeBlocks({ headerTone = "light" }: { headerTone?: "light" | "dark" } = {}): Block[] {
  return [
    {
      type: "announcement-bar",
      hidden: "제품 소개서 PDF 대기",
      data: { text: "에코-비탈 모듈 제품 소개서", linkLabel: "PDF 받기", href: "#" },
    },
    {
      type: "site-header",
      data: {
        nav,
        cta: { label: "도입 문의", href: "#" },
        tone: headerTone,
        sticky: true,
        locales: [
          { label: "KR", href: "#", active: true },
          { label: "EN", href: "#" },
        ],
      },
    },
    {
      type: "hero-split",
      data: {
        heading: "h1",
        eyebrow: "AIoT 스마트팜 에너지·화재 관리 솔루션",
        title: ["화재예방부터", "에너지 최적화까지"],
        description: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
        actions: [
          { label: "도입·실증 문의", href: "#" },
          { label: "제품 소개서 다운로드", href: "#" },
        ],
        media: product,
      },
    },
    { type: "key-points", data: { items: keyPoints } },
    {
      type: "stats-gallery",
      data: {
        surface: true,
        title: "시험으로 확인한 숫자",
        basis: "2026년 10월 기획안 기준",
        stats: [
          { label: "전압·전류 측정 오차 (KETI)", value: "±2", unit: "%" },
          { label: "이상 감지 후 자동 차단", value: "10", unit: "초" },
          { label: "실시간 전력 감지", value: "3", unit: "상" },
        ],
      },
    },
    {
      type: "tile-grid",
      data: {
        title: "솔루션",
        tiles: [
          { label: "Eco-Vital Module", title: ["분전반 장착형", "감지·차단 모듈"], href: "#", media: product },
          { label: "Web Platform", title: ["통합 안전관리", "웹 플랫폼"], href: "#", media: photo("웹 플랫폼 화면을 보는 담당자") },
        ],
      },
    },
    {
      type: "dashboard-preview",
      data: {
        title: "실시간 관제",
        description: "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다. 이상이 생기면 경보를 울리고 이력으로 남깁니다.",
        note: "예시 화면입니다. 실제 웹 플랫폼 화면으로 교체 예정",
      },
    },
    {
      type: "gallery-tabs",
      hidden: "현장 사진 대기",
      data: {
        title: "설치 사례",
        description: "에코-비탈 모듈이 실제로 달린 분전반입니다.",
        groups: ["스마트 온실", "축사", "수직농장"].map((label) => ({
          label,
          items: [1, 2, 3, 4].map((n) => ({ caption: `${label} 분전반 ${n}`, media: photo(`${label} 분전반 내부 설치 ${n}`) })),
        })),
      },
    },
    { type: "quick-actions", data: { items: quickActions } },
    {
      type: "site-footer",
      data: {
        columns: nav.map((item) => ({ title: item.label, links: item.children.map((c) => c.label) })),
        info: [
          { label: "(주)와이엠이노테크", value: "" },
          { label: "대표", value: "[확인 필요]" },
          { label: "사업자등록번호", value: "[확인 필요]" },
          { label: "주소", value: "[확인 필요]" },
        ],
        copyright: "© YM INNOTECH. All rights reserved.",
      },
    },
  ];
}
