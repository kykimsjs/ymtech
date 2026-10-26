import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { getDictionary, getLocale } from "@/content/dictionaries";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Colors } from "./_sections/colors";
import { Components } from "./_sections/components";
import { Patterns } from "./_sections/patterns";
import { Typography } from "./_sections/typography";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const sections = [
  { id: "color", label: "Color", title: "Color", note: "CI 매뉴얼 BS 19 색상규정 기준. 서브 컬러는 제품 상태(정상·주의·경보)에 매핑합니다." },
  { id: "type", label: "Type", title: "Typography", note: "웹은 제목·본문 모두 Pretendard. 크기는 레퍼런스 실측값(섹션 제목 34~48px, 본문 15~18px)에 맞췄습니다. CI 지정서체 Leferi는 인쇄물과 특별한 강조에만 씁니다." },
  { id: "components", label: "Components", title: "Components", note: "로고, 버튼, 상태 배지, 인증 칩, 섹션 헤딩." },
  { id: "patterns", label: "Pattern", title: "Pattern & Line", note: "CI 전용 패턴·보더라인을 웹에 맞게 단순화한 모티프." },
] as const;

export default async function DesignPage() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  const content = {
    color: <Colors />,
    type: <Typography dict={dict} />,
    components: <Components dict={dict} />,
    patterns: <Patterns />,
  };

  return (
    <div className="bg-surface">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="container-page flex h-16 items-center gap-3 md:gap-6">
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
            <Logo type="symbol" className="w-7" />
            <span className="font-bold whitespace-nowrap">Design System</span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 max-sm:hidden">v0.2</span>
          </Link>
          <nav className="ml-auto hidden gap-1 text-sm font-medium text-ink-muted md:flex">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="rounded-full px-3 py-1.5 hover:bg-surface hover:text-ink">
                {section.label}
              </a>
            ))}
          </nav>
          <span className="max-lg:hidden">
            <ButtonLink href={`/${locale}/design/home`} variant="outline" size="sm">
              HOME 시안
            </ButtonLink>
          </span>
          <ButtonLink href={`/${locale}/design/blocks`} variant="dark" size="sm" className="ml-auto md:ml-0">
            블록 카탈로그 <ArrowRight className="size-3.5" />
          </ButtonLink>
          <div className="flex shrink-0 rounded-full border border-line p-0.5 text-xs font-semibold">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}/design`}
                className={cn(
                  "rounded-full px-3 py-1 uppercase",
                  item === locale ? "bg-ink text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="container-page flex flex-col gap-24 py-16">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="flex scroll-mt-24 flex-col gap-8">
            <div className="flex flex-col gap-2 border-t border-line-strong pt-6">
              <p className="text-sm font-semibold text-ink-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-title font-bold">{section.title}</h2>
              <p className="text-ink-muted">{section.note}</p>
            </div>
            {content[section.id]}
          </section>
        ))}
      </main>
    </div>
  );
}
