import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ActionButton, ButtonLink } from "@/components/ui/button";
import { HeroSlideshow } from "./hero-slideshow";
import { Media, type MediaData } from "./media";

/** status: 아직 열지 않은 항목 (예: "준비 중"). 비활성 버튼으로 보인다 */
type Action = { label: string; href: string; status?: string };

export type HeroMediaProps = {
  title: string[];
  description?: string;
  caption?: string;
  /** 사진 한 장, 또는 여러 장이면 천천히 넘어가며 점 내비게이션이 붙는다 */
  media: MediaData | MediaData[];
  actions?: Action[];
  /** 사진 위 덧칠. strong: 화면 전체를 눌러 줌, soft: 글씨가 있는 왼쪽만 눌러 사진을 살림 */
  overlay?: "strong" | "soft";
};

const overlays = {
  strong: "bg-linear-to-r from-black/75 via-black/50 to-black/25",
  soft: "bg-linear-to-r from-black/75 via-black/45 to-black/5",
};

// 참고: 아이오크롭스 메인 히어로 — 화면 가득 사진(영상), 어둡게 깔고 제목은 컨테이너 왼쪽
//       여러 장일 때 점 내비게이션은 안심해·케빈랩 메인 슬라이드
export function HeroMedia({ title, description, caption, media, actions = [], overlay = "strong" }: HeroMediaProps) {
  const slides = Array.isArray(media) ? media : [media];
  return (
    <section className="relative isolate h-[min(88svh,52rem)] min-h-[34rem] overflow-hidden bg-graphite-900 text-white">
      {slides.length > 1 ? (
        <HeroSlideshow labels={slides.map((slide) => slide.alt)}>
          {slides.map((slide, i) => (
            <Media key={slide.src ?? slide.alt} media={slide} tone="dark" preload={i === 0} lowPriority={i > 0} fill />
          ))}
        </HeroSlideshow>
      ) : (
        <Media media={slides[0]} tone="dark" preload fill className="-z-20" />
      )}
      {/* 글씨가 있는 왼쪽은 진하게, 오른쪽은 사진이 보이게 */}
      <div aria-hidden className={`absolute inset-0 -z-10 ${overlays[overlay]}`} />
      <div className="container-page flex h-full flex-col justify-center">
        <h1 className="text-display-xl font-semibold">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {description && <p className="mt-6 max-w-xl text-lg leading-[1.7] text-white/90">{description}</p>}
        {caption && <p className="mt-4 text-[0.9375rem] font-semibold text-white/90">{caption}</p>}
        {actions.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((action, i) => (
              <ActionButton key={action.label} href={action.href} status={action.status} variant={i === 0 ? "inverse" : "inverse-outline"} size="lg">
                {action.label}
              </ActionButton>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export type HeroSplitProps = {
  /** 사진 위 제품명 (선택) */
  label?: string;
  eyebrow: string;
  title: string[];
  description?: string;
  /** 첫 번째는 채운 버튼, 나머지는 테두리 버튼 */
  actions: Action[];
  media: MediaData;
  reverse?: boolean;
  /** HOME 첫 화면처럼 페이지 제목이면 h1 */
  heading?: "h1" | "h2";
};

// 참고: 케빈랩 메인 — 왼쪽 반은 사진, 오른쪽 반은 흰 바탕 가운데 정렬 문구 + 알약형 버튼
export function HeroSplit({ label, eyebrow, title, description, actions, media, reverse, heading = "h2" }: HeroSplitProps) {
  const Heading = heading;
  return (
    <section className="grid bg-canvas lg:min-h-[44rem] lg:grid-cols-2">
      <div className={reverse ? "relative lg:order-2" : "relative"}>
        <Media
          media={media}
          tone="dark"
          preload={heading === "h1"}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] h-full w-full bg-graphite-900 lg:aspect-auto"
        />
        {label && (
          <>
            {/* 케빈랩은 사진 가운데에 제품명을 두지만, 제품 사진을 가리지 않도록 왼쪽 아래에 둔다.
                사진 아래쪽이 밝아도 읽히도록 어두운 그라데이션을 깐다. */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-8 left-8 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-bold tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
              {label}
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center lg:py-20">
        <p className="font-semibold text-brand-600">{eyebrow}</p>
        <Heading className={heading === "h1" ? "text-display-xl font-bold" : "text-display font-bold"}>
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </Heading>
        {description && <p className="max-w-md text-lg leading-[1.7] text-ink-muted">{description}</p>}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {actions.map((action, i) => (
            <ButtonLink
              key={action.label}
              href={action.href}
              variant={i === 0 ? "primary" : "outline"}
              shape="pill"
              size="lg"
              className={i === 0 ? "" : "border-ink"}
            >
              {action.label} {i === 0 && <ChevronRight className="size-4" />}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export type PageTitleProps = {
  title: string;
  /** 아직 열지 않은 서비스 표시 (예: "준비 중") */
  status?: string;
  description?: string;
  breadcrumb: string[];
  media: MediaData;
};

// 참고: 케빈랩 4ST ZIP·여의시스템 서브 상단 — 배경 사진 위 큰 제목과 한 줄 설명
export function PageTitle({ title, status, description, breadcrumb, media }: PageTitleProps) {
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
                <Link href={i === 0 ? "/ko" : "#"} className="hover:text-white">
                  {crumb}
                </Link>
              )}
            </li>
          ))}
        </ol>
        <h1 className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[clamp(2.25rem,1.6rem+2.8vw,4rem)] leading-tight font-bold tracking-[-0.02em]">
          {title}
          {status && <span className="rounded-full border border-white/60 px-3 py-1 text-sm font-semibold tracking-normal">{status}</span>}
        </h1>
        {description && <p className="mt-4 text-lg text-white/75">{description}</p>}
      </div>
    </section>
  );
}
