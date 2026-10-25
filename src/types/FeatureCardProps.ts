import type { LucideIcon } from "lucide-react";

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type FeatureCardProps = {
  feature: Feature;
  active: boolean;
  onClick: () => void;
};
