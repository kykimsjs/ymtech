import { ArrowDown, ArrowLeftRight, ArrowRight, BellRing, CornerUpLeft, Database, Droplets, Flame, History, KeyRound, LayoutDashboard, Server, Thermometer, Users, Vibrate } from "lucide-react";
import { cn } from "@/lib/cn";

// 시스템 구성도 (2026-10-27). 근거: docs/시스템구성도.png(제품소개 2장 와이어프레임의 System Architecture 두 그림 중 아래 자세한 판)
//   분전반 안 Main/Sub MCCB → 에코-비탈 모듈(센서 보드 ⇄ RS-232 ⇄ SBC 보드) → Wi-Fi·LAN → 웹 플랫폼, 센서 4종(온습도·불꽃·침수·진동)
// 원본 그림은 AI 생성이라 글자가 깨져 있어 그대로 쓰지 않고, 사이트 토큰으로 다시 그린다.

const sensorIcons = { thermometer: Thermometer, flame: Flame, droplets: Droplets, vibrate: Vibrate };
const functionIcons = { dashboard: LayoutDashboard, alarm: BellRing, history: History, access: KeyRound };

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-control border border-line-strong bg-canvas px-3 py-2 text-sm font-semibold", className)}>{children}</span>;
}

/** 단계 사이 화살표. 좁은 화면은 아래로, 넓은 화면은 오른쪽으로 */
function Flow({ label }: { label?: string }) {
  return (
    <div aria-hidden className="flex flex-col items-center justify-center gap-1 py-2 text-ink-subtle lg:px-2 lg:py-0">
      {label && <span className="text-xs font-semibold whitespace-nowrap text-brand-600">{label}</span>}
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}

function ZoneLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-semibold text-ink-subtle">{children}</p>;
}

// ── 하드웨어: 분전반 안 구조 ────────────────────────────────

export type HardwareArchitectureProps = {
  title: string;
  description?: string;
  sensors: { label: string; items: { title: string; icon: keyof typeof sensorIcons }[] };
  panel: { label: string; breakers: string[]; metering: string };
  module: {
    label: string;
    sensorBoard: { title: string; text: string };
    sbc: { title: string; text: string };
    link: string;
    parts: string[];
  };
  cutoff: string;
  uplink: string;
  platform: { label: string; title: string; text: string; status?: string };
  id?: string;
};

