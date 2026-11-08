import { createNoIndexMetadata } from "@/lib/seo/metadata";

import type { Metadata } from "next";

import WishlistPageClient from "./WishlistPageClient";

type Props = { params: Promise<{ locale: "en" | "ar"; }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default function WishlistPage() {

    return <WishlistPageClient />;

}


