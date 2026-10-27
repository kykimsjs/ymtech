import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { icons, type IconName } from "./icons";
import { Media, type MediaData } from "./media";
import { Tabs } from "./tabs";

export type TabsMediaProps = {
  title: string;
  tabs: { label: string; text: string; media: MediaData; action?: { label: string; href: string } }[];
  id?: string;
};

// 참고: 여의시스템 "전력 모니터링 애플리케이션 활성화" — 밑줄 탭, 왼쪽 글 + 각진 테두리 버튼, 오른쪽 사진
export function TabsMedia({ title, tabs, id }: TabsMediaProps) {
  return (
    <section id={id} className="block-y scroll-mt-32 bg-surface">
      <div className="container-page">
        <h2 className="text-center text-display font-bold">{title}</h2>
        <div className="mt-12">
          <Tabs
            labels={tabs.map((tab) => tab.label)}
            panels={tabs.map((tab) => (
              <div key={tab.label} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col items-start gap-8">
                  <p className="text-[0.9375rem] leading-[1.8] text-ink-muted">{tab.text}</p>
                  {tab.action && (
                    <ButtonLink href={tab.action.href} variant="outline" shape="square" className="border-eco-600 text-eco-700 hover:border-eco-700">
                      {tab.action.label}
                    </ButtonLink>
                  )}
                </div>
                <Media media={tab.media} sizes="(min-width: 1024px) 600px, 100vw" className="aspect-[16/9]" />
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

export type AudienceTabsProps = {
  audiences: {
    label: string;
    summary: string;
    columns: { icon: IconName; title: string; points: string[] }[];
  }[];
  id?: string;
};

// 참고: 안심해 기대효과 — 큰 제목 탭(선택 안 된 탭은 회색), 한 줄 요약, 원형 아이콘 3열 + 점 목록
export function AudienceTabs({ audiences, id }: AudienceTabsProps) {
  return (
    <section id={id} className="block-y bg-graphite-900 text-white">
      <div className="container-page">
        <Tabs
          look="headline"
          tone="dark"
          labels={audiences.map((a) => a.label)}
          panels={audiences.map((audience) => (
            <div key={audience.label}>
              <p className="text-lg font-semibold">{audience.summary}</p>
              <div className="mt-14 grid gap-12 sm:grid-cols-3">
                {audience.columns.map((column) => {
                  const Icon = icons[column.icon];
                  return (
                    <div key={column.title} className="flex flex-col items-center">
                      <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
                        <Icon strokeWidth={1.5} className="size-7" />
                      </span>
                      <h3 className="mt-5 text-center text-title font-bold">{column.title}</h3>
                      <ul className="mt-6 flex flex-col gap-2 text-sm text-white/75">
                        {column.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-white/60" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        />
      </div>
    </section>
  );
}

export type GalleryTabsProps = {
  title: string;
  description: string;
  groups: { label: string; items: { caption: string; media: MediaData }[] }[];
  id?: string;
};

// 참고: 안심해 설치사례 — 버튼형 탭으로 설치 유형을 고르고, 실제 설치 사진 4열 + 아래 흰 캡션 칸
export function GalleryTabs({ title, description, groups, id }: GalleryTabsProps) {
  return (
    <section id={id} className="block-y bg-graphite-900 text-white">
      <div className="container-page">
        <h2 className="text-display font-bold">{title}</h2>
        <p className="mt-4 text-lg font-semibold text-white/85">{description}</p>
        <div className="mt-12">
          <Tabs
            look="segmented"
            tone="dark"
            labels={groups.map((g) => g.label)}
            panels={groups.map((group) => (
              <ul key={group.label} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li key={item.caption} className="overflow-hidden">
                    <Media media={item.media} tone="dark" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
                    <p className={cn("bg-white py-4 text-center text-[0.9375rem] font-semibold text-ink")}>{item.caption}</p>
                  </li>
                ))}
              </ul>
            ))}
          />
        </div>
        <p className="mt-10 flex items-center gap-1 text-sm text-white/60">
          설치 사례 전체 보기 <ArrowRight className="size-3.5" />
        </p>
      </div>
    </section>
  );
}
