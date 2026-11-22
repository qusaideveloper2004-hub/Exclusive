import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;

  quantity: number;
  selectedColor?: string | null;
  selectedSize?: string | null;
}

interface CartStore {

  items: CartItem[];
  appliedCoupon: string | null;

  addToCart: (product: Product, color?: string | null, size?: string | null, quantity?: number) => void;
  removeFromCart: (productId: number, color?: string | null, size?: string | null) => void;
  updateQuantity: (productId: number, quantity: number, color?: string | null, size?: string | null) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

type PersistedCartState = Pick<CartStore, "items" | "appliedCoupon">;
type LegacyPersistedCartState = Pick<CartStore, "items"> & Partial<Pick<CartStore, "appliedCoupon">>;


const isCartItem = (value: unknown): value is CartItem => {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<CartItem>;
  const product = item.product;

  return (
    typeof product === "object" &&

    product !== null &&

    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.description === "string" &&
    typeof product.category === "string" &&
    typeof product.image === "string" &&
    typeof item.quantity === "number" &&

    Number.isFinite(item.quantity) && item.quantity > 0 &&
      (item.selectedColor === undefined ||
      item.selectedColor === null ||

      typeof item.selectedColor === "string") &&

    (item.selectedSize === undefined ||
      item.selectedSize === null ||
      typeof item.selectedSize === "string")

  );
};

const isPersistedCartState = (state: unknown): state is LegacyPersistedCartState => {

  if (typeof state !== "object" || state === null) return false;

  const persistedState = state as Partial<LegacyPersistedCartState>;

  return (

    Array.isArray(persistedState.items) &&
    persistedState.items.every(isCartItem) &&
    (persistedState.appliedCoupon === undefined ||
      persistedState.appliedCoupon === null ||
      typeof persistedState.appliedCoupon === "string")
  );
};

export const useCartStore = create<CartStore>()(
  persist<CartStore, [], [], PersistedCartState>(

    (set, get) => ({

      items: [],
      appliedCoupon: null,

      addToCart: (product, color = null, size = null, quantity = 1) => {
        const { items } = get();

        const index = items.findIndex(
          (it) =>
              it.product.id === product.id
          &&  it.selectedColor === color 
          &&  it.selectedSize === size
        );

        if (index > -1) {

          const updated = items.map((item, itemIndex) =>
            itemIndex === index
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );

          set({ items: updated });
        } else {

          set({ items: [...items, { product, quantity, selectedColor: color, selectedSize: size }] });

        }
      },


      removeFromCart: (productId, color = null, size = null) => {
        set({

          items: get().items.filter(
            (ite) => !(ite.product.id === productId && ite.selectedColor === color && ite.selectedSize === size)
          
          )
        });
      },


      updateQuantity: (productId, quantity, color = null, size = null) => {
        if (quantity <= 0) return get().removeFromCart(productId, color, size);

        set({

          items: get().items.map((it) =>
            it.product.id === productId && it.selectedColor === color && it.selectedSize === size? { ...it, quantity }: it
          )

        });
      },


      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (code) => {
        if (code.trim().toUpperCase() !== "SAVE10") return false;

        set({ appliedCoupon: "SAVE10" });
        return true;
      },


      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),


      getTotalPrice: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)

    }),


    {
      name: "ecommerce-cart-storage",
      version: 1,

      partialize: ({ items, appliedCoupon }) => ({ items, appliedCoupon }),

      migrate: (persistedState, version) => {

        if (version === 0 && isPersistedCartState(persistedState)) {
          
          return {
            items: persistedState.items,
            appliedCoupon: persistedState.appliedCoupon ?? null,
          };
        }

        return { items: [], appliedCoupon: null };
      },
    }

  )
);



