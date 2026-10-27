import {
  Activity,
  ChartBar,
  ChartLine,
  Cloud,
  Cpu,
  Download,
  Factory,
  FileSpreadsheet,
  MessageSquare,
  MonitorPlay,
  Flame,
  Gauge,
  Leaf,
  Power,
  ShieldCheck,
  Thermometer,
  Users,
  Zap,
} from "lucide-react";

// 블록 데이터는 직렬화 가능한 값만 담도록 아이콘을 이름으로 넘긴다
export const icons = {
  activity: Activity,
  chart: ChartBar,
  chartLine: ChartLine,
  cloud: Cloud,
  cpu: Cpu,
  download: Download,
  factory: Factory,
  excel: FileSpreadsheet,
  message: MessageSquare,
  demo: MonitorPlay,
  flame: Flame,
  gauge: Gauge,
  leaf: Leaf,
  power: Power,
  shield: ShieldCheck,
  thermometer: Thermometer,
  users: Users,
  zap: Zap,
} as const;

export type IconName = keyof typeof icons;
