import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { technologyBlocks, technologyDrafts } from "@/content/pages/technology";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "기술·인증 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return technologyDrafts.map((draft) => ({ id: draft.id }));
}

// params는 시안마다 다른 URL 데이터라 Suspense 안에서 읽는다. 전환 바는 Shell에 둔다.
export default function TechnologyDraftPage({ params }: PageProps<"/[lang]/design/technology/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <TechnologyDraft params={params} />
      </Suspense>
      <DraftSwitcher items={technologyDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="technology" />
    </>
  );
}

async function TechnologyDraft({ params }: { params: PageProps<"/[lang]/design/technology/[id]">["params"] }) {
  const { id } = await params;
  const draft = technologyDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={technologyBlocks(draft.id)} />
    </div>
  );
}
