import Image from "next/image";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { useLocale } from "@/lib/locale-context";
import { ScaledScreen } from "./scaled-screen";

// 웹 플랫폼 예시 화면들. 실제 플랫폼 화면을 받으면 교체한다. 화면 속 수치·이름은 모두 예시다.
// 화면 속 글자는 content/ui.ts(platform)에서 언어별로 가져온다.

// ── 예시 데이터 ─────────────────────────────────────────
export const usage = [32, 30, 29, 31, 38, 52, 66, 74, 79, 81, 78, 72, 69, 71, 75, 70, 61, 54, 47, 41, 37, 35, 33, 32];
export const prev = [30, 29, 29, 30, 35, 47, 60, 69, 73, 76, 74, 70, 66, 68, 70, 66, 58, 50, 44, 39, 35, 33, 31, 30];
// label은 블록 카탈로그의 단독 대시보드 그림(proof.tsx)용 한글 이름
export const breakdown = [
  { label: "양액·관수", value: 34, color: "var(--color-brand-500)" },
  { label: "냉·난방", value: 41, color: "var(--color-eco-500)" },
  { label: "조명", value: 15, color: "var(--color-brand-200)" },
  { label: "기타", value: 10, color: "var(--color-line-strong)" },
];
// 도넛 조각마다 시작 위치(누적 비율)를 미리 계산
export const donut = breakdown.map((part, i) => ({
  ...part,
  start: breakdown.slice(0, i).reduce((sum, p) => sum + p.value, 0),
}));
export const devices = [
  { name: "주 분전반 (Main)", status: "정상", value: "18.2" },
  { name: "보조 분전반 1", status: "정상", value: "6.4" },
  { name: "보조 분전반 2", status: "주의", value: "9.1" },
];
const weekly = [82, 76, 88, 71, 93, 64, 58]; // 월~일

