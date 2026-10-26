import { Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { homeBlocks } from "@/content/pages/home";
import { getTheme, themes } from "@/content/themes";
import { DraftSwitcher } from "../draft-switcher";

export const metadata: Metadata = {
  title: "HOME 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return themes.map((theme) => ({ id: theme.id }));
}

type Params = PageProps<"/[lang]/design/drafts/[id]">["params"];

// params는 시안마다 다른 URL 데이터라 App Shell 밖(Suspense 안)에서 읽는다.
// 전환 바는 URL과 무관하므로 Shell에 둔다.
export default function DraftPage({ params }: PageProps<"/[lang]/design/drafts/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <ThemedHome params={params} />
      </Suspense>
      <DraftSwitcher items={themes.map(({ id, key, name }) => ({ id, key, name }))} />
    </>
  );
}

// 같은 HOME 블록 목록에 시안별 색 토큰만 바꿔 입힌다.
async function ThemedHome({ params }: { params: Params }) {
  const { id } = await params;
  const theme = getTheme(id);
  if (!theme) notFound();

  return (
    <div style={theme.vars as CSSProperties} className="bg-canvas text-ink">
      <Blocks items={homeBlocks({ headerTone: theme.headerTone })} />
    </div>
  );
}
