import { useEffect, useState } from "react";
import {
  FileText,
  ImageOff,
  Maximize2,
  ShieldCheck,
} from "lucide-react";

import FeatureCard from "./shared/FeatureCard";
import type { Feature } from "@/types/FeatureCardProps";
import type { ThemeKey } from "@/components/shared/HomeHeader/themes";
import modelImage from "@/assets/model.png";

type FeatureSectionProps = {
  productImage?: string;
  productName?: string;
};

type FeatureTheme = {
  accent: string;
  accentRgb: string;
  softBackground: string;
  border: string;
  arrow: string;
  glow: string;
};

const featureThemes: Record<ThemeKey, FeatureTheme> = {
  slate: {
    accent: "#475569",
    accentRgb: "71, 85, 105",
    softBackground: "rgba(71, 85, 105, 0.09)",
    border: "rgba(71, 85, 105, 0.25)",
    arrow: "#64748b",
    glow: "rgba(71, 85, 105, 0.13)",
  },
  blue: {
    accent: "#2563eb",
    accentRgb: "37, 99, 235",
    softBackground: "rgba(37, 99, 235, 0.09)",
    border: "rgba(37, 99, 235, 0.25)",
    arrow: "#3b82f6",
    glow: "rgba(37, 99, 235, 0.15)",
  },
  emerald: {
    accent: "#059669",
    accentRgb: "5, 150, 105",
    softBackground: "rgba(5, 150, 105, 0.09)",
    border: "rgba(5, 150, 105, 0.25)",
    arrow: "#10b981",
    glow: "rgba(5, 150, 105, 0.14)",
  },
  rose: {
    accent: "#e11d48",
    accentRgb: "225, 29, 72",
    softBackground: "rgba(225, 29, 72, 0.08)",
    border: "rgba(225, 29, 72, 0.24)",
    arrow: "#f43f5e",
    glow: "rgba(225, 29, 72, 0.14)",
  },
};

const featureDefinitions = [
  {
    id: "quality",
    title: "Quality",
    description:
      "Made with quality materials for long-lasting comfort and durability.",
    icon: ShieldCheck,
  },
  {
    id: "size",
    title: "Size",
    description:
      "Explore available sizes and find the right fit for your needs.",
    icon: Maximize2,
  },
  {
    id: "description",
    title: "Description",
    description:
      "Discover the product's important features, materials, and details.",
    icon: FileText,
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    subtitle: "Quality you can trust",
  },
  {
    icon: Maximize2,
    title: "Multiple Sizes",
    subtitle: "Find your perfect fit",
  },
  {
    icon: FileText,
    title: "Detailed Information",
    subtitle: "Know what you're getting",
  },
  {
    icon: ShieldCheck,
    title: "Built to Last",
    subtitle: "Made for everyday use",
  },
];

function getInitialTheme(): ThemeKey {
  try {
    const savedTheme = localStorage.getItem("leivora-theme");

    if (
      savedTheme === "slate" ||
      savedTheme === "blue" ||
      savedTheme === "emerald" ||
      savedTheme === "rose"
    ) {
      return savedTheme;
    }
  } catch {
    return "slate";
  }

  return "slate";
}

export default function FeatureSection({
  productImage,
  productName = "Featured Product",
}: FeatureSectionProps) {
  const [activeFeature, setActiveFeature] = useState("quality");
  const [imageError, setImageError] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>(getInitialTheme);

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getInitialTheme());
    };

    window.addEventListener("leivora-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("leivora-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const colors = featureThemes[theme];

  const features: Feature[] = featureDefinitions.map((feature) => ({
    ...feature,
    color: colors.accent,
  }));

  const imageSrc = productImage || modelImage;

  return (
    <section
      id="features"
      className="feature-section relative overflow-hidden px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-16"
      style={
        {
          "--feature-accent": colors.accent,
          "--feature-accent-rgb": colors.accentRgb,
          "--feature-soft": colors.softBackground,
          "--feature-border": colors.border,
          "--feature-arrow": colors.arrow,
          "--feature-glow": colors.glow,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
            Every Detail.
            <span className="feature-accent block">
              Worth Discovering.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Get to know your product better. Follow the arrows to discover its
            quality, available sizes, and key details.
          </p>
        </header>

        <div className="relative mx-auto max-w-6xl">
          <div className="feature-glow pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-300 sm:size-96" />

          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="feature-arrowhead-quality"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path className="feature-arrow" d="M1 1 L8 5 L1 9" />
              </marker>

              <marker
                id="feature-arrowhead-size"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path className="feature-arrow" d="M1 1 L8 5 L1 9" />
              </marker>

              <marker
                id="feature-arrowhead-description"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path className="feature-arrow" d="M1 1 L8 5 L1 9" />
              </marker>
            </defs>

            <path
              className="feature-arrow feature-arrow-path"
              d="M270 115 C335 105 365 175 425 230"
              markerEnd="url(#feature-arrowhead-quality)"
            />

            <path
              className="feature-arrow feature-arrow-path"
              d="M730 120 C665 105 630 145 575 190"
              markerEnd="url(#feature-arrowhead-size)"
            />

            <path
              className="feature-arrow feature-arrow-path"
              d="M720 405 C650 420 610 375 560 345"
              markerEnd="url(#feature-arrowhead-description)"
            />
          </svg>

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-5">
            <div className="order-2 lg:order-1">
              <FeatureCard
                feature={features[0]}
                active={activeFeature === "quality"}
                onClick={() => setActiveFeature("quality")}
              />
            </div>

            <div className="relative order-1 flex min-h-[280px] items-center justify-center sm:min-h-[400px] lg:order-2">
              <div className="feature-soft feature-border absolute size-56 rounded-full border transition-colors duration-300 sm:size-80" />

              <div className="feature-border absolute size-64 rounded-full border border-dashed transition-colors duration-300 sm:size-[23rem]" />

              <div className="relative z-10 w-full max-w-md">
                {imageError ? (
                  <div className="mx-auto flex min-h-[280px] max-w-xs flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
                    <ImageOff className="size-10 text-muted-foreground" />

                    <p className="font-semibold text-foreground">
                      Image not found
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Check that model.png exists in src/assets.
                    </p>
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt={productName}
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                    className="mx-auto max-h-[360px] w-full object-contain drop-shadow-[0_24px_24px_rgba(15,23,42,0.14)] sm:max-h-[410px]"
                  />
                )}

                <div className="mt-2 text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Featured Collection
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-foreground">
                    {productName}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Designed for everyday excellence
                  </p>
                </div>
              </div>
            </div>

            <div className="order-3 flex flex-col gap-5 lg:pt-16">
              <FeatureCard
                feature={features[1]}
                active={activeFeature === "size"}
                onClick={() => setActiveFeature("size")}
              />

              <FeatureCard
                feature={features[2]}
                active={activeFeature === "description"}
                onClick={() => setActiveFeature("description")}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="feature-soft feature-accent flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
                <Icon className="size-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  {title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}