"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { sendInquiry, type InquiryState } from "@/lib/inquiry";
import { useLocale } from "@/lib/locale-context";

export type ContactFormProps = {
  topics: string[];
  /** 개인정보 수집·이용 안내 (개인정보 보호법 제15조: 항목·목적·보유 기간) */
  privacy: { items: string; purpose: string; retention: string };
};

const field = "w-full rounded-control border border-line-strong bg-canvas px-4 py-3 text-[0.9375rem] focus:border-brand-500 focus:outline-2 focus:outline-brand-200";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
      {children}
      {required && <span className="ml-1 text-danger" aria-hidden>*</span>}
    </label>
  );
}

// 도입·실증 문의 폼 (기획안 7장 Contact). 보내기는 서버에서 Resend로 (lib/inquiry.ts)
export function ContactForm({ topics, privacy }: ContactFormProps) {
  const [state, action, pending] = useActionState<InquiryState, FormData>(sendInquiry, { status: "idle" });
  const locale = useLocale();
  const t = ui[locale].form;

  if (state.status === "ok") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-8">
        <CheckCircle2 className="size-8 text-success-ink" />
        <p className="text-subtitle font-bold">{state.message}</p>
      </div>
    );
  }

  const v = state.fields ?? {};
  return (
    <form action={action} className="grid gap-6">
      {/* 서버가 안내 문구를 같은 언어로 돌려주도록 */}
      <input type="hidden" name="locale" value={locale} />
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">{t.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, i) => (
            <label key={topic} className="cursor-pointer">
              <input type="radio" name="topic" value={topic} defaultChecked={v.topic ? v.topic === topic : i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink-muted peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:outline-2 peer-focus-visible:outline-brand-400">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>
            {t.name}
          </Label>
          <input id="name" name="name" required autoComplete="name" defaultValue={v.name} className={field} />
        </div>
        <div>
          <Label htmlFor="org">{t.org}</Label>
          <input id="org" name="org" autoComplete="organization" defaultValue={v.org} className={field} />
        </div>
        <div>
          <Label htmlFor="phone" required>
            {t.phone}
          </Label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" defaultValue={v.phone} className={field} />
        </div>
        <div>
          <Label htmlFor="email" required>
            {t.email}
          </Label>
          <input id="email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={field} />
        </div>
      </div>

      <div>
        <Label htmlFor="place">{t.place}</Label>
        <input id="place" name="place" placeholder={t.placePlaceholder} defaultValue={v.place} className={field} />
      </div>

      <div>
        <Label htmlFor="message" required>
          {t.message}
        </Label>
        <textarea id="message" name="message" required rows={6} defaultValue={v.message} className={cn(field, "resize-y")} />
      </div>

      {/* 스팸 봇 거르기: 사람에게는 보이지 않는 칸 */}
      <div aria-hidden className="hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rounded-control bg-surface p-5 text-sm leading-relaxed text-ink-muted">
        <p className="font-semibold text-ink">{t.privacy}</p>
        <dl className="mt-2 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1">
          <dt>{t.privacyItems}</dt>
          <dd>{privacy.items}</dd>
          <dt>{t.privacyPurpose}</dt>
          <dd>{privacy.purpose}</dd>
          <dt>{t.privacyRetention}</dt>
          <dd>{privacy.retention}</dd>
        </dl>
        <label className="mt-4 flex cursor-pointer items-center gap-2 font-semibold text-ink">
          <input type="checkbox" name="agree" required className="size-4 accent-brand-500" />
          {t.agree}
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-[0.9375rem] font-semibold text-danger">
          {state.message}
        </p>
      )}

      <div>
        <Button type="submit" variant="dark" size="lg" disabled={pending} className="min-w-40">
          {pending ? t.sending : t.submit}
        </Button>
      </div>
    </form>
  );
}
