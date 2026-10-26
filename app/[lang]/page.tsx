import { Blocks } from "@/components/blocks/registry";
import { Logo } from "@/components/ui/logo";
import { getLocale } from "@/content/dictionaries";
import { homeBlocks } from "@/content/pages/home";

export default async function Home() {
  const locale = await getLocale();

  // 영문 원고가 준비되기 전까지 /en은 안내만 둔다
  if (locale !== "ko") {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
        <Logo type="vertical" className="w-48" preload />
        <p className="text-ink-muted">Our English website is coming soon.</p>
      </main>
    );
  }

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={homeBlocks()} />
    </div>
  );
}
