import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import type { NavigationCategory } from "@/types/NavigationCategories";
import type { ThemeKey } from "@/components/shared/HomeHeader/themes";

const THEME_STORAGE_KEY = "leivora-theme";

const validThemes: ThemeKey[] = ["slate", "blue", "emerald", "rose"];

const megaMenuThemeStyles: Record<
  ThemeKey,
  {
    titleHover: string;
    categoryHover: string;
    accent: string;
    divider: string;
  }
> = {
  slate: {
    titleHover: "hover:text-zinc-700",
    categoryHover: "hover:bg-zinc-100 hover:text-zinc-900",
    accent: "text-zinc-700",
    divider: "bg-zinc-200",
  },
  blue: {
    titleHover: "hover:text-blue-600",
    categoryHover: "hover:bg-blue-50 hover:text-blue-700",
    accent: "text-blue-600",
    divider: "bg-blue-100",
  },
  emerald: {
    titleHover: "hover:text-emerald-700",
    categoryHover: "hover:bg-emerald-50 hover:text-emerald-800",
    accent: "text-emerald-700",
    divider: "bg-emerald-100",
  },
  rose: {
    titleHover: "hover:text-rose-600",
    categoryHover: "hover:bg-rose-50 hover:text-rose-700",
    accent: "text-rose-600",
    divider: "bg-rose-100",
  },
};

function getSavedTheme(): ThemeKey {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme && validThemes.includes(savedTheme as ThemeKey)) {
      return savedTheme as ThemeKey;
    }
  } catch {
    console.log("Error Theme");
  }

  return "slate";
}

interface CategoryMegaMenuProps {
  category: NavigationCategory;
}

export default function CategoryMegaMenu({ category }: CategoryMegaMenuProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(getSavedTheme);

  useEffect(() => {
    function syncTheme() {
      setSelectedTheme(getSavedTheme());
    }

    window.addEventListener("leivora-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("leivora-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const theme = megaMenuThemeStyles[selectedTheme];

  return (
    <NavigationMenuContent className="overflow-hidden rounded-lg border border-zinc-200 bg-[#fafafa] shadow-lg">
      <div className="grid w-[680px] grid-cols-[1fr_1.1fr] gap-6 bg-[#fafafa] p-5">
        {/* Category links */}
        <div className="min-w-0">
          <Link
            to={category.href}
            className={`text-base font-semibold text-zinc-900 transition-colors ${theme.titleHover}`}
          >
            {category.label}
          </Link>

          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {category.description}
          </p>

          <div className={`my-4 h-px ${theme.divider}`} />

          <ul className="grid gap-1">
            {category.items.map((item) => (
              <li key={item.label}>
                <NavigationMenuLink
                  render={<Link to={item.href} />}
                  className={`flex w-full rounded-lg px-3 py-2.5 text-sm text-zinc-600 font-medium transition-colors ${theme.categoryHover}`}
                >
                  {item.label}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>

        {category.promotion && (
          <Link
            to={category.promotion.href}
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl bg-zinc-100 p-5"
          >
            <img
              src={category.promotion.image}
              alt={category.promotion.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="relative z-10 text-white">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/80">
                {category.promotion.eyebrow}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {category.promotion.title}
              </h3>

              <p className="mt-1 text-sm leading-5 text-white/80">
                {category.promotion.description}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                {category.promotion.buttonLabel}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </NavigationMenuContent>
  );
}
