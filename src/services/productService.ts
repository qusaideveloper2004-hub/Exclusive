

import { Product, FakeStoreProduct } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

const transformToProduct = (item: FakeStoreProduct, index: number): Product => {


const hasDiscount = index % 2 === 0;
const discountPercentage = hasDiscount ? ( index % 3 === 0 ? 40 : 30 ) : undefined;


const originalPrice = discountPercentage ? Math.round(item.price / (1 - discountPercentage / 100)) : undefined;

const isNew = !hasDiscount && index % 3 === 0;

const defaultColors = index % 2 === 1 ? [ { name: 'Red', hex: '#DB4444' }, { name: 'Black', hex: '#000000' }] : undefined;



return {
  id: item.id,
  title: item.title,
  description: item.description,
  category: item.category,
  image: item.image,
  price: item.price,

  originalPrice,
  discountPercentage,
  isNew,

  rating: item.rating?.rate,
  reviewCount: item.rating?.count,
  colors: defaultColors
};

};


export const productService = {


  getAllProducts: async (): Promise<Product[]> => {

    try {

      const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: 300 },
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

      const data: FakeStoreProduct[] = await res.json();
      if (!Array.isArray(data)) throw new Error('FakeStoreAPI returned an invalid products response');

      return data.map(transformToProduct);

    } catch (error) {

      console.error('API Fetch Error:', error);
      throw error;

    }

  },



  getProductById: async (id: string | number): Promise<Product | null> => {

    try {

      const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 300 } });

      if (!res.ok) throw new Error('Failed to fetch product');
      const data: FakeStoreProduct = await res.json();

      return transformToProduct(data, Number(id));
    } catch (error) {

      console.error(`Error fetching product ${id}:`, error);
      return null;

    }

  },



  getCategories: async (): Promise<string[]> => {

    try {

      const res = await fetch(`${BASE_URL}/products/categories`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error('Failed to fetch categories');

      return await res.json();
    } catch (error) {

      console.error('Error fetching categories:', error);
      return [];

    }

  },



  getProductsByCategory: async (category: string): Promise<Product[]> => {

    try {

      const res = await fetch(`${BASE_URL}/products/category/${category}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error('Failed to fetch category products');

      const data: FakeStoreProduct[] = await res.json();
      if (!Array.isArray(data)) throw new Error('FakeStoreAPI returned an invalid category response');

      return data.map(transformToProduct);
    } catch (error) {

      console.error(`Error fetching category products:`, error);
      return [];

    }

  }

};


