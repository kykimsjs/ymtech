import { cn } from "@/lib/cn";

const ciPalette = [
  { name: "Brand Blue", pantone: "PANTONE 2117 C", hex: "#415BA6", token: "brand-500", role: "메인 · 우수하고 똑똑한 기술력" },
  { name: "Eco Teal", pantone: "PANTONE 315 C", hex: "#007684", token: "eco-500", role: "메인 · 친환경 기술의 경제성" },
  { name: "CI Gray", pantone: "Cool Gray 7 C", hex: "#9D9D9D", token: "ci-gray", role: "메인 · 기업 기반과 서비스" },
  { name: "Alert Red", pantone: "PANTONE 199 C", hex: "#CE1719", token: "danger", role: "서브 · 화재 경보 상태" },
  { name: "Signal Orange", pantone: "PANTONE 165 C", hex: "#EE7202", token: "warning", role: "서브 · 주의 상태" },
  { name: "Eco Green", pantone: "PANTONE 376 C", hex: "#87B026", token: "success", role: "서브 · 정상 상태" },
];

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const neutrals = [
  { token: "canvas", note: "페이지 배경" },
  { token: "surface", note: "섹션 배경" },
  { token: "surface-strong", note: "강조 배경" },
  { token: "line", note: "구분선" },
  { token: "line-strong", note: "입력 테두리" },
  { token: "ink-subtle", note: "캡션" },
  { token: "ink-muted", note: "본문 보조" },
  { token: "ink", note: "본문·제목" },
];

function Scale({ name }: { name: "brand" | "eco" }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-ink-muted">{name}</p>
      <div className="grid grid-cols-11 overflow-hidden rounded-xl ring-1 ring-line">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              "flex h-16 items-end p-1.5 text-[0.625rem] font-semibold tabular-nums",
              // 400까지는 검정 글씨(4.9:1 이상), 500부터 흰 글씨(5.3:1 이상)
              step >= 500 ? "text-white" : "text-ink",
              step === 500 && "ring-2 ring-ink ring-inset",
            )}
            style={{ background: `var(--color-${name}-${step})` }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Colors() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ciPalette.map((color) => (
          <div key={color.token} className="overflow-hidden rounded-card border border-line bg-canvas">
            <div className="h-24" style={{ background: `var(--color-${color.token})` }} />
            <div className="flex flex-col gap-1 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold">{color.name}</p>
                <code className="text-sm text-ink-muted">{color.hex}</code>
              </div>
              <p className="text-sm text-ink-subtle">
                {color.pantone} · <code>{color.token}</code>
              </p>
              <p className="text-sm text-ink-muted">{color.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <Scale name="brand" />
        <Scale name="eco" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-ink-muted">neutral (semantic)</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {neutrals.map(({ token, note }) => (
            <div key={token} className="flex flex-col gap-1.5">
              <div className="h-14 rounded-lg ring-1 ring-line" style={{ background: `var(--color-${token})` }} />
              <code className="text-xs font-semibold">{token}</code>
              <span className="text-xs text-ink-subtle">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
