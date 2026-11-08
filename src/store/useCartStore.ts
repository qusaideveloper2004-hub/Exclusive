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
  removeFromCart: (productId: string | number, color?: string | null, size?: string | null) => void;
  updateQuantity: (productId: string | number, quantity: number, color?: string | null, size?: string | null) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
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
          const updated = [...items];
          
          updated[index].quantity += quantity;
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


    { name: 'ecommerce-cart-storage' }

  )
);