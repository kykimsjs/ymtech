import type { Block } from "@/components/blocks/registry";
import type { Locale } from "@/lib/i18n";
import { photo } from "@/content/block-catalog";
import { featureRowsFor, platformScreenMedia, productLightMedia, productMedia, translator, trustItemsFor } from "@/content/shared";
import { pageBottom, pageTop } from "./common";

// HOME 블록 순서 (2026-10-26 확정)
//   헤더 → 히어로(사진 4장 슬라이드) → 문제 제기 문단 → 주력 제품(에코-비탈) → 핵심 소구점(펼침 패널) → 기술 신뢰성 → 솔루션 → 실시간 관제(준비 중) → (설치 사례) → 문의(Quick Actions 포함) → 푸터
// 자료가 없는 블록은 hidden에 이유를 적어 운영 화면에서 뺀다 (블록 카탈로그 등 showHidden 화면에서만 보임).
// 영문은 국문을 옮긴 번역 초안 (2026-10-27)
export function homeBlocks({ headerTone = "light", locale = "ko" }: { headerTone?: "light" | "dark"; locale?: Locale } = {}): Block[] {
  const t = translator(locale);
  const soon = t("준비 중", "Coming soon");
  // BI 매뉴얼 BS 09 시그니처(MODIQ + Advanced Smart Module), 어두운 바탕용 흰색 판 (BS 13 색상 활용 기준)
  const brandWhite = { src: "/brand/modiq-signature-white.png", alt: "MODIQ Advanced Smart Module", width: 1139, height: 322 };
  return [
    ...pageTop({ headerTone, locale }),
    {
      // 사진 4장이 천천히 넘어가는 히어로. 자체 현장 사진을 받기 전까지 AI 생성 이미지를 쓴다.
      // ChatGPT로 같은 스타일(아침 빛, 다큐 사진 톤)로 생성 (2026-10-26, 원본 docs/), 피사체는 오른쪽·왼쪽은 제목 자리
      // 순서: 스마트팜 → 분전반 점검(화재 예방) → 태양광(에너지 최적화) → 태블릿으로 관리하는 현장
      type: "hero-media",
      data: {
        title: [t("화재예방부터", "From fire prevention"), t("에너지 최적화까지", "to energy optimization")],
        description: t(
          "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
          "An AIoT energy and fire management solution for safer, more efficient smart farms",
        ),
        overlay: "soft",
        media: [
          {
            src: "/images/hero/ai-greenhouse.webp",
            alt: t("유리 온실 안에 고설 딸기 재배대가 길게 이어져 있다", "Long rows of raised strawberry beds inside a glass greenhouse"),
            focus: "62% 50%",
          },
          {
            src: "/images/hero/ai-panel.webp",
            alt: t("안전모를 쓴 기술자가 온실 분전반의 차단기를 점검하고 있다", "A technician in a hard hat checks the breakers in a greenhouse distribution panel"),
            focus: "72% 45%",
          },
          {
            src: "/images/hero/ai-solar.webp",
            alt: t("산 아래 지붕에 태양광 패널을 얹은 유리 온실 단지와 전기 설비함", "Glass greenhouses with rooftop solar panels and electrical cabinets at the foot of a mountain"),
            focus: "66% 55%",
          },
          {
            src: "/images/hero/ai-manager.webp",
            alt: t("수경재배 온실에서 태블릿으로 작물 상태를 확인하는 관리자", "A manager checks crops on a tablet in a hydroponic greenhouse"),
            focus: "74% 45%",
          },
        ],
        actions: [
          { label: t("도입·실증 문의", "Installation & pilot inquiry"), href: `/${locale}/contact` },
          { label: t("제품 소개서 다운로드", "Download brochure"), href: "#", status: soon },
        ],
      },
    },
    {
      // 움직이는 히어로와 사진 패널 사이에 쉬어 가는 글 블록 (회사 소개는 별도 페이지)
      // 문구는 클라이언트 제공(2026-10-27) 그대로, 제목만 끝 마침표를 뺐다
      type: "statement",
      data: {
        eyebrow: t("산업 및 농업시설 전력 안전", "Power safety for factories and farms"),
        title: t("분전반 화재,\nAI가 예지하고 차단합니다", "Distribution panel fires,\npredicted and cut off by AI"),
        paragraphs: [
          t(
            "기존 제품들은 단일 센서 계측에 국한되어 사고 예방에 한계가 있었습니다.\n와이엠이노테크는 20년 R&D 경험을 바탕으로 공장 및 농업 시설의 전력 안전 사각지대를 해소합니다.",
            "Existing products rely on a single sensor, which limits how well they can prevent accidents.\nWith 20 years of R&D experience, YM INNOTECH closes the power safety blind spots in factories and agricultural facilities.",
          ),
          t(
            "에코-비탈 모듈은 전력·환경 감지부터 AI 분석, 자동 차단까지 단 하나의 모듈로 통합했습니다.",
            "The Eeco-Vital module brings power and environmental sensing, AI analysis and automatic cut-off together in a single module.",
          ),
        ],
      },
    },
    {
      // 주력 제품 소개. 문구는 클라이언트 제공 소개글(2026-10-26) 그대로
      type: "product-showcase",
      data: {
        brand: brandWhite,
        label: t("주력 제품", "Flagship product"),
        title: [t("에너지 관리의 효율을 높이는", "YM INNOTECH's innovative solution"), t("YM이노테크의 혁신적인 솔루션", "for more efficient energy management")],
        name: t("지능형 에코-비탈(Eeco-Vital) 모듈", "Intelligent Eeco-Vital Module"),
        description: t(
          "분전반 안에 장착해 전력과 환경을 함께 감지하고,\n이상이 생기면 자동으로 전원을 차단합니다.",
          "Installed inside the distribution panel, it monitors power and environment together and cuts power automatically when something goes wrong.",
        ),
        media: productMedia(locale),
        actions: [
          { label: t("제품 자세히 보기", "View product details"), href: `/${locale}/solutions/eco-vital` },
          { label: t("제품 소개서 다운로드", "Download brochure"), href: "#", status: soon },
        ],
        features: [
          { title: t("에너지 절감", "Energy savings"), text: t("효율적인 에너지 관리로\n운영비 절감", "Efficient energy management\nlowers operating costs") },
          { title: t("안정적인 운용", "Reliable operation"), text: t("신뢰성 높은 성능으로\n안정적인 시스템 운영", "Dependable performance\nfor stable system operation") },
          { title: t("간편한 설치", "Easy installation"), text: t("산업 현장에 최적화된\n설계와 편리한 설치", "Designed for industrial sites\nand simple to install") },
          { title: t("지속가능한 미래", "Sustainable future"), text: t("친환경 에너지 관리로\n지속가능한 성장", "Eco-friendly energy management\nfor sustainable growth") },
        ],
      },
    },
    // 소구점 3개: 데스크톱은 마우스를 올리면 펼쳐지는 세로 3분할, 모바일은 아코디언
    {
      type: "feature-panels",
      data: { title: t("분전반 안에서 감지부터 차단까지", "From detection to cut-off, inside the panel"), items: featureRowsFor(locale) },
    },
    {
      // 기획안 1장 핵심 메시지 "기술 신뢰성"(KETI 시험, KESCO 규격 준수). KETI · 10초 · KESCO를 같은 크기로 나란히
      type: "trust-figures",
      data: {
        title: t("기술 신뢰성", "Technical credibility"),
        description: t(
          "측정 정확도는 KETI에서 시험했고,\n전기설비는 KESCO 규격을 따릅니다.",
          "Measurement accuracy was tested by KETI,\nand the electrical installation follows KESCO standards.",
        ),
        items: trustItemsFor(locale),
        // 기관 마크는 R&D > 특허·인증 페이지로 (2026-10-26)
        layout: "numbers",
      },
    },
    {
      type: "tile-grid",
      data: {
        title: t("솔루션", "Solutions"),
        tiles: [
          {
            label: t("지능형 에코-비탈(Eeco-Vital) 모듈", "Intelligent Eeco-Vital Module"),
            title: [t("분전반 장착형", "Panel-mounted"), t("감지·차단 모듈", "sensing & cut-off module")],
            href: `/${locale}/solutions/eco-vital`,
            media: productLightMedia(locale),
            brand: brandWhite,
          },
          // 웹 플랫폼 준비 중 (2026-10-26)
          {
            label: t("통합 안전관리 웹 플랫폼", "Integrated Safety Management Platform"),
            title: [t("실시간 관제와", "Live monitoring"), t("이력 관리", "and history")],
            href: `/${locale}/solutions/platform`,
            media: platformScreenMedia(locale),
            status: soon,
          },
        ],
      },
    },
    {
      type: "dashboard-preview",
      data: {
        title: t("실시간 관제", "Live monitoring"),
        description: t(
          "분전반별 전력 사용량과 시간대별 변화, 온·습도를 한 화면에서 봅니다.\n이상이 생기면 경보를 울리고 이력으로 남깁니다.",
          "See power use by panel, hourly trends, and temperature and humidity on one screen.\nWhen something goes wrong, it raises an alarm and keeps a record.",
        ),
        // 웹 플랫폼 준비 중 (2026-10-26). 열리면 status·note를 빼고 기획안 3장 "실시간 관제 데모 링크"를 action으로 연결
        //   action: { label: "웹 플랫폼 데모 로그인", href: "<데모 주소>" },
        status: soon,
        // 기획안 5장 SOFTWARE · 제품소개 3장 (개발 용어는 고객이 알아들을 말로)
        features: [
          { title: t("실시간 대시보드", "Live dashboard"), text: t("전력 사용량·온습도 그래프", "Power use and climate charts"), screen: "dashboard" },
          { title: t("경보와 자동 차단", "Alarms & automatic cut-off"), text: t("시각·청각 경보, 전원 차단", "Visual and audible alarms, power cut-off"), screen: "alarm" },
          { title: t("이력 관리", "History"), text: t("이상 이력 조회, 엑셀 내려받기", "Anomaly history, Excel export"), screen: "history" },
          { title: t("데이터 보안", "Data security"), text: t("클라우드 저장, 권한별 열람", "Cloud storage, role-based access"), screen: "access" },
        ],
        note: t("예시 화면 · 표시된 수치는 실제 데이터가 아닙니다", "Sample screens · the figures shown are not real data"),
      },
    },
    {
      type: "gallery-tabs",
      hidden: "현장 사진 대기",
      data: {
        title: t("설치 사례", "Installations"),
        description: t("에코-비탈 모듈이 실제로 달린 분전반입니다.", "Distribution panels with the Eeco-Vital module installed."),
        groups: ["스마트 온실", "축사", "수직농장"].map((label) => ({
          label,
          items: [1, 2, 3, 4].map((n) => ({ caption: `${label} 분전반 ${n}`, media: photo(`${label} 분전반 내부 설치 ${n}`) })),
        })),
      },
    },
    ...pageBottom({ locale }),
  ];
}
