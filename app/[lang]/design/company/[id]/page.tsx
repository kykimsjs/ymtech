import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { companyBlocks, companyDrafts } from "@/content/pages/company";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "회사소개 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return companyDrafts.map((draft) => ({ id: draft.id }));
}

// params는 시안마다 다른 URL 데이터라 Suspense 안에서 읽는다. 전환 바는 Shell에 둔다.
export default function CompanyDraftPage({ params }: PageProps<"/[lang]/design/company/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <CompanyDraft params={params} />
      </Suspense>
      <DraftSwitcher items={companyDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="company" />
    </>
  );
}

async function CompanyDraft({ params }: { params: PageProps<"/[lang]/design/company/[id]">["params"] }) {
  const { id } = await params;
  const draft = companyDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={companyBlocks(draft.id)} />
    </div>
  );
}
