import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { platformBlocks, platformDrafts } from "@/content/pages/platform";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "통합 웹 플랫폼 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return platformDrafts.map((draft) => ({ id: draft.id }));
}

// params는 시안마다 다른 URL 데이터라 Suspense 안에서 읽는다. 전환 바는 Shell에 둔다.
export default function PlatformDraftPage({ params }: PageProps<"/[lang]/design/platform/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <PlatformDraft params={params} />
      </Suspense>
      <DraftSwitcher items={platformDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="platform" />
    </>
  );
}

async function PlatformDraft({ params }: { params: PageProps<"/[lang]/design/platform/[id]">["params"] }) {
  const { id } = await params;
  const draft = platformDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={platformBlocks(draft.id)} />
    </div>
  );
}
