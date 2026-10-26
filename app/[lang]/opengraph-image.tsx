import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// 카카오톡·SNS 등에 링크를 공유할 때 보이는 미리보기 이미지 (1200×630)
export const alt = "와이엠이노테크 — AIoT 스마트팜 에너지·화재 관리 솔루션";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  ko: {
    title: ["화재예방부터", "에너지 최적화까지"],
    sub: "스마트팜의 안전과 효율을 완성하는 AIoT 에너지·화재 관리 솔루션",
  },
  en: {
    title: ["From fire prevention", "to energy optimization"],
    sub: "AIoT energy & fire management for smart farms",
  },
};

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const text = lang === "en" ? copy.en : copy.ko;

  // Pretendard (OFL, assets/og/Pretendard-LICENSE.txt)
  const [bold, regular, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/Pretendard-Bold.otf")),
    readFile(join(process.cwd(), "assets/og/Pretendard-Regular.otf")),
    readFile(join(process.cwd(), "public/brand/ym-signature-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 0",
          background: "#101a35",
          color: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse는 next/image를 쓸 수 없다 */}
        <img src={logoSrc} width={300} height={66} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {text.title.map((line) => (
            <div key={line} style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              {line}
            </div>
          ))}
          <div style={{ marginTop: 28, fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.78)" }}>{text.sub}</div>
        </div>
        {/* CI 전용 보더라인: 블루 → 틸 */}
        <div style={{ display: "flex", height: 14, margin: "0 -80px", backgroundImage: "linear-gradient(90deg, #415ba6, #007684)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
