import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { icons, type IconName } from "./icons";
import { Media, type MediaData } from "./media";

type Action = { label: string; href: string };

export type ConsultCardProps = {
  title: string[];
  text: string;
  action: Action;
  media: [MediaData, MediaData];
  id?: string;
};

// 참고: 아이오크롭스 상담 유도 카드 — 어두운 바탕 위 사진 두 장을 붙인 카드, 왼쪽에 문구, 오른쪽 아래 흰 버튼
export function ConsultCard({ title, text, action, media, id }: ConsultCardProps) {
  return (
    <section id={id} className="bg-graphite-900 py-16 lg:py-20">
      <div className="container-page">
        <div className="relative isolate grid overflow-hidden rounded-card text-white md:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-[18rem] p-8 md:p-10">
            <Media media={media[0]} tone="dark" sizes="60vw" fill className="-z-20" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-black/75 to-black/30" />
            <h2 className="text-title font-semibold">
              {title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-[1.75] text-white/75">{text}</p>
          </div>
          <div className="relative flex min-h-[14rem] items-end p-8 md:p-10">
            <Media media={media[1]} tone="dark" sizes="40vw" fill className="-z-20" />
            <ButtonLink href={action.href} variant="inverse">
              {action.label} <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export type CtaBannerProps = { title: string; text: string; action: Action; media: MediaData; id?: string };

// 참고: 케빈랩 "서비스 바로가기" 띠 — 배경 사진 위 가운데 정렬, 흰 테두리 알약형 버튼
export function CtaBanner({ title, text, action, media, id }: CtaBannerProps) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-brand-800 text-white">
      <Media media={media} tone="dark" fill className="-z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-brand-900/75" />
      <div className="container-page flex flex-col items-center py-24 text-center lg:py-32">
        <h2 className="text-display font-bold">{title}</h2>
        <p className="mt-4 text-lg text-white/80">{text}</p>
        <ButtonLink href={action.href} variant="inverse-outline" shape="pill" className="mt-10">
          {action.label} <ChevronRight className="size-4" />
        </ButtonLink>
      </div>
    </section>
  );
}

export type ContactMapProps = {
  title: string;
  offices: { name: string; address: string }[];
  phone: string;
  fax?: string;
  email: string;
  map: MediaData;
  id?: string;
};

// 참고: 지노시스 CONTACT — 컨테이너 폭 지도, 위에 주소 카드, 아래 오른쪽 "지도 보기" 버튼
export function ContactMap({ title, offices, phone, fax, email, map, id }: ContactMapProps) {
  return (
    <section id={id} className="block-y scroll-mt-14 bg-surface">
      <div className="container-page">
        <h2 className="text-display font-extrabold tracking-[-0.02em] text-brand-700 uppercase">{title}</h2>
        <div className="relative mt-12">
          <Media media={map} className="aspect-[4/3] md:aspect-[21/9]" />
          <div className="bg-canvas p-6 shadow-card md:absolute md:top-6 md:left-6 md:w-96">
            <ul className="flex flex-col gap-4 text-sm leading-6">
              {offices.map((office) => (
                <li key={office.name} className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  <span>
                    <b className="font-semibold">{office.name}</b>
                    <br />
                    <span className="text-ink-muted">{office.address}</span>
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span className="text-ink-muted">{phone}</span>
              </li>
              {fax && (
                <li className="flex gap-3">
                  <Printer className="mt-0.5 size-4 shrink-0 text-brand-500" />
                  <span className="text-ink-muted">{fax}</span>
                </li>
              )}
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span className="text-ink-muted">{email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <ButtonLink href="#" variant="outline" shape="square" className="bg-canvas">
            <MapPin className="size-4" /> 지도 앱에서 보기
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export type ClosingCtaProps = {
  title: string;
  text: string;
  /** 대표 연락처: 바로 걸고 보낼 수 있게 링크로 건다 */
  contacts: { label: string; value: string; href: string }[];
  /** 기획안 HOME Quick Actions. status가 있으면 아직 열지 않은 항목 */
  actions: { icon: IconName; label: string; text: string; href: string; status?: string }[];
  media: MediaData;
  id?: string;
};

// 페이지 끝 문의 섹션. 사진 위 왼쪽에 제목·연락처, 오른쪽에 Quick Actions를 줄 목록으로 둔다.
// 참고: 케빈랩 "서비스 바로가기" 띠(배경 사진 + 행동 유도), 아이오크롭스 상담 카드(어두운 사진 위 왼쪽 문구)
export function ClosingCta({ title, text, contacts, actions, media, id }: ClosingCtaProps) {
  return (
    <section id={id} className="relative isolate scroll-mt-14 overflow-hidden bg-graphite-900 text-white">
      <Media media={media} tone="dark" sizes="100vw" fill className="-z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-graphite-900/90 via-graphite-900/80 to-graphite-900/60" />
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-5">
          <h2 className="text-display font-bold text-balance">{title}</h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-white/80">{text}</p>
          <dl className="mt-10 flex flex-col gap-3">
            {contacts.map((contact) => (
              <div key={contact.label} className="flex items-baseline gap-4">
                <dt className="w-16 shrink-0 text-sm text-white/70">{contact.label}</dt>
                <dd>
                  <a href={contact.href} className="text-xl font-semibold tabular-nums underline-offset-4 hover:underline">
                    {contact.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="border-t border-white/30 lg:col-span-6 lg:col-start-7">
          {actions.map((action) => {
            const Icon = icons[action.icon];
            const body = (
              <>
                <Icon className="mt-0.5 size-6 shrink-0" strokeWidth={1.5} />
                <span className="flex-1">
                  <span className="block text-lg font-bold">{action.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-white/75">{action.text}</span>
                </span>
              </>
            );
            return (
              <li key={action.label} className="border-b border-white/30">
                {action.status ? (
                  <div className="flex items-start gap-5 py-6 text-white/70">
                    {body}
                    <span className="shrink-0 rounded-full border border-white/40 px-2.5 py-0.5 text-xs font-semibold">{action.status}</span>
                  </div>
                ) : (
                  <Link href={action.href} className="group flex items-start gap-5 py-6">
                    {body}
                    <ArrowRight className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
