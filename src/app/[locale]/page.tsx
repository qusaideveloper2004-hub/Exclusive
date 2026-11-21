
import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/lib/seo/constants";

import { productService } from "@/services/productService";
import { HeroSection } from "@/components/home/HeroSection";
import { FlashSalesSection } from "@/components/home/FlashSalesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BestSellingSection } from "@/components/home/BestSellingSection";
import { PromoBannerSection } from "@/components/home/PromoBannerSection";
import { ExploreProductsSection } from "@/components/home/ExploreProductsSection";
import { ServicesFeatureSection } from "@/components/home/ServicesFeatureSection";
import { HomeErrorState } from "@/components/home/HomeErrorState";
import type { Product } from "@/types/product";


import { connection } from "next/server";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }): Promise<Metadata> {

const { locale } = await params;

const validLocale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? locale as Locale
    : DEFAULT_LOCALE;

const [baseMetadata, t] = await Promise.all([
    createMetadata(validLocale, "/"),
    getTranslations({ locale: validLocale, namespace: "Metadata" }),
]);
const title = t("homeTitle");

    return {

        ...baseMetadata,

        title,

        openGraph: {
            ...baseMetadata.openGraph,
            title: `${SITE_NAME} | ${title}`
        },

        twitter: {
            ...baseMetadata.twitter,
            title: `${SITE_NAME} | ${title}`
        }

    };
}

async function HomeProductSections() {
    await connection();
    let products: Product[] | null = null;
    try {
        products = await productService.getAllProducts();
        if (products.length === 0) {
            throw new Error("FakeStoreAPI returned an empty products response");
        }
    } catch (error) {
        console.error("Unable to load products on the home page:", error);
    }

    return (
        <>
            {products ? (
                <>
                    <FlashSalesSection products={products} />
                    <CategoriesSection />
                    <BestSellingSection products={products} />
                    <PromoBannerSection />
                    <ExploreProductsSection products={products} />
                </>
            ) : (
                <>
                    <HomeErrorState />
                    <PromoBannerSection />
                </>
            )}
            <ServicesFeatureSection />
        </>
    );
}



export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Home");

    return (
        <div>
            <HeroSection />
            <Suspense
                fallback={
                    <p className="page-container py-10 text-sm text-gray-600" role="status">
                        {t("loadingProducts")}
                    </p>
                }
            >
                <HomeProductSections />
            </Suspense>
        </div>
    );
}
