import type { Block } from "@/components/blocks/registry";
import { featureRows, photo, platformScreen, product, productLight, trustItems } from "@/content/block-catalog";
import { pageBottom, pageTop } from "./common";

// HOME 블록 순서 (2026-10-26 확정)
//   헤더 → 히어로(사진 4장 슬라이드) → 문제 제기 문단 → 주력 제품(에코-비탈) → 핵심 소구점(펼침 패널) → 기술 신뢰성 → 솔루션 → 실시간 관제(준비 중) → (설치 사례) → 문의(Quick Actions 포함) → 푸터
// 자료가 없는 블록은 hidden에 이유를 적어 운영 화면에서 뺀다 (블록 카탈로그 등 showHidden 화면에서만 보임).
export function homeBlocks({ headerTone = "light" }: { headerTone?: "light" | "dark" } = {}): Block[] {
  return [
    ...pageTop({ headerTone }),
    {
      // 사진 4장이 천천히 넘어가는 히어로. 자체 현장 사진을 받기 전까지 AI 생성 이미지를 쓴다.
      // ChatGPT로 같은 스타일(아침 빛, 다큐 사진 톤)로 생성 (2026-10-26, 원본 docs/), 피사체는 오른쪽·왼쪽은 제목 자리
      // 순서: 스마트팜 → 분전반 점검(화재 예방) → 태양광(에너지 최적화) → 태블릿으로 관리하는 현장
      type: "hero-media",
      data: {
        title: ["화재예방부터", "에너지 최적화까지"],
        description: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
        overlay: "soft",
        media: [
          { src: "/images/hero/ai-greenhouse.webp", alt: "유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", focus: "62% 50%" },
          { src: "/images/hero/ai-panel.webp", alt: "안전모를 쓴 기술자가 온실 분전반의 차단기를 점검하고 있다", focus: "72% 45%" },
          { src: "/images/hero/ai-solar.webp", alt: "산 아래 지붕에 태양광 패널을 얹은 유리 온실 단지와 전기 설비함", focus: "66% 55%" },
          { src: "/images/hero/ai-manager.webp", alt: "수경재배 온실에서 태블릿으로 작물 상태를 확인하는 관리자", focus: "74% 45%" },
        ],
        actions: [
          { label: "도입·실증 문의", href: "#" },
          { label: "제품 소개서 다운로드", href: "#", status: "준비 중" },
        ],
      },
    },
    {
      // 움직이는 히어로와 사진 패널 사이에 쉬어 가는 글 블록 (회사 소개는 별도 페이지)
      // 문구는 클라이언트 제공(2026-10-27) 그대로, 제목만 끝 마침표를 뺐다
      type: "statement",
      data: {
        eyebrow: "산업 및 농업시설 전력 안전",
        title: "분전반 화재,\nAI가 예지하고 차단합니다",
        paragraphs: [
          "기존 제품들은 단일 센서 계측에 국한되어 사고 예방에 한계가 있었습니다.\n와이엠이노테크는 20년 R&D 경험을 바탕으로 공장 및 농업 시설의 전력 안전 사각지대를 해소합니다.",
          "에코-비탈 모듈은 전력·환경 감지부터 AI 분석, 자동 차단까지 단 하나의 모듈로 통합했습니다.",
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
          { label: "제품 자세히 보기", href: "/ko/solutions/eco-vital" },
          { label: "제품 소개서 다운로드", href: "#", status: "준비 중" },
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
        items: trustItems,
        // 기관 마크는 R&D > 특허·인증 페이지로 (2026-10-26)
        layout: "numbers",
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
            href: "/ko/solutions/eco-vital",
            media: productLight,
            brand: { src: "/brand/modiq-signature-white.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 },
          },
          // 웹 플랫폼 준비 중 (2026-10-26)
          { label: "통합 안전관리 웹 플랫폼", title: ["실시간 관제와", "이력 관리"], href: "/ko/solutions/platform", media: platformScreen, status: "준비 중" },
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
          { title: "실시간 대시보드", text: "전력 사용량·온습도 그래프", screen: "dashboard" },
          { title: "경보와 자동 차단", text: "시각·청각 경보, 전원 차단", screen: "alarm" },
          { title: "이력 관리", text: "이상 이력 조회, 엑셀 내려받기", screen: "history" },
          { title: "데이터 보안", text: "클라우드 저장, 권한별 열람", screen: "access" },
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
    ...pageBottom(),
  ];
}
