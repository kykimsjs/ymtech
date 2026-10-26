import type { Dictionary } from "./ko";

const en: Dictionary = {
  meta: {
    siteName: "YM INNOTECH",
    title: "YM INNOTECH | AIoT Energy & Fire Management for Smart Farms",
    description:
      "An AIoT energy and fire management solution that predicts distribution-panel fires early and cuts power automatically.",
  },
  nav: {
    company: "Company",
    solutions: "Solutions",
    tech: "R&D & Tech",
    reference: "Reference",
    support: "Support",
    contact: "Contact Sales",
  },
  hero: {
    eyebrow: "AIoT Smart Farm Energy & Fire Management",
    titleLead: "From fire prevention",
    titleAccent: "to energy optimization",
    description:
      "Power and environmental sensing, AI anomaly prediction and automatic cut-off in a single module — safety and efficiency for every smart farm.",
    primaryCta: "Request a Pilot",
    secondaryCta: "Download Brochure",
  },
  highlights: [
    {
      title: "Panel-mounted, compact",
      description: "An all-in-one module that installs directly inside the distribution panel.",
    },
    {
      title: "Power + environment sensing",
      description:
        "Three-phase voltage and current, temperature, humidity, flame, flood and vibration — analyzed by AI for early warning.",
    },
    {
      title: "Cut-off within 10 seconds",
      description: "Power is cut via SSR the moment an anomaly is detected, with real-time alerts on the web platform.",
    },
  ],
  stats: [
    { value: "±2%", label: "Voltage & current accuracy, verified by KETI" },
    { value: "10 s", label: "Automatic cut-off after detection" },
    { value: "3-phase", label: "Real-time RST·UVW power sensing" },
  ],
  status: {
    normal: "Normal",
    warning: "Warning",
    alert: "Fire Alert",
  },
  product: {
    name: "Eeco-Vital Module",
    caption: "Intelligent power & environment module",
  },
};

export default en;
