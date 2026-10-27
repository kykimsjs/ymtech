import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Pending } from "@/components/ui/pending";
import { cn } from "@/lib/cn";
import { Media, type MediaData } from "./media";

// 회사소개 페이지 블록 (2026-10-27). 기획안 4장(인사말·비전·미션·Team & Network)만으로 채운다.
// 자료가 없는 곳(대표 사진, 인사말 전문, 연혁)은 무엇이 들어갈지 적은 자리 표시를 둔다.

type Point = { title: string; text: string };
type Fact = { label: string; value: string; missing?: boolean };

function Breadcrumb({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ol className={cn("flex items-center gap-1.5 text-sm", tone === "dark" ? "text-white/60" : "text-ink-subtle")}>
      {items.map((crumb, i) => (
        <li key={crumb} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3.5" />}
          {i === items.length - 1 ? (
            <span className={tone === "dark" ? "text-white" : "text-ink"}>{crumb}</span>
          ) : (
            <Link href={i === 0 ? "/ko" : "#"} className="hover:underline hover:underline-offset-4">
              {crumb}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}

// ── 페이지 머리 ─────────────────────────────────────────

export type CompanyHeaderProps = {
  /** doc: 제목 + 회사 개요 표(여의시스템 서브 상단), brand: 슬로건 + 큰 심볼(CI 매뉴얼 BS 14) */
  variant: "doc" | "brand";
  title: string;
  slogan: string;
  breadcrumb: string[];
  facts: Fact[];
};

export function CompanyHeader({ variant, title, slogan, breadcrumb, facts }: CompanyHeaderProps) {
  if (variant === "brand") {
    return (
      <section className="overflow-hidden bg-canvas">
        <div className="container-page grid items-center gap-10 pt-14 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7">
            <Breadcrumb items={breadcrumb} />
            <p className="mt-10 font-semibold text-brand-600">{title}</p>
            <h1 className="mt-4 text-display-xl font-bold">{slogan}</h1>
          </div>
          {/* CI 심볼을 제품처럼 크게. 장식 그래픽 대신 회사 자체의 형태를 쓴다 */}
          <div className="flex justify-start lg:col-span-5 lg:justify-end">
            <Image src="/brand/ym-symbol.png" alt="" width={426} height={402} sizes="(min-width: 1024px) 320px, 128px" className="w-28 lg:w-80" />
          </div>
        </div>
        <dl className="container-page grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-b border-line py-6 sm:pr-6 lg:border-b-0">
              <dt className="text-sm text-ink-subtle">{fact.label}</dt>
              <dd className={cn("mt-2 font-semibold", fact.missing && "text-ink-subtle")}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page grid gap-12 pt-12 pb-16 lg:grid-cols-12 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-5">
          <Breadcrumb items={breadcrumb} />
          <h1 className="mt-8 text-display-xl font-bold">{title}</h1>
          <p className="mt-5 text-subtitle font-semibold text-ink-muted">{slogan}</p>
        </div>
        <dl className="border-t-2 border-ink text-[0.9375rem] lg:col-span-7">
          {facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-semibold">{fact.label}</dt>
              <dd className={fact.missing ? "text-ink-subtle" : "text-ink-muted"}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ── 인사말 ─────────────────────────────────────────────

export type CeoMessageProps = {
  /** doc: 제목 왼쪽·요점 오른쪽, portrait: 대표 사진 + 인사말, letter: 편지처럼 좁은 한 단 */
  variant: "doc" | "portrait" | "letter";
  title: string;
  quote: string;
  points: Point[];
  signature: { role: string; name: string };
  /** 아직 받지 못한 자료 안내 (예: 인사말 전문) */
  pending?: string;
  portraitHint?: string;
  id?: string;
};

function Signature({ role, name, className }: CeoMessageProps["signature"] & { className?: string }) {
  return (
    <p className={cn("flex items-baseline gap-3", className)}>
      <span className="text-[0.9375rem] text-ink-muted">{role}</span>
      <span className="text-xl font-bold tracking-[0.08em]">{name}</span>
    </p>
  );
}

export function CeoMessage({ variant, title, quote, points, signature, pending, portraitHint, id }: CeoMessageProps) {
  if (variant === "letter") {
    return (
      <section id={id} className="block-y scroll-mt-32 bg-canvas">
        <div className="container-page">
          <div className="mx-auto max-w-[44rem]">
            <Logo type="symbol" className="w-10" />
            <p className="mt-8 font-semibold text-brand-600">{title}</p>
            <h2 className="mt-4 text-display font-bold">{quote}</h2>
            <div className="mt-10 flex flex-col gap-6 text-lg leading-[1.8]">
              {points.map((point) => (
                <p key={point.title} className="text-ink-muted">
                  <strong className="block font-semibold text-ink">{point.title}</strong>
                  {point.text}
                </p>
              ))}
            </div>
            {pending && <Pending text={pending} className="mt-10 min-h-32" />}
            <Signature {...signature} className="mt-12 justify-end border-t border-line pt-6" />
          </div>
        </div>
      </section>
    );
  }

  const list = (
    <ol className="mt-10 border-t border-line">
      {points.map((point, i) => (
        <li key={point.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[2.5rem_11rem_1fr]">
          <span className="text-sm font-semibold text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="font-bold">{point.title}</h3>
          <p className="col-start-2 mt-1 leading-[1.75] text-ink-muted sm:col-start-3 sm:mt-0">{point.text}</p>
        </li>
      ))}
    </ol>
  );

  if (variant === "portrait") {
    return (
      <section id={id} className="block-y scroll-mt-32 bg-canvas">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Pending text={portraitHint ?? "사진 필요: 대표 사진 (세로 4:5)"} className="aspect-[4/5] lg:col-span-5" />
          <div className="lg:col-span-7 lg:pt-4">
            <p className="font-semibold text-brand-600">{title}</p>
            <h2 className="mt-4 text-display font-bold">{quote}</h2>
            {list}
            {pending && <Pending text={pending} className="mt-8 min-h-24" />}
            <Signature {...signature} className="mt-10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-display font-bold">{title}</h2>
        </div>
        <div className="lg:col-span-8">
          <p className="text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.45] font-bold tracking-[-0.02em]">{quote}</p>
          {list}
          {pending && <Pending text={pending} className="mt-8 min-h-24" />}
          <Signature {...signature} className="mt-10" />
        </div>
      </div>
    </section>
  );
}

// ── 비전·미션 ──────────────────────────────────────────

export type VisionMissionProps = {
  /** table: 표처럼 행으로, photo: 사진 위 비전 + 3단 미션, words: 어두운 바탕에 영문 키워드를 크게 */
  variant: "table" | "photo" | "words";
  title: string;
  vision: string;
  missions: { key: string; title: string; text: string }[];
  media?: MediaData;
  id?: string;
};

export function VisionMission({ variant, title, vision, missions, media, id }: VisionMissionProps) {
  if (variant === "photo") {
    return (
      <section id={id} className="scroll-mt-32 bg-graphite-900 text-white">
        <div className="relative isolate overflow-hidden">
          {media && <Media media={media} tone="dark" sizes="100vw" fill className="-z-20" />}
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-graphite-900/90 via-graphite-900/70 to-graphite-900/30" />
          <div className="container-page flex min-h-[26rem] flex-col justify-center py-20 lg:min-h-[32rem]">
            <p className="font-semibold text-eco-300">{title}</p>
            <h2 className="mt-4 max-w-3xl text-display-xl font-bold">{vision}</h2>
          </div>
        </div>
        <ol className="container-page grid py-14 md:grid-cols-3 lg:py-20">
          {missions.map((mission, i) => (
            <li key={mission.key} className={cn("py-6 md:px-8 md:py-0", i > 0 && "border-t border-white/15 md:border-t-0 md:border-l", i === 0 && "md:pl-0")}>
              <p className="text-sm font-semibold tracking-[0.06em] text-eco-300">{mission.key}</p>
              <h3 className="mt-3 text-subtitle font-bold">{mission.title}</h3>
              <p className="mt-3 leading-[1.75] text-white/75">{mission.text}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (variant === "words") {
    return (
      <section id={id} className="block-y scroll-mt-32 bg-graphite-900 text-white">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="font-semibold text-eco-300 lg:col-span-3">{title}</p>
            <h2 className="text-display font-bold lg:col-span-9">{vision}</h2>
          </div>
          <ol className="mt-16 lg:mt-24">
            {missions.map((mission) => (
              <li key={mission.key} className="grid gap-4 border-t border-white/15 py-8 lg:grid-cols-12 lg:items-baseline lg:py-10">
                <p className="text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-none font-bold tracking-[-0.03em] lg:col-span-7">{mission.key}</p>
                <div className="lg:col-span-5">
                  <h3 className="text-subtitle font-bold">{mission.title}</h3>
                  <p className="mt-2 leading-[1.75] text-white/75">{mission.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-display font-bold lg:col-span-4">{title}</h2>
        <div className="lg:col-span-8">
          <p className="text-sm font-semibold text-brand-600">VISION</p>
          <p className="mt-3 text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.45] font-bold tracking-[-0.02em]">{vision}</p>
          <p className="mt-14 text-sm font-semibold text-brand-600">MISSION</p>
          <table className="mt-3 w-full border-t-2 border-ink text-left text-[0.9375rem]">
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.key} className="border-b border-line align-top max-sm:flex max-sm:flex-col max-sm:gap-1 max-sm:py-4">
                  <th scope="row" className="py-5 pr-6 font-semibold tracking-[0.04em] text-brand-600 max-sm:p-0 sm:w-40">
                    {mission.key}
                  </th>
                  <td className="py-5 pr-6 font-bold max-sm:p-0 sm:w-44">{mission.title}</td>
                  <td className="py-5 leading-[1.75] text-ink-muted max-sm:p-0">{mission.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ── 연혁 (자료 대기) ──────────────────────────────────────

/** tone: light 흰 바탕, surface 옅은 회색(흰 섹션 사이에 둘 때), dark 어두운 바탕 */
export type HistoryPendingProps = { title: string; pending: string; tone?: "light" | "surface" | "dark"; id?: string };

export function HistoryPending({ title, pending, tone = "light", id }: HistoryPendingProps) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("block-y scroll-mt-32", dark ? "bg-graphite-800 text-white" : tone === "surface" ? "bg-surface" : "bg-canvas")}>
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="text-display font-bold lg:col-span-4">{title}</h2>
        <Pending text={pending} tone={dark ? "dark" : "light"} className={cn("min-h-40 lg:col-span-8", tone === "surface" && "bg-canvas")} />
      </div>
    </section>
  );
}

// ── 팀·파트너 ──────────────────────────────────────────

export type TeamNetworkProps = {
  /** rows: 그룹별 한 줄, columns: 3단 + 협력 기관 이름 */
  variant: "rows" | "columns";
  title: string;
  description?: string;
  groups: { title: string; text: string; names?: string[] }[];
  pending?: string;
  id?: string;
};

export function TeamNetwork({ variant, title, description, groups, pending, id }: TeamNetworkProps) {
  if (variant === "columns") {
    return (
      <section id={id} className="block-y scroll-mt-32 bg-canvas">
        <div className="container-page">
          <h2 className="text-display font-bold">{title}</h2>
          {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {groups.map((group) => (
              <li key={group.title} className="border-t-2 border-ci pt-6">
                <h3 className="text-subtitle font-bold">{group.title}</h3>
                <p className="mt-3 leading-[1.75] text-ink-muted">{group.text}</p>
                {group.names && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.names.map((name) => (
                      <li key={name} className="rounded-full border border-line-strong px-3 py-1 text-sm font-semibold">
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {pending && <Pending text={pending} className="mt-12 min-h-28" />}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-display font-bold">{title}</h2>
          {description && <p className="mt-5 leading-[1.75] text-ink-muted">{description}</p>}
        </div>
        <div className="lg:col-span-8">
          <dl className="border-t-2 border-ink">
            {groups.map((group) => (
              <div key={group.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-bold">{group.title}</dt>
                <dd className="leading-[1.75] text-ink-muted">
                  {group.text}
                  {group.names && <span className="mt-1 block font-semibold text-ink">{group.names.join(" · ")}</span>}
                </dd>
              </div>
            ))}
          </dl>
          {pending && <Pending text={pending} className="mt-8 min-h-24" />}
        </div>
      </div>
    </section>
  );
}

// ── 협력 파트너 ─────────────────────────────────────────

type PartnerLogo = { src: string; width: number; height: number };

export type PartnerGroupsProps = {
  title: string;
  description?: string;
  /** 분야별 파트너. 로고가 없으면 이름만 크게 쓴다 */
  groups: { title: string; partners: { name: string; role: string; logo?: PartnerLogo }[] }[];
  id?: string;
};

// 참고: 케빈랩 인증 마크 영역(흰 칸에 로고), 지노시스 PORTFOLIO 타일. 분야 제목 왼쪽 + 로고 칸 그리드
// 로고 출처: 각 기관 공식 홈페이지 (2026-10-27)
export function PartnerGroups({ title, description, groups, id }: PartnerGroupsProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}
        <div className="mt-12 flex flex-col">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-6 border-t border-line-strong py-10 lg:grid-cols-12 lg:gap-10">
              <h3 className="text-subtitle font-bold lg:col-span-3">{group.title}</h3>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
                {group.partners.map((partner) => (
                  <li key={partner.name} className="flex flex-col rounded-card bg-canvas p-6">
                    <div className="flex h-14 items-center">
                      {partner.logo ? (
                        <Image
                          src={partner.logo.src}
                          alt={partner.name}
                          width={partner.logo.width}
                          height={partner.logo.height}
                          sizes="200px"
                          // next/image는 SVG를 최적화하지 않으므로 원본 그대로 쓴다
                          unoptimized={partner.logo.src.endsWith(".svg")}
                          className="max-h-11 w-auto max-w-[12rem] object-contain object-left"
                        />
                      ) : (
                        <p className="text-lg leading-snug font-bold">{partner.name}</p>
                      )}
                    </div>
                    {/* 로고에 기관 이름이 들어 있어 이름 줄은 따로 쓰지 않는다 (alt로 읽힘) */}
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">{partner.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
