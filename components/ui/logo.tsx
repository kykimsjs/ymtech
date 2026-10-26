import Image from "next/image";
import { cn } from "@/lib/cn";

// CI 매뉴얼 원본에서 따낸 로고 (BS 08 시그니춰 조합, BS 06 세로조합, BS 14 심볼마크)
const sources = {
  signature: { src: "/brand/ym-signature", width: 1092, height: 242 },
  vertical: { src: "/brand/ym-brandmark-vertical", width: 857, height: 516 },
  symbol: { src: "/brand/ym-symbol", width: 426, height: 402 },
} as const;

type LogoProps = {
  type?: keyof typeof sources;
  /** 어두운 배경에서는 white */
  tone?: "color" | "white";
  className?: string;
  preload?: boolean;
};

export function Logo({ type = "signature", tone = "color", className, preload }: LogoProps) {
  const { src, width, height } = sources[type];
  return (
    <Image
      src={`${src}${tone === "white" ? "-white" : ""}.png`}
      alt="와이엠이노테크 YM INNOTECH"
      width={width}
      height={height}
      preload={preload}
      className={cn("h-auto", className)}
    />
  );
}
