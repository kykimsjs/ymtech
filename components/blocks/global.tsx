import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ScrollTopButton } from "@/components/ui/scroll-top-button";

export type AnnouncementBarProps = { text: string; linkLabel: string; href: string };

// 참고: 아이오크롭스 상단 공지 바 (자료 무료 다운로드 유도)
export function AnnouncementBar({ text, linkLabel, href }: AnnouncementBarProps) {
  return (
    <div className="bg-eco-50 text-eco-800">
      <p className="container-page py-2.5 text-center text-sm">
        {text} <span className="mx-1 text-eco-300">|</span>
        <Link href={href} className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
          {linkLabel} <ArrowRight className="size-3.5" />
        </Link>
      </p>
    </div>
  );
}

export type SiteFooterProps = {
  columns: { title: string; links: string[] }[];
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
              <p className="font-semibold text-white">{column.title}</p>
              {column.links.map((link) => (
                <Link key={link} href="#" className="hover:text-white">
                  {link}
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
