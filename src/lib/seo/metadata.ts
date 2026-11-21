import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, type Locale, DEFAULT_OG_IMAGE } from "@/lib/seo/constants";

export async function createMetadata(locale: Locale, pathname?: string): Promise<Metadata> {

const isArabic = locale === "ar";
const t = await getTranslations({ locale, namespace: "Metadata" });
const title = t("siteTitle");
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
                "x-default": `/en${normalizedPath}`,
            }
        }
        : undefined;



        const imageAlt = t("imageAlt");

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


export async function createNoIndexMetadata(locale: Locale): Promise<Metadata> {

    return {
        ...await createMetadata(locale),

        robots: {
            index: false,
            follow: true,
        },
    };

}
