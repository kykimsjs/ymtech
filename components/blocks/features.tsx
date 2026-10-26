import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { icons, type IconName } from "./icons";
import { Media, type MediaData } from "./media";

export type TileGridProps = {
  tiles: { label: string; title: string[]; href: string; media: MediaData }[];
  tone?: "light" | "dark";
  id?: string;
};

// 참고: 아이오크롭스 대표 솔루션 — 간격 없는 2열 사진 타일, 위쪽 가운데에 제품명·두 줄 제목·Read More
export function TileGrid({ tiles, tone = "dark", id }: TileGridProps) {
  return (
    <section id={id} className={cn("pb-20 lg:pb-28", tone === "dark" ? "bg-graphite-900" : "bg-canvas")}>
      <div className="container-page grid sm:grid-cols-2">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href} className="group relative isolate aspect-square overflow-hidden text-white">
            <Media
              media={tile.media}
              tone="dark"
              sizes="(min-width: 640px) 50vw, 100vw"
              fill
              className="-z-20 bg-graphite-900 transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-black/40 transition-colors group-hover:bg-black/55" />
            <div className="flex flex-col items-center px-6 pt-[14%] text-center">
              <p className="text-[0.9375rem]">{tile.label}</p>
              <p className="mt-2 text-title font-semibold">
                {tile.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-[0.9375rem]">
                자세히 보기 <ArrowRight className="size-4" />
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
    <section id={id} className="block-y scroll-mt-14 bg-surface">
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
    <section id={id} className="block-y scroll-mt-14 bg-linear-to-r from-brand-600 to-eco-500 text-white">
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
