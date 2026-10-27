import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ScrollTopButton } from "@/components/ui/scroll-top-button";

// 상단 공지 바는 닫기 버튼 때문에 클라이언트 컴포넌트로 분리
export { AnnouncementBar, type AnnouncementBarProps } from "./announcement-bar";

export type SiteFooterProps = {
  /** 하위 메뉴가 없는 열은 제목이 바로 링크 */
  columns: { title: string; href?: string; links: { label: string; href: string }[] }[];
  /** 회사 정보 줄. 성격별로 묶는다 (예: 1줄 회사·대표·주소, 2줄 사업자번호·연락처). href가 있으면 링크 */
  info: { label?: string; value: string; href?: string }[][];
  copyright: string;
};

// 참고: 지노시스 하단(어두운 바탕, 로고 + 사업자 정보 줄글) + 메뉴 열,
//       케빈랩 하단(회사 정보 마지막 줄과 같은 높이 오른쪽 끝에 카피라이트)
export function SiteFooter({ columns, info, copyright }: SiteFooterProps) {
  return (
    <footer className="bg-graphite-900 text-white/60">
      <ScrollTopButton />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="white" className="w-40" />
        </div>
        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-5 lg:col-span-8">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3 text-sm">
              {column.href ? (
                <Link href={column.href} className="font-semibold text-white hover:underline hover:underline-offset-4">
                  {column.title}
                </Link>
              ) : (
                <p className="font-semibold text-white">{column.title}</p>
              )}
              {column.links.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-8 text-[0.8125rem] leading-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <address className="flex flex-col gap-1 text-white/80 not-italic">
            {info.map((line, i) => (
              <p key={i} className="flex flex-wrap items-center gap-x-3">
                {line.map((item, j) => (
                  <span key={item.value} className="flex items-center gap-x-3">
                    {j > 0 && <span aria-hidden className="h-3 w-px bg-white/25" />}
                    <span>
                      {item.label && <span className="mr-1.5 text-white/60">{item.label}</span>}
                      {item.href ? (
                        <a href={item.href} className="hover:text-white">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </span>
                  </span>
                ))}
              </p>
            ))}
          </address>
          <p className="shrink-0 text-white/55">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
