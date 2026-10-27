import type { Block } from "@/components/blocks/registry";
import type { NavItem } from "@/components/blocks/site-header";
import type { FeatureRowsProps } from "@/components/blocks/feature-rows";
import type { MediaData } from "@/components/blocks/media";
import { fullAddress, organization } from "@/lib/site";

// 블록 카탈로그 예시 데이터. 사실은 docs/ 기획안·제품소개에서만 가져온다.
// 자료가 없는 값(연도, 고객사, 주소, 사진)은 [ ]로 비워 둔다.

// 제품 사진 2장 (클라이언트 제공, 원본 docs/YM_INNOTECH_clean_1·2). 어두운 바탕 섹션엔 dark, 밝은 바탕엔 light
export const product: MediaData = {
  src: "/images/product/eco-vital-dark.webp",
  alt: "어두운 책상 위의 에코-비탈 모듈. 검정 함체 앞면에 YM INNOTECH 각인과 정상 상태를 띄운 LCD 창이 있다.",
  focus: "50% 50%",
};
export const productLight: MediaData = {
  src: "/images/product/eco-vital-light.webp",
  alt: "은색 바탕 위의 에코-비탈 모듈과 녹색 센서. LCD 창에 AI 화재 경보가 떠 있다.",
  focus: "50% 50%",
};
export const photo = (hint: string): MediaData => ({ alt: hint, hint });
// 웹 플랫폼 타일용 임시 사진 (실제 플랫폼 화면을 받으면 교체). Pexels 8636589, Pexels 라이선스
export const platformScreen: MediaData = {
  src: "/images/home/platform-screen.webp",
  alt: "차트와 표가 띄워진 관제 모니터",
  focus: "50% 40%",
};

// 기획안 3장 HOME — 핵심 소구점 3가지
export const keyPoints = [
  { label: "소형 컴팩트 구조", title: "분전반 안에 바로 답니다", text: "분전반 내부에 직접 장착하는 일체형 모듈이라 현장에 쉽게 설치합니다." },
  // 기획안 1장 핵심 메시지 2 "통합 효율성 — 전력·환경 센싱, AI, 차단 제어를 한 모듈로"를 함께 담는다
  { label: "복합 센싱 & AI 예지", title: "전력과 환경을 함께 봅니다", text: "전압·전류와 온·습도를 함께 감지하고, AI가 이상 징후를 미리 찾습니다. 감지부터 차단까지 모듈 하나가 맡습니다." },
  { label: "원격 관제 & 자동 대응", title: "10초 안에 전원을 끊습니다", text: "이상이 감지되면 자동으로 차단하고, 웹 플랫폼으로 실시간 알림과 이력을 남깁니다." },
];

// 핵심 소구점을 사진·도식과 함께 좌우로 펼친 판 (HOME). 사양은 제품소개·기획안 그대로.
// 사진: Pexels 28950842(분전반) · 10269715(수경재배 시설), Pexels 라이선스
export const featureRows: FeatureRowsProps["items"] = [
  {
    ...keyPoints[0],
    facts: [
      { label: "설치 위치", value: "분전반 내부 · Main/Sub MCCB 연동" },
      { label: "계측", value: "3상(RST/UVW) 전압·전류" },
      { label: "통신", value: "RS-232 · Wi-Fi · LAN" },
    ],
    visual: { media: { src: "/images/home/panel.webp", alt: "차단기가 줄지어 있는 분전반 내부", focus: "50% 50%" } },
  },
  {
    ...keyPoints[1],
    // \n: 데스크톱에서만 의미 단위로 줄바꿈 (BreakText)
    text: "전압·전류와 온·습도를 함께 감지하고,\nAI가 화재로 이어질 이상 징후를 미리 찾습니다.",
    facts: [
      { label: "전력", value: "전압 · 전류" },
      { label: "환경", value: "온·습도 · 불꽃 · 침수 · 진동" },
      { label: "분석", value: "AI 화재 이상 징후 예지" },
    ],
    visual: { media: { src: "/images/home/sensing-farm.webp", alt: "센서와 배선이 설치된 실내 수경재배 시설", focus: "50% 50%" } },
  },
  {
    ...keyPoints[2],
    text: "이상이 감지되면 자동으로 차단하고,\n웹 플랫폼으로 실시간 알림과 이력을 남깁니다.",
    facts: [
      { label: "차단", value: "SSR(전자식 릴레이) 자동 차단" },
      { label: "경보", value: "시각·청각 경보" },
      { label: "기록", value: "웹 플랫폼 실시간 알림·이력" },
    ],
    visual: { diagram: "cutoff" },
  },
];

