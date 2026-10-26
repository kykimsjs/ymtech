import type { Block } from "@/components/blocks/registry";
import { keyPoints, nav, photo, product, quickActions } from "@/content/block-catalog";

// HOME 블록 순서 (2026-10-26 확정)
//   헤더 → 히어로(단일 사진) → 핵심 소구점 → 증거(숫자) → 솔루션 바로가기 → 실시간 관제 → (적용 분야·실증) → Quick Actions → 푸터
// 자료가 없는 블록은 hidden에 이유를 적어 운영 화면에서 뺀다 (블록 카탈로그 등 showHidden 화면에서만 보임).
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
          { label: "KR", href: "/ko", active: true },
          { label: "EN", href: "/en" },
        ],
      },
    },
    {
      // 단일 사진 히어로. 현장 사진이 오기 전까지 임시 이미지를 쓴다.
      type: "hero-media",
      data: {
        title: ["화재예방부터", "에너지 최적화까지"],
        description: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
        media: photo("스마트팜 온실 전경 또는 분전반 앞 점검 장면 (가로 사진, 2400px 이상)"),
        actions: [
          { label: "도입·실증 문의", href: "#" },
          { label: "제품 소개서 다운로드", href: "#" },
        ],
      },
    },
    { type: "key-points", data: { items: keyPoints } },
    {
      type: "stats-gallery",
      data: {
        surface: true,
        // 기획안 1장 핵심 메시지 "기술 신뢰성"(KETI 검증, KESCO 규격 준수) + 6장 핵심 수치 3개
        title: "기술 신뢰성",
        stats: [
          { label: "전압·전류 측정 정확도 · KETI 검증", value: "±2", unit: "%" },
          { label: "이상 감지 후 자동 차단", value: "10", unit: "초" },
          { label: "화재 예지 알고리즘 · 정상·화재 연출 데이터 비교", value: "AI", unit: "" },
          { label: "전기설비 규격 준수", value: "KESCO", unit: "" },
        ],
      },
    },
    {
      type: "tile-grid",
      data: {
        title: "솔루션",
        tiles: [
          { label: "지능형 에코-비탈(Eeco-Vital) 모듈", title: ["분전반 장착형", "감지·차단 모듈"], href: "#", media: product },
          { label: "통합 안전관리 웹 플랫폼", title: ["실시간 관제와", "이력 관리"], href: "#", media: photo("웹 플랫폼 화면을 보는 담당자") },
        ],
      },
    },
    {
      type: "dashboard-preview",
      data: {
        title: "실시간 관제",
        description: "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다. 이상이 생기면 경보를 울리고 이력으로 남깁니다.",
        // 기획안 3장 와이어프레임 "실시간 관제 데모 링크" (데모 주소 받으면 연결)
        action: { label: "웹 플랫폼 데모 로그인", href: "#" },
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
          // 대표·사업자등록번호·주소는 자료를 받으면 추가
          { label: "와이엠이노테크", value: "YM INNOTECH" },
        ],
        copyright: "© YM INNOTECH. All rights reserved.",
      },
    },
  ];
}
