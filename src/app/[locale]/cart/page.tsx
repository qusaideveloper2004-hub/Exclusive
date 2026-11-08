import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

import CartPageClient from "./CartPageClient";

type Props = {params: Promise<{  locale: "en" | "ar";}>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default function CartPage() {

    return <CartPageClient />;

}


