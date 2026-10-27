import type { FeatureRowsProps } from "@/components/blocks/feature-rows";
import type { MediaData } from "@/components/blocks/media";
import type { NavItem } from "@/components/blocks/site-header";
import type { Locale } from "@/lib/i18n";

// 여러 페이지가 같이 쓰는 내용 (메뉴, 제품 사진, 소구점, 신뢰 근거, Quick Actions)을 언어별로 만든다.
// 영문은 국문을 옮긴 번역 초안 (2026-10-27). 사실·수치는 국문과 같다.

export type T = (ko: string, en: string) => string;
export const translator =
  (locale: Locale): T =>
  (ko, en) =>
    locale === "en" ? en : ko;

// 제품 사진 2장 (클라이언트 제공, 원본 docs/YM_INNOTECH_clean_1·2). 어두운 바탕 섹션엔 dark, 밝은 바탕엔 light
export function productMedia(locale: Locale): MediaData {
  const t = translator(locale);
  return {
    src: "/images/product/eco-vital-dark.webp",
    alt: t(
      "어두운 책상 위의 에코-비탈 모듈. 검정 함체 앞면에 YM INNOTECH 각인과 정상 상태를 띄운 LCD 창이 있다.",
      "Eeco-Vital module on a dark desk. The black enclosure carries a YM INNOTECH logo and an LCD showing normal status.",
    ),
    focus: "50% 50%",
  };
}

export function productLightMedia(locale: Locale): MediaData {
  const t = translator(locale);
  return {
    src: "/images/product/eco-vital-light.webp",
    alt: t(
      "은색 바탕 위의 에코-비탈 모듈과 녹색 센서. LCD 창에 AI 화재 경보가 떠 있다.",
      "Eeco-Vital module and a green sensor on a silver background. The LCD shows an AI fire alert.",
    ),
    focus: "50% 50%",
  };
}

// 웹 플랫폼 타일용 임시 사진 (실제 플랫폼 화면을 받으면 교체). Pexels 8636589, Pexels 라이선스
export function platformScreenMedia(locale: Locale): MediaData {
  const t = translator(locale);
  return { src: "/images/home/platform-screen.webp", alt: t("차트와 표가 띄워진 관제 모니터", "Monitoring screens showing charts and tables"), focus: "50% 40%" };
}

// 기획안 3장 HOME — 핵심 소구점 3가지
export function keyPointsFor(locale: Locale) {
  const t = translator(locale);
  return [
    {
      label: t("소형 컴팩트 구조", "Compact all-in-one"),
      title: t("분전반 안에 바로 답니다", "Mounts right inside the panel"),
      text: t(
        "분전반 내부에 직접 장착하는 일체형 모듈이라 현장에 쉽게 설치합니다.",
        "An all-in-one module that installs directly inside the distribution panel, so on-site setup is simple.",
      ),
    },
    // 기획안 1장 핵심 메시지 2 "통합 효율성 — 전력·환경 센싱, AI, 차단 제어를 한 모듈로"를 함께 담는다
    {
      label: t("복합 센싱 & AI 예지", "Combined sensing & AI prediction"),
      title: t("전력과 환경을 함께 봅니다", "Watches power and environment together"),
      text: t(
        "전압·전류와 온·습도를 함께 감지하고, AI가 이상 징후를 미리 찾습니다. 감지부터 차단까지 모듈 하나가 맡습니다.",
        "It senses voltage, current, temperature and humidity together, and AI spots warning signs early. One module handles everything from detection to cut-off.",
      ),
    },
    {
      label: t("원격 관제 & 자동 대응", "Remote monitoring & automatic response"),
      title: t("10초 안에 전원을 끊습니다", "Cuts power within 10 seconds"),
      text: t(
        "이상이 감지되면 자동으로 차단하고, 웹 플랫폼으로 실시간 알림과 이력을 남깁니다.",
        "When an anomaly is detected, it cuts power automatically and sends real-time alerts and logs to the web platform.",
      ),
    },
  ];
}

// 핵심 소구점을 사진·도식과 함께 펼친 판 (HOME). 사양은 제품소개·기획안 그대로.
// 사진: Pexels 28950842(분전반) · 10269715(수경재배 시설), Pexels 라이선스
export function featureRowsFor(locale: Locale): FeatureRowsProps["items"] {
  const t = translator(locale);
  const points = keyPointsFor(locale);
  return [
    {
      ...points[0],
      facts: [
        { label: t("설치 위치", "Installation"), value: t("분전반 내부 · Main/Sub MCCB 연동", "Inside the panel · linked to main/sub MCCBs") },
        { label: t("계측", "Metering"), value: t("3상(RST/UVW) 전압·전류", "3-phase (RST/UVW) voltage·current") },
        { label: t("통신", "Communication"), value: "RS-232 · Wi-Fi · LAN" },
      ],
      visual: { media: { src: "/images/home/panel.webp", alt: t("차단기가 줄지어 있는 분전반 내부", "Rows of circuit breakers inside a distribution panel"), focus: "50% 50%" } },
    },
    {
      ...points[1],
      // \n: 데스크톱에서만 의미 단위로 줄바꿈 (BreakText)
      text: t(
        "전압·전류와 온·습도를 함께 감지하고,\nAI가 화재로 이어질 이상 징후를 미리 찾습니다.",
        "It senses voltage, current, temperature and humidity together,\nand AI spots warning signs before they turn into a fire.",
      ),
      facts: [
        { label: t("전력", "Power"), value: t("전압 · 전류", "Voltage · current") },
        { label: t("환경", "Environment"), value: t("온·습도 · 불꽃 · 침수 · 진동", "Temperature·humidity · flame · flooding · vibration") },
        { label: t("분석", "Analysis"), value: t("AI 화재 이상 징후 예지", "AI prediction of fire warning signs") },
      ],
      visual: {
        media: { src: "/images/home/sensing-farm.webp", alt: t("센서와 배선이 설치된 실내 수경재배 시설", "Indoor hydroponic facility with sensors and wiring"), focus: "50% 50%" },
      },
    },
    {
      ...points[2],
      text: t(
        "이상이 감지되면 자동으로 차단하고,\n웹 플랫폼으로 실시간 알림과 이력을 남깁니다.",
        "When an anomaly is detected, it cuts power automatically\nand records real-time alerts and history on the web platform.",
      ),
      facts: [
        { label: t("차단", "Cut-off"), value: t("SSR(전자식 릴레이) 자동 차단", "Automatic cut-off via SSR (solid-state relay)") },
        { label: t("경보", "Alarm"), value: t("시각·청각 경보", "Visual and audible alarms") },
        { label: t("기록", "Records"), value: t("웹 플랫폼 실시간 알림·이력", "Real-time alerts and history on the web platform") },
      ],
      visual: { diagram: "cutoff" },
    },
  ];
}

