import { LucideIcon } from "lucide-react";

export interface HeaderLink {
  href: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

export interface HeaderConfig {
  brand: {
    title: string;
    icon: string;
  };
  navigationLinks: HeaderLink[];
}

export const headerConfig: HeaderConfig = {
  brand: {
    title: "AgroLens",
    icon: "/logos/aw-logo-2.png",
  },
  navigationLinks: [
    { href: "/plan", label: "Sensor Dashboard" },
    { href: "/map", label: "Weather Map" },
    { href: "/briefing", label: "Weather Briefing" },
  ],
};
