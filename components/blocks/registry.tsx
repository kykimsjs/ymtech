import type { ComponentProps, ComponentType } from "react";
import { ClosingCta, ConsultCard, ContactMap, CtaBanner } from "./conversion";
import { BenefitBand, CardGrid, MediaText, Story, TileGrid } from "./features";
import { AnnouncementBar, SiteFooter } from "./global";
import { HeroMedia, HeroSplit, PageTitle } from "./hero";
import { IntroSplit, Statement } from "./intro";
import { AnchorTabs } from "./anchor-tabs";
import { FeatureRows } from "./feature-rows";
import { KeyPoints, QuickActions } from "./points";
import { DashboardPreview, LogoGrid, ProductCert, ProductGrid, StatsGallery, Timeline, TrustFigures } from "./proof";
import { SiteHeader } from "./site-header";
import { AudienceTabs, GalleryTabs, TabsMedia } from "./tab-blocks";

// 블록 종류 → 컴포넌트. 페이지는 이 블록들을 순서대로 이어 붙인 목록이다.
export const blockComponents = {
  "announcement-bar": AnnouncementBar,
  "site-header": SiteHeader,
  "site-footer": SiteFooter,
  "hero-media": HeroMedia,
  "hero-split": HeroSplit,
  "page-title": PageTitle,
  "anchor-tabs": AnchorTabs,
  "intro-split": IntroSplit,
  statement: Statement,
  "key-points": KeyPoints,
  "feature-rows": FeatureRows,
  "quick-actions": QuickActions,
  "tile-grid": TileGrid,
  "card-grid": CardGrid,
  "media-text": MediaText,
  "benefit-band": BenefitBand,
  story: Story,
  "tabs-media": TabsMedia,
  "audience-tabs": AudienceTabs,
  "gallery-tabs": GalleryTabs,
  "stats-gallery": StatsGallery,
  "trust-figures": TrustFigures,
  "product-cert": ProductCert,
  "dashboard-preview": DashboardPreview,
  "product-grid": ProductGrid,
  "logo-grid": LogoGrid,
  timeline: Timeline,
  "consult-card": ConsultCard,
  "cta-banner": CtaBanner,
  "closing-cta": ClosingCta,
  "contact-map": ContactMap,
} as const;

export type BlockType = keyof typeof blockComponents;

export type Block = {
  [K in BlockType]: {
    type: K;
    key?: string;
    /** 자료가 없어 운영 화면에서 뺄 때 그 이유 (예: "현장 사진 대기") */
    hidden?: string;
    data: ComponentProps<(typeof blockComponents)[K]>;
  };
}[BlockType];

// showHidden: 시안에서는 숨김 블록도 "운영 시 숨김" 표시를 달아 보여준다
export function Blocks({ items, showHidden = false }: { items: Block[]; showHidden?: boolean }) {
  return items.map((block, i) => {
    if (block.hidden && !showHidden) return null;
    // 타입과 데이터의 짝은 Block 유니온이 보장한다
    const Component = blockComponents[block.type] as ComponentType<typeof block.data>;
    const key = block.key ?? `${block.type}-${i}`;
    if (!block.hidden) return <Component key={key} {...block.data} />;
    return (
      <div key={key} className="relative">
        <p className="absolute top-2 right-3 z-20 rounded-full bg-danger px-3 py-1 text-xs font-semibold whitespace-nowrap text-white">
          운영 시 숨김 · {block.hidden}
        </p>
        <div className="opacity-50">
          <Component {...block.data} />
        </div>
      </div>
    );
  });
}
