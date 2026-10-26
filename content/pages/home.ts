import type { Block } from "@/components/blocks/registry";
import { featureRows, nav, photo, platformScreen, product, quickActions } from "@/content/block-catalog";
import { fullAddress, organization, phoneE164 } from "@/lib/site";

// HOME 블록 순서 (2026-10-26 확정)
//   헤더 → 히어로(사진 4장 슬라이드) → 문제 제기 문단 → 주력 제품(에코-비탈) → 핵심 소구점(펼침 패널) → 기술 신뢰성 → 솔루션 → 실시간 관제(준비 중) → (설치 사례) → 문의(Quick Actions 포함) → 푸터
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
    {
      // 움직이는 히어로와 사진 패널 사이에 쉬어 가는 글 블록 (회사 소개는 별도 페이지)
      // 문구 근거: 기획안 6장 차별성(기존 제품은 단일 센서 위주), 4장 CEO 인사말(20년 현장 노하우)
      type: "statement",
      data: {
        eyebrow: "농업 전력 안전",
        title: "분전반 화재를 미리 알고 끊습니다",
        paragraphs: [
          "지금 쓰이는 제품은 대부분 온습도나 전력 가운데 하나만 잽니다.\n와이엠이노테크는 20년 현장 경험을 바탕으로 농업 시설의 전력 안전 사각지대를 줄이려 합니다.",
          "에코-비탈 모듈은 전력 감지, 환경 감지, AI 분석, 자동 차단을 모듈 하나에 넣었습니다.",
        ],
      },
    },
    {
      // 주력 제품 소개. 문구는 클라이언트 제공 소개글(2026-10-26) 그대로
      type: "product-showcase",
      data: {
        // BI 매뉴얼 BS 09 시그니처(MODIQ + Advanced Smart Module), 어두운 바탕용 흰색 판 (BS 13 색상 활용 기준)
        brand: { src: "/brand/modiq-signature-white.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 },
        label: "주력 제품",
        title: ["에너지 관리의 효율을 높이는", "YM이노테크의 혁신적인 솔루션"],
        name: "지능형 에코-비탈(Eeco-Vital) 모듈",
        description: "분전반 안에 장착해 전력과 환경을 함께 감지하고,\n이상이 생기면 자동으로 전원을 차단합니다.",
        media: product,
        actions: [
          { label: "제품 자세히 보기", href: "#" },
          { label: "제품 소개서 다운로드", href: "#" },
        ],
        features: [
          { title: "에너지 절감", text: "효율적인 에너지 관리로\n운영비 절감" },
          { title: "안정적인 운용", text: "신뢰성 높은 성능으로\n안정적인 시스템 운영" },
          { title: "간편한 설치", text: "산업 현장에 최적화된\n설계와 편리한 설치" },
          { title: "지속가능한 미래", text: "친환경 에너지 관리로\n지속가능한 성장" },
        ],
      },
    },
    // 소구점 3개: 데스크톱은 마우스를 올리면 펼쳐지는 세로 3분할, 모바일은 아코디언
    { type: "feature-panels", data: { title: "분전반 안에서 감지부터 차단까지", items: featureRows } },
    {
      // 기획안 1장 핵심 메시지 "기술 신뢰성"(KETI 검증, KESCO 규격 준수) + 6장 핵심 수치 3개
      // 숫자인 두 개만 크게, 나머지는 근거 줄로 보낸다
      type: "trust-figures",
      data: {
        title: "기술 신뢰성",
        description: "측정 정확도는 KETI의 검증을 거쳤고,\n전기설비는 KESCO 규격을 따릅니다.",
        figures: [
          { value: "±2", unit: "%", label: "전압·전류 측정 정확도" },
          { value: "10", unit: "초", label: "이상 감지 후 자동 차단" },
        ],
        evidence: [
          // 마크: 각 기관 홈페이지 공식 CI (keti.re.kr 연구원소개 > CI, kesco.or.kr 홍보센터 > CI)
          // AI 화재 예지는 위 소구점 패널 02에서 다루므로 여기서는 기획안 "기술 신뢰성" 두 근거만 둔다
          {
            name: "측정 정확도 검증",
            full: "한국전자기술연구원(KETI)",
            text: "전압·전류 측정 정확도 ±2%",
            logo: { src: "/images/marks/keti.png", width: 900, height: 209 },
          },
          {
            name: "전기설비 규격 준수",
            full: "한국전기안전공사(KESCO)",
            text: "한국전기안전공사 전기설비 규격",
            logo: { src: "/images/marks/kesco.png", width: 900, height: 194 },
          },
        ],
      },
    },
    {
      type: "tile-grid",
      data: {
        title: "솔루션",
        tiles: [
          {
            label: "지능형 에코-비탈(Eeco-Vital) 모듈",
            title: ["분전반 장착형", "감지·차단 모듈"],
            href: "#",
            media: product,
            brand: { src: "/brand/modiq-signature-white.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 },
          },
          // 웹 플랫폼 준비 중 (2026-10-26)
          { label: "통합 안전관리 웹 플랫폼", title: ["실시간 관제와", "이력 관리"], href: "#", media: platformScreen, status: "준비 중" },
        ],
      },
    },
    {
      type: "dashboard-preview",
      data: {
        title: "실시간 관제",
        description: "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다.\n이상이 생기면 경보를 울리고 이력으로 남깁니다.",
        // 웹 플랫폼 준비 중 (2026-10-26). 열리면 status·note를 빼고 기획안 3장 "실시간 관제 데모 링크"를 action으로 연결
        //   action: { label: "웹 플랫폼 데모 로그인", href: "<데모 주소>" },
        status: "준비 중",
        // 기획안 5장 SOFTWARE · 제품소개 3장 (개발 용어는 고객이 알아들을 말로)
        features: [
          { title: "실시간 대시보드", text: "전력 사용량·온습도 그래프" },
          { title: "경보와 자동 차단", text: "시각·청각 경보, 전원 차단" },
          { title: "이력 관리", text: "이상 이력 조회, 엑셀 내려받기" },
          { title: "데이터 보안", text: "클라우드 저장, 권한별 열람" },
        ],
        note: "예시 화면 · 표시된 수치는 실제 데이터가 아닙니다",
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
    {
      // 기획안 HOME Quick Actions를 페이지 끝 문의 섹션 안에 넣었다
      // 사진: Pexels 32146752 (온실 내부), Pexels 라이선스
      type: "closing-cta",
      data: {
        title: "우리 농장 분전반에도 설치할 수 있을까요?",
        text: "전화나 이메일로 바로 물어보셔도 되고,\n문의 양식을 남겨 주셔도 됩니다.",
        contacts: [
          { label: "대표전화", value: organization.phone, href: `tel:${phoneE164}` },
          { label: "이메일", value: organization.email, href: `mailto:${organization.email}` },
        ],
        // 문의를 맨 위로
        actions: [quickActions[1], quickActions[0], quickActions[2]],
        media: { src: "/images/home/closing-greenhouse.webp", alt: "환기팬이 달린 온실에서 자라는 잎채소", focus: "50% 50%" },
      },
    },
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
