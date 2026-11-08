"use client";
import { useState } from "react";
import { useEffect } from "react";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { Heart } from "lucide-react";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

import { ProductCard } from "@/components/products/ProductCard";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

import { productService } from "@/services/productService";

import { Product } from "@/types/product";

export default function WishlistPage() {

const t = useTranslations("WishlistPage");

const wishlistItems = useWishlistStore((state) => state.items);
const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
const clearWishlist = useWishlistStore((state) => state.clearWishlist);

const addToCart = useCartStore((state) => state.addToCart);

const [Products, setProducts] = useState<Product[]>([]);
const [loadingR, setLoadingR] = useState(true);


useEffect(() => {

    let isActive = true;

        productService.getAllProducts() .then((data: Product[]) => {

                if (isActive) {

                    setProducts(data.slice(0, 4));
                    setLoadingR(false);
                }

            }).catch((err) => {

                console.error("Unable to fetch recommended products:", err);

                if (isActive) setLoadingR(false);

            });

    return () => {

        isActive = false;

        };

}, []);


const handleMoveAllToBag = () => {

    wishlistItems.forEach((product) => {

        addToCart(product, product.colors?.[0]?.name);

    });

    clearWishlist();

    };


    return (

        <main className="py-10">

            <div className="page-container max-w-[1170px] flex flex-col gap-20">

                <div className="flex flex-col gap-10">

                    <div className="flex items-center justify-between">

                        <h1 className="text-xl font-normal text-black">
                            {t("wishlistTitle")} ({wishlistItems.length})
                        </h1>

                        {wishlistItems.length > 0 && (

                            <Button
                                variant="outline"
                                size="md"

                                onClick={handleMoveAllToBag}

                                className="border-gray-400 text-black font-medium px-12 py-4 rounded hover:bg-black hover:text-white transition-colors"
                            >
                                {t("moveAllToBag")}
                            </Button>

                        )}

                    </div>


                    
                    {wishlistItems.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-16 gap-6 text-center border border-dashed border-gray-200 rounded-lg">

                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">

                                <Heart className="w-8 h-8" />

                            </div>

                            <p className="text-gray-500 text-base font-medium">
                                {t("emptyMessage")}
                            </p>

                            <Link href="/">

                                <Button variant="primary" size="md" className="!bg-[var(--brand)] !text-white px-8 py-3">
                                    {t("exploreProducts")}
                                </Button>

                            </Link>

                        </div>

                    ) : (


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                            {wishlistItems.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}

                                    showBadge={true}
                                    showDiscount={true}
                                    showTrashIcon={true}
                                    showAddToCartAlways={true}

                                    showQuickViewIcon={false}
                                    showColors={false}
                                    showHeartIcon={false}
                                    onDelete={() => toggleWishlist(product)}
                                />

                            ))}

                        </div>

                    )}

                </div>



                <div className="flex flex-col gap-10">

                    <div className="flex items-center justify-between">

                        <SectionTitle
                            kicker={t("justForYouKicker")}
                            title=""
                        />

                        <Link href="/">

                            <Button
                                variant="outline"
                                size="md"
                                className="border-gray-400 text-black font-medium px-12 py-4 rounded hover:bg-black hover:text-white transition-colors"
                            >
                                {t("seeAll")}
                            </Button>

                        </Link>

                    </div>


                    {loadingR ? (

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                            {[1, 2, 3, 4].map((idx) => (

                                <div key={idx} className="w-full h-[320px] bg-gray-100 rounded animate-pulse" />

                            ))}

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                            {Products.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    showBadge={true}
                                    showDiscount={true}
                                    showColors={false}
                                    showHeartIcon={false}
                                    showTrashIcon={false}
                                    showAddToCartAlways={true}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </main>

    );

}




