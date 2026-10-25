import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "everyday-shoulder-bag",
    name: "Everyday Shoulder Bag",
    description: "A timeless bag for everyday use.",
    price: 1899,
    originalPrice: 2299,
    image:
      "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW2-75060134-E2-3_6d2ea28a-5579-48e3-aadc-d8eda7aa38cd_1000x.jpg?v=1770823907",
    colorImages: {
      Beige:
        "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW2-75060134-E2-3_6d2ea28a-5579-48e3-aadc-d8eda7aa38cd_1000x.jpg?v=1770823907",
      Black:
        "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW2-75060134-E2-3_6d2ea28a-5579-48e3-aadc-d8eda7aa38cd_1000x.jpg?v=1770823907",
      Brown:
        "https://pedroshoes.com.kh/cdn/shop/files/2026-L2-PW2-75060134-E2-3_6d2ea28a-5579-48e3-aadc-d8eda7aa38cd_1000x.jpg?v=1770823907",
    },
    category: "Accessories",
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    colors: ["Beige", "Black", "Brown"],
  },
  {
    id: "prod-002",
    slug: "classic-sunglasses",
    name: "Classic Sunglasses",
    description: "Modern frames for everyday style.",
    price: 899,
    image: "src/assets/sunglasses.jpg",
    colorImages: {
      Black: "src/assets/sunglasses.jpg",
      Tortoise: "/images/products/sunglasses-01.jpg",
    },
    category: "Accessories",
    featured: true,
    rating: 4.6,
    reviewCount: 53,
    stock: 32,
    colors: ["Black", "Tortoise"],
  },
  {
    id: "prod-003",
    slug: "minimalist-card-wallet",
    name: "Minimalist Card Wallet",
    description: "A compact wallet for daily essentials.",
    price: 699,
    image:
      "https://media-makr-com.imgix.net/product/RLXP_Rye_FR_CRD.png?auto=format&q=65&w=1200",
    colorImages: {
      Black:
        "https://media-makr-com.imgix.net/product/RLXP_Rye_FR_CRD.png?auto=format&q=65&w=1200",
      Tan:
        "https://media-makr-com.imgix.net/product/RLXP_Rye_FR_CRD.png?auto=format&q=65&w=1200",
    },
    category: "Accessories",
    featured: false,
    rating: 4.5,
    reviewCount: 41,
    stock: 25,
    colors: ["Black", "Tan"],
  },
  {
    id: "prod-004",
    slug: "gold-hoop-earrings",
    name: "Gold Hoop Earrings",
    description: "Elegant hoops that add a subtle golden touch.",
    price: 499,
    image: "https://www.niika.cz/user/articles/images/475a2178.jpg",
    colorImages: {
      Gold: "https://www.niika.cz/user/articles/images/475a2178.jpg",
      Silver: "https://www.niika.cz/user/articles/images/475a2178.jpg",
    },
    category: "Accessories",
    featured: true,
    isNew: true,
    rating: 4.7,
    reviewCount: 68,
    stock: 40,
    colors: ["Gold", "Silver"],
  },
  {
    id: "prod-005",
    slug: "hydrating-face-serum",
    name: "Hydrating Face Serum",
    description: "A lightweight serum for a fresh, hydrated look.",
    price: 799,
    image:
      "https://fleurandbee.com/cdn/shop/files/ultra-hydrating-serum-Fby-Fleur-and-Bee_600x.jpg?v=1715804025",
    colorImages: {
      Amber:
        "https://fleurandbee.com/cdn/shop/files/ultra-hydrating-serum-Fby-Fleur-and-Bee_600x.jpg?v=1715804025",
    },
    category: "Beauty",
    featured: true,
    rating: 4.8,
    reviewCount: 96,
    stock: 22,
    colors: ["Amber"],
  },
  {
    id: "prod-006",
    slug: "signature-perfume",
    name: "Signature Perfume",
    description: "A refined fragrance for memorable moments.",
    price: 1499,
    image:
      "https://articles.mthqf.com/wp-content/uploads/2025/02/1707929387.png",
    colorImages: {
      Gold: "https://articles.mthqf.com/wp-content/uploads/2025/02/1707929387.png",
    },
    category: "Beauty",
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 87,
    stock: 18,
    colors: ["Gold"],
  },
  {
    id: "prod-007",
    slug: "classic-leather-watch",
    name: "Classic Leather Watch",
    description: "A timeless timepiece with a clean, minimal dial.",
    price: 2199,
    image:
      "src/assets/watches.jpg",
    colorImages: {
      Brown:
        "src/assets/watches.jpg",
      Black:
        "https://ana-made.com/cdn/shop/files/Untitled_design_2_dbc22dd5-ffb6-4690-8ec1-7fe178aebddb.png?v=1751720064",
    },
    category: "Accessories",
    featured: true,
    rating: 4.7,
    reviewCount: 72,
    stock: 12,
    colors: ["Brown", "Black"],
  },
  {
    id: "prod-008",
    slug: "essential-knit-sweater",
    name: "Essential Knit Sweater",
    description: "A cozy knit with a versatile neutral finish.",
    price: 1699,
    originalPrice: 1999,
    image:
      "https://cafe24img.poxo.com/thomasmore1/web/product/medium/202510/56861c74a127e933fc69dd0daa457aa3.jpg",
    colorImages: {
      Cream:
        "https://cafe24img.poxo.com/thomasmore1/web/product/medium/202510/56861c74a127e933fc69dd0daa457aa3.jpg",
      Gray:
        "https://cafe24img.poxo.com/thomasmore1/web/product/medium/202510/56861c74a127e933fc69dd0daa457aa3.jpg",
      Brown:
        "https://cafe24img.poxo.com/thomasmore1/web/product/medium/202510/56861c74a127e933fc69dd0daa457aa3.jpg",
    },
    category: "Fashion",
    featured: true,
    rating: 4.6,
    reviewCount: 58,
    stock: 20,
    colors: ["Cream", "Gray", "Brown"],
  },
  {
    id: "prod-009",
    slug: "wireless-earbuds",
    name: "Wireless Earbuds",
    description: "Compact everyday audio with a sleek design.",
    price: 1299,
    image:
      "https://f005.backblazeb2.com/file/rd-web-assets/rd-web/tool-featured-results/cXNVRdQpWDHo3dXesplj/0IWze8PKsKOjQeFRsAnN-8ee536e6-9fe8-424f-9b5a-928d297a9e79.png",
    colorImages: {
      Black:
        "https://f005.backblazeb2.com/file/rd-web-assets/rd-web/tool-featured-results/cXNVRdQpWDHo3dXesplj/0IWze8PKsKOjQeFRsAnN-8ee536e6-9fe8-424f-9b5a-928d297a9e79.png",
      White:
        "https://f005.backblazeb2.com/file/rd-web-assets/rd-web/tool-featured-results/cXNVRdQpWDHo3dXesplj/0IWze8PKsKOjQeFRsAnN-8ee536e6-9fe8-424f-9b5a-928d297a9e79.png",
    },
    category: "Lifestyle",
    featured: false,
    isNew: true,
    rating: 4.5,
    reviewCount: 44,
    stock: 27,
    colors: ["Black", "White"],
  },
  {
    id: "prod-010",
    slug: "everyday-canvas-tote",
    name: "Everyday Canvas Tote",
    description: "A versatile carryall for shopping and daily essentials.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    colorImages: {
      Natural:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      Black:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    },
    category: "Accessories",
    featured: false,
    isNew: true,
    rating: 4.6,
    reviewCount: 39,
    stock: 30,
    colors: ["Natural", "Black"],
  },
  {
    id: "prod-011",
    slug: "everyday-white-sneakers",
    name: "Everyday White Sneakers",
    description: "Clean, versatile sneakers for everyday outfits.",
    price: 1899,
    originalPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    colorImages: {
      White:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      Black:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    },
    category: "Fashion",
    featured: true,
    rating: 4.7,
    reviewCount: 103,
    stock: 16,
    colors: ["White", "Black"],
  },
  {
    id: "prod-012",
    slug: "minimal-ceramic-mug",
    name: "Minimal Ceramic Mug",
    description: "A simple ceramic mug for your daily coffee ritual.",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    colorImages: {
      Cream:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
      White:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
      Black:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    },
    category: "Lifestyle",
    featured: false,
    rating: 4.4,
    reviewCount: 31,
    stock: 35,
    colors: ["Cream", "White", "Black"],
  },
];