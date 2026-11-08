import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

import AboutPageClient from "./AboutPageClient";

type Props = { params: Promise<{ locale: "en" | "ar"; }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

const metadata = createMetadata(locale, "/about");

const title = locale === "ar" ? "من نحن" : "About Us";

    const description = locale === "ar"
        ? "تعرف على Exclusive وقصتنا ومنتجاتنا والتزامنا بتوفير تجربة تسوق إلكتروني سهلة ومميزة."
        : "Learn more about Exclusive, our story, our products and our commitment to making online shopping easier.";

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

export default function AboutPage() {
    return <AboutPageClient />;
}



