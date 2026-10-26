import type { ComponentProps, ComponentType } from "react";
import { ConsultCard, ContactMap, CtaBanner } from "./conversion";
import { BenefitBand, CardGrid, MediaText, Story, TileGrid } from "./features";
import { AnnouncementBar, SiteFooter } from "./global";
import { HeroMedia, HeroSplit, PageTitle } from "./hero";
import { IntroSplit, Statement } from "./intro";
import { AnchorTabs } from "./anchor-tabs";
import { KeyPoints, QuickActions } from "./points";
import { DashboardPreview, LogoGrid, ProductCert, ProductGrid, StatsGallery, Timeline } from "./proof";
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
  "product-cert": ProductCert,
  "dashboard-preview": DashboardPreview,
  "product-grid": ProductGrid,
  "logo-grid": LogoGrid,
  timeline: Timeline,
  "consult-card": ConsultCard,
  "cta-banner": CtaBanner,
  "contact-map": ContactMap,
} as const;

export type BlockType = keyof typeof blockComponents;

export type Block = {
  [K in BlockType]: { type: K; key?: string; data: ComponentProps<(typeof blockComponents)[K]> };
}[BlockType];

export function Blocks({ items }: { items: Block[] }) {
  return items.map((block, i) => {
    // 타입과 데이터의 짝은 Block 유니온이 보장한다
    const Component = blockComponents[block.type] as ComponentType<typeof block.data>;
    return <Component key={block.key ?? `${block.type}-${i}`} {...block.data} />;
  });
}
