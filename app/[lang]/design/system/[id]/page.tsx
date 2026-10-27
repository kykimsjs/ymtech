import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { architectureDrafts, ecoVitalBlocks } from "@/content/pages/eco-vital";
import { platformBlocks } from "@/content/pages/platform";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "시스템 구성도 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return architectureDrafts.map((draft) => ({ id: draft.id }));
}

// 운영 페이지에 새 구성도만 바꿔 끼워 본다. 바로 구성도로 가려면 #system
export default function ArchitectureDraftPage({ params }: PageProps<"/[lang]/design/system/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <ArchitectureDraft params={params} />
      </Suspense>
      <DraftSwitcher items={architectureDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="system" />
    </>
  );
}

async function ArchitectureDraft({ params }: { params: PageProps<"/[lang]/design/system/[id]">["params"] }) {
  const { id } = await params;
  if (!architectureDrafts.some((d) => d.id === id)) notFound();
  const blocks = id === "software" ? platformBlocks("b", "ko", { newArchitecture: true }) : ecoVitalBlocks("a", { live: true, newArchitecture: true });

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={blocks} />
    </div>
  );
}
