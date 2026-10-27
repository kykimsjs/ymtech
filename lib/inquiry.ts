"use server";

import { organization } from "@/lib/site";

// 문의 폼 → Resend로 메일 보내기 (2026-10-26 결정: 문의 메일은 Resend)
// 환경 변수 (Vercel 프로젝트 설정에 넣는다)
//   RESEND_API_KEY  Resend API 키
//   CONTACT_FROM    보내는 주소. Resend에서 인증한 도메인이어야 한다 (예: "와이엠이노테크 <noreply@ymforge.site>")
//   CONTACT_TO      받는 주소. 없으면 대표 이메일
// 키가 없으면 보내지 않고 전화·이메일로 안내한다.

export type InquiryState = { status: "idle" | "ok" | "error"; message?: string; fields?: Record<string, string> };

const limits = { name: 50, org: 100, phone: 30, email: 120, place: 100, message: 3000 } as const;

function text(formData: FormData, key: keyof typeof limits) {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, limits[key]);
}

const escape = (value: string) => value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

export async function sendInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const fields = {
    topic: String(formData.get("topic") ?? "").slice(0, 30),
    name: text(formData, "name"),
    org: text(formData, "org"),
    phone: text(formData, "phone"),
    email: text(formData, "email"),
    place: text(formData, "place"),
    message: text(formData, "message"),
  };

  // 사람이 볼 수 없는 칸에 값이 있으면 스팸 봇으로 보고 조용히 끝낸다
  if (formData.get("website")) return { status: "ok", message: "문의가 접수되었습니다." };

  if (!fields.name || !fields.phone || !fields.email || !fields.message) {
    return { status: "error", message: "이름, 연락처, 이메일, 문의 내용을 모두 적어 주세요.", fields };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { status: "error", message: "이메일 주소를 다시 확인해 주세요.", fields };
  }
  if (formData.get("agree") !== "on") {
    return { status: "error", message: "개인정보 수집·이용에 동의해 주세요.", fields };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !from) {
    return {
      status: "error",
      message: `지금은 온라인 문의를 받을 수 없습니다. 전화(${organization.phone})나 이메일(${organization.email})로 연락해 주세요.`,
      fields,
    };
  }

  const rows = [
    ["문의 유형", fields.topic],
    ["이름", fields.name],
    ["소속", fields.org],
    ["연락처", fields.phone],
    ["이메일", fields.email],
    ["설치 장소", fields.place],
  ].filter(([, value]) => value);
  const html = `<table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escape(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${escape(fields.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO ?? organization.email],
      reply_to: fields.email,
      subject: `[홈페이지 문의] ${fields.topic || "문의"} · ${fields.name}${fields.org ? ` (${fields.org})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    return { status: "error", message: `보내지 못했습니다. 잠시 뒤 다시 시도하시거나 전화(${organization.phone})로 연락해 주세요.`, fields };
  }
  return { status: "ok", message: "문의가 접수되었습니다. 확인 후 연락드리겠습니다." };
}
