
import type { Metadata } from "next";
import { Suspense } from "react";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES  } from "@/lib/seo/constants";

import HomePageClient from "./HomePageClient";
import { productService } from "@/services/productService";
import { HeroSection } from "@/components/home/HeroSection";

type Locale = (typeof SUPPORTED_LOCALES)[number];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }): Promise<Metadata> {

const { locale } = await params;

const validLocale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? locale as Locale
    : DEFAULT_LOCALE;

const baseMetadata = createMetadata(validLocale,"/");

const title = validLocale === "ar"
    ? "التسوق الإلكتروني"
    : "Online Shopping";

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
    try {
        const products = await productService.getAllProducts();
        return <HomePageClient initialProducts={products} initialStatus="success" />;
    } catch (error) {
        console.error("Unable to load products on the home page:", error);
        return <HomePageClient initialProducts={[]} initialStatus="error" />;
    }
}

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <Suspense fallback={<p className="page-container py-10 text-sm text-gray-600" role="status">Loading products...</p>}>
                <HomeProductSections />
            </Suspense>
        </div>
    );
}