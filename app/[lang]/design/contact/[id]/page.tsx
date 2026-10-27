import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks/registry";
import { contactBlocks, contactDrafts } from "@/content/pages/contact";
import { DraftSwitcher } from "../../drafts/draft-switcher";

export const metadata: Metadata = {
  title: "문의 시안",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return contactDrafts.map((draft) => ({ id: draft.id }));
}

// params는 시안마다 다른 URL 데이터라 Suspense 안에서 읽는다. 전환 바는 Shell에 둔다.
export default function ContactDraftPage({ params }: PageProps<"/[lang]/design/contact/[id]">) {
  return (
    <>
      <Suspense fallback={<div className="min-h-svh bg-surface" />}>
        <ContactDraft params={params} />
      </Suspense>
      <DraftSwitcher items={contactDrafts.map(({ id, key, name }) => ({ id, key, name }))} segment="contact" />
    </>
  );
}

async function ContactDraft({ params }: { params: PageProps<"/[lang]/design/contact/[id]">["params"] }) {
  const { id } = await params;
  const draft = contactDrafts.find((d) => d.id === id);
  if (!draft) notFound();

  return (
    <div data-site className="bg-canvas text-ink">
      <Blocks items={contactBlocks(draft.id)} />
    </div>
  );
}
