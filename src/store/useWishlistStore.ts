import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface WishlistStore {
  items: Product[];

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  toggleWishlist: (product: Product) => void;

  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({

      items: [],


      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ items: [...get().items, product] });
        }
      },


      removeFromWishlist: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },




      toggleWishlist: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeFromWishlist(product.id);

        } else {
          get().addToWishlist(product);
        }
      },


      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },


      clearWishlist: () => set({ items: [] })

    }),


    { name: 'ecommerce-wishlist-storage' }


  )
);