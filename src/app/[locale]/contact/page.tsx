import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createMetadata } from "@/lib/seo/metadata";
import { type Locale } from "@/lib/seo/constants";

import ContactPageClient from "./ContactPageClient";

type Props = { params: Promise<{ locale: Locale }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

const [metadata, t] = await Promise.all([
    createMetadata(locale, "/contact"),
    getTranslations({ locale, namespace: "ContactPage" }),
]);
const title = t("metadataTitle");
const description = t("metadataDescription");

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

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <ContactPageClient />;
}
