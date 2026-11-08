import { useTranslations } from "next-intl";

import { Heart, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Product } from "@/types/product";


interface ProductActionsProps {
    product: Product;
    quantity: number;
    isInWishlist: boolean;
    onIncreaseQuantity: () => void;
    onDecreaseQuantity: () => void;
    onAddToCart: () => void;
    onToggleWishlist: () => void;
}


export function ProductActions({ quantity, isInWishlist, onIncreaseQuantity, onDecreaseQuantity, onAddToCart, onToggleWishlist }: ProductActionsProps) {

const t = useTranslations("ProductDetails");
const commonT = useTranslations("Common");


return (

<div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">

    <div className="flex items-center border border-gray-300 rounded overflow-hidden">

        <button
            type="button"
            onClick={onDecreaseQuantity}

            aria-label="Decrease quantity"
            className="w-10 h-10 flex items-center justify-center hover:bg-[var(--brand)] hover:text-white transition-colors cursor-pointer border-r border-gray-300"
        >
            <Minus className="w-4 h-4" />
        </button>


        <span className="w-12 text-center text-base font-medium">
            {quantity}
        </span>


        <button
            type="button"
            onClick={onIncreaseQuantity}

            aria-label="Increase quantity"
            className="w-10 h-10 flex items-center justify-center hover:bg-[var(--brand)] hover:text-white transition-colors cursor-pointer border-l border-gray-300"
        >
            <Plus className="w-4 h-4" />
        </button>

    </div>


    <Button
        onClick={onAddToCart}

        variant="primary"
        size="md"
        className="h-10 min-w-[132px] flex-1 rounded px-5 py-2.5 text-sm font-medium !bg-[var(--brand)] !text-white sm:flex-none sm:px-8"
    >
        {t("buyNow")}
    </Button>


    <button
        type="button"
        onClick={onToggleWishlist}

        aria-label={isInWishlist ? commonT("removeFromWishlist") : commonT("addToWishlist")}
        aria-pressed={isInWishlist}
        className={`h-10 w-10 shrink-0 rounded border border-gray-300 flex items-center justify-center transition-colors cursor-pointer hover:border-[var(--brand)] ${
            isInWishlist ? "text-[var(--brand)] border-[var(--brand)]" : "text-black"
        }`}
    >

        <Heart
            className={`h-5 w-5 ${isInWishlist ? "fill-current" : "fill-none"}`}
            
            style={{
                color: isInWishlist ? "#db4444" : "#111111",
                fill: isInWishlist ? "#db4444" : "none"
            }}
            strokeWidth={1.8}
        />

    </button>

</div>

);

}


