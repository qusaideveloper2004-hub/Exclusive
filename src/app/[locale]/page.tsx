
import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, DEFAULT_LOCALE, SUPPORTED_LOCALES  } from "@/lib/seo/constants";

import HomePageClient from "./HomePageClient";

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

export default function HomePage() {

    return <HomePageClient />;

}