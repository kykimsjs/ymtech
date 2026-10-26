import Image from "next/image";
import { cn } from "@/lib/cn";

export type MediaData = {
  src?: string;
  alt: string;
  /** 실제 사진이 없을 때 표시할 설명 (어떤 사진이 들어갈 자리인지) */
  hint?: string;
  /** object-position, 예: "60% 40%" */
  focus?: string;
};

// 실제 사진을 받기 전까지 쓰는 임시 이미지 (Picsum Photos, Unsplash 무료 사진).
// 같은 설명이면 항상 같은 사진이 나오도록 시드를 고정한다.
function placeholderSrc(seedText: string) {
  let hash = 0;
  for (const ch of seedText) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return `https://picsum.photos/seed/ym${hash.toString(36)}/1600/1000`;
}

// fill: 부모를 가득 채우는 배경으로 쓸 때 (부모에 relative 필요)
export function Media({
  media,
  className,
  sizes = "100vw",
  tone = "light",
  fill = false,
  preload,
}: {
  media: MediaData;
  className?: string;
  sizes?: string;
  tone?: "light" | "dark";
  fill?: boolean;
  preload?: boolean;
}) {
  const temporary = !media.src;
  const src = media.src ?? placeholderSrc(media.hint ?? media.alt);

  return (
    <div className={cn(fill ? "absolute inset-0" : "relative", "overflow-hidden", tone === "dark" ? "bg-graphite-900" : "bg-surface-strong", className)}>
      <Image
        src={src}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={preload}
        // 임시 이미지는 외부 주소를 그대로 쓴다 (최적화·도메인 설정 없이)
        unoptimized={temporary}
        // 임시 이미지는 흑백: 주제와 무관한 사진 색이 화면 색감 판단을 흐리지 않도록
        className={cn("object-cover", temporary && "grayscale")}
        style={media.focus ? { objectPosition: media.focus } : undefined}
      />
      {temporary && (
        // 실제 페이지(data-site 안)에서는 globals.css 규칙으로 숨긴다
        <span
          data-media-hint
          className="absolute right-2 bottom-2 max-w-[80%] truncate rounded-sm bg-black/55 px-2 py-1 text-[0.6875rem] text-white/90"
        >
          임시 이미지 · {media.hint ?? media.alt}
        </span>
      )}
    </div>
  );
}
