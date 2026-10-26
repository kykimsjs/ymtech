import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale } from "@/lib/i18n";

const dictionaries = {
  ko: () => import("./ko").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

export async function getLocale() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()]();
}
