import bagImage from "@/assets/leivora-bag.jpg";
import Magazine from "@/assets/magazine.jpg"
import accessoriesImage from "@/assets/accessories.jpg";
import beautyImage from "@/assets/makeup.jpg";
import lifestyleImage from "@/assets/sportswear.jpg";
import newArrivalImage from "@/assets/jewelry.jpg";

export interface NavigationCategory {
  label: string;
  href: string;
  description: string;
  items: {
    label: string;
    href: string;
  }[];
  promotion?: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    href: string;
    buttonLabel: string;
  };
}

export const categories: NavigationCategory[] = [
  {
    label: "All Products",
    href: "/shop",
    description: "Explore the complete Leivora collection.",
    items: [
      { label: "Shop All", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=best-sellers" },
      { label: "Featured Products", href: "/shop?filter=featured" },
      { label: "On Sale", href: "/shop?filter=sale" },
    ],
    promotion: {
      eyebrow: "THE LEIVORA EDIT",
      title: "Find your next favorite.",
      description: "Explore thoughtfully selected everyday essentials.",
      image: bagImage,
      href: "/shop?filter=featured",
      buttonLabel: "Explore Collection",
    },
  },
  {
    label: "Fashion",
    href: "/shop?category=Fashion",
    description: "Everyday styles, thoughtfully selected.",
    items: [
      { label: "All Fashion", href: "/shop?category=Fashion" },
      { label: "Tops", href: "/shop?category=Tops" },
      { label: "Bottoms", href: "/shop?category=Bottoms" },
      { label: "Outerwear", href: "/shop?category=Outerwear" },
    ],
    promotion: {
      eyebrow: "NEW SEASON",
      title: "Refresh your wardrobe.",
      description: "Discover styles for your everyday rotation.",
      image: Magazine,
      href: "/shop?category=Fashion",
      buttonLabel: "Shop Fashion",
    },
  },
  {
    label: "Accessories",
    href: "/shop?category=Accessories",
    description: "The finishing touches to your everyday look.",
    items: [
      { label: "All Accessories", href: "/shop?category=Accessories" },
      { label: "Bags", href: "/shop?category=Bags" },
      { label: "Jewelry", href: "/shop?category=Jewelry" },
      { label: "Sunglasses", href: "/shop?category=Sunglasses" },
      { label: "Wallets", href: "/shop?category=Wallets" },
    ],
    promotion: {
      eyebrow: "THE FINISHING TOUCH",
      title: "Details make the difference.",
      description: "Find accessories that complete your look.",
      image: accessoriesImage,
      href: "/shop?category=Accessories",
      buttonLabel: "Shop Accessories",
    },
  },
  {
    label: "Beauty",
    href: "/shop?category=Beauty",
    description: "Your daily essentials for self-care.",
    items: [
      { label: "All Beauty", href: "/shop?category=Beauty" },
      { label: "Skincare", href: "/shop?category=Skincare" },
      { label: "Makeup", href: "/shop?category=Makeup" },
      { label: "Fragrance", href: "/shop?category=Fragrance" },
    ],
    promotion: {
      eyebrow: "YOUR DAILY RITUAL",
      title: "Make time for yourself.",
      description: "Explore your everyday beauty essentials.",
      image: beautyImage,
      href: "/shop?category=Beauty",
      buttonLabel: "Explore Beauty",
    },
  },
  {
    label: "Lifestyle",
    href: "/shop?category=Lifestyle",
    description: "Simple essentials for better everyday living.",
    items: [
      { label: "All Lifestyle", href: "/shop?category=Lifestyle" },
      { label: "Home Decor", href: "/shop?category=Home%20Decor" },
      { label: "Drinkware", href: "/shop?category=Drinkware" },
      {
        label: "Everyday Essentials",
        href: "/shop?category=Everyday%20Essentials",
      },
    ],
    promotion: {
      eyebrow: "LIVE SIMPLY",
      title: "Elevate your everyday.",
      description: "Discover considered essentials for your space.",
      image: lifestyleImage,
      href: "/shop?category=Lifestyle",
      buttonLabel: "Shop Lifestyle",
    },
  },
  {
    label: "New Arrivals",
    href: "/shop?category=New%20Arrivals",
    description: "Discover the latest additions to Leivora.",
    items: [
      {
        label: "Shop New Arrivals",
        href: "/shop?category=New%20Arrivals",
      },
      { label: "Recently Added", href: "/shop?sort=newest" },
      { label: "Trending Now", href: "/shop?sort=trending" },
    ],
    promotion: {
      eyebrow: "JUST ARRIVED",
      title: "Meet the latest collection.",
      description: "Be the first to explore what's new.",
      image: newArrivalImage,
      href: "/shop?category=New%20Arrivals",
      buttonLabel: "Shop New Arrivals",
    },
  },
];