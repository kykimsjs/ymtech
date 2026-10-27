"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./i18n";

// 클라이언트 컴포넌트가 지금 언어를 알 수 있게 레이아웃에서 한 번 넣어 준다.
// 서버 컴포넌트는 getLocale()(next/root-params)로 직접 읽는다.
const LocaleContext = createContext<Locale>("ko");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
