import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale } from "@/lib/i18n";
import { ui } from "./ui";

const dictionaries = {
  ko: () => import("./ko").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

export async function getLocale() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

// 서버 컴포넌트용 화면 문구 (클라이언트는 useLocale() + ui)
export async function getUi() {
  return ui[await getLocale()];
}

export async function getDictionary() {
  return dictionaries[await getLocale()]();
}
