import type { Block } from "@/components/blocks/registry";
import { featureRows, nav, photo, product, quickActions } from "@/content/block-catalog";
import { fullAddress, organization } from "@/lib/site";

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
      // 사진 4장이 천천히 넘어가는 히어로. 자체 현장 사진을 받기 전까지 무료 사진을 쓴다.
      // 사진 출처: Pexels (pexels.com/photo/<번호>), Pexels 라이선스 — 상업 이용 가능, 출처 표기 의무 없음
      //   interior 7299928 · aerial 19581775 · worker 7299987 · glass-sky 4973046
      type: "hero-media",
      data: {
        title: ["화재예방부터", "에너지 최적화까지"],
        description: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
        overlay: "soft",
        media: [
          { src: "/images/hero/interior.webp", alt: "넓은 온실 안에 재배 포트와 점적 관수 호스가 줄지어 있다", focus: "60% 50%" },
          { src: "/images/hero/aerial.webp", alt: "비닐 온실 지붕이 이어진 농업 단지 항공 사진", focus: "50% 50%" },
          { src: "/images/hero/worker.webp", alt: "온실에서 작물을 살피는 재배 담당자", focus: "48% 55%" },
          { src: "/images/hero/glass-sky.webp", alt: "파란 하늘 아래 유리 온실 지붕", focus: "60% 40%" },
        ],
        actions: [
          { label: "도입·실증 문의", href: "#" },
          { label: "제품 소개서 다운로드", href: "#" },
        ],
      },
    },
    { type: "feature-rows", data: { title: "분전반 안에서 감지부터 차단까지", items: featureRows } },
    {
      // 기획안 1장 핵심 메시지 "기술 신뢰성"(KETI 검증, KESCO 규격 준수) + 6장 핵심 수치 3개
      // 숫자인 두 개만 크게, 나머지는 근거 줄로 보낸다
      type: "trust-figures",
      data: {
        title: "기술 신뢰성",
        description: "측정 정확도는 KETI의 검증을 거쳤고, 전기설비는 KESCO 규격을 따릅니다.",
        figures: [
          { value: "±2", unit: "%", label: "전압·전류 측정 정확도" },
          { value: "10", unit: "초", label: "이상 감지 후 자동 차단" },
        ],
        evidence: [
          { name: "KETI", full: "한국전자기술연구원", text: "전압·전류 측정 정확도 ±2% 검증" },
          { name: "KESCO", full: "한국전기안전공사", text: "전기설비 규격 준수" },
          { name: "AI 화재 예지", full: "예지 보전 알고리즘", text: "정상 데이터와 화재 연출 데이터를 비교·분석해 이상 징후를 찾습니다" },
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
          // 사업자등록번호는 자료를 받으면 추가
          { label: organization.name, value: organization.alternateName },
          { label: "대표", value: organization.ceo },
          { label: "주소", value: fullAddress },
          { label: "대표전화", value: organization.phone },
          { label: "이메일", value: organization.email },
        ],
        copyright: "© YM INNOTECH. All rights reserved.",
      },
    },
  ];
}
