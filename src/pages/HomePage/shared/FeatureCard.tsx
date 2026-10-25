import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { FeatureCardProps } from "@/types/FeatureCardProps";

export default function FeatureCard({
  feature,
  active,
  onClick,
}: FeatureCardProps) {
  const Icon = feature.icon;
  const shouldReduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`
        group relative z-30 w-full min-w-0
        rounded-xl border border-zinc-200
        bg-zinc-50 text-left
        p-3.5 sm:rounded-2xl sm:p-5 lg:p-6
        shadow-sm ring-1 ring-zinc-200
        transition-[border-color,background-color,box-shadow,transform]
        duration-300
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--theme-primary,#18181b)]
        focus-visible:ring-offset-2
        ${
          active
            ? "feature-border shadow-md"
            : "hover:-translate-y-1 hover:shadow-lg"
        }
      `}
      style={{
        transform:
          shouldReduceMotion || active ? undefined : undefined,
      }}
    >
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        {/* Feature Icon */}
        <div
          className={`
            flex size-10 shrink-0 items-center justify-center
            rounded-lg sm:size-12 sm:rounded-xl
            ${
              active
                ? "feature-soft"
                : ""
            }
          `}
          style={{
            color: active
              ? "var(--theme-primary, #18181b)"
              : feature.color,
            backgroundColor: active
              ? undefined
              : `color-mix(in srgb, ${feature.color} 12%, #fafafa)`,
          }}
        >
          <Icon
            className="size-5 sm:size-6"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          {/* Title and Arrow */}
          <div className="flex min-w-0 items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 break-words text-sm font-bold leading-snug text-card-foreground sm:text-base">
              {feature.title}
            </h3>

            <ArrowUpRight
              aria-hidden="true"
              className={`
                mt-0.5 size-4 shrink-0
                transition-transform duration-300
                sm:size-[18px]
                ${
                  active
                    ? "rotate-45"
                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                }
              `}
              style={{
                color: active
                  ? "var(--theme-primary, #18181b)"
                  : feature.color,
                transitionDuration: shouldReduceMotion
                  ? "0ms"
                  : undefined,
              }}
            />
          </div>

          {/* Description */}
          <p className="mt-1.5 break-words text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-sm sm:leading-6">
            {feature.description}
          </p>

          {/* Explore Feature */}
          <div
            className={`
              mt-2.5 flex items-center gap-1.5
              text-[11px] font-semibold
              sm:mt-3 sm:text-xs
            `}
            style={{
              color: active
                ? "var(--theme-primary, #18181b)"
                : feature.color,
            }}
          >
            <CheckCircle2
              className="size-3.5 shrink-0 sm:size-4"
              aria-hidden="true"
            />

            <span>Explore feature</span>
          </div>
        </div>
      </div>
    </button>
  );
}