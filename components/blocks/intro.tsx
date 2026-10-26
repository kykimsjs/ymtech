import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

export type IntroSplitProps = { title: string[]; description: string; tone?: "light" | "dark"; id?: string };

// 참고: 아이오크롭스 "대표 솔루션" — 왼쪽 큰 제목, 오른쪽 위에 붙은 짧은 설명. 바로 아래 그리드 블록이 이어진다.
export function IntroSplit({ title, description, tone = "light", id }: IntroSplitProps) {
  const dark = tone === "dark";
  return (
    <section id={id} className={cn("pt-20 pb-12 lg:pt-28 lg:pb-14", dark ? "bg-graphite-900 text-white" : "bg-canvas")}>
      <div className="container-page grid gap-6 lg:grid-cols-2 lg:gap-16">
        <h2 className="text-display font-bold">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className={cn("max-w-[34em] text-[0.9375rem] leading-[1.75] lg:pt-2", dark ? "text-white/70" : "text-ink-muted")}>
          {description}
        </p>
      </div>
    </section>
  );
}

export type StatementProps = { eyebrow: string; title: string; paragraphs: string[]; id?: string };

// 참고: 케빈랩 4ST ZIP "기후변화의 해결책" — 제목 두 줄, 짧은 문단, 브랜드 심볼로 결론 문단을 표시
export function Statement({ eyebrow, title, paragraphs, id }: StatementProps) {
  const [lead, ...rest] = paragraphs;
  return (
    <section id={id} className="block-y bg-canvas">
      <div className="container-page">
        <div className="max-w-[50rem]">
        <p className="text-display font-bold text-ink-muted">{eyebrow}</p>
        <h2 className="text-display font-bold">{title}</h2>
        <p className="mt-8 text-lg leading-[1.75] whitespace-pre-line text-ink-muted">{lead}</p>
        {rest.map((paragraph) => (
          <div key={paragraph} className="mt-6 flex flex-col gap-3">
            <Logo type="symbol" className="w-7" />
            <p className="text-lg leading-[1.75] font-semibold text-ink">{paragraph}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
