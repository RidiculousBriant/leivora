import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutUser } from "@/lib/auth";
import { categories } from "@/types/NavigationCategories";
import type { ThemeKey } from "@/components/shared/HomeHeader/themes";

import ThemeSelector from "@/components/shared/HomeHeader/ThemeSelector";

type MobileNavigationProps = {
  selectedTheme: ThemeKey;
  onThemeChange: (value: ThemeKey) => void;
  onClose: () => void;
  isClosing: boolean;
  loggedIn: boolean;
};

const themeLinkClasses: Record<ThemeKey, string> = {
  slate: "text-slate-700 hover:bg-slate-100",
  blue: "text-blue-700 hover:bg-blue-50",
  emerald: "text-emerald-700 hover:bg-emerald-50",
  rose: "text-rose-700 hover:bg-rose-50",
};

function getSafeTheme(value: unknown): ThemeKey {
  switch (value) {
    case "slate":
    case "blue":
    case "emerald":
    case "rose":
      return value;
    default:
      return "slate";
  }
}

export default function MobileNavigation({
  selectedTheme,
  onThemeChange,
  onClose,
  isClosing,
  loggedIn,
}: MobileNavigationProps) {
  const validTheme = getSafeTheme(selectedTheme);
  const loginClass = themeLinkClasses[validTheme];

  const [isVisible, setIsVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const navigate = useNavigate();

  // Keep the menu positioned below the header.
  useEffect(() => {
    const header = document.querySelector("header");

    if (!header) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  // Animate the menu into view after mounting.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function handleLogout() {
    LogoutUser();

    // Notify the header and other components that authentication changed.
    window.dispatchEvent(new Event("leivora-auth-change"));

    // Close the mobile menu and return to the home page.
    onClose();
    navigate("/", { replace: true });
  }

  const isHidden = isClosing || !isVisible;

  return (
    <nav
      aria-label="Mobile product categories"
      aria-hidden={isClosing}
      style={{
        top: `${headerHeight}px`,
        height: `calc(100dvh - ${headerHeight}px)`,
      }}
      className={cn(
        "fixed inset-x-0 z-[90] md:hidden",
        "overflow-x-hidden overflow-y-auto overscroll-y-contain",
        "border-t border-zinc-200 bg-zinc-50 text-zinc-900 shadow-xl",
        "px-4 pb-8 pt-5",
        "transition-[opacity,transform] duration-300 ease-in-out",
        isHidden
          ? "pointer-events-none -translate-y-3 opacity-0"
          : "translate-y-0 opacity-100",
        "[-webkit-overflow-scrolling:touch]",
      )}
      onTransitionEnd={(event) => {
        if (
          isClosing &&
          event.target === event.currentTarget &&
          event.propertyName === "opacity"
        ) {
          onClose();
        }
      }}
    >
      <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col">
        {/* Mobile theme selector */}
        <div className="relative z-[100] mb-4 flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900">Color theme</p>

            <p className="mt-1 text-xs text-zinc-500">
              Customize the store's accent colors.
            </p>
          </div>

          <div className="relative z-[110] shrink-0">
            <ThemeSelector
              id="mobile-theme"
              selectedTheme={validTheme}
              onThemeChange={onThemeChange}
            />
          </div>
        </div>

        {/* Expandable product categories */}
        <div className="flex-1">
          {categories.map((category) => (
            <details
              key={category.label}
              className="group border-b border-zinc-200"
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-4",
                  "text-sm font-medium text-zinc-700 transition-colors",
                  "hover:bg-zinc-100 hover:text-zinc-950",
                )}
              >
                <span>{category.label}</span>

                <ChevronDown
                  className={cn(
                    "size-4 text-zinc-500 transition-transform duration-200",
                    "group-open:rotate-180",
                  )}
                />
              </summary>

              <div className="pb-3 pl-4">
                <p className="px-3 py-2 text-xs text-zinc-500">
                  {category.description}
                </p>

                <Link
                  to={category.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                    loginClass,
                  )}
                >
                  View all {category.label.toLowerCase()}
                </Link>

                {category.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Logout button at the bottom */}
        {loggedIn && (
          <div className="mt-6 border-t border-zinc-200 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className={cn(
                "flex h-11 w-full items-center justify-center gap-2 rounded-xl",
                "border-rose-500 bg-rose-500 text-sm font-medium text-white",
                "transition-colors hover:border-rose-600 hover:bg-rose-600 hover:text-white",
              )}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
