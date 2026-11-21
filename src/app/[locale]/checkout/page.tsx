import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/seo/constants";
import type { Metadata } from "next";

import CheckoutClient from "./CheckoutPageClient";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return createNoIndexMetadata(locale);
}

export default function CheckoutPage() {

    return <CheckoutClient />;

}