export function HardwareArchitecture({ title, description, sensors, panel, module, cutoff, uplink, platform, id }: HardwareArchitectureProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}

        <figure className="mt-12 flex flex-col lg:grid lg:grid-cols-[11rem_auto_1fr_auto_13rem] lg:items-center">
          {/* 현장 센서 */}
          <div>
            <ZoneLabel>{sensors.label}</ZoneLabel>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {sensors.items.map((sensor) => {
                const Icon = sensorIcons[sensor.icon];
                return (
                  <li key={sensor.title}>
                    <Chip className="w-full">
                      <Icon aria-hidden className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} />
                      {sensor.title}
                    </Chip>
                  </li>
                );
              })}
            </ul>
          </div>

          <Flow />

          {/* 분전반 */}
          <div className="rounded-card border-2 border-dashed border-line-strong bg-surface p-5 sm:p-6">
            <ZoneLabel>{panel.label}</ZoneLabel>
            <div className="flex flex-wrap gap-2">
              {panel.breakers.map((breaker) => (
                <Chip key={breaker}>{breaker}</Chip>
              ))}
            </div>
            <p aria-hidden className="flex items-center gap-2 py-3 pl-4 text-xs font-semibold text-brand-600">
              <ArrowDown className="size-4 text-ink-subtle" />
              {panel.metering}
            </p>

            {/* 에코-비탈 모듈 */}
            <div className="rounded-card border-2 border-brand-500 bg-canvas p-4 sm:p-5">
              <p className="text-sm font-bold text-brand-600">{module.label}</p>
              <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <div className="flex-1 rounded-control bg-brand-50 px-4 py-3">
                  <p className="font-bold">{module.sensorBoard.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{module.sensorBoard.text}</p>
                </div>
                <div aria-hidden className="flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-600 sm:flex-col sm:gap-0.5">
                  <ArrowLeftRight className="size-4 rotate-90 text-ink-subtle sm:rotate-0" />
                  {module.link}
                </div>
                <div className="flex-1 rounded-control bg-brand-50 px-4 py-3">
                  <p className="font-bold">{module.sbc.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{module.sbc.text}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {module.parts.map((part) => (
                  <Chip key={part} className="py-1.5 text-xs">
                    {part}
                  </Chip>
                ))}
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <CornerUpLeft className="size-4 shrink-0 text-brand-600" />
              {cutoff}
            </p>
          </div>

          <Flow label={uplink} />

          {/* 관제 */}
          <div>
            <ZoneLabel>{platform.label}</ZoneLabel>
            <div className="rounded-card border border-line-strong bg-canvas p-5">
              <p className="flex flex-wrap items-center gap-2 font-bold">
                {platform.title}
                {platform.status && <span className="rounded-full border border-line-strong px-2 py-0.5 text-xs font-semibold text-ink-muted">{platform.status}</span>}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{platform.text}</p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}

// ── 소프트웨어: 데이터 흐름 ─────────────────────────────────

export type SoftwareArchitectureProps = {
  title: string;
  description?: string;
  source: { label: string; title: string; text: string };
  uplink: string;
  platform: {
    label: string;
    status?: string;
    functions: { title: string; icon: keyof typeof functionIcons }[];
    server: { title: string; text: string };
    storage: { title: string; text: string };
  };
  access: string;
  users: { label: string; title: string; text: string };
  id?: string;
};

export function SoftwareArchitecture({ title, description, source, uplink, platform, access, users, id }: SoftwareArchitectureProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-canvas">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        {description && <p className="mt-5 max-w-[42em] text-lg leading-[1.75] text-ink-muted">{description}</p>}

        <figure className="mt-12 flex flex-col lg:grid lg:grid-cols-[13rem_auto_1fr_auto_13rem] lg:items-center">
          {/* 현장 모듈 */}
          <div>
            <ZoneLabel>{source.label}</ZoneLabel>
            <div className="rounded-card border border-line-strong bg-canvas p-5">
              <p className="font-bold">{source.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{source.text}</p>
            </div>
          </div>

          <Flow label={uplink} />

          {/* 웹 플랫폼 */}
          <div className="rounded-card border-2 border-brand-500 bg-brand-50/50 p-5 sm:p-6">
            <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-brand-600">
              {platform.label}
              {platform.status && <span className="rounded-full border border-brand-300 px-2 py-0.5 text-xs font-semibold">{platform.status}</span>}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {platform.functions.map((fn) => {
                const Icon = functionIcons[fn.icon];
                return (
                  <li key={fn.title}>
                    <Chip className="w-full">
                      <Icon aria-hidden className="size-4 shrink-0 text-brand-600" strokeWidth={1.75} />
                      {fn.title}
                    </Chip>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3 rounded-control bg-canvas px-4 py-3">
                <Server aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                <div>
                  <p className="font-bold">{platform.server.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{platform.server.text}</p>
                </div>
              </div>
              <ArrowLeftRight aria-hidden className="size-4 shrink-0 self-center rotate-90 text-ink-subtle sm:rotate-0" />
              <div className="flex flex-1 items-start gap-3 rounded-control bg-canvas px-4 py-3">
                <Database aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
                <div>
                  <p className="font-bold">{platform.storage.title}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{platform.storage.text}</p>
                </div>
              </div>
            </div>
          </div>

          <Flow label={access} />

          {/* 사용자 */}
          <div>
            <ZoneLabel>{users.label}</ZoneLabel>
            <div className="rounded-card border border-line-strong bg-canvas p-5">
              <p className="flex items-center gap-2 font-bold">
                <Users aria-hidden className="size-4 text-brand-600" />
                {users.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{users.text}</p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
