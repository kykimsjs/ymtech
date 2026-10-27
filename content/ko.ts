const ko = {
  meta: {
    siteName: "와이엠이노테크",
    title: "와이엠이노테크 | AIoT 스마트팜 에너지·화재 관리 솔루션",
    description:
      "분전반 화재를 조기에 예지하고 자동 차단하는 AIoT 에너지·화재 관리 솔루션. 와이엠이노테크 공식 홈페이지입니다.",
  },
  nav: {
    company: "회사소개",
    solutions: "솔루션",
    tech: "R&D·기술",
    reference: "레퍼런스",
    support: "고객지원",
    contact: "도입 문의",
  },
  hero: {
    eyebrow: "AIoT Smart Farm Energy & Fire Management",
    titleLead: "화재예방부터",
    titleAccent: "에너지 최적화까지",
    description:
      "전력·환경 복합 센싱과 AI 이상 예지, 자동 차단을 하나의 모듈로. 스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션입니다.",
    primaryCta: "도입·실증 문의",
    secondaryCta: "제품 소개서 다운로드",
  },
  highlights: [
    {
      title: "분전반 직접 장착형",
      description: "분전반 내부에 바로 설치하는 소형 일체형 모듈로 현장 적용이 쉽습니다.",
    },
    {
      title: "전력·환경 복합 센싱",
      description: "3상 전압·전류와 온·습도, 불꽃·침수·진동을 함께 감지하고 AI가 이상 징후를 예지합니다.",
    },
    {
      title: "10초 내 자동 차단",
      description: "이상 감지 즉시 SSR로 전원을 차단하고 웹 플랫폼으로 실시간 알립니다.",
    },
  ],
  stats: [
    { value: "KETI", label: "전압·전력 모니터링 정확도 시험" },
    { value: "10초", label: "이상 감지 후 자동 차단" },
    { value: "3상", label: "RST·UVW 실시간 전력 감지" },
  ],
  status: {
    normal: "정상",
    warning: "주의",
    alert: "화재 경보",
  },
  product: {
    name: "에코-비탈 모듈",
    caption: "지능형 전력·환경 관리 모듈",
  },
} as const;

export type Dictionary = {
  [Section in keyof typeof ko]: (typeof ko)[Section] extends readonly (infer Item)[]
    ? ReadonlyArray<{ [Key in keyof Item]: string }>
    : { [Key in keyof (typeof ko)[Section]]: string };
};

export default ko satisfies Dictionary;
