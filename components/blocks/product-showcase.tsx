import Image from "next/image";
import { BreakText } from "@/components/ui/break-text";
import { ActionButton } from "@/components/ui/button";
import { Media, type MediaData } from "./media";

/** status: 아직 열지 않은 항목 (예: "준비 중"). 비활성 버튼으로 보인다 */
type Action = { label: string; href: string; status?: string };

export type ProductShowcaseProps = {
  /** 제품 브랜드(BI) 시그니처. 어두운 바탕이므로 흰색 판을 쓴다 */
  brand?: { src: string; alt: string; width: number; height: number };
  label: string;
  title: string[];
  name: string;
  /** 줄바꿈 문자는 데스크톱에서만 줄을 나눈다 (BreakText) */
  description?: string;
  media: MediaData;
  actions?: Action[];
  /** 주요 특징. text의 줄바꿈(\n)은 그대로 살린다 */
  features: { title: string; text: string }[];
  id?: string;
};

// 주력 제품(에코-비탈 모듈) 소개. 어두운 바탕에 제품 사진을 크게, 옆에 소개 문구, 아래 특징 줄.
// 참고: 케빈랩 4ST ZIP 제품 소개(왼쪽 큰 제품 사진, 오른쪽 제품명·설명), 아이오크롭스 대표 솔루션(어두운 바탕)
export function ProductShowcase({ brand, label, title, name, description, media, actions = [], features, id }: ProductShowcaseProps) {
  return (
    <section id={id} className="block-y scroll-mt-14 bg-graphite-900 text-white">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Media
            media={media}
            tone="dark"
            sizes="(min-width: 1024px) 640px, 100vw"
            className="aspect-[4/3] rounded-card lg:col-span-6"
          />
          <div className="lg:col-span-6 lg:col-start-7 lg:pl-4">
            {brand && <Image src={brand.src} alt={brand.alt} width={brand.width} height={brand.height} sizes="200px" className="mb-8 h-12 w-auto lg:h-14" />}
            <p className="text-eyebrow font-semibold text-eco-300">{label}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.25rem)] leading-[1.3] font-bold tracking-[-0.02em]">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 text-lg font-semibold">{name}</p>
            {description && (
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-white/75">
                <BreakText text={description} />
              </p>
            )}
            {actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {actions.map((action, i) => (
                  <ActionButton key={action.label} href={action.href} status={action.status} variant={i === 0 ? "inverse" : "inverse-outline"}>
                    {action.label}
                  </ActionButton>
                ))}
              </div>
            )}
          </div>
        </div>

        <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map((feature, i) => (
            <li key={feature.title} className="border-t border-white/25 py-6">
              <p className="text-sm font-semibold text-eco-300 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-subtitle font-bold">{feature.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] whitespace-pre-line text-white/75">{feature.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
