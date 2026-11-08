import type { Metadata } from "next";
import { cache } from "react";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_URL, SUPPORTED_LOCALES } from "@/lib/seo/constants";

import { generateProductSchema, generateBreadcrumbSchema, getCategoryBreadcrumb } from "@/lib/seo/structuredData";

import JsonLd from "@/lib/seo/JsonLd";

import ProductDetailsClient from "./ProductDetailsClient";
import { productService } from "@/services/productService";


type Locale = (typeof SUPPORTED_LOCALES)[number];


interface ProductPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}


const getProductById = cache((id: number) => productService.getProductById(id));


export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {

const { locale, id } = await params;

const baseMetadata = createMetadata(locale as Locale);

const product = await getProductById(Number(id));


if (!product) {

    return {
        ...baseMetadata,
        title: locale === "ar"
            ? "المنتج غير موجود"
            : "Product Not Found",
    };

}


const productMetadata = createMetadata(locale as Locale, `/product/${id}`);

const title = product.title;

const description = product.description;


return {

    ...productMetadata,

    title,
    description,

    openGraph: {

        ...productMetadata.openGraph,

        title,
        description,

        images: [
            {
                url: product.image,
                alt: product.title,
            }
        ],

    },

    twitter: {

        ...productMetadata.twitter,

        card: "summary_large_image",

        title,
        description,

        images: [
            {
                url: product.image,
                alt: product.title,
            }
        ],

    },

};

}


export default async function ProductDetailsPage({ params }: ProductPageProps) {

const { locale, id } = await params;

const product = await getProductById(Number(id));


if (!product) {

    return (
        <ProductDetailsClient
            product={null}
            relatedProducts={[]}
        />
    );

}


const relatedProducts = await productService.getProductsByCategory(product.category);

const filteredRelatedProducts = relatedProducts.filter((item) => item.id !== product.id);


const productSchema = generateProductSchema(product, locale as Locale);


const breadcrumbSchema = generateBreadcrumbSchema([

    {
        name: locale === "ar" ? "الرئيسية" : "Home",
        url: `${SITE_URL}/${locale}`,
    },

    {
        name: getCategoryBreadcrumb(product.category, locale as Locale),
        url: `${SITE_URL}/${locale}/category/${encodeURIComponent(product.category)}`,
    },

    {
        name: product.title,
        url: `${SITE_URL}/${locale}/product/${id}`,
    },

]);


return (

<>

    <JsonLd data={productSchema} />

    <JsonLd data={breadcrumbSchema} />

    <ProductDetailsClient
        key={product.id}
        product={product}
        relatedProducts={filteredRelatedProducts}
    />

</>

);

}


