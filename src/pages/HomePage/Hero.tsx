import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import ProductCard from "@/components/shared/ProductCard";
import FeatureSection from "./FeatureSection";

import type { ThemeKey } from "@/components/shared/HomeHeader/themes";

const THEME_STORAGE_KEY = "leivora-theme";

const validThemes: ThemeKey[] = ["slate", "blue", "emerald", "rose"];

const heroThemeStyles: Record<
  ThemeKey,
  {
    overlay: string;
    primaryButton: string;
    secondaryButton: string;
    activeIndicator: string;
    inactiveIndicator: string;
    collectionHeading: string;
    collectionBorder: string;
    collectionLabel: string;
  }
> = {
  slate: {
    overlay: "bg-black/40",
    primaryButton:
      "bg-white text-zinc-900 hover:bg-zinc-200 focus-visible:ring-white",
    secondaryButton:
      "border-white/70 bg-transparent text-white hover:bg-white hover:text-zinc-900 focus-visible:ring-white",
    activeIndicator: "bg-white",
    inactiveIndicator: "bg-white/50 hover:bg-white/80",
    collectionHeading: "text-zinc-900",
    collectionBorder: "border-zinc-200",
    collectionLabel: "text-zinc-900",
  },
  blue: {
    overlay: "bg-blue-950/55",
    primaryButton:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400",
    secondaryButton:
      "border-blue-200/80 bg-blue-950/20 text-white hover:bg-blue-600 hover:text-white focus-visible:ring-blue-400",
    activeIndicator: "bg-blue-400",
    inactiveIndicator: "bg-white/50 hover:bg-blue-200",
    collectionHeading: "text-blue-700",
    collectionBorder: "border-blue-100",
    collectionLabel: "text-blue-800",
  },
  emerald: {
    overlay: "bg-emerald-950/55",
    primaryButton:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400",
    secondaryButton:
      "border-emerald-200/80 bg-emerald-950/20 text-white hover:bg-emerald-600 hover:text-white focus-visible:ring-emerald-400",
    activeIndicator: "bg-emerald-400",
    inactiveIndicator: "bg-white/50 hover:bg-emerald-200",
    collectionHeading: "text-emerald-700",
    collectionBorder: "border-emerald-100",
    collectionLabel: "text-emerald-800",
  },
  rose: {
    overlay: "bg-rose-950/55",
    primaryButton:
      "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-400",
    secondaryButton:
      "border-rose-200/80 bg-rose-950/20 text-white hover:bg-rose-600 hover:text-white focus-visible:ring-rose-400",
    activeIndicator: "bg-rose-400",
    inactiveIndicator: "bg-white/50 hover:bg-rose-200",
    collectionHeading: "text-rose-700",
    collectionBorder: "border-rose-100",
    collectionLabel: "text-rose-800",
  },
};

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

const slides = [
  {
    eyebrow: "Discover Leivora",
    title: "Luxury That Speaks for Itself",
    description: "Discover timeless elegance and styles made for you.",
    image: "/src/assets/Wang%20Churan%20x%20Gucci.jpg",
    alt: "Wang Churan wearing Gucci",
  },
  {
    eyebrow: "The New Collection",
    title: "Elevate Your Everyday Style",
    description:
      "Explore sophisticated essentials designed to make every moment stylish.",
    image: "/src/assets/han%20so%20hee.jpg",
    alt: "Leivora new fashion collection",
  },
  {
    eyebrow: "Timeless Elegance",
    title: "Find Your Signature Look",
    description:
      "Discover carefully selected pieces that express your individuality.",
    image: "/src/assets/essentials.jpg",
    alt: "Leivora luxury fashion collection",
  },
];

