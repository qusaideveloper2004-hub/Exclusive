import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo/metadata";
import { getCategorySEO } from "@/lib/seo/categoryTranslations";

import CategoryPageClient from "./CategoryPageClient";


import { SITE_URL,} from "@/lib/seo/constants";

import {generateBreadcrumbSchema,getCategoryBreadcrumb, } from "@/lib/seo/structuredData";

import JsonLd from "@/lib/seo/JsonLd";

type Props = { params: Promise<{ locale: "en" | "ar"; slug: string; }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale, slug } = await params;
const decodedSlug = decodeURIComponent(slug);

    // const metadata = createMetadata(locale);

    const metadata = createMetadata(locale,`/category/${encodeURIComponent(decodedSlug)}`);

    const category = getCategorySEO(decodedSlug, locale);

    const isAllProducts = decodedSlug === "all";

    const title = category
        ? category.title
        : isAllProducts
            ? locale === "ar" ? "جميع المنتجات" : "All Products"
            : decodedSlug.replace(/-/g, " ").toUpperCase();

    const description = category
        ? category.description
        : isAllProducts
            ? locale === "ar"
                ? "اكتشف جميع منتجات Exclusive واستمتع بتشكيلة متنوعة من المنتجات وأفضل العروض والخصومات."
                : "Explore all products at Exclusive. Discover a wide range of products and enjoy great deals and discounts."
            : locale === "ar"
                ? `اكتشف منتجات قسم ${title} في Exclusive واستمتع بأفضل العروض والخصومات.`
                : `Discover ${title} products at Exclusive and enjoy great deals and discounts.`;

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

    const decodedSlug = decodeURIComponent(slug);

    const categoryName = decodedSlug === "all"
        ? locale === "ar"
            ? "جميع المنتجات"
            : "All Products"
        : getCategoryBreadcrumb(decodedSlug, locale);

    const breadcrumbSchema = generateBreadcrumbSchema([
        {
            name: locale === "ar" ? "الرئيسية" : "Home",
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

            <CategoryPageClient params={Promise.resolve({ slug })} />

        </>
        
    );

}




