import type { Block } from "@/components/blocks/registry";
import { keyPoints, nav, photo, product, quickActions } from "@/content/block-catalog";

// HOME 블록 순서 — 기획안 3장(헤드카피 → 소구점 → 바로가기 → 관제 데모 → Quick Actions)에
// 재분석(plan-analysis.md)에서 권장한 증거 영역(숫자·현장)을 더했다.
export function homeBlocks({ headerTone }: { headerTone: "light" | "dark" }): Block[] {
  return [
    { type: "announcement-bar", data: { text: "에코-비탈 모듈 제품 소개서", linkLabel: "PDF 받기", href: "#" } },
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
      type: "hero-media",
      data: {
        title: ["화재예방부터", "에너지 최적화까지"],
        description: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
        media: photo("온실 분전반 앞에서 모듈을 점검하는 직원 (가로 사진 또는 영상)"),
        actions: [
          { label: "제품 소개서 다운로드", href: "#" },
          { label: "도입·실증 문의", href: "#" },
        ],
      },
    },
    { type: "key-points", data: { items: keyPoints } },
    {
      type: "intro-split",
      data: {
        tone: "dark",
        title: ["주요 제품", "바로가기"],
        description: "분전반에 다는 에코-비탈 모듈과, 그 데이터를 보여주는 통합 안전관리 웹 플랫폼을 함께 공급합니다.",
      },
    },
    {
      type: "tile-grid",
      data: {
        tiles: [
          { label: "Eco-Vital", title: ["분전반 장착형", "감지·차단 모듈"], href: "#", media: product },
          { label: "Web Platform", title: ["실시간 관제와", "이력 관리"], href: "#", media: photo("웹 플랫폼 화면을 보는 담당자") },
          { label: "Smart Greenhouse", title: ["스마트 온실"], href: "#", media: photo("온실 내부") },
          { label: "Livestock · Vertical Farm", title: ["축사·수직농장"], href: "#", media: photo("축사 또는 수직농장 내부") },
        ],
      },
    },
    {
      type: "stats-gallery",
      data: {
        title: "숫자로 보는 에코-비탈 모듈",
        basis: "2026년 10월 기획안 기준 · *제품소개 자료에는 30초로 되어 있어 확인 필요",
        stats: [
          { label: "전압·전류 측정 오차 (KETI)", value: "±2", unit: "%" },
          { label: "이상 감지 후 차단", value: "10", unit: "초*" },
          { label: "실시간 전력 감지", value: "3", unit: "상" },
        ],
        gallery: [
          { caption: "전남 중소 스마트팜", media: photo("실증 현장 외관") },
          { caption: "㈜그린에이트 협력 현장", media: photo("협력 현장 분전반") },
          { caption: "KETI 시험", media: photo("시험 장면 또는 성적서") },
          { caption: "[현장 이름]", media: photo("추가 실증 현장") },
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
      type: "benefit-band",
      data: {
        title: "와이엠이노테크의 미션",
        items: [
          { icon: "shield", title: "안전성", text: "AI 이상 감지와 실시간 자동 차단으로 화재 피해를 막습니다." },
          { icon: "leaf", title: "에너지 효율", text: "전력과 환경 데이터를 함께 분석해 에너지 사용을 줄입니다." },
          { icon: "users", title: "보급형", text: "중소 스마트팜에 맞춘 저비용 구성으로 공급합니다." },
        ],
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