// 기획안 HOME "기술 신뢰성" 근거 항목 (±2% KETI 검증, 10초 KESCO 규격 준수). HOME은 숫자 항목만 쓴다
export const trustItems = [
  {
    value: "±2",
    unit: "%",
    label: "전압·전류 측정 정확도",
    source: "한국전자기술연구원(KETI) 검증",
    mark: { src: "/images/marks/keti.png", alt: "한국전자기술연구원(KETI)", width: 900, height: 209 },
  },
  { value: "10", unit: "초", label: "이상 감지 후 자동 차단", source: "한국전기안전공사(KESCO) 규격 준수" },
  {
    value: "KESCO",
    label: "전기설비 규격 준수",
    source: "한국전기안전공사 전기설비 규격",
    mark: { src: "/images/marks/kesco.png", alt: "한국전기안전공사(KESCO)", width: 900, height: 194 },
  },
];

// 기획안 3장 HOME — Quick Actions
export const quickActions = [
  // 소개서 PDF 준비 중 (2026-10-27). 받으면 status를 지우고 text를 "에코-비탈 모듈 소개서(PDF)를 내려받습니다."로 되돌린다
  { icon: "download" as const, label: "제품 소개서", text: "에코-비탈 모듈 소개서(PDF)는 준비 중입니다.", href: "#", status: "준비 중" },
  { icon: "message" as const, label: "도입·실증 문의", text: "농가, 시공사, 지자체 담당자 모두 문의하실 수 있습니다.", href: "#" },
  // 웹 플랫폼 준비 중 (2026-10-26). 열리면 status를 지우고 text를 "데모 계정으로 로그인해 실제 관제 화면을 봅니다."로 되돌린다
  { icon: "demo" as const, label: "웹 플랫폼 데모 로그인", text: "웹 플랫폼은 준비 중입니다.", href: "#", status: "오픈 예정" },
];

export type CatalogEntry = {
  group: string;
  name: string;
  ref: string;
  block: Block;
};

// 사이트맵 (2026-10-27 확정): 기획안 14페이지를 HOME + 6페이지로 합쳤다. 하위 메뉴는 솔루션만.
//   회사소개: 인사말 · 비전·미션 · 연혁 · 팀·파트너 / 기술·인증: 기술 차별성 · AI 화재 예지 · 특허·인증
//   실증 사례: 현장 · 도입 효과 / 문의: 문의 폼 · 오시는 길. 자료가 쌓이면 다시 나눈다.
export const nav: NavItem[] = [
  { label: "회사소개", href: "/ko/company" },
  {
    label: "솔루션",
    href: "/ko/solutions/eco-vital",
    children: [
      { label: "에코-비탈 모듈", href: "/ko/solutions/eco-vital" },
      { label: "통합 웹 플랫폼", href: "/ko/solutions/platform" },
    ],
  },
  { label: "기술·인증", href: "/ko/technology" },
  { label: "실증 사례", href: "#" },
  { label: "문의", href: "#" },
];
export const footerColumns = nav.map((item) => ({ title: item.label, href: item.href, links: (item.children ?? []).map((c) => c.label) }));