const luxurySlides = [
  {
    image: "/src/assets/bags.jpg",
    category: "Bags",
    alt: "Designer bags",
  },
  {
    image: "/src/assets/han%20so%20hee.jpg",
    category: "Clothing",
    alt: "Fashion clothing",
  },
  {
    image: "/src/assets/essentials.jpg",
    category: "Streetwear",
    alt: "Streetwear apparel",
  },
  {
    image: "/src/assets/shoes.jpg",
    category: "Shoes",
    alt: "Fashion shoes",
  },
  {
    image: "/src/assets/watches.jpg",
    category: "Watches",
    alt: "Designer watches",
  },
  {
    image: "/src/assets/jewelry.jpg",
    category: "Jewelry",
    alt: "Fashion jewelry",
  },
  {
    image: "/src/assets/sunglasses.jpg",
    category: "Sunglasses",
    alt: "Designer sunglasses",
  },
  {
    image: "/src/assets/wallets.jpg",
    category: "Wallets",
    alt: "Designer wallets",
  },
  {
    image: "/src/assets/accessories.jpg",
    category: "Accessories",
    alt: "Fashion accessories",
  },
  {
    image: "/src/assets/shoes.jpg",
    category: "Heels",
    alt: "Women's heels",
  },
  {
    image: "/src/assets/perfumes.jpg",
    category: "Perfumes",
    alt: "Perfumes",
  },
  {
    image: "/src/assets/jackets.jpg",
    category: "Jackets",
    alt: "Fashion jackets",
  },
  {
    image: "/src/assets/hats.jpg",
    category: "Hats",
    alt: "Fashion hats",
  },
  {
    image: "/src/assets/sportswear.jpg",
    category: "Sportswear",
    alt: "Sportswear",
  },
];

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(getSavedTheme);
  const shouldReduceMotion = useReducedMotion();

  const movementDuration = shouldReduceMotion ? 0 : 0.65;
  const heroTheme = heroThemeStyles[selectedTheme];

  useEffect(() => {
    function syncTheme() {
      setSelectedTheme(getSavedTheme());
    }

    window.addEventListener("storage", syncTheme);
    window.addEventListener("leivora-theme-change", syncTheme);

    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("leivora-theme-change", syncTheme);
    };
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", updateSelectedIndex);
    updateSelectedIndex();

    return () => {
      emblaApi.off("select", updateSelectedIndex);
    };
  }, [emblaApi]);

  const scrollToProducts = useCallback(() => {
    document.getElementById("shop-products")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [shouldReduceMotion]);

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      <section
        aria-label="Featured collections"
        className="group relative w-full overflow-hidden bg-zinc-900"
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div
                key={slide.title}
                className="relative min-w-0 flex-[0_0_100%]"
              >
                <div className="relative flex min-h-[420px] items-center sm:min-h-[500px] md:min-h-[550px] lg:min-h-[650px]">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />

                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${heroTheme.overlay}`}
                  />

                  <div className="relative z-10 w-full px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-16">
                    <motion.div
                      key={slide.title}
                      initial={{
                        x: shouldReduceMotion ? 0 : -36,
                        opacity: shouldReduceMotion ? 1 : 0,
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        duration: movementDuration,
                        ease: "easeOut",
                      }}
                      className="max-w-xl text-white"
                    >
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.3em] lg:text-sm">
                        {slide.eyebrow}
                      </p>

                      <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>

                      <p className="mt-4 max-w-md text-sm leading-6 text-white/90 sm:text-base">
                        {slide.description}
                      </p>

                      <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8 sm:gap-4">
                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className={`inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 min-[420px]:w-auto sm:h-12 sm:px-7 sm:text-sm ${heroTheme.primaryButton}`}
                        >
                          Shop Now
                        </button>

                        <button
                          type="button"
                          onClick={scrollToProducts}
                          className={`inline-flex h-11 w-full items-center justify-center rounded-full border px-6 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 min-[420px]:w-auto sm:h-12 sm:px-7 sm:text-sm ${heroTheme.secondaryButton}`}
                        >
                          Explore Collection
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:flex sm:h-10 sm:w-10 md:left-6 md:h-12 md:w-12 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:flex sm:h-10 sm:w-10 md:right-6 md:h-12 md:w-12 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6 lg:bottom-6">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? `w-8 ${heroTheme.activeIndicator}`
                  : `w-2 ${heroTheme.inactiveIndicator}`
              }`}
            />
          ))}
        </div>
      </section>

      <motion.section
        id="shop-products"
        initial={{
          y: shouldReduceMotion ? 0 : 28,
          opacity: shouldReduceMotion ? 1 : 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: movementDuration,
          ease: "easeOut",
        }}
      >
        <ProductCard />
      </motion.section>

      <section id="shopping-description">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{
            y: shouldReduceMotion ? 0 : 24,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: movementDuration,
            ease: "easeOut",
          }}
        >
          <FeatureSection />
        </motion.div>
      </section>

      <motion.section
        initial={{
          y: shouldReduceMotion ? 0 : 24,
          opacity: shouldReduceMotion ? 1 : 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: movementDuration,
          ease: "easeOut",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:mx-0 lg:px-0">
          <h2
            className={`mb-5 text-xl font-semibold tracking-tight transition-colors duration-300 ${heroTheme.collectionHeading}`}
          >
            Luxury Collection
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {luxurySlides.map((luxSlide, index) => (
                <CarouselItem
                  key={luxSlide.category}
                  className="h-32 basis-1/2 pl-3 min-[480px]:h-36 min-[480px]:basis-1/3 md:basis-1/4 lg:h-36 lg:basis-1/5"
                >
                  <motion.div
                    initial={{
                      y: shouldReduceMotion ? 0 : 16,
                      opacity: shouldReduceMotion ? 1 : 0,
                    }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: movementDuration,
                      delay: shouldReduceMotion ? 0 : (index % 5) * 0.06,
                      ease: "easeOut",
                    }}
                    className={`group h-full overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${heroTheme.collectionBorder}`}
                  >
                    <div className="h-24 overflow-hidden min-[480px]:h-26 lg:h-26">
                      <img
                        src={luxSlide.image}
                        alt={luxSlide.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-2">
                      <p
                        className={`text-center text-[10px] font-semibold uppercase tracking-wider sm:text-xs sm:tracking-widest ${heroTheme.collectionLabel}`}
                      >
                        {luxSlide.category}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.section>
    </div>
  );
}
