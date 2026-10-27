import Image from "next/image";
import { ArrowDown, ArrowRight, CornerDownLeft } from "lucide-react";
import { BreakText } from "@/components/ui/break-text";
import { Pending } from "@/components/ui/pending";
import { cn } from "@/lib/cn";
import { Media, type MediaData } from "./media";

// 솔루션 > 에코-비탈 모듈 페이지 블록 (2026-10-27).
// 내용 근거: docs 제품소개 1장(HARDWARE 특징 5개, 시스템 구성), 기획안 5장(HARDWARE), 6장(핵심 수치)

type Brand = { src: string; alt: string; width: number; height: number };

// ── 제품 소개 (밝은 바탕) ──────────────────────────────────

export type ProductIntroProps = {
  brand?: Brand;
  name: string;
  title: string[];
  description: string;
  /** 사진 1~2장. 2장이면 정사각 두 장을 나란히 */
  media: MediaData[];
  id?: string;
};

// 참고: 케빈랩 4ST ZIP 제품 소개 (사진 크게 + 옆에 제품명·설명). HOME 주력 제품(어두운 바탕)과 겹치지 않게 밝은 바탕
export function ProductIntro({ brand, name, title, description, media, id }: ProductIntroProps) {
  const [main, sub] = media;
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* 2장이면 정사각으로 나란히 (제품이 사진 가운데에 있어 정사각으로 잘라도 함체가 다 보인다) */}
        <div className={cn("grid gap-4 lg:col-span-7", sub && "grid-cols-2")}>
          <Media media={main} sizes={sub ? "(min-width: 1024px) 340px, 50vw" : "(min-width: 1024px) 680px, 100vw"} className={cn("rounded-card bg-surface", sub ? "aspect-square" : "aspect-[4/3]")} />
          {sub && <Media media={sub} sizes="(min-width: 1024px) 340px, 50vw" className="aspect-square rounded-card bg-surface" />}
        </div>
        <div className="lg:col-span-5">
          {brand && <Image src={brand.src} alt={brand.alt} width={brand.width} height={brand.height} sizes="220px" className="mb-8 h-12 w-auto lg:h-14" />}
          <p className="font-semibold text-brand-600">{name}</p>
          <h2 className="mt-4 text-display font-bold">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-lg leading-[1.75] text-ink-muted">
            <BreakText text={description} />
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 주요 기능 (제품소개 특징 5개) ────────────────────────────

export type FeatureListProps = {
  /** rows: 번호 + 제목 + 설명 행(문서형), grid: 큰 번호 2단(제품형) */
  variant: "rows" | "grid";
  title: string;
  items: { title: string; text: string }[];
  /** light: 옅은 회색 바탕, white: 흰 바탕(앞 블록이 회색일 때), dark: 어두운 바탕 */
  tone?: "light" | "white" | "dark";
  id?: string;
};

