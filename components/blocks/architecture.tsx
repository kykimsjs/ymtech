import {
  ArrowDown,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpDown,
  Box,
  Cloud,
  CloudRain,
  Cpu,
  Droplets,
  Flame,
  LayoutDashboard,
  Thermometer,
  Vibrate,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/cn";

// 시스템 구성도 (2026-10-27). 근거: docs/시스템구성도.png (제품소개 2장 와이어프레임의 System Architecture 두 그림)
// 원본은 AI 생성 그림이라 글자가 깨져 있어 이미지는 쓰지 않고, 그림의 배치·순서를 그대로 따라 사이트 토큰으로 다시 그린다.
//   하드웨어(에코-비탈 페이지) = 아래 자세한 그림, 소프트웨어(웹 플랫폼 페이지) = 위 간단한 그림

const icons = {
  thermometer: Thermometer,
  droplets: Droplets,
  rain: CloudRain,
  flame: Flame,
  vibrate: Vibrate,
  box: Box,
  cpu: Cpu,
};
type IconKey = keyof typeof icons;

function Node({ title, text, icon, className }: { title: string; text?: string; icon?: IconKey; className?: string }) {
  const Icon = icon ? icons[icon] : null;
  return (
    <div className={cn("rounded-control border border-line-strong bg-canvas px-3.5 py-3", className)}>
      <p className="flex items-center gap-2 text-[0.9375rem] font-bold">
        {Icon && <Icon aria-hidden className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} />}
        {title}
      </p>
      {text && <p className="mt-0.5 text-sm leading-snug text-ink-muted">{text}</p>}
    </div>
  );
}

