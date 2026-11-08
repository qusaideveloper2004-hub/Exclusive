import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";

import ContactPageClient from "./ContactPageClient";

type Props = { params: Promise<{ locale: "en" | "ar"; }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

const metadata = createMetadata(locale, "/contact");

const title = locale === "ar" ? "تواصل معنا" : "Contact Us";

    const description = locale === "ar"
        ? "تواصل مع Exclusive للاستفسارات والدعم والمساعدة بشأن تجربة التسوق الإلكتروني."
        : "Get in touch with Exclusive. Contact our team for questions, support, or assistance with your online shopping experience.";

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

export default function ContactPage() {
    return <ContactPageClient />;
}


