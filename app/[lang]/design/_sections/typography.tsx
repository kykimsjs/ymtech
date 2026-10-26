import type { Dictionary } from "@/content/ko";

const families = [
  {
    name: "Leferi Point Type",
    role: "CI 지정서체 · 인쇄물, 특별한 강조에만 (웹 제목은 Pretendard)",
    className: "font-display",
    weights: [
      { label: "White 300", weight: "font-light" },
      { label: "Special 700", weight: "font-bold" },
      { label: "Black 900", weight: "font-black" },
    ],
  },
  {
    name: "Leferi Base Type",
    role: "CI 지정서체 · 인쇄물용",
    className: "font-base",
    weights: [
      { label: "Regular 400", weight: "font-normal" },
      { label: "Bold 700", weight: "font-bold" },
    ],
  },
  {
    name: "Pretendard",
    role: "웹 기본 서체 · 제목, 본문, UI (레퍼런스 케빈랩과 같은 서체)",
    className: "font-sans",
    weights: [
      { label: "Regular 400", weight: "font-normal" },
      { label: "Medium 500", weight: "font-medium" },
      { label: "SemiBold 600", weight: "font-semibold" },
      { label: "Bold 700", weight: "font-bold" },
    ],
  },
  {
    name: "Noto Serif KR",
    role: "Accent · CEO 인사말 등 인용문 (CI 보조 서체)",
    className: "font-serif",
    weights: [
      { label: "Regular 400", weight: "font-normal" },
      { label: "Bold 700", weight: "font-bold" },
    ],
  },
];

export function Typography({ dict }: { dict: Dictionary }) {
  const sample = `${dict.hero.titleLead} ${dict.hero.titleAccent}`;
  const scale = [
    { token: "text-display-xl", spec: "36 → 56px · SemiBold · 히어로", className: "text-display-xl font-semibold", text: sample },
    { token: "text-display", spec: "28 → 40px · Bold · 섹션 제목", className: "text-display font-bold", text: dict.product.name },
    { token: "text-title", spec: "24 → 32px · Bold · 블록 안 제목", className: "text-title font-bold", text: dict.stats[0].label },
    { token: "text-subtitle", spec: "19 → 22px · Bold · 카드 제목", className: "text-subtitle font-bold", text: dict.highlights[2].title },
    { token: "text-lg", spec: "18px · 행간 1.7 · 리드 문단", className: "text-lg leading-[1.7] text-ink-muted", text: dict.hero.description },
    { token: "text-[15px]", spec: "15px · 행간 1.75~1.8 · 본문", className: "text-[0.9375rem] leading-[1.8] text-ink-muted", text: dict.highlights[1].description },
    { token: "text-sm", spec: "14px · 캡션", className: "text-sm text-ink-subtle", text: dict.meta.description },
    { token: "text-eyebrow", spec: "15px · SemiBold · 포인트 색", className: "text-eyebrow font-semibold text-eco-500", text: dict.hero.eyebrow },
  ];

  return (
    <div className="flex flex-col gap-14">
      <div className="grid gap-4 md:grid-cols-2">
        {families.map((family) => (
          <div key={family.name} className="flex min-w-0 flex-col gap-5 rounded-card border border-line bg-canvas p-6">
            <div>
              <p className="font-semibold">{family.name}</p>
              <p className="text-sm text-ink-subtle">{family.role}</p>
            </div>
            <div className="flex flex-col gap-3">
              {family.weights.map(({ label, weight }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="w-24 shrink-0 text-xs text-ink-subtle">{label}</span>
                  <span className={`${family.className} ${weight} min-w-0 truncate text-2xl`}>와이엠이노테크 YM Innotech 2026</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-line rounded-card border border-line bg-canvas">
        {scale.map((row) => (
          <div key={row.token} className="grid gap-3 p-6 md:grid-cols-[13rem_1fr] md:gap-8">
            <div className="flex flex-col gap-0.5">
              <code className="text-sm font-semibold">{row.token}</code>
              <span className="text-xs text-ink-subtle">{row.spec}</span>
            </div>
            <p className={row.className}>{row.text}</p>
          </div>
        ))}
      </div>

      <blockquote className="rounded-card border-l-4 border-brand-500 bg-surface px-8 py-7">
        <p className="font-serif text-subtitle leading-relaxed">
          “현장의 경험과 기술로, 농업의 전력 안전을 책임집니다.”
        </p>
        <footer className="mt-3 text-sm text-ink-muted">— 와이엠이노테크 대표이사 · Noto Serif KR</footer>
      </blockquote>
    </div>
  );
}
