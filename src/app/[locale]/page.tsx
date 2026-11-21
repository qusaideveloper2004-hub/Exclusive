
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/lib/seo/constants";

import { HeroSection } from "@/components/home/HeroSection";
import HomePageClient from "./HomePageClient";

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

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <HomePageClient />
        </div>
    );
}