export const catalog: CatalogEntry[] = [
  // ── 공통 ─────────────────────────────────────────
  {
    group: "공통",
    name: "상단 공지 바",
    ref: "아이오크롭스 · 상단 공지 바",
    block: {
      type: "announcement-bar",
      data: { text: "에코-비탈 모듈 제품 소개서", linkLabel: "PDF 받기", href: "#" },
    },
  },
  {
    group: "공통",
    name: "헤더 (밝은 바탕)",
    ref: "케빈랩 · 서브 페이지 GNB, 하위 메뉴 드롭다운",
    block: {
      type: "site-header",
      data: {
        nav,
        cta: { label: "도입 문의", href: "#" },
        locales: [
          { label: "KR", href: "/ko/design/blocks", active: true },
          { label: "EN", href: "/en/design/blocks" },
        ],
      },
    },
  },
  {
    group: "공통",
    name: "헤더 (어두운 바탕)",
    ref: "아이오크롭스 · GNB + 상담 신청 버튼",
    block: {
      type: "site-header",
      data: { nav, cta: { label: "도입 문의", href: "#" }, tone: "dark" },
    },
  },
  {
    group: "공통",
    name: "푸터",
    ref: "지노시스 · 하단 사업자 정보",
    block: {
      type: "site-footer",
      data: {
        columns: footerColumns,
        info: [
          [{ value: organization.name }, { label: "대표", value: organization.ceo }, { value: fullAddress }],
          [
            { label: "사업자등록번호", value: "[확인 필요]" },
            { label: "대표전화", value: organization.phone },
            { label: "이메일", value: organization.email },
          ],
        ],
        copyright: "© YM INNOTECH. All rights reserved.",
      },
    },
  },

  // ── 첫 화면 ──────────────────────────────────────
  {
    group: "첫 화면",
    name: "메인 히어로 (사진 가득)",
    ref: "아이오크롭스 · 메인 히어로",
    block: {
      type: "hero-media",
      data: {
        title: ["화재예방부터", "에너지 최적화까지"],
        caption: "와이엠이노테크 YM INNOTECH",
        media: photo("온실 분전반 앞에서 모듈을 점검하는 직원 (가로 사진 또는 영상)"),
      },
    },
  },
  {
    group: "첫 화면",
    name: "좌우 분할 히어로",
    ref: "케빈랩 · 메인 제품 슬라이드",
    block: {
      type: "hero-split",
      data: {
        label: "EECO-VITAL",
        eyebrow: "스마트팜 분전반용 AIoT 모듈",
        title: ["전력과 환경을 함께 보고", "위험하면 전원을 끊습니다"],
        actions: [{ label: "자세히 보기", href: "#" }],
        media: product,
      },
    },
  },
  {
    group: "첫 화면",
    name: "서브 페이지 타이틀",
    ref: "케빈랩 4ST ZIP · 서브 상단",
    block: {
      type: "page-title",
      data: {
        title: "에코-비탈 모듈",
        description: "분전반 안에 설치하는 AIoT 에너지·화재 관리 모듈",
        breadcrumb: ["홈", "솔루션", "에코-비탈 모듈"],
        media: photo("분전반 내부 설치 사진 (어둡게 깔아도 되는 가로 사진)"),
      },
    },
  },
  {
    group: "첫 화면",
    name: "페이지 안 고정 탭",
    ref: "여의시스템 · 솔루션 페이지 고정 탭",
    block: {
      type: "anchor-tabs",
      data: {
        sticky: false,
        items: [
          { label: "개요", target: "overview" },
          { label: "장점", target: "benefits" },
          { label: "적용 분야", target: "applications" },
          { label: "제품 구성", target: "products" },
          { label: "문의", target: "contact" },
        ],
      },
    },
  },

  // ── 소개 ─────────────────────────────────────────
  {
    group: "소개",
    name: "제목·설명 좌우 배치",
    ref: "아이오크롭스 · 대표 솔루션 머리말",
    block: {
      type: "intro-split",
      data: {
        tone: "dark",
        title: ["와이엠이노테크의", "솔루션"],
        description:
          "분전반에 다는 에코-비탈 모듈과, 그 데이터를 보여주는 통합 안전관리 웹 플랫폼을 함께 공급합니다. 중소 스마트팜과 지자체 실증·보급 사업에 맞춰 설계했습니다.",
      },
    },
  },
  {
    group: "소개",
    name: "문제 제기 문단",
    ref: "케빈랩 4ST ZIP · 기후변화의 해결책",
    block: {
      type: "statement",
      data: {
        eyebrow: "농업 전력 안전",
        title: "분전반 화재를 미리 알고 끊습니다",
        paragraphs: [
          "지금 쓰이는 제품은 대부분 온습도나 전력 가운데 하나만 잽니다. 와이엠이노테크는 20년 현장 경험을 바탕으로 농업 시설의 전력 안전 사각지대를 줄이려 합니다.",
          "에코-비탈 모듈은 전력 감지, 환경 감지, AI 분석, 자동 차단을 모듈 하나에 넣었습니다.",
        ],
      },
    },
  },

  {
    group: "소개",
    name: "핵심 소구점 3",
    ref: "기획안 HOME 소구점 · 케빈랩 인증 현황의 윗선 구성",
    block: { type: "key-points", data: { items: keyPoints } },
  },
  {
    group: "소개",
    name: "소구점 좌우 교차 (사진·도식)",
    ref: "아이오크롭스 솔루션 소개 · 케빈랩 기능 소개",
    block: { type: "feature-rows", data: { title: "분전반 안에서 감지부터 차단까지", items: featureRows } },
  },
  {
    group: "소개",
    name: "소구점 펼침 패널 (세로 3분할)",
    ref: "확장형 패널(expandable panels) · 모바일은 아코디언",
    block: { type: "feature-panels", data: { title: "분전반 안에서 감지부터 차단까지", items: featureRows } },
  },

  // ── 설명 ─────────────────────────────────────────
  {
    group: "설명",
    name: "사진 타일 2열",
    ref: "아이오크롭스 · 대표 솔루션 타일",
    block: {
      type: "tile-grid",
      data: {
        tiles: [
          { label: "Eeco-Vital", title: ["분전반 장착형", "감지·차단 모듈"], href: "#", media: product },
          { label: "Web Platform", title: ["실시간 관제와", "이력 관리"], href: "#", media: photo("웹 플랫폼 화면을 보는 담당자") },
          { label: "Smart Greenhouse", title: ["스마트 온실"], href: "#", media: photo("온실 내부") },
          { label: "Livestock · Vertical Farm", title: ["축사·수직농장"], href: "#", media: photo("축사 또는 수직농장 내부") },
        ],
      },
    },
  },
  {
    group: "설명",
    name: "사업 영역 카드 3열",
    ref: "지노시스 · BUSINESS AREA",
    block: {
      type: "card-grid",
      data: {
        title: "Business Area",
        cards: [
          { icon: "cpu", title: "하드웨어", text: "분전반 안에 들어가는 소형 일체형 모듈입니다. Main·Sub MCCB와 연결해 3상 전압·전류를 재고, 이상이 생기면 SSR로 전원을 끊습니다." },
          { icon: "chart", title: "소프트웨어", text: "전력 사용량, 시간대별 변화, 온·습도를 실시간으로 보여주는 웹 플랫폼입니다. 경보와 이상 이력, 엑셀 내려받기를 지원합니다." },
          { icon: "flame", title: "AI 화재 예지", text: "평소 데이터와 화재 상황을 연출한 데이터를 비교해 이상 징후를 찾는 알고리즘을 연구합니다." },
        ],
      },
    },
  },
  {
    group: "설명",
    name: "개요 (글 + 사진)",
    ref: "여의시스템 · 개요",
    block: {
      type: "media-text",
      data: {
        id: "overview",
        title: "분전반 안에서 전력과 환경을 함께 봅니다",
        paragraphs: [
          "에코-비탈 모듈은 스마트팜 분전반 내부에 직접 장착하는 소형 일체형 장치입니다. Main·Sub MCCB에 연결해 3상(R·S·T / U·V·W) 전압과 전류를 계속 측정합니다.",
          "온도, 습도, 불꽃, 침수, 진동 센서를 함께 연결하고, 이상이 확인되면 SSR(전자식 릴레이)로 전원을 끊습니다. 통신은 RS-232, Wi-Fi, LAN을 지원합니다.",
        ],
        media: product,
      },
    },
  },
  {
    group: "설명",
    name: "장점 띠",
    ref: "여의시스템 · 장점",
    block: {
      type: "benefit-band",
      data: {
        id: "benefits",
        title: "와이엠이노테크의 미션",
        items: [
          { icon: "shield", title: "안전성", text: "AI 이상 감지와 실시간 자동 차단으로 화재 피해를 막습니다." },
          { icon: "leaf", title: "에너지 효율", text: "전력과 환경 데이터를 함께 분석해 에너지 사용을 줄입니다." },
          { icon: "users", title: "보급형", text: "중소 스마트팜에 맞춘 저비용 구성으로 공급합니다." },
        ],
      },
    },
  },
  {
    group: "설명",
    name: "스토리 (해시태그 + 사진 두 장)",
    ref: "아이오크롭스 · #Solutions #Stack",
    block: {
      type: "story",
      data: {
        tags: ["AI", "화재예지"],
        title: ["평소 데이터와", "화재 데이터를 비교합니다"],
        paragraphs: [
          "정상 상태에서 모은 전력·환경 데이터와, 화재 상황을 연출해 모은 데이터를 비교해 이상 징후를 판별합니다.",
          "판별 결과는 웹 플랫폼의 경보와 모듈의 자동 차단으로 이어집니다.",
        ],
        emphasis: "전압·전류 측정 정확도는 KETI 시험에서 ±2%로 확인했습니다.",
        media: [photo("화재 연출 시험 장면"), photo("데이터 분석 화면")],
      },
    },
  },

  // ── 탭 ──────────────────────────────────────────
  {
    group: "탭",
    name: "적용 분야 탭 (글 + 사진)",
    ref: "여의시스템 · 전력 모니터링 애플리케이션",
    block: {
      type: "tabs-media",
      data: {
        id: "applications",
        title: "무엇을 감지하나요",
        tabs: [
          { label: "전력 감지", text: "Main·Sub MCCB에 연결해 3상 전압과 전류를 실시간으로 측정합니다. KETI 시험에서 측정 정확도 ±2%를 확인했습니다.", media: photo("MCCB 연결부 클로즈업"), action: { label: "사양 더 보기", href: "#" } },
          { label: "환경 감지", text: "온도, 습도, 불꽃, 침수, 진동 센서를 함께 연결해 분전반 주변 상태를 봅니다.", media: photo("연동 센서 설치 모습"), action: { label: "사양 더 보기", href: "#" } },
          { label: "자동 차단", text: "이상이 확인되면 SSR로 전원을 끊고, 현장 경보와 웹 플랫폼 알림을 함께 보냅니다.", media: photo("경광등이 켜진 모듈"), action: { label: "사양 더 보기", href: "#" } },
        ],
      },
    },
  },
  {
    group: "탭",
    name: "대상별 탭",
    ref: "안심해 · 기대효과 (관제 사업자 / 전기수용가)",
    block: {
      type: "audience-tabs",
      data: {
        audiences: [
          {
            label: "농가·시공사",
            summary: "도입과 시공, 현장 안전 관리가 필요한 분께",
            columns: [
              { icon: "cpu", title: "설치", points: ["분전반 내부 직접 장착", "Main·Sub MCCB 연동", "RS-232 · Wi-Fi · LAN"] },
              { icon: "flame", title: "안전", points: ["3상 전력 + 환경 복합 감지", "SSR 자동 차단", "현장 경보"] },
              { icon: "chart", title: "관리", points: ["실시간 대시보드", "이상 이력 조회", "엑셀 내려받기"] },
            ],
          },
          {
            label: "지자체·공공기관",
            summary: "실증·보급 사업을 검토하는 분께",
            columns: [
              { icon: "shield", title: "검증", points: ["KETI 측정 정확도 ±2%", "KESCO 규격 준수", "특허 [확인 필요]"] },
              { icon: "leaf", title: "실증", points: ["전남 중소 스마트팜 적용", "㈜그린에이트 협력 현장", "도입 효과 [자료 필요]"] },
              { icon: "users", title: "보급", points: ["중소 농가 맞춤 구성", "저비용 공급", "[보급 조건 확인 필요]"] },
            ],
          },
          {
            label: "투자자",
            summary: "기술 차별성과 사업성을 확인하려는 분께",
            columns: [
              { icon: "zap", title: "통합", points: ["감지·분석·차단을 모듈 하나로", "하드웨어 + 웹 플랫폼"] },
              { icon: "cpu", title: "기술", points: ["AI 화재 예지 알고리즘", "NestJS · React · Cloudflare R2"] },
              { icon: "users", title: "팀", points: ["에너지·제조 전문 경영진", "AI 소프트웨어 자문 교수진", "KETI 등 협력 네트워크"] },
            ],
          },
        ],
      },
    },
  },
  {
    group: "탭",
    name: "설치 사례 갤러리",
    ref: "안심해 · 설치사례 (분전함 유형별 탭)",
    block: {
      type: "gallery-tabs",
      data: {
        title: "설치 사례",
        description: "에코-비탈 모듈이 실제로 달린 분전반입니다.",
        groups: ["스마트 온실", "축사", "수직농장"].map((label) => ({
          label,
          items: [1, 2, 3, 4].map((n) => ({ caption: `${label} 분전반 ${n}`, media: photo(`${label} 분전반 내부 설치 ${n}`) })),
        })),
      },
    },
  },

  // ── 증거 ─────────────────────────────────────────
  {
    group: "증거",
    name: "숫자 + 현장 사진",
    ref: "케빈랩 4ST ZIP · 인증 현황",
    block: {
      type: "stats-gallery",
      data: {
        title: "숫자로 보는 에코-비탈 모듈",
        basis: "2026년 10월 기획안 기준",
        stats: [
          { label: "전압·전류 측정 오차 (KETI)", value: "±2", unit: "%" },
          { label: "이상 감지 후 차단", value: "10", unit: "초" },
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
  },
  {
    group: "증거",
    name: "제품 + 인증 마크",
    ref: "케빈랩 4ST ZIP · L-BEMS 제품 소개",
    block: {
      type: "product-cert",
      data: {
        id: "products",
        media: product,
        name: "에코-비탈 모듈",
        points: ["KETI 전압·전류 측정 정확도 ±2% 검증", "KESCO 규격 준수", "특허 [확인 필요]"],
        marks: [
          { label: "KETI", sub: "성능 검증" },
          { label: "KESCO", sub: "규격 준수" },
          { label: "특허", sub: "[확인 필요]" },
        ],
      },
    },
  },
  {
    group: "증거",
    name: "대시보드 미리보기",
    ref: "케빈랩 4ST ZIP · 실시간 모니터링",
    block: {
      type: "dashboard-preview",
      data: {
        title: "전력과 환경을 실시간으로",
        description: "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다. 이상이 생기면 경보를 울리고 이력으로 남깁니다.",
        note: "예시 화면입니다. 실제 웹 플랫폼 화면으로 교체 예정",
      },
    },
  },
  {
    group: "증거",
    name: "제품 구성 카드",
    ref: "여의시스템 · 연결 솔루션 제품 카드",
    block: {
      type: "product-grid",
      data: {
        title: "제품 구성",
        products: [
          { name: "에코-비탈 모듈", spec: "3상 감지 · SSR 차단 · RS-232/Wi-Fi/LAN", media: product },
          { name: "연동 센서", spec: "온·습도 · 불꽃 · 침수 · 진동", media: photo("센서 제품 사진 (흰 배경)") },
          { name: "통합 웹 플랫폼", spec: "대시보드 · 경보 · 이력 · 권한 관리", media: photo("웹 플랫폼 화면 캡처") },
        ],
      },
    },
  },
  {
    group: "증거",
    name: "파트너 그리드",
    ref: "지노시스 · PORTFOLIO",
    block: {
      type: "logo-grid",
      data: {
        title: "Partners",
        items: [
          { name: "KETI", role: "한국전자기술연구원 · 성능 검증" },
          { name: "㈜그린에이트", role: "실증 협력" },
          { name: "[농업회사법인]", role: "협력 파트너" },
          { name: "[파트너]", role: "[역할]" },
          { name: "[파트너]", role: "[역할]" },
          { name: "[파트너]", role: "[역할]" },
        ],
      },
    },
  },
  {
    group: "증거",
    name: "연혁",
    ref: "아이오크롭스 · History",
    block: {
      type: "timeline",
      data: {
        eyebrow: "History",
        title: "연혁",
        years: [
          { year: "[연도]", events: [{ month: "[월]", text: "KETI 전압·전류 측정 정확도 시험 (±2%)" }, { month: "[월]", text: "㈜그린에이트 협력 현장 실증" }] },
          { year: "[연도]", events: [{ month: "[월]", text: "[연혁 항목]" }, { month: "[월]", text: "[연혁 항목]" }] },
        ],
      },
    },
  },

  // ── 전환 ─────────────────────────────────────────
  {
    group: "전환",
    name: "Quick Actions",
    ref: "기획안 HOME Quick Actions · 아이오크롭스 상담 신청 버튼",
    block: { type: "quick-actions", data: { items: quickActions } },
  },
  {
    group: "전환",
    name: "상담 유도 카드",
    ref: "아이오크롭스 · 상담 카드",
    block: {
      type: "consult-card",
      data: {
        title: ["도입·실증 문의"],
        text: "농가, 시공사, 지자체 담당자 모두 같은 창구에서 문의하실 수 있습니다.",
        action: { label: "문의 남기기", href: "#" },
        media: [photo("현장에서 농장주와 이야기하는 직원"), photo("분전반 앞 상담 장면")],
      },
    },
  },
  {
    group: "전환",
    name: "이미지 CTA 띠",
    ref: "케빈랩 4ST ZIP · 서비스 바로가기",
    block: {
      type: "cta-banner",
      data: {
        title: "웹 플랫폼 데모",
        text: "실제 관제 화면은 데모 계정으로 볼 수 있습니다.",
        action: { label: "데모 계정 요청", href: "#" },
        media: photo("관제 화면이 켜진 모니터 (어둡게 깔 사진)"),
      },
    },
  },
  {
    group: "전환",
    name: "지도 + 연락처",
    ref: "지노시스 · CONTACT",
    block: {
      type: "contact-map",
      data: {
        id: "contact",
        title: "Contact",
        offices: [{ name: "본사", address: fullAddress }],
        phone: organization.phone,
        email: organization.email,
        map: photo("카카오맵 또는 네이버 지도 임베드 영역"),
      },
    },
  },
];
