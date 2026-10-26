import Image from "next/image";
import { cn } from "@/lib/cn";

// CI 매뉴얼 원본에서 따낸 로고 (BS 08 시그니춰 조합, BS 06 세로조합, BS 14 심볼마크)
// sizes: 화면에 실제로 그려지는 폭 (원본이 커서 지정하지 않으면 화면 폭만큼 큰 파일을 받는다)
const sources = {
  signature: { src: "/brand/ym-signature", width: 1092, height: 242, sizes: "200px" },
  vertical: { src: "/brand/ym-brandmark-vertical", width: 857, height: 516, sizes: "240px" },
  symbol: { src: "/brand/ym-symbol", width: 426, height: 402, sizes: "48px" },
} as const;

type LogoProps = {
  type?: keyof typeof sources;
  /** 어두운 배경에서는 white */
  tone?: "color" | "white";
  className?: string;
  preload?: boolean;
};

export function Logo({ type = "signature", tone = "color", className, preload }: LogoProps) {
  const { src, width, height, sizes } = sources[type];
  return (
    <Image
      src={`${src}${tone === "white" ? "-white" : ""}.png`}
      alt="와이엠이노테크 YM INNOTECH"
      width={width}
      height={height}
      sizes={sizes}
      preload={preload}
      className={cn("h-auto", className)}
    />
  );
}
