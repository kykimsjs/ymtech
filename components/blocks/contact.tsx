import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Pending } from "@/components/ui/pending";
import { cn } from "@/lib/cn";
import { ContactForm, type ContactFormProps } from "./contact-form";

// 문의 페이지 블록 (2026-10-27). 기획안 7장 Contact: 도입·실증 문의 폼, 오시는 길(지도)

type Contact = { label: string; value: string; href: string; icon: "phone" | "mail" };
const icons = { phone: Phone, mail: Mail };

export type ContactSectionProps = {
  /** split: 왼쪽 안내·연락처 + 오른쪽 폼, stacked: 위에 연락처 띠 + 아래 넓은 폼 */
  variant: "split" | "stacked";
  title: string;
  description: string;
  contacts: Contact[];
  form: ContactFormProps;
  id?: string;
};

function ContactList({ contacts, row }: { contacts: Contact[]; row?: boolean }) {
  return (
    <ul className={cn("grid gap-5", row && "sm:grid-cols-2 sm:gap-10")}>
      {contacts.map((contact) => {
        const Icon = icons[contact.icon];
        return (
          <li key={contact.label}>
            <p className="flex items-center gap-2 text-sm text-ink-subtle">
              <Icon className="size-4" /> {contact.label}
            </p>
            <a href={contact.href} className="mt-1 block text-xl font-bold tabular-nums hover:text-brand-600">
              {contact.value}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function ContactSection({ variant, title, description, contacts, form, id }: ContactSectionProps) {
  if (variant === "stacked") {
    return (
      <section id={id} className="block-y scroll-mt-32 bg-canvas">
        <div className="container-page">
          <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-display font-bold">{title}</h2>
              <p className="mt-5 text-lg leading-[1.75] text-ink-muted">{description}</p>
            </div>
            <div className="lg:col-span-6 lg:self-end">
              <ContactList contacts={contacts} row />
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <ContactForm {...form} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-display font-bold">{title}</h2>
          <p className="mt-5 text-lg leading-[1.75] text-ink-muted">{description}</p>
          <div className="mt-10 border-t border-line pt-8">
            <ContactList contacts={contacts} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <ContactForm {...form} />
        </div>
      </div>
    </section>
  );
}

export type ContactLocationProps = {
  title: string;
  address: string;
  /** 지도 앱으로 여는 링크 (주소 검색) */
  mapLinks: { label: string; href: string }[];
  /** 페이지 안에 넣는 지도 (iframe 주소) */
  embed?: { src: string; title: string };
  /** 지도 퍼가기를 정하기 전 자리 표시 (시안에서만) */
  pending?: string;
  id?: string;
};

// 지도는 키 없이 넣을 수 있는 구글 지도 퍼가기(iframe), 옆에 네이버 지도·카카오맵 앱 링크
export function ContactLocation({ title, address, mapLinks, embed, pending, id }: ContactLocationProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-display font-bold">{title}</h2>
          <p className="mt-6 flex gap-2 text-lg leading-[1.7]">
            <MapPin className="mt-1.5 size-5 shrink-0 text-brand-600" />
            {address}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {mapLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-control border border-line-strong bg-canvas px-4 py-2.5 text-sm font-semibold hover:border-ink"
                >
                  {link.label} <ExternalLink className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {embed ? (
          <div className="lg:col-span-8">
            {/* 스크롤해서 내려왔을 때만 불러온다 */}
            <iframe
              src={embed.src}
              title={embed.title}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-card border border-line bg-canvas sm:aspect-[16/9]"
            />
          </div>
        ) : (
          pending && (
            <div className="lg:col-span-8">
              <Pending text={pending} className="aspect-[16/9] bg-canvas" />
            </div>
          )
        )}
      </div>
    </section>
  );
}
