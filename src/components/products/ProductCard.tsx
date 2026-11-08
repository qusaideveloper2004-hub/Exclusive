"use client";

import Image from "next/image";

import { Heart, Eye, Trash2 } from "lucide-react";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

import { Rating } from "@/components/ui/Rating";

import { Product } from "@/types/product";

interface ProductCardProps {
product: Product;

showDiscount?: boolean;
showBadge?: boolean;
showColors?: boolean;

showQuickViewIcon?: boolean;
showTrashIcon?: boolean;
showHeartIcon?: boolean;
showAddToCartAlways?: boolean;

    onDelete?: () => void;

}

export const ProductCard: React.FC<ProductCardProps> = ({
product,

showDiscount = true,
showBadge = true,
showColors = true,

showTrashIcon = false,
showHeartIcon = true,
showAddToCartAlways = false,
showQuickViewIcon = true,

onDelete,

}) => {

const t = useTranslations("Common");

const addToCart = useCartStore((state) => state.addToCart);
const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
const isFavorite = useWishlistStore((state) => state.isInWishlist(product.id));


const hasDiscount = showDiscount && !!product.discountPercentage;
const isNewProduct = !hasDiscount && !!product.isNew;


return (

    <div className="group relative flex w-full flex-col transition-all duration-200 hover:-translate-y-1">

        <div className="relative h-[198px] w-full overflow-hidden rounded-[6px] border border-[#f0f0f0] bg-[#f5f5f5] p-5 shadow-sm transition-shadow duration-200 group-hover:shadow-md">

            {showBadge && (

                <div className="absolute top-[10px] z-10 ltr:left-[10px] rtl:right-[10px]">

                        {hasDiscount && (

                            <span className="rounded-[3px] bg-[var(--brand)] px-[10px] py-[3px] text-[11px] font-normal leading-4 text-white">
                                -{product.discountPercentage}%
                            </span>

                        )}

                        {isNewProduct && (

                            <span className="rounded-[3px] bg-[#00ff66] px-[10px] py-[3px] text-[11px] font-medium leading-4 text-black">
                                NEW
                            </span>

                        )}

                </div>

            )}


            <div className="absolute top-[10px] z-10 flex flex-col gap-2 ltr:right-[10px] rtl:left-[10px]">

                {showTrashIcon ? (

                        <button
                            onClick={onDelete}
                            aria-label={t("removeFromWishlist")}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-sm transition-all duration-200 hover:text-[var(--brand)] hover:scale-105 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                        </button>

                ) : showHeartIcon ? (

                        <button
                            onClick={() => toggleWishlist(product)}
                            aria-label={t(isFavorite ? "removeFromWishlist" : "addToWishlist")}
                            className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:text-[var(--brand)] hover:scale-105 cursor-pointer ${
                                isFavorite ? "text-[var(--brand)]" : "text-black"
                            }`}
                        >

                            <Heart
                                className={`h-[17px] w-[17px] ${
                                    isFavorite ? "fill-current" : "fill-none"
                                }`}
                                style={{
                                    color: isFavorite ? "#db4444" : "#111111",
                                    fill: isFavorite ? "#db4444" : "none",
                                }}
                                strokeWidth={1.8}
                            />

                        </button>

                ) : null}


                    {showQuickViewIcon && (

                        <Link
                            href={`/product/${product.id}`}

                            aria-label={t("quickView")}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-sm transition-all duration-200 hover:text-[var(--brand)] hover:scale-105"
                            >  
                                <Eye className="h-[17px] w-[17px]" strokeWidth={1.8} />
                        </Link>
                    )}

            </div>



            <div className="relative h-full w-full">

                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                />

            </div>


            <button

                onClick={() => addToCart(product, product.colors?.[0]?.name)}

                style={{ color: "#ffffff" }}
                className={`absolute inset-x-0 bottom-0 z-10 flex h-[38px] w-full items-center justify-center bg-black text-center text-[13px] font-medium !text-white transition-all duration-200 cursor-pointer hover:bg-[var(--brand)] ${
                    showAddToCartAlways
                        ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                >

                    {t("addToCart")}

            </button>

        </div>



        <div className="flex flex-col gap-[6px] pt-[14px]">

                <Link
                    href={`/product/${product.id}`}
                    className="truncate text-[14px] font-medium leading-5 text-black transition-colors duration-200 hover:text-[var(--brand)]"
                >
                    {product.title}
                </Link>




            <div className="flex items-center gap-[10px] text-[14px] font-medium leading-5">

                    <span className="text-[var(--brand)] text-base">
                        ${product.price}
                    </span>

                    {hasDiscount && product.originalPrice && (

                        <span className="text-[13px] text-gray-500 line-through">
                            ${product.originalPrice}
                        </span>

                    )}

            </div>


            <Rating
                value={typeof product.rating === "object" ? product.rating.rate : (product.rating || 0)}
                count={product.reviewCount || (typeof product.rating === "object" ? product.rating.count : 0)}
            />


            {showColors && product.colors && product.colors.length > 0 && (

                <div className="mt-1 flex items-center gap-2">

                        {product.colors.map((color, index) => (

                            <button
                                key={index}
                                aria-label={t(color.name.toLowerCase())}
                                className="flex h-4 w-4 items-center justify-center rounded-full border border-black p-0.5"
                            >

                                <span
                                    className="h-full w-full rounded-full"
                                    style={{ backgroundColor: color.hex }}
                                />

                            </button>

                        ))}

                </div>

            )}

        </div>

    </div>

);

};



