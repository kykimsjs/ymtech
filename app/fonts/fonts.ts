import localFont from "next/font/local";
import { Noto_Serif_KR } from "next/font/google";

// CI 지정서체 (BS 24·25). 본문은 globals.css에서 Pretendard를 쓴다.
// 한글 풀셋 woff라 용량이 커서 preload는 끈다.
export const leferiPoint = localFont({
  src: [
    { path: "./LeferiPoint-WhiteA.woff", weight: "300", style: "normal" },
    { path: "./LeferiPoint-SpecialA.woff", weight: "700", style: "normal" },
    { path: "./LeferiPoint-BlackA.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-leferi-point",
  display: "swap",
  preload: false,
});

export const leferiBase = localFont({
  src: [
    { path: "./LeferiBaseType-RegularA.woff", weight: "400", style: "normal" },
    { path: "./LeferiBaseType-BoldA.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-leferi-base",
  display: "swap",
  preload: false,
});

export const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  leferiPoint.variable,
  leferiBase.variable,
  notoSerifKr.variable,
].join(" ");
