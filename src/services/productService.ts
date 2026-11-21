

import { Product, FakeStoreProduct } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';
const REQUEST_TIMEOUT_MS = 10000;

const transformToProduct = (item: FakeStoreProduct): Product => {

const productKey = item.id;

const hasDiscount = productKey % 2 === 0;
const discountPercentage = hasDiscount ? ( productKey % 3 === 0 ? 40 : 30 ) : undefined;


const originalPrice = discountPercentage ? Math.round(item.price / (1 - discountPercentage / 100)) : undefined;

const isNew = !hasDiscount && productKey % 3 === 0;

const defaultColors = productKey % 2 === 1 ? [ { name: 'Red', hex: '#DB4444' }, { name: 'Black', hex: '#000000' }] : undefined;



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


  getAllProducts: async (options: { fresh?: boolean } = {}): Promise<Product[]> => {

    try {

      const res = await fetch(`${BASE_URL}/products`, {
        ...(options.fresh ? { cache: 'no-store' as const } : { next: { revalidate: 300 } }),

        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),

      });


      if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

      const data: FakeStoreProduct[] = await res.json();
      if (!Array.isArray(data)) throw new Error('FakeStoreAPI returned an invalid products response');
      if (data.length === 0) throw new Error('FakeStoreAPI returned an empty products response');

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

      return transformToProduct(data);
    } catch (error) {

      console.error(`Error fetching product ${id}:`, error);

      try {
        const products = await productService.getAllProducts();
        return products.find((product) => product.id === Number(id)) ?? null;
      } catch (fallbackError) {
        console.error(`Error finding product ${id} in the product collection:`, fallbackError);
        return null;
      }

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
