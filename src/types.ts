export type ProductCategory = 
  | 'all'
  | 'hers'
  | 'his'
  | 'bags'
  | 'wearables'
  | 'home'
  | 'accessories'
  | 'last-call';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory[];
  rating: number;
  reviewCount: number;
  craftHours: number;
  yarnMaterial: string;
  hookSize: string;
  dimensions: string;
  careGuide: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLastCall?: boolean;
  featured: boolean;
  primaryImage: string;
  galleryImages: string[];
  colors: ProductColor[];
  description: string;
  artisanNote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize?: string;
}

export interface CustomCommission {
  itemType: string;
  yarnType: string;
  palette: string;
  notes: string;
  contactEmail: string;
  estimatedHours: number;
  estimatedPrice: number;
}
