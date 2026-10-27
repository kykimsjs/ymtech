import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getUi } from "@/content/dictionaries";
import { cn } from "@/lib/cn";
import { icons, type IconName } from "./icons";
import { Media, type MediaData } from "./media";

export type TileGridProps = {
  /** 앞에 intro-split 같은 머리말 블록이 없을 때 쓰는 제목 */
  title?: string;
  /** status: 아직 열지 않은 서비스 표시 (예: "준비 중"), brand: 제품 BI 시그니처(흰색 판) */
  tiles: {
    label: string;
    title: string[];
    href: string;
    media: MediaData;
    status?: string;
    brand?: { src: string; alt: string; width: number; height: number };
  }[];
  tone?: "light" | "dark";
  id?: string;
};

// 참고: 아이오크롭스 대표 솔루션 — 2열 사진 타일. 글이 사진(제품)을 가리지 않도록 사진 아래 칸에 로고·제품명·제목·자세히 보기
export async function TileGrid({ title, tiles, tone = "dark", id }: TileGridProps) {
  const t = await getUi();
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("pb-20 lg:pb-28", title && "pt-20 lg:pt-28", dark ? "bg-graphite-900" : "bg-canvas")}>
      {title && <h2 className={cn("container-page mb-10 text-display font-bold", dark && "text-white")}>{title}</h2>}
      <div className="container-page grid gap-4 sm:grid-cols-2 lg:gap-6">
        {tiles.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className={cn("group flex flex-col overflow-hidden rounded-card", dark ? "bg-graphite-800 text-white" : "bg-surface text-ink")}
          >
            <div className="overflow-hidden">
              <Media
                media={tile.media}
                tone="dark"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 lg:p-8">
              {/* 로고 또는 상태 표시 줄: 높이를 맞춰 두 칸의 제목 줄이 나란히 오게 */}
              <div className="flex h-9 items-center lg:h-10">
                {tile.brand ? (
                  <Image src={tile.brand.src} alt={tile.brand.alt} width={tile.brand.width} height={tile.brand.height} sizes="160px" className="h-full w-auto" />
                ) : (
                  tile.status && (
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", dark ? "border-white/50" : "border-line-strong")}>
                      {tile.status}
                    </span>
                  )
                )}
              </div>
              <p className={cn("mt-4 text-[0.9375rem]", dark ? "text-white/70" : "text-ink-muted")}>{tile.label}</p>
              <p className="mt-1 text-title font-semibold">{tile.title.join(" ")}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-[0.9375rem] font-semibold">
                {t.more} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export type CardGridProps = {
  title: string;
  cards: { icon: IconName; title: string; text: string }[];
  id?: string;
};

// 참고: 지노시스 BUSINESS AREA — 왼쪽 큰 영문 제목, 3열 카드(위 흰 칸에 선 아이콘, 아래 회색 칸에 색 제목 + 본문)
export function CardGrid({ title, cards, id }: CardGridProps) {
  return (
    <section id={id} className="block-y bg-canvas">
      <div className="container-page">
        <h2 className="text-display font-extrabold tracking-[-0.02em] text-brand-700 uppercase">{title}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-16">
          {cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <article key={card.title} className="border border-line">
                <div className="flex h-44 items-center justify-center">
                  <Icon strokeWidth={1.25} className="size-20 text-ink-muted" />
                </div>
                <div className="bg-surface px-6 pt-8 pb-10">
                  <h3 className="text-center text-lg font-bold text-brand-600">{card.title}</h3>
                  <p className="mt-5 text-[0.9375rem] leading-[1.8] text-ink-muted">{card.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export type MediaTextProps = {
  title: string;
  paragraphs: string[];
  media: MediaData;
  reverse?: boolean;
  id?: string;
};

// 참고: 여의시스템 개요 — 회색 바탕, 가운데 섹션 제목, 왼쪽 글 · 오른쪽 사진
export function MediaText({ title, paragraphs, media, reverse, id }: MediaTextProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page">
        <h2 className="text-center text-display font-bold">{title}</h2>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={cn("flex flex-col gap-5 text-[0.9375rem] leading-[1.8] text-ink-muted", reverse && "lg:order-2")}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Media media={media} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[16/10]" />
        </div>
      </div>
    </section>
  );
}

export type BenefitBandProps = {
  title: string;
  items: { icon: IconName; title: string; text: string }[];
  id?: string;
};

// 참고: 여의시스템 장점 — 가로 그라데이션 띠, 흰 원 안 아이콘, 가운데 정렬 흰 글씨
export function BenefitBand({ title, items, id }: BenefitBandProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-linear-to-r from-brand-600 to-eco-500 text-white">
      <div className="container-page">
        <h2 className="text-center text-display font-bold">{title}</h2>
        <ul className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex flex-col items-center text-center">
                <span className="flex size-32 items-center justify-center rounded-full bg-white ring-4 ring-white/30 ring-offset-4 ring-offset-transparent">
                  <Icon strokeWidth={1.5} className="size-14 text-brand-600" />
                </span>
                <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                {/* 그라데이션 틸 끝에서도 4.5:1을 넘도록 불투명 흰색 */}
                <p className="mt-3 max-w-[18em] text-[0.9375rem] leading-[1.75] text-white">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export type StoryProps = {
  tags: string[];
  title: string[];
  paragraphs: string[];
  emphasis?: string;
  media: [MediaData, MediaData];
  action?: { label: string; href: string };
  reverse?: boolean;
  id?: string;
};

// 참고: 아이오크롭스 #Solutions #Stack — 어두운 회색 바탕, 해시태그 소제목, 긴 설명, 아래로 사진 두 장이 화면 끝까지
export function Story({ tags, title, paragraphs, emphasis, media, action, reverse, id }: StoryProps) {
  return (
    <section id={id} className="bg-graphite-800 pt-20 text-white lg:pt-28">
      <div className="container-page">
        <div className={cn("flex max-w-xl flex-col gap-6", reverse && "lg:ml-auto")}>
          <p className="text-eyebrow font-semibold text-eco-300">{tags.map((tag) => `#${tag}`).join(" ")}</p>
          <h2 className="text-display font-semibold">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-[1.75] text-white/75">
              {paragraph}
            </p>
          ))}
          {emphasis && <p className="text-[0.9375rem] leading-[1.75] font-semibold">{emphasis}</p>}
          {action && (
            <ButtonLink href={action.href} variant="inverse" className="self-start">
              {action.label} <ArrowRight className="size-4" />
            </ButtonLink>
          )}
        </div>
      </div>
      <div className={cn("mt-16 grid gap-2.5 lg:mt-20", reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]")}>
        <Media media={media[0]} tone="dark" sizes="60vw" className="aspect-[16/10] md:aspect-auto md:h-[26rem]" />
        <Media media={media[1]} tone="dark" sizes="40vw" className="aspect-[16/10] md:aspect-auto md:h-[26rem]" />
      </div>
    </section>
  );
}
