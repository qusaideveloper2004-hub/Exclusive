

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: number | { rate: number; count: number };
  reviewCount?: number;
  discountPercentage?: number;
  originalPrice?: number;
  isNew?: boolean;
  colors?: ProductColor[];
}



export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}



