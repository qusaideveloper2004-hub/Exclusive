"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { Link } from "@/i18n/routing";

import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc";
const SUPPORTED_CATEGORIES = new Set(["electronics", "jewelery", "men's clothing", "women's clothing"]);

interface CategoryPageProps {
    slug: string;
    products: Product[];
    hasLoadError: boolean;
}

export default function CategoryPage({ slug, products, hasLoadError }: CategoryPageProps) {

const categorySlug = decodeURIComponent(slug).toLowerCase();
const isUnsupportedCategory = categorySlug !== "all" && !SUPPORTED_CATEGORIES.has(categorySlug);

const t = useTranslations("CategoryPage");
const router = useRouter();
const searchParams = useSearchParams();
const searchQuery = (searchParams.get("search") ?? "").trim();

const [sortBy, setSortBy] = useState<SortOption>("default");

const normalizedQuery = searchQuery.toLocaleLowerCase();

const matchingProducts = products.filter((product) => {
    if (!normalizedQuery) return true;

    const searchableText = `${product.title} ${product.category} ${product.description}`
        .toLocaleLowerCase();

    return searchableText.includes(normalizedQuery);
});

const sortedProducts = [...matchingProducts].sort((a, b) => {

    if (sortBy === "price-asc") {

        return a.price - b.price;

    }

    if (sortBy === "price-desc") {

        return b.price - a.price;

    }

    return 0;

});





const formattedCategoryName = categorySlug.replace(/-/g, " ").toUpperCase();


return (

    <main className="py-10 min-h-[60vh]">

        <div className="page-container max-w-[1170px] flex flex-col gap-8">


                <nav className="flex items-center gap-2 text-sm text-gray-500">

                    <Link href="/" className="hover:text-black transition-colors">
                        {t("breadcrumbHome")}
                    </Link>

                    <span>/</span>

                    <span className="text-black font-medium capitalize">
                        {formattedCategoryName}
                    </span>

                </nav>



                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">

                    <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-wide">
                        {searchQuery ? t("searchResultsTitle", { query: searchQuery }) : formattedCategoryName}
                    </h1>



                    <div className="flex items-center gap-3">

                        <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {t("sortByLabel")}:
                        </label>

                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}

                            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-md p-2.5 focus:ring-[var(--brand)] focus:border-[var(--brand)] outline-none cursor-pointer"
                        >

                            <option value="default">{t("sortDefault")}</option>

                            <option value="price-asc">{t("sortPriceAsc")}</option>

                            <option value="price-desc">{t("sortPriceDesc")}</option>

                        </select>

                    </div>

                </div>



                {hasLoadError && (

                    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">

                        <p className="text-red-600 text-base font-medium">
                            {t("errorMessage")}
                        </p>

                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => router.refresh()}
                        >
                            {t("retryButton")}
                        </Button>

                    </div>

                )}



                {!hasLoadError && sortedProducts.length === 0 && (

                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">

                        <p className="text-gray-500 text-lg font-medium">
                            {searchQuery
                                ? t("searchNoResults", { query: searchQuery })
                                : isUnsupportedCategory
                                    ? t("unsupportedCategoryMessage")
                                    : t("emptyMessage")}
                        </p>

                        <Link href="/">

                            <Button variant="primary" size="md">
                                {t("backHomeButton")}
                            </Button>

                        </Link>

                    </div>

                )}



                {!hasLoadError && sortedProducts.length > 0 && (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                        {sortedProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                
                                showBadge={true}
                                showDiscount={true}
                                showColors={true}
                            />

                        ))}

                    </div>

                )}

        </div>

    </main>

);

}

