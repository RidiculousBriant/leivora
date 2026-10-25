import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

import { useEffect, useState } from "react";
import { Heart, Star, Check, ShoppingCartPlus, CreditCard } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";

import type { ThemeKey } from "@/components/shared/HomeHeader/themes";

const THEME_STORAGE_KEY = "leivora-theme";

const validThemes: ThemeKey[] = ["slate", "blue", "emerald", "rose"];

const productThemeStyles: Record<
  ThemeKey,
  {
    cardHover: string;
    swatchSelected: string;
    wishlistHover: string;
    cartButton: string;
    checkoutButton: string;
    badge: string;
  }
> = {
  slate: {
    cardHover: "hover:border-zinc-300 hover:ring-zinc-300",
    swatchSelected: "border-zinc-900 ring-zinc-900",
    wishlistHover: "hover:text-zinc-900",
    cartButton:
      "border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100",
    checkoutButton: "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700",
    badge: "border-zinc-200 text-zinc-800",
  },
  blue: {
    cardHover: "hover:border-blue-200 hover:ring-blue-200",
    swatchSelected: "border-blue-600 ring-blue-600",
    wishlistHover: "hover:text-blue-600",
    cartButton:
      "border-blue-200 text-blue-700 hover:border-blue-300 hover:bg-blue-50",
    checkoutButton: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
    badge: "border-blue-200 text-blue-700",
  },
  emerald: {
    cardHover: "hover:border-emerald-200 hover:ring-emerald-200",
    swatchSelected: "border-emerald-700 ring-emerald-700",
    wishlistHover: "hover:text-emerald-700",
    cartButton:
      "border-emerald-200 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50",
    checkoutButton:
      "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800",
    badge: "border-emerald-200 text-emerald-800",
  },
  rose: {
    cardHover: "hover:border-rose-200 hover:ring-rose-200",
    swatchSelected: "border-rose-600 ring-rose-600",
    wishlistHover: "hover:text-rose-600",
    cartButton:
      "border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-50",
    checkoutButton: "border-rose-600 bg-rose-600 text-white hover:bg-rose-700",
    badge: "border-rose-200 text-rose-700",
  },
};

function getSavedTheme(): ThemeKey {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme && validThemes.includes(savedTheme as ThemeKey)) {
      return savedTheme as ThemeKey;
    }
  } catch {
    // Use the default theme if local storage is unavailable.
  }

  return "slate";
}