export function linePath(values: number[], w: number, h: number, max = 100) {
  return values.map((v, i) => `${i ? "L" : "M"}${((i / (values.length - 1)) * w).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(" ");
}

// ── 모니터 목업 ─────────────────────────────────────────
// 클라이언트가 준 모니터 이미지(ChatGPT 생성, 투명 배경) 화면 자리에 예시 화면을 끼운다.
// 화면 자리 비율은 원본 이미지에서 잰 값 (왼쪽 2.062% · 위 2.766% · 너비 95.876% · 높이 73.617%, 가로세로 1.747)
// 큰 화면을 줄이면 글씨가 8px대로 작아져 흐려 보이므로, 목업 크기에 맞춘 전용 화면을 거의 1:1로 그린다.
const SCREEN_W = 614;
const SCREEN_H = Math.round(SCREEN_W / 1.747);

export function MonitorMockup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure aria-label={label} className="relative mx-auto w-full max-w-[40rem]">
      <Image src="/images/home/monitor.webp" alt="" width={1261} height={940} sizes="(min-width: 640px) 640px, 100vw" className="h-auto w-full" />
      <ScaledScreen
        designWidth={SCREEN_W}
        designHeight={SCREEN_H}
        className="absolute bg-surface"
        style={{ left: "2.062%", top: "2.766%", width: "95.876%", height: "73.617%" }}
      >
        {children}
      </ScaledScreen>
    </figure>
  );
}

function usePlatformText() {
  return ui[useLocale()].platform;
}

// 화면 공통 틀: 앱 상단바(메뉴 이름 + 예시 화면 표시) + 본문
function ScreenFrame({ menu, children }: { menu: string; children: React.ReactNode }) {
  const p = usePlatformText();
  return (
    <div className="flex h-full flex-col bg-surface text-ink">
      <div className="flex items-center justify-between border-b border-line bg-canvas px-3 py-1.5 text-xs">
        <span className="font-semibold text-ink-muted">
          {p.app} · {menu}
        </span>
        <span className="rounded-full bg-surface-strong px-2 py-px font-semibold text-ink-muted">{p.sample}</span>
      </div>
      <div className="min-h-0 flex-1 p-1.5">{children}</div>
    </div>
  );
}

function Panel({ title, aside, children, className }: { title: string; aside?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-0 flex-col rounded-md border border-line bg-canvas px-2.5 py-2", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold text-ink-muted">{title}</p>
        {aside}
      </div>
      {children}
    </div>
  );
}

const statusTone = {
  normal: "bg-success-soft text-success-ink",
  warn: "bg-warning-soft text-warning-ink",
  cut: "bg-danger-soft text-danger",
} as const;
type Status = keyof typeof statusTone;

function StatusPill({ status }: { status: Status }) {
  const p = usePlatformText();
  return <span className={cn("shrink-0 rounded-full px-2 py-px text-[11px] font-semibold", statusTone[status])}>{p.status[status]}</span>;
}

// 1. 실시간 대시보드: 선 그래프 · 도넛 · 표 · 막대 그래프 네 칸
// 분전반 이름은 ui의 deviceNames 순서(0 주, 1 보조1, 2 보조2)
const deviceRows: { status: Status; value: string }[] = [
  { status: "normal", value: "18.2" },
  { status: "normal", value: "6.4" },
  { status: "warn", value: "9.1" },
];

function DashboardScreen() {
  const p = usePlatformText();
  const d = p.dashboard;
  const W = 300;
  const H = 110;
  return (
    <ScreenFrame menu={d.menu}>
      <div className="grid h-full grid-cols-[1.35fr_1fr] grid-rows-2 gap-1.5">
        <Panel
          title={d.usage}
          aside={
            <p className="text-base font-bold text-brand-500 tabular-nums">
              1,284 <span className="text-[11px] text-ink-muted">kWh</span>
            </p>
          }
        >
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-1 min-h-0 w-full flex-1" role="img" aria-label={d.usageChart}>
            <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="var(--color-line)" />
            <path d={`${linePath(usage, W, H)} L${W},${H} L0,${H} Z`} fill="var(--color-brand-500)" fillOpacity={0.12} />
            <path d={linePath(prev, W, H)} fill="none" stroke="var(--color-line-strong)" strokeWidth={1.5} />
            <path d={linePath(usage, W, H)} fill="none" stroke="var(--color-brand-500)" strokeWidth={2} />
          </svg>
          <div className="flex justify-between text-[11px] text-ink-subtle tabular-nums">
            {d.hours.map((hour) => (
              <span key={hour}>{hour}</span>
            ))}
          </div>
        </Panel>

        <Panel title={d.breakdown}>
          <div className="flex flex-1 items-center gap-2.5">
            <svg viewBox="0 0 42 42" className="size-20 shrink-0 -rotate-90" role="img" aria-label={d.breakdownChart}>
              {donut.map((part) => (
                <circle
                  key={part.label}
                  cx="21"
                  cy="21"
                  r="15.9155"
                  fill="none"
                  stroke={part.color}
                  strokeWidth="6"
                  strokeDasharray={`${part.value} ${100 - part.value}`}
                  strokeDashoffset={-part.start}
                />
              ))}
            </svg>
            <ul className="flex flex-1 flex-col gap-1 text-[11px]">
              {breakdown.map((part, i) => (
                <li key={part.label} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="size-2 rounded-sm" style={{ background: part.color }} />
                  {d.parts[i]}
                  <span className="ml-auto text-ink-subtle tabular-nums">{part.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title={d.devices}>
          <table className="mt-1.5 w-full text-left text-[11px]">
            <thead>
              <tr className="bg-ink-muted text-white">
                <th className="px-2 py-1 font-medium">{d.cols[0]}</th>
                <th className="px-2 py-1 font-medium">{d.cols[1]}</th>
                <th className="px-2 py-1 text-right font-medium">{d.cols[2]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {deviceRows.map((row, i) => (
                <tr key={d.deviceNames[i]}>
                  <td className="px-2 py-1 whitespace-nowrap">{d.deviceNames[i]}</td>
                  <td className={cn("px-2 py-1 font-semibold", row.status === "warn" ? "text-warning-ink" : "text-success-ink")}>{p.status[row.status]}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title={d.weekly} aside={<span className="text-[11px] text-ink-subtle">kWh</span>}>
          <div className="mt-1 flex min-h-0 flex-1 items-end gap-1.5">
            {weekly.map((value, i) => (
              <div key={d.days[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                <div className={cn("w-full rounded-t-sm", value === 93 ? "bg-brand-500" : "bg-brand-200")} style={{ height: `${value}%` }} />
                <span className="text-[11px] text-ink-subtle">{d.days[i]}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

// 2. 경보와 자동 차단: 경보 띠 + 분전반별 상태(한 곳 차단) + 경보 기록
const alarmLog: { time: string; tone: Status }[] = [
  { time: "14:32:15", tone: "cut" },
  { time: "14:32:08", tone: "warn" },
  { time: "14:32:08", tone: "warn" },
  { time: "14:33:40", tone: "normal" },
];
const alarmDevices: Status[] = ["normal", "normal", "cut"];

function AlarmScreen() {
  const p = usePlatformText();
  const a = p.alarm;
  return (
    <ScreenFrame menu={a.menu}>
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-md bg-danger px-3 py-2 text-white">
          <p className="text-[13px] font-bold">{a.banner}</p>
          <span className="rounded-full bg-white/20 px-2 py-px text-[11px] font-semibold">{a.raised}</span>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.25fr] gap-1.5">
          <Panel title={a.devices}>
            <ul className="mt-1.5 flex flex-1 flex-col justify-around divide-y divide-line">
              {alarmDevices.map((status, i) => (
                <li key={p.dashboard.deviceNames[i]} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                  <span className={cn(status === "cut" && "font-semibold")}>{p.dashboard.deviceNames[i]}</span>
                  <StatusPill status={status} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title={a.log} aside={<span className="text-[11px] text-ink-subtle">{a.today}</span>}>
            <ol className="mt-1.5 flex flex-1 flex-col justify-around divide-y divide-line">
              {alarmLog.map((log, i) => (
                <li key={log.time + a.logs[i]} className="flex items-center gap-2 py-1.5 text-[11px]">
                  <span className="shrink-0 text-ink-subtle tabular-nums">{log.time}</span>
                  <span className="flex-1 truncate">{a.logs[i]}</span>
                  <StatusPill status={log.tone} />
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </ScreenFrame>
  );
}

// 3. 이력 관리: 기간 선택 + 이상 이력 표 + 엑셀 다운로드
const history: { date: string; device: number; action: "done" | "checked" }[] = [
  { date: "10.26 14:32", device: 2, action: "done" },
  { date: "10.24 09:15", device: 0, action: "checked" },
  { date: "10.21 18:47", device: 1, action: "done" },
  { date: "10.17 03:20", device: 2, action: "checked" },
  { date: "10.12 11:05", device: 0, action: "done" },
];

function HistoryScreen() {
  const p = usePlatformText();
  const h = p.history;
  return (
    <ScreenFrame menu={h.menu}>
      <Panel
        title={h.title}
        className="h-full"
        aside={
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="rounded border border-line px-2 py-0.5 text-ink-muted tabular-nums">2026.10.01 ~ 10.26</span>
            <span className="rounded bg-success-ink px-2 py-0.5 font-semibold text-white">{h.excel}</span>
          </div>
        }
      >
        <table className="mt-2 w-full text-left text-[11px]">
          <thead>
            <tr className="bg-ink-muted text-white">
              {h.cols.map((col) => (
                <th key={col} className="px-2 py-1.5 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {history.map((row, i) => (
              <tr key={row.date}>
                <td className="px-2 py-1.5 whitespace-nowrap text-ink-subtle tabular-nums">{row.date}</td>
                <td className="px-2 py-1.5 whitespace-nowrap">{p.dashboard.deviceNames[row.device]}</td>
                <td className="px-2 py-1.5">{h.events[i]}</td>
                <td className="px-2 py-1.5 whitespace-nowrap text-ink-muted">{h.actions[row.action]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </ScreenFrame>
  );
}

// 4. 데이터 보안: 클라우드 저장 상태 + 사용자 권한
const memberRoles = ["admin", "worker", "worker", "viewer"] as const;

function AccessScreen() {
  const p = usePlatformText();
  const a = p.access;
  return (
    <ScreenFrame menu={a.menu}>
      <div className="grid h-full grid-cols-[1fr_1.6fr] gap-1.5">
        <Panel title={a.storage}>
          <div className="flex flex-1 flex-col justify-center gap-3 text-[11px]">
            <div>
              <p className="flex items-center justify-between">
                <span className="font-semibold">{a.cloud}</span>
                <StatusPill status="normal" />
              </p>
              <p className="mt-1 text-ink-subtle tabular-nums">{a.lastSaved}</p>
            </div>
            <div>
              <p className="flex justify-between text-ink-muted">
                <span>{a.used}</span>
                <span className="tabular-nums">38%</span>
              </p>
              <div className="mt-1 h-1.5 rounded-full bg-surface-strong">
                <div className="h-full w-[38%] rounded-full bg-brand-500" />
              </div>
            </div>
            <p className="text-ink-muted">{a.onlyAuthorized}</p>
          </div>
        </Panel>
        <Panel title={a.users}>
          <table className="mt-1.5 w-full text-left text-[11px]">
            <thead>
              <tr className="bg-ink-muted text-white">
                {a.cols.map((col) => (
                  <th key={col} className="px-2 py-1.5 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {memberRoles.map((role, i) => (
                <tr key={a.names[i]}>
                  <td className="px-2 py-1.5 whitespace-nowrap">{a.names[i]}</td>
                  <td className="px-2 py-1.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-px text-[11px] font-semibold",
                        role === "admin" ? "bg-brand-100 text-brand-700" : role === "worker" ? "bg-surface-strong text-ink-muted" : "bg-canvas text-ink-subtle ring-1 ring-line",
                      )}
                    >
                      {a.roles[role]}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-ink-muted">{a.scopes[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

export const platformScreens = {
  dashboard: DashboardScreen,
  alarm: AlarmScreen,
  history: HistoryScreen,
  access: AccessScreen,
};

export type PlatformScreen = keyof typeof platformScreens;
