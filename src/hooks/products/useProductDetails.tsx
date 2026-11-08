import { useState } from "react";

import { Product } from "@/types/product";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";


export function useProductDetails(product: Product | null) {

const addToCart = useCartStore((state) => state.addToCart);
const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
const isInWishlist = useWishlistStore((state) => state.isInWishlist(product?.id ?? -1));


const [selectedImage, setSelectedImage] = useState<string>(product?.image ?? "");
const [selectedImageIndex, setSelectedImageIndex] = useState(0);
const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name ?? "");
const [selectedSize, setSelectedSize] = useState<string>("M");
const [quantity, setQuantity] = useState<number>(1);


const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, selectedColor || null, selectedSize || null, quantity);
};


const handleToggleWishlist = () => {
    if (!product) return;

    toggleWishlist(product);
};


return {

    selectedImage,
    setSelectedImage,
    selectedImageIndex,
    setSelectedImageIndex,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    handleToggleWishlist,
    isInWishlist
};

}



