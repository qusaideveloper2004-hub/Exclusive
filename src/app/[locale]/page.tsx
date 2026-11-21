
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

function LoadingBlock({ className }: { className: string }) {
    return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function ProductCardSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`min-w-0 ${className}`}>
            <LoadingBlock className="h-[198px] w-full rounded-[6px]" />
            <LoadingBlock className="mt-4 h-5 w-3/4" />
            <LoadingBlock className="mt-2 h-5 w-1/2" />
            <LoadingBlock className="mt-2 h-4 w-1/3" />
        </div>
    );
}

function HomeProductsFallback({ label }: { label: string }) {
    return (
        <div aria-busy="true">
            <p className="sr-only" role="status">{label}</p>
            <div aria-hidden="true">
                <section className="border-b border-gray-300 py-14">
                    <div className="page-container flex max-w-[1170px] flex-col gap-10">
                        <div className="flex items-end justify-between gap-6">
                            <div className="flex items-end gap-8 lg:gap-20">
                                <div className="space-y-3">
                                    <LoadingBlock className="h-5 w-24" />
                                    <LoadingBlock className="h-9 w-48" />
                                </div>
                                <LoadingBlock className="hidden h-10 w-40 md:block" />
                            </div>
                            <LoadingBlock className="h-10 w-24" />
                        </div>
                        <div className="hide-scrollbar flex gap-8 overflow-hidden pt-2 pb-4">
                            {Array.from({ length: 4 }, (_, index) => (
                                <ProductCardSkeleton
                                    key={index}
                                    className="w-[calc(100vw-2rem)] shrink-0 sm:w-[270px]"
                                />
                            ))}
                        </div>
                        <div className="flex justify-center pt-4">
                            <LoadingBlock className="h-14 w-52" />
                        </div>
                    </div>
                </section>

                <section className="border-b border-gray-200 py-14">
                    <div className="page-container flex max-w-[1170px] flex-col gap-10">
                        <div className="flex items-end justify-between">
                            <div className="space-y-3">
                                <LoadingBlock className="h-5 w-24" />
                                <LoadingBlock className="h-9 w-48" />
                            </div>
                            <LoadingBlock className="h-10 w-24" />
                        </div>
                        <div className="hide-scrollbar flex gap-8 overflow-hidden">
                            {Array.from({ length: 8 }, (_, index) => (
                                <LoadingBlock key={index} className="h-[145px] w-[170px] shrink-0" />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-14">
                    <div className="page-container flex flex-col gap-10">
                        <div className="flex items-end justify-between">
                            <div className="space-y-3">
                                <LoadingBlock className="h-5 w-24" />
                                <LoadingBlock className="h-9 w-48" />
                            </div>
                            <LoadingBlock className="h-12 w-36" />
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }, (_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className="page-container max-w-[1170px]">
                        <LoadingBlock className="h-[520px] w-full rounded-sm md:h-[430px]" />
                    </div>
                </section>

                <section className="border-b border-gray-300 py-14">
                    <div className="page-container flex max-w-[1170px] flex-col gap-10">
                        <div className="flex items-end justify-between">
                            <div className="space-y-3">
                                <LoadingBlock className="h-5 w-24" />
                                <LoadingBlock className="h-9 w-48" />
                            </div>
                            <LoadingBlock className="h-10 w-24" />
                        </div>
                        <div className="flex flex-col gap-8">
                            {[0, 1].map((row) => (
                                <div key={row} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    {Array.from({ length: 4 }, (_, index) => (
                                        <ProductCardSkeleton key={index} />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center pt-4">
                            <LoadingBlock className="h-14 w-52" />
                        </div>
                    </div>
                </section>

                <section className="relative py-8">
                    <div className="page-container flex max-w-[1170px] flex-col gap-12">
                        <div className="flex flex-col gap-10">
                            <div className="space-y-3">
                                <LoadingBlock className="h-5 w-24" />
                                <LoadingBlock className="h-9 w-48" />
                            </div>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                                <LoadingBlock className="h-[300px] md:col-span-2 md:row-span-2 md:h-[600px]" />
                                <LoadingBlock className="h-[284px] md:col-span-2" />
                                <LoadingBlock className="h-[284px]" />
                                <LoadingBlock className="h-[284px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-3">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="flex flex-col items-center gap-4">
                                    <LoadingBlock className="h-20 w-20 rounded-full" />
                                    <LoadingBlock className="h-6 w-40" />
                                    <LoadingBlock className="h-4 w-56" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

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
                fallback={<HomeProductsFallback label={t("loadingProducts")} />}
            >
                <HomeProductSections />
            </Suspense>
        </div>
    );
}
