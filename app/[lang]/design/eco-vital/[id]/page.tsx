import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { ecoVitalBlocks, ecoVitalDrafts } from "@/content/pages/eco-vital";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "에코-비탈 모듈 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return ecoVitalDrafts.map((draft) => ({ id: draft.id }));
}

// params는 시안마다 다른 URL 데이터라 Suspense 안에서 읽는다. 전환 바는 Shell에 둔다.
export default function EcoVitalDraftPage({ params }: PageProps<"/[lang]/design/eco-vital/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <EcoVitalDraft params={params} />
      </Suspense>
      <DraftSwitcher items={ecoVitalDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="eco-vital" />
    </>
  );
}

async function EcoVitalDraft({ params }: { params: PageProps<"/[lang]/design/eco-vital/[id]">["params"] }) {
  const { id } = await params;
  const draft = ecoVitalDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={ecoVitalBlocks(draft.id)} />
    </div>
  );
}
