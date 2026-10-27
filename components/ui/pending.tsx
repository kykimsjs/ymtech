import { cn } from "@/lib/cn";

/** 받아야 할 자료를 적은 자리 표시. 스톡 사진으로 채우지 않는다 */
export function Pending({ text, tone = "light", className }: { text: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-dashed p-6 text-center text-sm leading-relaxed",
        tone === "dark" ? "border-white/25 text-white/60" : "border-line-strong bg-surface text-ink-subtle",
        className,
      )}
    >
      {text}
    </div>
  );
}
