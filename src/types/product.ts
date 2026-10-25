export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;

  price: number;
  originalPrice?: number;

  image: string;
  images?: string[];

  category: string;
  featured: boolean;
  isNew?: boolean;

  rating: number;
  reviewCount: number;
  stock: number;

  colors?: string[];

  colorImages: Record<string, string>;
}
