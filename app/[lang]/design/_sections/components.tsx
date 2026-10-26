import { ArrowRight, Download, Flame, Gauge, ShieldCheck } from "lucide-react";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { SectionHeading } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Dictionary } from "@/content/ko";

const lightVariants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost"];
const darkVariants: ButtonVariant[] = ["inverse", "inverse-outline"];

function Panel({ title, children, dark }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={dark ? "rounded-card bg-brand-950 p-6" : "rounded-card border border-line bg-canvas p-6"}>
      <p className={dark ? "mb-5 text-sm font-semibold text-white/60" : "mb-5 text-sm font-semibold text-ink-muted"}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function Components({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="Logo · 시그니춰 / 세로조합 / 심볼 (CI 원본)">
        <div className="flex flex-wrap items-center gap-8">
          <Logo className="w-48" />
          <Logo type="vertical" className="w-28" />
          <Logo type="symbol" className="w-14" />
        </div>
      </Panel>
      <Panel title="Logo · 반전 (어두운 배경)" dark>
        <div className="flex flex-wrap items-center gap-8">
          <Logo tone="white" className="w-48" />
          <Logo type="vertical" tone="white" className="w-28" />
          <Logo type="symbol" tone="white" className="w-14" />
        </div>
      </Panel>

      <Panel title="Button · 밝은 배경">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            {lightVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">
              {dict.hero.primaryCta} <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Download className="size-4" /> {dict.hero.secondaryCta}
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Panel>
      <Panel title="Button · 어두운 배경" dark>
        <div className="flex flex-wrap gap-3">
          {darkVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
          <Button variant="inverse" size="lg">
            {dict.hero.primaryCta} <ArrowRight className="size-4" />
          </Button>
        </div>
      </Panel>

      <Panel title="Status Badge · CI 서브 컬러 → 상태">
        <div className="flex flex-wrap gap-3">
          <StatusBadge status="normal">{dict.status.normal}</StatusBadge>
          <StatusBadge status="warning">{dict.status.warning}</StatusBadge>
          <StatusBadge status="alert">{dict.status.alert}</StatusBadge>
        </div>
      </Panel>
      <Panel title="Certification chip">
        <div className="flex flex-wrap gap-3">
          {[
            { icon: ShieldCheck, label: "KETI 성능 검증" },
            { icon: Gauge, label: "KESCO 규격 준수" },
            { icon: Flame, label: "AI 화재 예지" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink-muted"
            >
              <Icon className="size-4 text-eco-500" /> {label}
            </span>
          ))}
        </div>
      </Panel>

      <div className="lg:col-span-2">
        <Panel title="Section heading">
          <SectionHeading
            eyebrow="Solutions"
            title={dict.product.name}
            description={dict.highlights[1].description}
          />
        </Panel>
      </div>
    </div>
  );
}
