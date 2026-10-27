import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

// 기술·인증 페이지 블록 (2026-10-27). 근거: 기획안 6장 R&D & Tech (기존 제품 비교, 핵심 수치)

export type TechCompareProps = {
  title: string;
  description?: string;
  /** 기존 제품: 기획안에 적힌 한계만 쓴다 */
  before: { label: string; title: string; text: string };
  /** 와이엠이노테크: 한 모듈에 묶은 항목 */
  after: { label: string; title: string; items: { title: string; text: string }[] };
  id?: string;
};

// 비교는 두 칸이면 충분하다. 기존 제품 칸은 옅게, 우리 칸은 테두리로 강조 (강조색 하나)
export function TechCompare({ title, description, before, after, id }: TechCompareProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col rounded-card bg-surface p-8 lg:col-span-4">
            <p className="text-sm font-semibold text-ink-subtle">{before.label}</p>
            <h3 className="mt-3 text-subtitle font-bold text-ink-muted">{before.title}</h3>
            <p className="mt-3 leading-[1.75] text-ink-muted">{before.text}</p>
          </div>
          <div className="rounded-card border-2 border-brand-500 p-8 lg:col-span-8">
            <p className="text-sm font-semibold text-brand-600">{after.label}</p>
            <h3 className="mt-3 text-subtitle font-bold">{after.title}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {after.items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check className={cn("mt-1 size-4 shrink-0 text-brand-600")} strokeWidth={2.5} />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
