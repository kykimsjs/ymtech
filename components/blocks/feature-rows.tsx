import { cn } from "@/lib/cn";
import { Media, type MediaData } from "./media";

type Fact = { label: string; value: string };

export type FeatureRowsProps = {
  title?: string;
  items: {
    label: string;
    title: string;
    text: string;
    facts?: Fact[];
    /** 사진, 또는 사진 대신 그리는 도식 */
    visual: { media: MediaData } | { diagram: "cutoff" };
  }[];
  id?: string;
};

// 기획안 HOME "핵심 소구점 3가지"를 글과 그림이 좌우로 번갈아 나오는 행으로 펼친다.
// 참고: 아이오크롭스 솔루션 소개(사진 크게 + 옆에 짧은 설명), 케빈랩 4ST ZIP 기능 소개의 좌우 교차
export function FeatureRows({ title, items, id }: FeatureRowsProps) {
  return (
    <section id={id} className="block-y scroll-mt-14 bg-canvas">
      <div className="container-page">
        {title && <h2 className="max-w-[16em] text-display font-bold">{title}</h2>}
        <ol className={cn("flex flex-col gap-16 lg:gap-28", title && "mt-12 lg:mt-20")}>
          {items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={item.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
                  {"media" in item.visual ? (
                    <Media media={item.visual.media} sizes="(min-width: 1024px) 700px, 100vw" className="aspect-[4/3] rounded-card md:aspect-[16/9] lg:aspect-[4/3]" />
                  ) : (
                    <CutoffDiagram />
                  )}
                </div>
                <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:pr-6" : "lg:pl-6")}>
                  <p className="flex items-baseline gap-3 text-eyebrow font-semibold text-brand-600">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-title font-bold">{item.title}</h3>
                  <p className="mt-5 max-w-[30em] text-[1.0625rem] leading-[1.75] text-ink-muted">{item.text}</p>
                  {item.facts && (
                    <dl className="mt-8 border-t border-line">
                      {item.facts.map((fact) => (
                        <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3.5 text-[0.9375rem]">
                          <dt className="text-ink-subtle">{fact.label}</dt>
                          <dd className="font-medium">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// 이상 감지에서 자동 차단까지 10초 이내 — 제품소개·기획안의 사양을 그대로 그린 도식 (수치를 더 지어내지 않는다)
function CutoffDiagram() {
  const ticks = [0, 2, 4, 6, 8, 10];
  return (
    <figure className="flex aspect-[4/3] flex-col md:aspect-[16/9] lg:aspect-[4/3] justify-between rounded-card bg-graphite-900 p-6 text-white sm:p-10">
      <figcaption className="text-sm font-semibold text-white/70">이상 감지 → 자동 차단</figcaption>

      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-white/70">이상 감지</p>
            <p className="mt-1 text-lg font-bold sm:text-xl">전력 · 환경 센서</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70">전원 차단</p>
            <p className="mt-1 text-lg font-bold sm:text-xl">
              <span className="text-[2.5rem] leading-none tabular-nums sm:text-[3.5rem]">10</span>초 이내
            </p>
          </div>
        </div>

        <div className="relative mt-6 sm:mt-8">
          <div className="h-1.5 rounded-full bg-white/15" />
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-linear-to-r from-brand-400 to-brand-300" />
          <span className="absolute top-1/2 left-0 size-3.5 -translate-y-1/2 rounded-full border-2 border-graphite-900 bg-white" />
          <span className="absolute top-1/2 right-0 size-5 -translate-y-1/2 rounded-full border-4 border-graphite-900 bg-brand-300" />
        </div>
        <ol className="mt-3 flex justify-between text-xs text-white/60 tabular-nums">
          {ticks.map((tick) => (
            <li key={tick}>{tick}초</li>
          ))}
        </ol>
      </div>

      <ul className="grid grid-cols-3 gap-2 text-center text-[0.8125rem] sm:gap-3 sm:text-sm">
        {["SSR 자동 차단", "시각·청각 경보", "웹 플랫폼 알림·이력"].map((label) => (
          <li key={label} className="rounded-control border border-white/20 px-1.5 py-3 font-medium sm:px-2">
            {label}
          </li>
        ))}
      </ul>
    </figure>
  );
}
