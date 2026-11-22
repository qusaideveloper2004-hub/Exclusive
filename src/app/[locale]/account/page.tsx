import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import AccountPageClient from "./AccountPageClient";
import { type Locale } from "@/lib/seo/constants";

type Props = {params: Promise<{ locale: Locale }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default async function AccountPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <AccountPageClient />;

}
