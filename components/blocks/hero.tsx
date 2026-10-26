import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Media, type MediaData } from "./media";

type Action = { label: string; href: string };

export type HeroMediaProps = {
  title: string[];
  description?: string;
  caption?: string;
  media: MediaData;
  actions?: Action[];
};

// 참고: 아이오크롭스 메인 히어로 — 화면 가득 사진(영상), 어둡게 깔고 제목은 컨테이너 왼쪽
export function HeroMedia({ title, description, caption, media, actions = [] }: HeroMediaProps) {
  return (
    <section className="relative isolate h-[min(88svh,52rem)] min-h-[34rem] overflow-hidden bg-graphite-900 text-white">
      <Media media={media} tone="dark" preload fill className="-z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />
      <div className="container-page flex h-full flex-col justify-center">
        <h1 className="text-display-xl font-semibold">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {description && <p className="mt-6 max-w-xl text-lg leading-[1.7] text-white/80">{description}</p>}
        {caption && <p className="mt-4 text-[0.9375rem] font-semibold text-white/90">{caption}</p>}
        {actions.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((action, i) => (
              <ButtonLink key={action.label} href={action.href} variant={i === 0 ? "inverse" : "inverse-outline"} size="lg">
                {action.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export type HeroSplitProps = {
  label: string;
  eyebrow: string;
  title: string[];
  action: Action;
  media: MediaData;
  reverse?: boolean;
};

// 참고: 케빈랩 메인 — 왼쪽 반은 사진 위 제품명, 오른쪽 반은 흰 바탕 가운데 정렬 문구 + 알약형 테두리 버튼
export function HeroSplit({ label, eyebrow, title, action, media, reverse }: HeroSplitProps) {
  return (
    <section className="grid bg-canvas lg:min-h-[44rem] lg:grid-cols-2">
      <div className={reverse ? "relative lg:order-2" : "relative"}>
        <Media media={media} tone="dark" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] h-full w-full bg-graphite-900 lg:aspect-auto" />
        {/* 케빈랩은 사진 가운데에 제품명을 두지만, 제품 사진을 가리지 않도록 왼쪽 아래에 둔다.
            사진 아래쪽이 밝아도 읽히도록 어두운 그라데이션을 깐다. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/60 to-transparent" />
        <p className="absolute bottom-8 left-8 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-bold tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          {label}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <p className="font-semibold text-ink-muted">{eyebrow}</p>
        <h2 className="text-display font-bold">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <ButtonLink href={action.href} variant="outline" shape="pill" className="mt-4 border-ink">
          {action.label} <ChevronRight className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}

export type PageTitleProps = {
  title: string;
  description?: string;
  breadcrumb: string[];
  media: MediaData;
};

// 참고: 케빈랩 4ST ZIP·여의시스템 서브 상단 — 배경 사진 위 큰 제목과 한 줄 설명
export function PageTitle({ title, description, breadcrumb, media }: PageTitleProps) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite-900 text-white">
      <Media media={media} tone="dark" fill className="-z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-black/60 to-black/10" />
      <div className="container-page flex min-h-[20rem] flex-col justify-end pt-24 pb-14 md:min-h-[26rem]">
        <ol className="mb-6 flex items-center gap-1.5 text-sm text-white/60">
          {breadcrumb.map((crumb, i) => (
            <li key={crumb} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5" />}
              {i === breadcrumb.length - 1 ? (
                <span className="text-white">{crumb}</span>
              ) : (
                <Link href="#" className="hover:text-white">
                  {crumb}
                </Link>
              )}
            </li>
          ))}
        </ol>
        <h1 className="text-[clamp(2.25rem,1.6rem+2.8vw,4rem)] leading-tight font-bold tracking-[-0.02em]">{title}</h1>
        {description && <p className="mt-4 text-lg text-white/75">{description}</p>}
      </div>
    </section>
  );
}
