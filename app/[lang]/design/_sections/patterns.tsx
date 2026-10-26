import { Logo } from "@/components/ui/logo";

export function Patterns() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <figure className="flex flex-col gap-3">
        <div className="relative h-44 overflow-hidden rounded-card bg-brand-950">
          <div className="absolute inset-0 bg-diagonal text-white/[0.06]" />
          <Logo type="symbol" tone="white" className="absolute right-6 bottom-6 w-12 opacity-80" />
        </div>
        <figcaption className="text-sm text-ink-muted">
          <code>bg-diagonal</code> on brand-950 — 히어로·CTA 배경 (전용 패턴 C타입 모티프)
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-3">
        <div className="relative h-44 overflow-hidden rounded-card bg-eco-50">
          <div className="absolute inset-0 bg-diagonal text-eco-500/15" />
        </div>
        <figcaption className="text-sm text-ink-muted">
          <code>bg-diagonal</code> on eco-50 — 밝은 섹션 강조
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-3">
        <div className="flex h-44 flex-col justify-center gap-6 rounded-card border border-line bg-canvas p-6">
          <div className="border-ci border-t-4" />
          <div className="border-ci border-t" />
          <p className="text-sm text-ink-muted">카드 상단, 섹션 구분, 표 머리</p>
        </div>
        <figcaption className="text-sm text-ink-muted">
          <code>border-ci</code> — 전용 보더라인 (블루 → 틸)
        </figcaption>
      </figure>
    </div>
  );
}
