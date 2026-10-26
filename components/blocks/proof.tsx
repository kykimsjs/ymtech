import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { BreakText } from "@/components/ui/break-text";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Media, type MediaData } from "./media";
import { breakdown, devices, donut, linePath, prev, usage } from "./platform-screens";
import { PlatformTour, type PlatformFeature } from "./platform-tour";

export type StatsGalleryProps = {
  title: string;
  basis?: string;
  stats: { label: string; value: string; unit: string }[];
  /** 현장 사진. 없으면 숫자만 보여준다 */
  gallery?: { caption: string; media: MediaData }[];
  /** 앞뒤 블록과 구분할 때 회색 바탕 */
  surface?: boolean;
  id?: string;
};

// 참고: 케빈랩 "제로에너지빌딩 인증 현황" — 왼쪽 제목 + 기준일, 오른쪽 윗선 있는 숫자, 아래 현장 사진 4장과 캡션
export function StatsGallery({ title, basis, stats, gallery = [], surface, id }: StatsGalleryProps) {
  // 항목이 4개 이상이면 제목을 위로 올리고 숫자를 한 줄에 펼친다
  const wide = stats.length > 3;
  return (
    <section id={id} className={cn("block-y", surface ? "bg-surface" : "bg-canvas")}>
      <div className="container-page">
        <div className={cn("grid gap-10", !wide && "lg:grid-cols-2")}>
          <div>
            <h2 className="text-title font-bold">{title}</h2>
            {basis && <p className="mt-3 text-sm font-semibold text-ink-subtle">{basis}</p>}
          </div>
          <dl className={cn("grid grid-cols-2 gap-8", wide ? "lg:grid-cols-4" : "sm:grid-cols-3")}>
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-4 border-t border-line-strong pt-6">
                <dt className="text-sm font-semibold text-ink-muted">{stat.label}</dt>
                <dd className="text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] leading-none font-bold tracking-[-0.02em] tabular-nums">
                  <span className="text-brand-500">{stat.value}</span>
                  <span className="text-ink-muted">{stat.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {gallery.length > 0 && (
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((item) => (
              <li key={item.caption}>
                <Media media={item.media} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[4/3] rounded-[10px]" />
                <p className="mt-4 text-center text-[0.9375rem] font-semibold text-ink-muted">{item.caption}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export type ProductCertProps = {
  media: MediaData;
  name: string;
  points: string[];
  marks: { label: string; sub: string }[];
  id?: string;
};

// 참고: 케빈랩 4ST ZIP 제품 소개 — 왼쪽 둥근 사진, 오른쪽 제품명·대시 목록·인증 마크
export function ProductCert({ media, name, points, marks, id }: ProductCertProps) {
  return (
    <section id={id} className="block-y scroll-mt-14 bg-canvas">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Media media={media} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[3/2] rounded-[10px] bg-eco-50" />
        <div>
          <h2 className="text-subtitle font-bold">{name}</h2>
          <ul className="mt-5 flex flex-col gap-2 text-[0.9375rem] text-ink-muted">
            {points.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-5">
            {marks.map((mark) => (
              <li
                key={mark.label}
                className="flex size-28 flex-col items-center justify-center rounded-full border-2 border-brand-500 text-center"
              >
                <span className="text-[0.9375rem] font-bold text-brand-600">{mark.label}</span>
                <span className="mt-0.5 text-xs text-ink-subtle">{mark.sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export type DashboardPreviewProps = {
  title: string;
  description: string;
  /** 화면 아래 작은 안내 (예: "예시 화면") */
  note?: string;
  /** 데모·로그인 링크 (케빈랩 "서비스 바로가기") */
  action?: { label: string; href: string };
  /** 아직 열지 않은 서비스 표시 (예: "준비 중") */
  status?: string;
  /** 기능 목록. 있으면 좌우 분할 배치, 고른 기능마다 모니터 속 예시 화면이 바뀐다 */
  features?: PlatformFeature[];
  id?: string;
};

// 웹 플랫폼 관제 화면을 HTML로 재현한 그림 (수치는 예시). compact면 한 열로 쌓고 도넛 그래프를 뺀다.
function DashboardScreen({ compact, className }: { compact?: boolean; className?: string }) {
  const W = 560;
  const H = 200;
  return (
    <div
      className={cn(
        "relative rounded-[10px] bg-canvas p-3 shadow-[0_0_40px_10px_rgb(175_175_175/0.12)] sm:p-4",
        className,
      )}
    >
      <div className={cn("grid gap-3", !compact && "lg:grid-cols-[1.5fr_1fr]")}>
        <div className="rounded-lg border border-line p-6">
          <div className="flex items-baseline justify-between">
            <p className="font-semibold">전체 전력 사용 현황</p>
            <p className="text-xl font-bold text-brand-500 tabular-nums">
              1,284 <span className="text-sm text-ink-muted">kWh</span>
            </p>
          </div>
          <ul className="mt-4 flex justify-end gap-4 text-xs text-ink-muted">
            <li className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-brand-500" />오늘</li>
            <li className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-line-strong" />어제</li>
          </ul>
          <svg viewBox={`-24 -6 ${W + 30} ${H + 26}`} className="mt-2 w-full" role="img" aria-label="시간대별 전력 사용량 그래프 (예시)">
            {[0, 50, 100].map((t) => (
              <g key={t}>
                <line x1={0} x2={W} y1={H - (t / 100) * H} y2={H - (t / 100) * H} stroke="var(--color-line)" />
                <text x={-6} y={H - (t / 100) * H + 4} textAnchor="end" className="fill-ink-subtle text-[10px]">{t}</text>
              </g>
            ))}
            {[0, 6, 12, 18, 23].map((hr) => (
              <text key={hr} x={(hr / 23) * W} y={H + 16} textAnchor="middle" className="fill-ink-subtle text-[10px]">{hr}시</text>
            ))}
            <path d={`${linePath(usage, W, H)} L${W},${H} L0,${H} Z`} fill="var(--color-brand-500)" fillOpacity={0.12} />
            <path d={linePath(prev, W, H)} fill="none" stroke="var(--color-line-strong)" strokeWidth={1.5} />
            <path d={linePath(usage, W, H)} fill="none" stroke="var(--color-brand-500)" strokeWidth={2} />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-line p-6">
            <p className="font-semibold">분전반별 상태</p>
            <table className="mt-4 w-full text-center text-sm">
              <thead>
                <tr className="bg-ink-muted text-white">
                  <th className="py-2 font-medium">설비명</th>
                  <th className="py-2 font-medium">상태</th>
                  <th className="py-2 font-medium">전류(A)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-b border-line">
                {devices.map((d) => (
                  <tr key={d.name}>
                    <td className="py-2.5">{d.name}</td>
                    <td className={cn("py-2.5 font-semibold", d.status === "주의" ? "text-warning-ink" : "text-success-ink")}>{d.status}</td>
                    <td className="py-2.5 tabular-nums">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={cn("items-center gap-5 rounded-lg border border-line p-6", compact ? "hidden" : "flex")}>
            <svg viewBox="0 0 42 42" className="size-28 shrink-0 -rotate-90" role="img" aria-label="용도별 사용 비율 (예시)">
              {donut.map((part) => (
                <circle
                  key={part.label}
                  cx="21"
                  cy="21"
                  r="15.9155"
                  fill="none"
                  stroke={part.color}
                  strokeWidth="5"
                  strokeDasharray={`${part.value} ${100 - part.value}`}
                  strokeDashoffset={-part.start}
                />
              ))}
            </svg>
            <ul className="flex flex-col gap-1.5 text-sm">
              {breakdown.map((part) => (
                <li key={part.label} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="size-2.5 rounded-sm" style={{ background: part.color }} />
                  {part.label}
                  <span className="ml-auto pl-3 text-ink-subtle tabular-nums">{part.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 참고: 케빈랩 4ST ZIP "건물 전기 사용량·생산량 실시간 모니터링" — 가운데 제목·설명, 아래 대시보드 화면을 HTML로 재현
// features가 있으면 왼쪽 설명·기능 목록 + 오른쪽 작은 화면으로 나눈다 (준비 중인 서비스를 과하게 크게 보여주지 않도록)
export function DashboardPreview({ title, description, note, action, status, features, id }: DashboardPreviewProps) {
  const head = (
    <>
      {status && <p className="mb-4 rounded-full bg-surface-strong px-3 py-1 text-sm font-semibold text-ink-muted">{status}</p>}
      <h2 className="text-display font-bold">{title}</h2>
      <p className="mt-5 text-[0.9375rem] leading-[1.75] text-ink-muted">
        <BreakText text={description} />
      </p>
      {action && (
        <ButtonLink href={action.href} variant="outline" shape="pill" className="mt-8 border-ink">
          {action.label} <ChevronRight className="size-4" />
        </ButtonLink>
      )}
    </>
  );
  const noteLine = note && <p className="mt-4 text-right text-xs text-ink-subtle">{note}</p>;

  if (features) {
    // 왼쪽에 짧은 글·기능 목록, 오른쪽은 모니터 목업 속 예시 화면 (준비 중인 서비스를 가볍게 보여준다)
    return (
      <section id={id} className="block-y scroll-mt-14 bg-surface">
        <PlatformTour head={head} features={features} title={title} note={note} />
      </section>
    );
  }

  return (
    <section id={id} className="block-y bg-canvas">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">{head}</div>
        <DashboardScreen className="mt-12" />
        {noteLine}
      </div>
    </section>
  );
}

export type ProductGridProps = {
  title: string;
  products: { name: string; spec: string; media: MediaData }[];
  id?: string;
};

// 참고: 여의시스템 "연결 솔루션" — 회색 바탕, 흰 카드에 모델명·한 줄 사양·제품 사진
export function ProductGrid({ title, products, id }: ProductGridProps) {
  return (
    <section id={id} className="block-y scroll-mt-14 bg-surface-strong">
      <div className="container-page">
        <h2 className="text-center text-display font-bold">{title}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <li key={product.name} className="bg-canvas p-6 pb-8">
              <h3 className="text-lg font-bold text-ink-muted">{product.name}</h3>
              <p className="mt-6 text-[0.9375rem] font-semibold text-ink-subtle">{product.spec}</p>
              <Media media={product.media} sizes="(min-width: 768px) 360px, 100vw" className="mt-8 aspect-square bg-canvas" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type LogoGridProps = {
  title: string;
  items: { name: string; role: string }[];
  id?: string;
};

// 참고: 지노시스 PORTFOLIO — 영문 대문자 제목, 3열 정사각 타일. 로고 파일을 받기 전까지 이름으로 채운다.
export function LogoGrid({ title, items, id }: LogoGridProps) {
  return (
    <section id={id} className="block-y bg-surface">
      <div className="container-page">
        <h2 className="text-display font-extrabold tracking-[-0.02em] text-brand-700 uppercase">{title}</h2>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <li key={`${item.name}-${i}`} className="flex aspect-[3/2] flex-col items-center justify-center gap-2 border border-line bg-canvas p-6 text-center">
              <span className="text-xl font-bold">{item.name}</span>
              <span className="text-sm text-ink-subtle">{item.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type TimelineProps = {
  eyebrow: string;
  title: string;
  years: { year: string; events: { month: string; text: string }[] }[];
  id?: string;
};

// 참고: 아이오크롭스 History — 어두운 바탕, 왼쪽 큰 연도, 오른쪽 월 + 사건 목록
export function Timeline({ eyebrow, title, years, id }: TimelineProps) {
  return (
    <section id={id} className="block-y bg-graphite-900 text-white">
      <div className="container-page">
        <p className="font-semibold text-eco-300">{eyebrow}</p>
        <h2 className="mt-3 text-display font-semibold">{title}</h2>
        <ol className="mt-14 border-t border-white/15">
          {years.map((group, gi) => (
            <li key={`${group.year}-${gi}`} className="grid gap-6 border-b border-white/15 py-10 md:grid-cols-[14rem_1fr]">
              <p className="text-[2.5rem] leading-none font-semibold tabular-nums">{group.year}</p>
              <ul className="flex flex-col gap-4">
                {group.events.map((event, ei) => (
                  <li key={`${event.text}-${ei}`} className="grid grid-cols-[3rem_1fr] gap-4 text-[0.9375rem] leading-relaxed">
                    <span className="text-white/55 tabular-nums">{event.month}</span>
                    <span className="text-white/85">{event.text}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type Logo = { src: string; alt: string; width: number; height: number };

export type TrustFiguresProps = {
  title: string;
  description?: string;
  /** 근거 항목. unit이 있으면 숫자 항목, mark가 있으면 기관 공식 마크를 함께 보여준다 */
  items: { value: string; unit?: string; label: string; source: string; mark?: Logo }[];
  /** numbers: 숫자만(제목 왼쪽·숫자 오른쪽, HOME), rows: 행 목록 + 마크, strip: 숫자 + 아래 마크 띠 (특허·인증 페이지용) */
  layout?: "rows" | "strip" | "numbers";
  /** 기준일 (예: 2026.10 기준) */
  basis?: string;
  id?: string;
};

function Figure({ value, unit, className }: { value: string; unit?: string; className?: string }) {
  return (
    <p className={cn("font-bold tracking-[-0.04em] tabular-nums", className)}>
      <span className="text-brand-500">{value}</span>
      {unit && <span className="ml-1 text-[0.45em] tracking-normal text-brand-500">{unit}</span>}
    </p>
  );
}

// 기획안 HOME "기술 신뢰성"(KETI 검증 · KESCO 규격 준수) + 핵심 수치.
// 참고: 케빈랩 4ST ZIP 인증 현황(제목·기준일 왼쪽, 라벨 + 큰 숫자 오른쪽), 아이오크롭스 연혁(가로선으로 나뉜 행 목록)
export function TrustFigures({ title, description, items, layout = "rows", basis, id }: TrustFiguresProps) {
  const numbers = items.filter((item) => item.unit);
  const marks = items.filter((item) => item.mark);
  const head = (
    <>
      <h2 className="text-display font-bold">{title}</h2>
      {basis && <p className="mt-3 text-sm font-semibold text-ink-subtle">{basis}</p>}
      {description && (
        <p className="mt-5 max-w-[30em] text-[1.0625rem] leading-[1.75] text-ink-muted">
          <BreakText text={description} />
        </p>
      )}
    </>
  );

  if (layout === "rows") {
    return (
      <section id={id} className="block-y scroll-mt-14 bg-surface">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">{head}</div>
          <ul className="border-t-2 border-ink lg:col-span-8">
            {items.map((item) => (
              <li
                key={item.label}
                className="grid grid-cols-[6.5rem_1fr] items-center gap-x-6 gap-y-3 border-b border-line-strong py-6 sm:grid-cols-[9rem_1fr_auto] lg:py-7"
              >
                {/* 숫자가 아닌 값(KESCO 등)은 한 줄에 들어가게 작게 */}
                <Figure
                  value={item.value}
                  unit={item.unit}
                  className={cn(
                    "leading-none whitespace-nowrap",
                    item.unit ? "text-[clamp(2rem,1.6rem+1.6vw,3rem)]" : "text-[clamp(1.5rem,1.3rem+0.8vw,2rem)]",
                  )}
                />
                <div>
                  <p className="text-lg font-bold">{item.label}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-muted">{item.source}</p>
                </div>
                {item.mark && (
                  <Image
                    src={item.mark.src}
                    alt={item.mark.alt}
                    width={item.mark.width}
                    height={item.mark.height}
                    sizes="180px"
                    className="col-start-2 h-8 w-auto sm:col-start-3 lg:h-10"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="block-y scroll-mt-14 bg-surface">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">{head}</div>
          <dl className="grid grid-cols-2 gap-8 lg:col-span-6">
            {numbers.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.9375rem] font-semibold text-ink-muted">{item.label}</dt>
                <dd className="mt-3">
                  <Figure value={item.value} unit={item.unit} className="text-[clamp(3.25rem,2.4rem+3vw,5rem)] leading-[0.95]" />
                  {layout === "numbers" && <span className="mt-3 block text-sm text-ink-subtle">{item.source}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {layout === "strip" && marks.length > 0 && (
          <ul className="mt-12 flex flex-col gap-6 rounded-card bg-canvas px-6 py-6 sm:flex-row sm:items-center sm:gap-12 lg:mt-16 lg:px-10">
            <li className="shrink-0 text-sm font-bold text-ink-muted">검증 · 규격</li>
            {marks.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                {item.mark && (
                  <Image src={item.mark.src} alt={item.mark.alt} width={item.mark.width} height={item.mark.height} sizes="180px" className="h-9 w-auto lg:h-10" />
                )}
                <span className="text-[0.9375rem] text-ink-muted">{item.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