export default function ProductCard() {
  const navigate = useNavigate();

  function handleBuy(slug: string) {
    if (!isLoggedIn()) {
      navigate("/required-login");
      return;
    }

    navigate(`/checkout?product=${encodeURIComponent(slug)}`);
  }

  const featuredProducts = products.filter((product) => product.featured);

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(
    {},
  );

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

  const theme = productThemeStyles[selectedTheme];

  const colorHex: Record<string, string> = {
    Beige: "#ded2bd",
    Black: "#272727",
    Brown: "#795548",
    Tan: "#c49a6c",
    Tortoise: "#795548",
    Gold: "#c5a253",
    Silver: "#c0c0c0",
    Amber: "#b66a30",
    Cream: "#f2eadb",
    Gray: "#929292",
    White: "#ffffff",
    Natural: "#d8c5a3",
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {featuredProducts.map((product) => {
        const colors = product.colors ?? [];
        const selectedColor = selectedColors[product.id] ?? colors[0];

        const colorImages = (
          product as typeof product & {
            colorImages?: Record<string, string>;
          }
        ).colorImages;

        const displayedImage =
          (selectedColor && colorImages?.[selectedColor]) || product.image;

        return (
          <Card
            key={product.id}
            className={`group gap-0 overflow-hidden rounded-md border border-zinc-100 bg-white py-0 shadow-none ring-1 ring-zinc-200 transition-all duration-200 ${theme.cardHover}`}
          >
            {/* Product image */}
            <div className="relative overflow-hidden bg-[#f7f6f3]">
              <img
                src={displayedImage}
                alt={`${product.name}${
                  selectedColor ? ` - ${selectedColor}` : ""
                }`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />

              {product.isNew && (
                <Badge
                  className={`absolute left-2 top-2 rounded-full border bg-white px-2 py-0.5 text-[10px] font-medium shadow-none hover:bg-white ${theme.badge}`}
                >
                  New
                </Badge>
              )}

              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Add ${product.name} to wishlist`}
                className={`absolute right-2 top-2 size-8 rounded-full bg-white/95 text-zinc-700 transition-colors hover:bg-white ${theme.wishlistHover}`}
              >
                <Heart className="size-4" strokeWidth={1.6} />
              </Button>
            </div>

            {/* Product information */}
            <CardContent className="h-40 space-y-1.5 p-3 ring-0 sm:p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-zinc-900">
                  {product.name}
                </h3>

                <span className="shrink-0 text-xs font-medium text-zinc-900 sm:text-sm">
                  {product.price.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              {/* Rating */}
              <div
                className="flex items-center gap-1"
                aria-label={`Rating: ${product.rating} out of 5`}
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isRated = index < Math.round(product.rating);

                    return (
                      <Star
                        key={index}
                        className={`size-3.5 ${
                          isRated
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-none text-zinc-200"
                        }`}
                        strokeWidth={1.6}
                      />
                    );
                  })}
                </div>

                <span className="text-[10px] text-zinc-500">
                  {product.reviewCount.toLocaleString()}
                </span>
              </div>

              <p className="line-clamp-2 min-h-8 text-xs leading-4 text-zinc-700">
                {product.description}
              </p>

              {product.originalPrice && (
                <p className="text-xs text-zinc-400 line-through">
                  {product.originalPrice.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0,
                  })}
                </p>
              )}

              {/* Color swatches */}
              {colors.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  {colors.slice(0, 4).map((color) => {
                    const isSelected = selectedColor === color;

                    const darkSwatches = [
                      "Black",
                      "Brown",
                      "Tortoise",
                      "Amber",
                    ];

                    return (
                      <button
                        key={color}
                        type="button"
                        title={color}
                        aria-label={`Select ${color} for ${product.name}`}
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelectedColors((previous) => ({
                            ...previous,
                            [product.id]: color,
                          }))
                        }
                        className={`relative flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? `${theme.swatchSelected} ring-1 ring-offset-2`
                            : "border-zinc-300 hover:border-zinc-500"
                        }`}
                        style={{
                          backgroundColor: colorHex[color] ?? "#e5e7eb",
                        }}
                      >
                        {isSelected && (
                          <Check
                            className={`size-3 ${
                              darkSwatches.includes(color)
                                ? "text-white"
                                : "text-zinc-900"
                            }`}
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    );
                  })}

                  {colors.length > 4 && (
                    <span className="text-[10px] text-zinc-500">
                      +{colors.length - 4}
                    </span>
                  )}
                </div>
              )}
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex items-center justify-between gap-2 border-0 p-3 pt-2 sm:p-4 sm:pt-2">
              <Button
                type="button"
                variant="outline"
                className={`h-9 min-w-0 flex-1 gap-1.5 rounded-full border bg-white px-2 text-xs font-medium transition-colors sm:gap-2 sm:px-3 ${theme.cartButton}`}
              >
                <ShoppingCartPlus
                  className="size-3.5 shrink-0"
                  strokeWidth={1.7}
                />
                <span className="truncate">+ cart</span>
              </Button>

              <Button
                type="button"
                onClick={() => handleBuy(product.slug)}
                className={`h-9 min-w-0 flex-1 gap-1.5 rounded-full border px-2 text-xs font-medium transition-colors sm:gap-2 sm:px-3 ${theme.checkoutButton}`}
              >
                <CreditCard className="size-3.5 shrink-0" strokeWidth={1.7} />
                <span className="truncate">Buy</span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
