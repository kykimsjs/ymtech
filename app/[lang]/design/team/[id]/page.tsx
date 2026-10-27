import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { teamDraftBlocks, teamDrafts } from "@/content/pages/company";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "팀·파트너 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return teamDrafts.map((draft) => ({ id: draft.id }));
}

// 회사소개 운영 페이지에 팀·파트너 섹션만 시안별로 바꿔 끼운다. 바로 팀 섹션으로 가려면 #team
export default function TeamDraftPage({ params }: PageProps<"/[lang]/design/team/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <TeamDraft params={params} />
      </Suspense>
      <DraftSwitcher items={teamDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="team" />
    </>
  );
}

async function TeamDraft({ params }: { params: PageProps<"/[lang]/design/team/[id]">["params"] }) {
  const { id } = await params;
  const draft = teamDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={teamDraftBlocks(draft.id)} />
    </div>
  );
}