// 기획안 HOME "기술 신뢰성" 근거 항목 (KETI 시험, 10초 KESCO 규격 준수)
// 2026-10-27 KETI 시험성적서(2025-11-126 G) 확인: 시험 항목은 전압·전력 모니터링 정확도이고 ±2%는 성적서에 없음.
// 성적서 비고 3항(홍보·광고 사용 불가)에 따라 결과 수치는 KETI 허락 전까지 쓰지 않고 "시험"만 적는다
export function trustItemsFor(locale: Locale) {
  const t = translator(locale);
  return [
    {
      value: "KETI",
      label: t("전압·전력 모니터링 정확도 시험", "Voltage·power monitoring accuracy test"),
      source: t("한국전자기술연구원 광주지역본부 (2025.12)", "Korea Electronics Technology Institute, Gwangju (Dec 2025)"),
      mark: { src: "/images/marks/keti.png", alt: t("한국전자기술연구원(KETI)", "Korea Electronics Technology Institute (KETI)"), width: 900, height: 209 },
    },
    {
      value: "10",
      unit: t("초", "s"),
      label: t("이상 감지 후 자동 차단", "Automatic cut-off after detection"),
      source: t("한국전기안전공사(KESCO) 규격 준수", "Meets Korea Electrical Safety Corporation (KESCO) standards"),
    },
    {
      value: "KESCO",
      label: t("전기설비 규격 준수", "Electrical installation standards"),
      source: t("한국전기안전공사 전기설비 규격", "Korea Electrical Safety Corporation standards"),
      mark: { src: "/images/marks/kesco.png", alt: t("한국전기안전공사(KESCO)", "Korea Electrical Safety Corporation (KESCO)"), width: 900, height: 194 },
    },
  ];
}

// 기획안 3장 HOME — Quick Actions
export function quickActionsFor(locale: Locale) {
  const t = translator(locale);
  return [
    // 소개서 PDF 준비 중 (2026-10-27). 받으면 status를 지우고 text를 "에코-비탈 모듈 소개서(PDF)를 내려받습니다."로 되돌린다
    {
      icon: "download" as const,
      label: t("제품 소개서", "Product brochure"),
      text: t("에코-비탈 모듈 소개서(PDF)는 준비 중입니다.", "The Eeco-Vital module brochure (PDF) is in preparation."),
      href: "#",
      status: t("준비 중", "Coming soon"),
    },
    {
      icon: "message" as const,
      label: t("도입·실증 문의", "Installation & pilot inquiries"),
      text: t("농가, 시공사, 지자체 담당자 모두 문의하실 수 있습니다.", "Farms, contractors and public agencies are all welcome to contact us."),
      href: `/${locale}/contact`,
    },
    // 웹 플랫폼 준비 중 (2026-10-26). 열리면 status를 지우고 text를 "데모 계정으로 로그인해 실제 관제 화면을 봅니다."로 되돌린다
    {
      icon: "demo" as const,
      label: t("웹 플랫폼 데모 로그인", "Web platform demo login"),
      text: t("웹 플랫폼은 준비 중입니다.", "The web platform is in preparation."),
      href: "#",
      status: t("오픈 예정", "Coming soon"),
    },
  ];
}

// 사이트맵 (2026-10-27 확정): 기획안 14페이지를 HOME + 6페이지로 합쳤다. 하위 메뉴는 솔루션만.
//   회사소개: 인사말 · 비전·미션 · 연혁 · 팀·파트너 / 기술·인증: 기술 차별성 · AI 화재 예지 · 특허·인증
//   실증 사례: 현장 · 도입 효과 / 문의: 문의 폼 · 오시는 길. 자료가 쌓이면 다시 나눈다.
export function navFor(locale: Locale): NavItem[] {
  const t = translator(locale);
  const p = (path: string) => `/${locale}${path}`;
  return [
    { label: t("회사소개", "Company"), href: p("/company") },
    {
      label: t("솔루션", "Solutions"),
      href: p("/solutions/eco-vital"),
      children: [
        { label: t("에코-비탈 모듈", "Eeco-Vital Module"), href: p("/solutions/eco-vital") },
        { label: t("통합 웹 플랫폼", "Web Platform"), href: p("/solutions/platform") },
      ],
    },
    { label: t("기술·인증", "Technology"), href: p("/technology") },
    { label: t("실증 사례", "References"), href: p("/references") },
    { label: t("문의", "Contact"), href: p("/contact") },
  ];
}

export function footerColumnsFor(locale: Locale) {
  return navFor(locale).map((item) => ({ title: item.label, href: item.href, links: item.children ?? [] }));
}
