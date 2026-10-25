import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, UserRound, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getCurrentEmail, isLoggedIn } from "@/lib/auth";

import ThemeSelector from "@/components/shared/HomeHeader/ThemeSelector";
import ProductSearch from "@/components/shared/HomeHeader/ProductSearch";
import DesktopNavigation from "@/components/shared/HomeHeader/DesktopNavigation";
import MobileNavigation from "@/components/shared/HomeHeader/MobileNavigation";
import AuthLinks from "@/components/shared/HomeHeader/Authentication";
import CartDropdown from "@/components/shared/CartDropdown";

import {
  themeStyles,
  type ThemeKey,
} from "@/components/shared/HomeHeader/themes";

const THEME_STORAGE_KEY = "leivora-theme";

const validThemes: ThemeKey[] = ["slate", "blue", "emerald", "rose"];

function getSavedTheme(): ThemeKey {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme && validThemes.includes(savedTheme as ThemeKey)) {
      return savedTheme as ThemeKey;
    }
  } catch {
    return "slate";
  }

  return "slate";
}

function getSafeTheme(value: unknown): ThemeKey {
  if (typeof value === "string" && validThemes.includes(value as ThemeKey)) {
    return value as ThemeKey;
  }

  return "slate";
}

export default function HomePageHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(getSavedTheme);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [userEmail, setUserEmail] = useState<string | null>(getCurrentEmail);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const validTheme = getSafeTheme(selectedTheme);
  const activeTheme = themeStyles[validTheme];

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, validTheme);
    } catch {
      // Error to
    }

    window.dispatchEvent(new Event("leivora-theme-change"));
  }, [validTheme]);

  useEffect(() => {
    function syncAuth() {
      setLoggedIn(isLoggedIn());
      setUserEmail(getCurrentEmail());
    }

    syncAuth();

    window.addEventListener("leivora-auth-change", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("leivora-auth-change", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setProfileMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function closeMobileMenu() {
    if (mobileMenuOpen && !mobileMenuClosing) {
      setMobileMenuClosing(true);
    }
  }

  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    setProfileMenuOpen(false);
    setMobileMenuClosing(false);
    setMobileMenuOpen(true);
  }

  function handleMobileMenuClose() {
    setMobileMenuOpen(false);
    setMobileMenuClosing(false);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    setIsSearchFocused(false);
    setActiveSuggestion(-1);
    setMobileMenuOpen(false);
    setMobileMenuClosing(false);
    setProfileMenuOpen(false);

    navigate(`/shop?search=${encodeURIComponent(query)}`);
  }

  function handleSuggestionClick(slug: string) {
    setIsSearchFocused(false);
    setActiveSuggestion(-1);
    setSearchQuery("");
    setMobileMenuOpen(false);
    setMobileMenuClosing(false);
    setProfileMenuOpen(false);

    navigate(`/product/${slug}`);
  }

  const searchProps = {
    searchQuery,
    setSearchQuery,
    isSearchFocused,
    setIsSearchFocused,
    activeSuggestion,
    setActiveSuggestion,
    selectedTheme: validTheme,
    onSearch: handleSearch,
    onSuggestionClick: handleSuggestionClick,
  };

  const avatarLetter = (userEmail?.trim().charAt(0) || "U").toUpperCase();

  return (
    <header className="sticky top-0 z-[200] w-full border-b border-zinc-200 bg-zinc-50">
      <div className="relative z-[200] mx-auto flex min-h-16 max-w-7xl items-center gap-3 bg-zinc-50 px-4 py-3 sm:px-6 sm:py-4 lg:px-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative z-10 shrink-0 text-zinc-900 hover:bg-zinc-100 hover:text-zinc-950 md:hidden"
          aria-label={
            mobileMenuOpen && !mobileMenuClosing ? "Close menu" : "Open menu"
          }
          aria-expanded={mobileMenuOpen && !mobileMenuClosing}
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen && !mobileMenuClosing ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>

        <Link
          to="/"
          aria-label="Leivora home"
          onClick={closeMobileMenu}
          className={cn(
            "relative z-10 brand-logo shrink-0 text-xl transition-colors sm:text-2xl",
            activeTheme.logo,
          )}
        >
          LEIVORA
        </Link>

        <div className="relative z-10 hidden min-w-0 flex-1 md:block">
          <ProductSearch {...searchProps} />
        </div>

        <div className="relative z-[300] ml-auto flex shrink-0 items-center gap-3">
          <CartDropdown />

          <div className="flex items-center gap-2 md:hidden">
            {loggedIn && (
              <div className="relative z-[170]">
                <button
                  type="button"
                  aria-label="Open profile menu"
                  aria-expanded={profileMenuOpen}
                  onClick={() => setProfileMenuOpen((open) => !open)}
                  className="relative z-[172] flex size-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white ring-2 ring-zinc-200 transition-colors hover:bg-zinc-700"
                >
                  {avatarLetter}
                </button>

                {profileMenuOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="Close profile menu"
                      className="fixed inset-0 z-[171] cursor-default"
                      onClick={() => setProfileMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-[173] mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 text-zinc-900 shadow-xl">
                      <div className="border-b border-zinc-100 px-3 py-3">
                        <p className="text-xs font-medium text-zinc-500">
                          Signed in as
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-zinc-900">
                          {userEmail}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                      >
                        <UserRound
                          className="size-5 shrink-0"
                          strokeWidth={2}
                        />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        to="/notifications"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                      >
                        <Bell className="size-5 shrink-0" strokeWidth={2} />
                        <span>Notifications</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <AuthLinks selectedTheme={validTheme} />
          </div>

          <div className="hidden sm:block">
            <ThemeSelector
              id="desktop-theme"
              selectedTheme={validTheme}
              onThemeChange={setSelectedTheme}
            />
          </div>
        </div>
      </div>

      <div className="relative z-[120] mx-auto mt-0 w-full max-w-7xl bg-zinc-50 px-4 pb-4 pt-1 sm:px-6 sm:pt-2 md:hidden lg:px-0">
        <ProductSearch {...searchProps} isMobile />
      </div>

      <div className="relative z-[110] bg-zinc-50">
        <DesktopNavigation />
      </div>

      {mobileMenuOpen && (
        <MobileNavigation
          selectedTheme={validTheme}
          onThemeChange={setSelectedTheme}
          isClosing={mobileMenuClosing}
          onClose={handleMobileMenuClose}
          loggedIn={loggedIn}
        />
      )}
    </header>
  );
}