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
    icon: "/logos/logo.png",
  },
  navigationLinks: [
    { href: "/sensor-dashboard", label: "Sensor Dashboard" },
    { href: "/plant-health", label: "Plant Health" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/chat-v3", label: "Chat" },
  ],
};
