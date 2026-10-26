import { cn } from "@/lib/cn";

// 제품 상태 표시: CI 서브 컬러(376C·165C·199C)를 정상·주의·경보에 매핑
const tones = {
  normal: "bg-success-soft text-success-ink [--dot:var(--color-success)]",
  warning: "bg-warning-soft text-warning-ink [--dot:var(--color-warning)]",
  alert: "bg-danger-soft text-danger [--dot:var(--color-danger)]",
} as const;

export type Status = keyof typeof tones;

export function StatusBadge({
  status,
  children,
  className,
}: {
  status: Status;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
        tones[status],
        className,
      )}
    >
      <span className="relative flex size-2">
        {status === "alert" && (
          <span className="absolute inset-0 animate-ping rounded-full bg-(--dot) opacity-60 motion-reduce:animate-none" />
        )}
        <span className="relative size-2 rounded-full bg-(--dot)" />
      </span>
      {children}
    </span>
  );
}
