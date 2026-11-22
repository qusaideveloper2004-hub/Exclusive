import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import CartPageClient from "./CartPageClient";
import { type Locale } from "@/lib/seo/constants";

type Props = {params: Promise<{ locale: Locale }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default async function CartPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <CartPageClient />;

}
