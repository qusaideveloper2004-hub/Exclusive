import "server-only";

import snapshot from "@/data/products.snapshot.json";
import type { FakeStoreProduct, Product } from "@/types/product";


const BASE_URL = "https://fakestoreapi.com";

const REQUEST_TIMEOUT_MS = 5000;
const FETCH_ATTEMPTS = 2;

const FALLBACK = snapshot satisfies FakeStoreProduct[];

const isFakeStoreProduct = (value: unknown): value is FakeStoreProduct => {

if (typeof value !== "object" || value === null) return false;

  const product = value as Partial<FakeStoreProduct>;

  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.description === "string" &&
    typeof product.category === "string" &&
    typeof product.image === "string" &&
    typeof product.rating?.rate === "number" &&
    typeof product.rating?.count === "number"
  );
};


async function fetchJson<T>(path: string, fresh = false): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < FETCH_ATTEMPTS; attempt += 1) {

    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        headers: { Accept: "application/json" },
        ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`FakeStoreAPI request ${path} failed with status ${response.status}`);
      }

      return (await response.json()) as T;

    } catch (error) {
      lastError = error;
      if (attempt + 1 < FETCH_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
  }

  throw lastError ?? new Error(`FakeStoreAPI request ${path} failed`);
}


const transformToProduct = (item: FakeStoreProduct): Product => {

  const productKey = item.id;
  const hasDiscount = productKey % 2 === 0;

  const discountPercentage = hasDiscount
    ? productKey % 3 === 0
      ? 40
      : 30
    : undefined;

  const originalPrice = discountPercentage
    ? Math.round(item.price / (1 - discountPercentage / 100))
    : undefined;

  const isNew = !hasDiscount && productKey % 3 === 0;

  const defaultColors =
    productKey % 2 === 1
      ? [
          { name: "Red", hex: "#DB4444" },
          { name: "Black", hex: "#000000" },
        ]
      : undefined;

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
    rating: item.rating.rate,
    reviewCount: item.rating.count,
    colors: defaultColors,
  };
};





export const productService = {

  getAllProducts: async (options: { fresh?: boolean } = {}): Promise<Product[]> => {

    try {

      const data = await fetchJson<unknown>("/products", options.fresh);
      if (
        !Array.isArray(data) ||
        data.length === 0 ||
        !data.every(isFakeStoreProduct)
      ) {
        throw new Error("FakeStoreAPI returned an invalid products response");
      }

      return data.map(transformToProduct);

    } catch (error) {
      console.warn("FakeStoreAPI is unavailable; using the local product snapshot.", error);
      return FALLBACK.map(transformToProduct);
    }
  },

  getProductById: async (id: number): Promise<Product | null> => {

    try {
      const data = await fetchJson<unknown>(`/products/${id}`);
      if (!isFakeStoreProduct(data)) {
        throw new Error(`FakeStoreAPI returned an invalid product response for ${id}`);
      }

      return transformToProduct(data);

    } catch (error) {
      console.warn(`FakeStoreAPI could not load product ${id}; checking the local snapshot.`, error);
      const product = FALLBACK.find((item) => item.id === id);

      return product ? transformToProduct(product) : null;
    }
  },

  getCategories: async (): Promise<string[]> => {

    try {

      const categories = await fetchJson<unknown>("/products/categories");
      if (
        !Array.isArray(categories) ||
        !categories.every((category) => typeof category === "string")
      ) {
        throw new Error("FakeStoreAPI returned an invalid categories response");
      }

      return categories;

    } catch (error) {
      console.warn("FakeStoreAPI could not load categories; using categories from the local snapshot.", error);

      return [...new Set(FALLBACK.map((product) => product.category))];
    }
  },


  getProductsByCategory: async (category: string): Promise<Product[]> => {
    
    try {
      const data = await fetchJson<unknown>(
        `/products/category/${encodeURIComponent(category)}`,
      );
      if (!Array.isArray(data) || !data.every(isFakeStoreProduct)) {
        throw new Error("FakeStoreAPI returned an invalid category response");
      }

      return data.map(transformToProduct);
    
    } catch (error) {
      console.warn(
        `FakeStoreAPI could not load category ${category}; checking the local snapshot.`,
        error,
      );
      
      return FALLBACK
        .filter((product) => product.category === category)
        .map(transformToProduct);
    }
  },
};


