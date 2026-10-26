import { cn } from "@/lib/cn";

// 아이오크롭스식 소제목: 장식 없이 포인트 색 글자만
export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-eyebrow font-semibold text-eco-500", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className={cn(tone === "dark" && "text-eco-200")}>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-display font-bold", tone === "dark" ? "text-white" : "text-ink")}>{title}</h2>
      {description && (
        <p className={cn("text-lg leading-[1.7]", tone === "dark" ? "text-white/70" : "text-ink-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}
