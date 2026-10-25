import { useMemo } from "react";
import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpLeft, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";

import { themeStyles, type ThemeKey } from "./themes";

export type ProductSearchProps = {
  isMobile?: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  isSearchFocused: boolean;
  setIsSearchFocused: Dispatch<SetStateAction<boolean>>;
  activeSuggestion: number;
  setActiveSuggestion: Dispatch<SetStateAction<number>>;
  selectedTheme: ThemeKey;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
  onSuggestionClick: (slug: string) => void;
};

const searchThemeColors: Record<
  ThemeKey,
  {
    hover: string;
    active: string;
    border: string;
    accent: string;
    accentText: string;
    focusRing: string;
  }
> = {
  slate: {
    hover: "hover:bg-slate-50",
    active: "bg-slate-100",
    border: "border-slate-200",
    accent: "bg-slate-50",
    accentText: "text-slate-700",
    focusRing: "focus-visible:ring-slate-300",
  },
  blue: {
    hover: "hover:bg-blue-50",
    active: "bg-blue-50",
    border: "border-blue-200",
    accent: "bg-blue-50",
    accentText: "text-blue-700",
    focusRing: "focus-visible:ring-blue-300",
  },
  emerald: {
    hover: "hover:bg-emerald-50",
    active: "bg-emerald-50",
    border: "border-emerald-200",
    accent: "bg-emerald-50",
    accentText: "text-emerald-700",
    focusRing: "focus-visible:ring-emerald-300",
  },
  rose: {
    hover: "hover:bg-rose-50",
    active: "bg-rose-50",
    border: "border-rose-200",
    accent: "bg-rose-50",
    accentText: "text-rose-700",
    focusRing: "focus-visible:ring-rose-300",
  },
};

export default function ProductSearch({
  isMobile = false,
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
  activeSuggestion,
  setActiveSuggestion,
  selectedTheme,
  onSearch,
  onSuggestionClick,
}: ProductSearchProps) {
  const navigate = useNavigate();
  const activeTheme = themeStyles[selectedTheme];
  const colors = searchThemeColors[selectedTheme];

  const inputId = isMobile ? "mobile-product-search" : "desktop-product-search";

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    const searchTerms = query.split(/\s+/);

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.description,
          product.slug,
          ...(product.colors ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
      })
      .slice(0, 5);
  }, [searchQuery]);

  const showSuggestions = isSearchFocused && searchQuery.trim().length > 0;

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsSearchFocused(false);
      setActiveSuggestion(-1);
      return;
    }

    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setIsSearchFocused(true);

      setActiveSuggestion((current) =>
        current >= suggestions.length - 1 ? 0 : current + 1,
      );

      return;
    }

    if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setIsSearchFocused(true);

      setActiveSuggestion((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );

      return;
    }

    if (event.key === "Enter" && activeSuggestion >= 0) {
      event.preventDefault();

      const selectedProduct = suggestions[activeSuggestion];

      if (selectedProduct) {
        onSuggestionClick(selectedProduct.slug);
      }
    }
  }

  function handleClearSearch() {
    setSearchQuery("");
    setActiveSuggestion(-1);
    setIsSearchFocused(true);

    document.getElementById(inputId)?.focus();
  }

  function handleSearchAll() {
    const query = searchQuery.trim();

    if (!query) return;

    setIsSearchFocused(false);
    setActiveSuggestion(-1);

    navigate(`/shop?search=${encodeURIComponent(query)}`);
  }

  return (
    <form
      onSubmit={onSearch}
      role="search"
      className={cn(
        "relative w-full",
        !isMobile && "mx-auto hidden max-w-xl flex-1 md:block",
        showSuggestions ? "z-[150]" : "z-10",
      )}
    >
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-20 size-4 -translate-y-1/2 text-zinc-400" />

        <Input
          id={inputId}
          type="search"
          placeholder={isMobile ? "Search something classy" : "Search Leivora"}
          autoComplete="off"
          role="combobox"
          aria-label="Search products"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls={`${inputId}-suggestions`}
          aria-activedescendant={
            activeSuggestion >= 0 && suggestions[activeSuggestion]
              ? `${inputId}-suggestion-${suggestions[activeSuggestion].id}`
              : undefined
          }
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setActiveSuggestion(-1);
            setIsSearchFocused(true);
          }}
          onFocus={() => setIsSearchFocused(true)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            window.setTimeout(() => {
              setIsSearchFocused(false);
              setActiveSuggestion(-1);
            }, 150);
          }}
          className={cn(
            "!relative !z-10 !border-zinc-300 !bg-white !text-zinc-900 !opacity-100",
            "w-full shadow-sm",
            isMobile
              ? "h-11 rounded-full pl-11 pr-11 text-sm"
              : "h-10 rounded-full pl-11 pr-11 text-sm",
            "placeholder:!text-zinc-400",
            "focus-visible:!border-zinc-400 focus-visible:!bg-white focus-visible:ring-1",
            activeTheme.focus,
            colors.focusRing,
            "[&::-webkit-search-cancel-button]:hidden",
          )}
        />

        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClearSearch}
            className={cn(
              "absolute right-3 top-1/2 z-20 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition-colors",
              colors.hover,
              "hover:text-zinc-900",
            )}
          >
            <X className="size-4" />
          </button>
        )}

        {showSuggestions && (
          <div
            id={`${inputId}-suggestions`}
            role="listbox"
            aria-label="Product suggestions"
            className={cn(
              "absolute left-0 right-0 top-full z-[160] mt-2 overflow-hidden rounded-2xl border border-zinc-200 !bg-white text-zinc-900 shadow-2xl",
              isMobile && "max-h-[min(65vh,420px)] overflow-y-auto",
            )}
          >
            {suggestions.length > 0 ? (
              <div className="bg-white p-2">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Suggested products
                </p>

                {suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    id={`${inputId}-suggestion-${product.id}`}
                    type="button"
                    role="option"
                    aria-selected={activeSuggestion === index}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={() => onSuggestionClick(product.slug)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors",
                      activeSuggestion === index
                        ? colors.active
                        : cn("bg-white", colors.hover),
                    )}
                  >
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      className={cn(
                        "size-12 shrink-0 rounded-lg border bg-zinc-100 object-cover sm:size-14",
                        colors.border,
                      )}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {product.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {product.category}
                        {product.colors && product.colors.length > 0
                          ? ` · ${product.colors.slice(0, 3).join(", ")}`
                          : ""}
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-semibold text-zinc-900 sm:text-sm">
                      ₱{product.price.toLocaleString("en-PH")}
                    </p>

                    <ArrowUpLeft
                      className={cn(
                        "hidden size-4 shrink-0 sm:block",
                        activeSuggestion === index
                          ? colors.accentText
                          : "text-zinc-400",
                      )}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-white px-4 py-5 text-center">
                <p className="text-sm font-medium text-zinc-800">
                  No matching products found
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Try another product name, color, or category.
                </p>
              </div>
            )}

            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleSearchAll}
              className={cn(
                "flex w-full items-center gap-3 border-t border-zinc-100 bg-white px-4 py-3 text-left text-sm transition-colors",
                colors.hover,
              )}
            >
              <Search className={cn("size-4 shrink-0", colors.accentText)} />

              <span className="min-w-0 flex-1 truncate text-zinc-700">
                Search for "{searchQuery.trim()}"
              </span>

              <ArrowUpLeft
                className={cn("size-4 shrink-0", colors.accentText)}
              />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
