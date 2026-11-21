import type { Metadata } from "next";
import { cache } from "react";
import { getTranslations } from "next-intl/server";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_URL, type Locale } from "@/lib/seo/constants";
import snapshot from "@/data/products.snapshot.json";

import { generateProductSchema, generateBreadcrumbSchema, getCategoryBreadcrumb } from "@/lib/seo/structuredData";

import JsonLd from "@/lib/seo/JsonLd";

import ProductDetailsClient from "./ProductDetailsClient";
import { productService } from "@/services/productService";


interface ProductPageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
}


const getProductById = cache((id: number) => productService.getProductById(id));

export const revalidate = 3600;

export function generateStaticParams() {
    return snapshot.map((product) => ({ id: String(product.id) }));
}


export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {

const { locale, id } = await params;

const baseMetadata = await createMetadata(locale);
const t = await getTranslations({ locale, namespace: "ProductDetails" });

const product = await getProductById(Number(id));


if (!product) {

    return {
        ...baseMetadata,
        title: t("productNotFound"),
    };

}


const productMetadata = await createMetadata(locale, `/product/${id}`);

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
const t = await getTranslations({ locale, namespace: "Header" });

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


const productSchema = generateProductSchema(product, locale);


const breadcrumbSchema = generateBreadcrumbSchema([

    {
        name: t("home"),
        url: `${SITE_URL}/${locale}`,
    },

    {
        name: getCategoryBreadcrumb(product.category, locale),
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
