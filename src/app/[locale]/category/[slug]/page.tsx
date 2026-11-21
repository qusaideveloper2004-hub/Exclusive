import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createMetadata } from "@/lib/seo/metadata";
import { type Locale } from "@/lib/seo/constants";
import { getCategorySEO } from "@/lib/seo/categoryTranslations";

import CategoryPageClient from "./CategoryPageClient";


import { SITE_URL,} from "@/lib/seo/constants";

import {generateBreadcrumbSchema,getCategoryBreadcrumb, } from "@/lib/seo/structuredData";

import JsonLd from "@/lib/seo/JsonLd";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";

type Props = { params: Promise<{ locale: Locale; slug: string; }>; };

export const revalidate = 3600;

export function generateStaticParams() {
    return [
        { slug: "all" },
        { slug: "electronics" },
        { slug: "jewelery" },
        { slug: "men's clothing" },
        { slug: "women's clothing" },
    ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale, slug } = await params;
const decodedSlug = decodeURIComponent(slug);
const t = await getTranslations({ locale, namespace: "CategoryPage" });

    const metadata = await createMetadata(locale,`/category/${encodeURIComponent(decodedSlug)}`);

    const category = getCategorySEO(decodedSlug, locale);

    const isAllProducts = decodedSlug === "all";

    const title = category
        ? category.title
        : isAllProducts
            ? t("metadataAllTitle")
            : decodedSlug.replace(/-/g, " ").toUpperCase();

    const description = category
        ? category.description
        : isAllProducts
            ? t("metadataAllDescription")
            : t("metadataCategoryDescription", { title });

    return {
        ...metadata,

        title,
        description,

        openGraph: {
            ...metadata.openGraph,
            title: `${title} | Exclusive`,
            description,
        },

        twitter: {
            ...metadata.twitter,
            title: `${title} | Exclusive`,
            description,
        },
    };
}

export default async function CategoryPage({ params }: Props) {

    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: "CategoryPage" });

    const decodedSlug = decodeURIComponent(slug);
    const categorySlug = decodedSlug.toLowerCase();
    const supportedCategories = new Set([
        "all",
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
    ]);

    let products: Product[] = [];
    let hasLoadError = false;

    if (supportedCategories.has(categorySlug)) {
        try {
            products = categorySlug === "all"
                ? await productService.getAllProducts()
                : await productService.getProductsByCategory(categorySlug);
        } catch (error) {
            console.error(`Unable to load category ${categorySlug}:`, error);
            hasLoadError = true;
        }
    }

    const categoryName = decodedSlug === "all"
        ? t("metadataAllTitle")
        : getCategoryBreadcrumb(decodedSlug, locale);

    const breadcrumbSchema = generateBreadcrumbSchema([
        {
            name: t("breadcrumbHome"),
            url: `${SITE_URL}/${locale}`,
        },

        {
            name: categoryName,
            url: `${SITE_URL}/${locale}/category/${encodeURIComponent(decodedSlug)}`,
        },

    ]);

    return (
        <>
            <JsonLd data={breadcrumbSchema} />

            <CategoryPageClient
                slug={slug}
                products={products}
                hasLoadError={hasLoadError}
            />

        </>
        
    );

}
