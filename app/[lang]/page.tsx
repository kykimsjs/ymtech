import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { getLocale } from "@/content/dictionaries";

// 실제 HOME은 디자인 시스템 확정 후 작업. 지금은 시안 페이지로 안내만 한다.
export default async function Home() {
  const locale = await getLocale();
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-5 py-24 text-center">
      <Logo type="vertical" className="w-56" preload />
      <p className="text-ink-muted">
        {locale === "ko" ? "홈페이지를 준비하고 있습니다." : "Our website is coming soon."}
      </p>
      <ButtonLink href={`/${locale}/design`} variant="outline">
        Design System <ArrowRight className="size-4" />
      </ButtonLink>
    </main>
  );
}
