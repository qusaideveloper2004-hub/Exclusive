"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { FlashSalesSection } from "@/components/home/FlashSalesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BestSellingSection } from "@/components/home/BestSellingSection";
import { PromoBannerSection } from "@/components/home/PromoBannerSection";
import { ExploreProductsSection } from "@/components/home/ExploreProductsSection";
import { ServicesFeatureSection } from "@/components/home/ServicesFeatureSection";
import { Button } from "@/components/ui/Button";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";

type ProductLoadStatus = "loading" | "success" | "error";

export default function HomePageClient() {
    const t = useTranslations("Home");
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<ProductLoadStatus>("loading");
    const [requestKey, setRequestKey] = useState(0);

    useEffect(() => {
        let isActive = true;

        setStatus("loading");

        productService.getAllProducts({ fresh: true }).then((products) => {
            if (!isActive) return;
            if (products.length === 0) {
                throw new Error("FakeStoreAPI returned an empty products response");
            }

            setAllProducts(products);
            setStatus("success");
        }).catch((error: unknown) => {
            console.error("Unable to load products from FakeStoreAPI:", error);
            if (isActive) setStatus("error");
        });

        return () => {
            isActive = false;
        };
    }, [requestKey]);

    return (
        <div>
            {status === "loading" && (
                <p className="page-container py-10 text-sm text-gray-600" role="status">
                    {t("loadingProducts")}
                </p>
            )}

            {status === "error" && (
                <div className="page-container flex flex-col items-start gap-4 py-10" role="alert">
                    <p className="text-sm text-red-600">{t("loadProductsError")}</p>
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                            setStatus("loading");
                            setRequestKey((key) => key + 1);
                        }}
                    >
                        {t("retry")}
                    </Button>
                </div>
            )}

            {status !== "success" && (
                <>
                    <PromoBannerSection />
                    <ServicesFeatureSection />
                </>
            )}

            {status === "success" && (
                <>
                    <FlashSalesSection products={allProducts} />
                    <CategoriesSection />
                    <BestSellingSection products={allProducts} />
                    <PromoBannerSection />
                    <ExploreProductsSection products={allProducts} />
                    <ServicesFeatureSection />
                </>
            )}
        </div>
    );
}