export function FeatureList({ variant, title, items, tone = "light", id }: FeatureListProps) {
  const dark = tone === "dark";
  const bg = dark ? "bg-graphite-900 text-white" : tone === "white" ? "bg-canvas" : "bg-surface";
  if (variant === "grid") {
    return (
      <section id={id} className={cn("block-y scroll-mt-32", bg)}>
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <h2 className="text-display font-bold lg:col-span-4">{title}</h2>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {items.map((item, i) => (
              <li key={item.title} className={cn("border-t py-8", dark ? "border-white/20" : "border-line-strong")}>
                <p className={cn("text-[2.5rem] leading-none font-bold tabular-nums", dark ? "text-eco-300" : "text-brand-600")}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-subtitle font-bold">{item.title}</h3>
                <p className={cn("mt-2 leading-[1.75]", dark ? "text-white/75" : "text-ink-muted")}>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={cn("block-y scroll-mt-32", bg)}>
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-display font-bold lg:col-span-4">{title}</h2>
        <ol className={cn("border-t-2 lg:col-span-8", dark ? "border-white" : "border-ink")}>
          {items.map((item, i) => (
            <li
              key={item.title}
              className={cn("grid grid-cols-[2.5rem_1fr] gap-x-4 border-b py-6 sm:grid-cols-[2.5rem_13rem_1fr]", dark ? "border-white/15" : "border-line")}
            >
              <span className={cn("text-sm font-semibold tabular-nums", dark ? "text-eco-300" : "text-brand-600")}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-bold">{item.title}</h3>
              <p className={cn("col-start-2 mt-1 leading-[1.75] sm:col-start-3 sm:mt-0", dark ? "text-white/75" : "text-ink-muted")}>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── 시스템 구성도 ──────────────────────────────────────────

export type SystemDiagramProps = {
  title: string;
  description?: string;
  /** 왼쪽에서 오른쪽으로 이어지는 단계. 각 단계 안의 상자는 위아래로 쌓인다 */
  stages: { label: string; boxes: { title: string; text: string; status?: string; highlight?: boolean }[] }[];
  /** 마지막에 되돌아오는 흐름 (예: 이상 시 자동 차단 → MCCB) */
  feedback?: string;
  tone?: "light" | "dark";
  id?: string;
};

// 실제 구성을 그린다 (design-taste 3장): 감지(MCCB·센서) → 모듈 → 통신 → 웹 플랫폼
// 근거: 제품소개 2장 Technology – System Architecture
export function SystemDiagram({ title, description, stages, feedback, tone = "light", id }: SystemDiagramProps) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("block-y scroll-mt-32", dark ? "bg-graphite-900 text-white" : "bg-canvas")}>
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className={cn("mt-5 max-w-[42em] text-lg leading-[1.75]", dark ? "text-white/75" : "text-ink-muted")}>{description}</p>}

        <ol className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {stages.map((stage, si) => (
            <li key={stage.label} className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:items-center">
              <div className="flex flex-1 flex-col gap-3 self-stretch">
                <p className={cn("text-sm font-semibold", dark ? "text-eco-300" : "text-brand-600")}>{stage.label}</p>
                {stage.boxes.map((box) => (
                  <div
                    key={box.title}
                    className={cn(
                      "flex flex-1 flex-col justify-center rounded-control border p-5",
                      box.highlight
                        ? dark
                          ? "border-eco-300 bg-white/5"
                          : "border-brand-500 bg-brand-50"
                        : dark
                          ? "border-white/20"
                          : "border-line-strong bg-canvas",
                    )}
                  >
                    <p className="flex flex-wrap items-center gap-2 font-bold">
                      {box.title}
                      {box.status && (
                        <span className={cn("rounded-full border px-2 py-0.5 text-xs font-semibold", dark ? "border-white/40" : "border-line-strong")}>
                          {box.status}
                        </span>
                      )}
                    </p>
                    <p className={cn("mt-1.5 text-[0.9375rem] leading-relaxed", dark ? "text-white/70" : "text-ink-muted")}>{box.text}</p>
                  </div>
                ))}
              </div>
              {si < stages.length - 1 && (
                <span aria-hidden className={cn("flex justify-center lg:mt-7 lg:px-3", dark ? "text-white/50" : "text-ink-subtle")}>
                  <ArrowDown className="size-5 lg:hidden" />
                  <ArrowRight className="hidden size-5 lg:block" />
                </span>
              )}
            </li>
          ))}
        </ol>

        {feedback && (
          <p className={cn("mt-6 flex items-center gap-2 border-t pt-5 text-[0.9375rem] font-semibold", dark ? "border-white/15 text-white/85" : "border-line text-ink")}>
            <CornerDownLeft className={cn("size-4 shrink-0", dark ? "text-eco-300" : "text-brand-600")} />
            {feedback}
          </p>
        )}
      </div>
    </section>
  );
}

// ── 사양 표 ───────────────────────────────────────────────

export type SpecTableProps = {
  title: string;
  rows: { label: string; value: string; note?: string }[];
  /** 아직 받지 못한 사양 (예: 크기·무게·정격) */
  pending?: string;
  id?: string;
};

// 참고: 여의시스템 제품 특징 표. 기획안·제품소개에 적힌 값만 넣는다
export function SpecTable({ title, rows, pending, id }: SpecTableProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-display font-bold lg:col-span-4">{title}</h2>
        <div className="lg:col-span-8">
          <dl className="border-t-2 border-ink text-[0.9375rem]">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold">{row.label}</dt>
                <dd className="text-ink-muted">
                  {row.value}
                  {row.note && <span className="ml-2 text-sm text-ink-subtle">{row.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          {pending && <Pending text={pending} className="mt-6 min-h-20" />}
        </div>
      </div>
    </section>
  );
}

// ── 적용 분야 ─────────────────────────────────────────────

export type ApplicationsProps = {
  title: string;
  description?: string;
  /** media가 없으면 무엇이 필요한지 적은 자리 표시 */
  items: { title: string; text?: string; media?: MediaData; pending?: string }[];
  id?: string;
};

// 근거: 제품소개 와이어프레임 Solutions(스마트 온실·축사·수직농장), 클라이언트 문안의 "공장 및 농업 시설"
export function Applications({ title, description, items, id }: ApplicationsProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}
        {/* 항목 수가 열 수를 정한다 (사진이 있는 분야만 보일 때 2열) */}
        <ul className={cn("mt-12 grid gap-8 sm:grid-cols-2 lg:gap-6", items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 && "lg:grid-cols-3")}>
          {items.map((item) => (
            <li key={item.title}>
              {item.media ? (
                <Media media={item.media} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-card" />
              ) : (
                <Pending text={item.pending ?? `사진 필요: ${item.title}`} className="aspect-[4/3] rounded-card bg-canvas" />
              )}
              <h3 className="mt-5 text-subtitle font-bold">{item.title}</h3>
              {item.text && <p className="mt-2 leading-[1.75] text-ink-muted">{item.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
