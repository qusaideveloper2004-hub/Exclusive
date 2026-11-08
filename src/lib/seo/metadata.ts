import type { Metadata } from "next";

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SUPPORTED_LOCALES  ,DEFAULT_OG_IMAGE } from "@/lib/seo/constants";

type Locale = (typeof SUPPORTED_LOCALES)[number];

export function createMetadata( locale: Locale, pathname?: string ): Metadata {

const isArabic = locale === "ar";
const title = isArabic ? "التسوق الإلكتروني" : "Online Shopping";
const description = SITE_DESCRIPTION[locale];




    const normalizedPath = pathname === undefined
        ? undefined
        : pathname === "/"
            ? ""
            : pathname.startsWith("/")
                ? pathname
                : `/${pathname}`;

    const alternates = normalizedPath !== undefined
        ? {
            canonical: `/${locale}${normalizedPath}`,

            languages: {
                en: `/en${normalizedPath}`,
                ar: `/ar${normalizedPath}`,
            }
        }
        : undefined;



        const imageAlt = isArabic
    ? "متجر Exclusive للتسوق الإلكتروني"
    : "Exclusive Online Shopping Store";

    return {

        metadataBase: new URL(SITE_URL),


        ...(alternates !== undefined ? { alternates } : {}),


        title: {
            default: `${SITE_NAME} - ${title}`,
            template: `%s | ${SITE_NAME}`
        },

        description,

        applicationName: SITE_NAME,

        openGraph: {
            title: `${SITE_NAME} - ${title}`,
            description,
            siteName: SITE_NAME,
            type: "website",
            locale: isArabic ? "ar_EG" : "en_US",
            alternateLocale: isArabic ? ["en_US"] : ["ar_EG"],
            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: imageAlt,
                }
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: `${SITE_NAME} - ${title}`,
            description,

            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    alt: imageAlt,
                }
            ],
        }

    };
}


export function createNoIndexMetadata(locale: Locale): Metadata {

    return {
        ...createMetadata(locale),

        robots: {
            index: false,
            follow: true,
        },
    };

}

