import Image from "next/image";
import { cn } from "@/lib/cn";
import { ScaledScreen } from "./scaled-screen";

// 웹 플랫폼 예시 화면들. 실제 플랫폼 화면을 받으면 교체한다. 화면 속 수치·이름은 모두 예시다.

// ── 예시 데이터 ─────────────────────────────────────────
export const usage = [32, 30, 29, 31, 38, 52, 66, 74, 79, 81, 78, 72, 69, 71, 75, 70, 61, 54, 47, 41, 37, 35, 33, 32];
export const prev = [30, 29, 29, 30, 35, 47, 60, 69, 73, 76, 74, 70, 66, 68, 70, 66, 58, 50, 44, 39, 35, 33, 31, 30];
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
const weekly = [
  { day: "월", value: 82 },
  { day: "화", value: 76 },
  { day: "수", value: 88 },
  { day: "목", value: 71 },
  { day: "금", value: 93 },
  { day: "토", value: 64 },
  { day: "일", value: 58 },
];

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

// 화면 공통 틀: 앱 상단바(메뉴 이름 + 예시 화면 표시) + 본문
function ScreenFrame({ menu, children }: { menu: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-surface text-ink">
      <div className="flex items-center justify-between border-b border-line bg-canvas px-3 py-1.5 text-xs">
        <span className="font-semibold text-ink-muted">통합 안전관리 웹 플랫폼 · {menu}</span>
        <span className="rounded-full bg-surface-strong px-2 py-px font-semibold text-ink-muted">예시 화면</span>
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
  정상: "bg-success-soft text-success-ink",
  주의: "bg-warning-soft text-warning-ink",
  차단: "bg-danger-soft text-danger",
} as const;

function StatusPill({ status }: { status: keyof typeof statusTone }) {
  return <span className={cn("shrink-0 rounded-full px-2 py-px text-[11px] font-semibold", statusTone[status])}>{status}</span>;
}

// 1. 실시간 대시보드: 선 그래프 · 도넛 · 표 · 막대 그래프 네 칸
function DashboardScreen() {
  const W = 300;
  const H = 110;
  return (
    <ScreenFrame menu="실시간 관제">
      <div className="grid h-full grid-cols-[1.35fr_1fr] grid-rows-2 gap-1.5">
        <Panel
          title="전체 전력 사용 현황"
          aside={
            <p className="text-base font-bold text-brand-500 tabular-nums">
              1,284 <span className="text-[11px] text-ink-muted">kWh</span>
            </p>
          }
        >
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-1 min-h-0 w-full flex-1" role="img" aria-label="시간대별 전력 사용량 그래프 (예시)">
            <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="var(--color-line)" />
            <path d={`${linePath(usage, W, H)} L${W},${H} L0,${H} Z`} fill="var(--color-brand-500)" fillOpacity={0.12} />
            <path d={linePath(prev, W, H)} fill="none" stroke="var(--color-line-strong)" strokeWidth={1.5} />
            <path d={linePath(usage, W, H)} fill="none" stroke="var(--color-brand-500)" strokeWidth={2} />
          </svg>
          <div className="flex justify-between text-[11px] text-ink-subtle tabular-nums">
            <span>0시</span>
            <span>12시</span>
            <span>23시</span>
          </div>
        </Panel>

        <Panel title="용도별 사용 비율">
          <div className="flex flex-1 items-center gap-2.5">
            <svg viewBox="0 0 42 42" className="size-20 shrink-0 -rotate-90" role="img" aria-label="용도별 사용 비율 (예시)">
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
              {breakdown.map((part) => (
                <li key={part.label} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="size-2 rounded-sm" style={{ background: part.color }} />
                  {part.label}
                  <span className="ml-auto text-ink-subtle tabular-nums">{part.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel title="분전반별 상태">
          <table className="mt-1.5 w-full text-left text-[11px]">
            <thead>
              <tr className="bg-ink-muted text-white">
                <th className="px-2 py-1 font-medium">설비명</th>
                <th className="px-2 py-1 font-medium">상태</th>
                <th className="px-2 py-1 text-right font-medium">전류(A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {devices.map((d) => (
                <tr key={d.name}>
                  <td className="px-2 py-1 whitespace-nowrap">{d.name}</td>
                  <td className={cn("px-2 py-1 font-semibold", d.status === "주의" ? "text-warning-ink" : "text-success-ink")}>{d.status}</td>
                  <td className="px-2 py-1 text-right tabular-nums">{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="요일별 사용량" aside={<span className="text-[11px] text-ink-subtle">kWh</span>}>
          <div className="mt-1 flex min-h-0 flex-1 items-end gap-1.5">
            {weekly.map((d) => (
              <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                <div className={cn("w-full rounded-t-sm", d.value === 93 ? "bg-brand-500" : "bg-brand-200")} style={{ height: `${d.value}%` }} />
                <span className="text-[11px] text-ink-subtle">{d.day}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

// 2. 경보와 자동 차단: 경보 띠 + 분전반별 상태(한 곳 차단) + 경보 기록
const alarmLog = [
  { time: "14:32:15", text: "보조 분전반 2 전원 자동 차단", tone: "차단" as const },
  { time: "14:32:08", text: "보조 분전반 2 과전류·온도 상승 감지", tone: "주의" as const },
  { time: "14:32:08", text: "현장 경광등·경보음 작동", tone: "주의" as const },
  { time: "14:33:40", text: "관리자 알림 확인", tone: "정상" as const },
];

function AlarmScreen() {
  return (
    <ScreenFrame menu="경보·차단">
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-md bg-danger px-3 py-2 text-white">
          <p className="text-[13px] font-bold">보조 분전반 2 · 이상 감지 → 전원 자동 차단</p>
          <span className="rounded-full bg-white/20 px-2 py-px text-[11px] font-semibold">경보 발생</span>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.25fr] gap-1.5">
          <Panel title="분전반별 상태">
            <ul className="mt-1.5 flex flex-1 flex-col justify-around divide-y divide-line">
              {[
                { name: "주 분전반 (Main)", status: "정상" as const },
                { name: "보조 분전반 1", status: "정상" as const },
                { name: "보조 분전반 2", status: "차단" as const },
              ].map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                  <span className={cn(d.status === "차단" && "font-semibold")}>{d.name}</span>
                  <StatusPill status={d.status} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="경보 기록" aside={<span className="text-[11px] text-ink-subtle">오늘</span>}>
            <ol className="mt-1.5 flex flex-1 flex-col justify-around divide-y divide-line">
              {alarmLog.map((log) => (
                <li key={log.time + log.text} className="flex items-center gap-2 py-1.5 text-[11px]">
                  <span className="shrink-0 text-ink-subtle tabular-nums">{log.time}</span>
                  <span className="flex-1 truncate">{log.text}</span>
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
const history = [
  { date: "10.26 14:32", device: "보조 분전반 2", event: "과전류 감지 · 자동 차단", action: "점검 완료" },
  { date: "10.24 09:15", device: "주 분전반", event: "온도 상승 주의", action: "확인" },
  { date: "10.21 18:47", device: "보조 분전반 1", event: "누설 전류 주의", action: "점검 완료" },
  { date: "10.17 03:20", device: "보조 분전반 2", event: "습도 상승 주의", action: "확인" },
  { date: "10.12 11:05", device: "주 분전반", event: "전압 불안정", action: "점검 완료" },
];

function HistoryScreen() {
  return (
    <ScreenFrame menu="이력 관리">
      <Panel
        title="이상 이력"
        className="h-full"
        aside={
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="rounded border border-line px-2 py-0.5 text-ink-muted tabular-nums">2026.10.01 ~ 10.26</span>
            <span className="rounded bg-success-ink px-2 py-0.5 font-semibold text-white">엑셀 다운로드</span>
          </div>
        }
      >
        <table className="mt-2 w-full text-left text-[11px]">
          <thead>
            <tr className="bg-ink-muted text-white">
              <th className="px-2 py-1.5 font-medium">일시</th>
              <th className="px-2 py-1.5 font-medium">설비</th>
              <th className="px-2 py-1.5 font-medium">내용</th>
              <th className="px-2 py-1.5 font-medium">조치</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {history.map((row) => (
              <tr key={row.date}>
                <td className="px-2 py-1.5 whitespace-nowrap text-ink-subtle tabular-nums">{row.date}</td>
                <td className="px-2 py-1.5 whitespace-nowrap">{row.device}</td>
                <td className="px-2 py-1.5">{row.event}</td>
                <td className="px-2 py-1.5 whitespace-nowrap text-ink-muted">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </ScreenFrame>
  );
}

// 4. 데이터 보안: 클라우드 저장 상태 + 사용자 권한
const members = [
  { name: "관리자 A", role: "관리자", scope: "전체 설비 · 설정" },
  { name: "현장 담당 B", role: "작업자", scope: "1동 분전반" },
  { name: "현장 담당 C", role: "작업자", scope: "2동 분전반" },
  { name: "지자체 담당 D", role: "열람", scope: "전체 설비 열람" },
];

function AccessScreen() {
  return (
    <ScreenFrame menu="데이터 보안">
      <div className="grid h-full grid-cols-[1fr_1.6fr] gap-1.5">
        <Panel title="데이터 저장">
          <div className="flex flex-1 flex-col justify-center gap-3 text-[11px]">
            <div>
              <p className="flex items-center justify-between">
                <span className="font-semibold">클라우드 저장</span>
                <StatusPill status="정상" />
              </p>
              <p className="mt-1 text-ink-subtle tabular-nums">마지막 저장 14:30</p>
            </div>
            <div>
              <p className="flex justify-between text-ink-muted">
                <span>사용 용량</span>
                <span className="tabular-nums">38%</span>
              </p>
              <div className="mt-1 h-1.5 rounded-full bg-surface-strong">
                <div className="h-full w-[38%] rounded-full bg-brand-500" />
              </div>
            </div>
            <p className="text-ink-muted">권한이 있는 사용자만 접속</p>
          </div>
        </Panel>
        <Panel title="사용자 권한">
          <table className="mt-1.5 w-full text-left text-[11px]">
            <thead>
              <tr className="bg-ink-muted text-white">
                <th className="px-2 py-1.5 font-medium">사용자</th>
                <th className="px-2 py-1.5 font-medium">권한</th>
                <th className="px-2 py-1.5 font-medium">볼 수 있는 범위</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {members.map((m) => (
                <tr key={m.name}>
                  <td className="px-2 py-1.5 whitespace-nowrap">{m.name}</td>
                  <td className="px-2 py-1.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-px text-[11px] font-semibold",
                        m.role === "관리자" ? "bg-brand-100 text-brand-700" : m.role === "작업자" ? "bg-surface-strong text-ink-muted" : "bg-canvas text-ink-subtle ring-1 ring-line",
                      )}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-ink-muted">{m.scope}</td>
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