function SensorList({ label, items }: { label: string; items: { title: string; icon: IconKey }[] }) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-semibold text-ink-subtle">{label}</p>
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {items.map((item) => (
          <li key={item.title}>
            <Node title={item.title} icon={item.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 단계 사이 연결. 좁은 화면은 위아래, 넓은 화면은 좌우 */
function Link({ label, dir = "right" }: { label?: string; dir?: "right" | "left" | "both" }) {
  const Wide = dir === "left" ? ArrowLeft : dir === "both" ? ArrowLeftRight : ArrowRight;
  return (
    <div aria-hidden className="flex flex-col items-center justify-center gap-1 py-2 text-ink-subtle lg:px-1 lg:py-0">
      {label && <span className="text-center text-xs font-semibold text-brand-600">{label}</span>}
      {dir === "both" ? <ArrowUpDown className="size-5 lg:hidden" /> : <ArrowDown className={cn("size-5 lg:hidden", dir === "left" && "rotate-180")} />}
      <Wide className="hidden size-5 lg:block" />
    </div>
  );
}

function Section({ id, title, description, children }: { id?: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}
        {children}
      </div>
    </section>
  );
}

// ── 하드웨어 (아래 그림) ────────────────────────────────────
//   웹 플랫폼 ⇄ [ Main MCCB ↓ SSR 차단·Sub MCCB ⇄RS-232⇄ 센서 보드 ⇅ SBC 보드(Wi-Fi → 클라우드) ] ← LAN·Wi-Fi ← 센서 4종

export type HardwareArchitectureProps = {
  title: string;
  description?: string;
  platform: { title: string; text: string; status?: string };
  module: {
    label: string;
    main: { title: string; text?: string };
    sub: { title: string; text?: string };
    sensorBoard: { title: string; text?: string };
    sbc: { title: string; text?: string };
    link: string;
    cloud: string;
  };
  sensorLink: string;
  sensors: { label: string; items: { title: string; icon: IconKey }[] };
  id?: string;
};

export function HardwareArchitecture({ title, description, platform, module, sensorLink, sensors, id }: HardwareArchitectureProps) {
  return (
    <Section id={id} title={title} description={description}>
      <figure className="mt-12 flex flex-col lg:grid lg:grid-cols-[12rem_3rem_1fr_7rem_11rem] lg:items-center">
        {/* 웹 플랫폼 */}
        <div className="rounded-card border border-line-strong bg-surface p-4">
          <LayoutDashboard aria-hidden className="size-6 text-brand-600" strokeWidth={1.5} />
          <p className="mt-3 flex flex-wrap items-center gap-2 font-bold">
            {platform.title}
            {platform.status && <span className="rounded-full border border-line-strong px-2 py-0.5 text-xs font-semibold text-ink-muted">{platform.status}</span>}
          </p>
          <p className="mt-1 text-sm leading-snug text-ink-muted">{platform.text}</p>
        </div>

        {/* 그림처럼 위는 플랫폼 → 모듈, 아래는 모듈 → 플랫폼 */}
        <div aria-hidden className="flex items-center justify-center gap-6 py-2 text-ink-subtle lg:flex-col lg:gap-16 lg:py-0">
          <ArrowRight className="size-5 rotate-90 lg:rotate-0" />
          <ArrowLeft className="size-5 rotate-90 lg:rotate-0" />
        </div>

        {/* 모듈 (가운데 큰 상자) */}
        <div className="relative rounded-[1.25rem] border-2 border-brand-500 p-4 pt-10 sm:p-6 sm:pt-10">
          <p className="absolute top-3.5 left-4 text-sm font-bold text-brand-600 sm:left-6">{module.label}</p>
          {/* 클라우드: 그림처럼 상자 오른쪽 위 바깥 */}
          <p className="absolute -top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-canvas px-3 py-1 text-xs font-semibold sm:right-6">
            <Cloud aria-hidden className="size-4 text-brand-600" />
            {module.cloud}
          </p>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-1 sm:gap-x-3">
            <Node title={module.main.title} text={module.main.text} className="bg-surface" />
            <span />
            <div className="relative">
              <Node title={module.sbc.title} text={module.sbc.text} className="bg-brand-50" />
              <Wifi aria-hidden className="absolute -top-2 -right-2 size-5 rounded-full bg-canvas p-0.5 text-brand-600" />
            </div>

            <ArrowDown aria-hidden className="mx-auto size-5 text-ink-subtle" />
            <span />
            <ArrowUpDown aria-hidden className="mx-auto size-5 text-ink-subtle" />

            <Node title={module.sub.title} text={module.sub.text} className="bg-surface" />
            <div aria-hidden className="flex flex-col items-center text-[0.6875rem] font-semibold text-brand-600 sm:text-xs">
              {module.link}
              <ArrowLeftRight className="size-4 text-ink-subtle" />
            </div>
            <Node title={module.sensorBoard.title} text={module.sensorBoard.text} className="bg-brand-50" />
          </div>
        </div>

        <Link label={sensorLink} dir="left" />

        <SensorList label={sensors.label} items={sensors.items} />
      </figure>
    </Section>
  );
}

// ── 소프트웨어 (위 그림) ────────────────────────────────────
//   하드웨어·모듈형 센서 ×2 → SBC → RS-232 → 웹 플랫폼 | 센서 → 센서 5종

export type SoftwareArchitectureProps = {
  title: string;
  description?: string;
  inputs: { title: string; icon: IconKey }[];
  sbc: { title: string; text: string };
  link: string;
  platform: { title: string; sub: string; status?: string };
  sensors: { label: string; items: { title: string; icon: IconKey }[] };
  id?: string;
};

export function SoftwareArchitecture({ title, description, inputs, sbc, link, platform, sensors, id }: SoftwareArchitectureProps) {
  return (
    <Section id={id} title={title} description={description}>
      <figure className="mt-12 flex flex-col lg:grid lg:grid-cols-[11rem_2.5rem_1fr_6rem_12rem_2.5rem_11rem] lg:items-center">
        <ul className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-4">
          {inputs.map((input, i) => (
            <li key={`${input.title}-${i}`}>
              <Node title={input.title} icon={input.icon} className="h-full" />
            </li>
          ))}
        </ul>

        <Link />

        {/* SBC: 그림처럼 가운데 큰 상자 */}
        <div className="flex min-h-40 flex-col items-center justify-center rounded-[1.25rem] border-2 border-brand-500 bg-brand-50 p-6 text-center lg:min-h-72">
          <p className="text-[2rem] leading-none font-bold">{sbc.title}</p>
          <p className="mt-2 text-sm text-ink-muted">{sbc.text}</p>
        </div>

        <Link label={link} />

        {/* 웹 플랫폼 | 센서 (그림의 두 칸짜리 상자) */}
        <div className="overflow-hidden rounded-card border border-line-strong bg-canvas text-center">
          <p className="flex flex-wrap items-center justify-center gap-2 px-4 py-4 font-bold">
            {platform.title}
            {platform.status && <span className="rounded-full border border-line-strong px-2 py-0.5 text-xs font-semibold text-ink-muted">{platform.status}</span>}
          </p>
          <p className="border-t border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink-muted">{platform.sub}</p>
        </div>

        <Link />

        <SensorList label={sensors.label} items={sensors.items} />
      </figure>
    </Section>
  );
}
