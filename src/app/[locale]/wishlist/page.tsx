import { createNoIndexMetadata } from "@/lib/seo/metadata";

import type { Metadata } from "next";

import WishlistPageClient from "./WishlistPageClient";
import { type Locale } from "@/lib/seo/constants";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";

type Props = { params: Promise<{ locale: Locale }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default async function WishlistPage() {
    let recommendedProducts: Product[] = [];

    try {
        recommendedProducts = (await productService.getAllProducts()).slice(0, 4);
    } catch (error) {
        console.error("Unable to load recommended wishlist products:", error);
    }

    return <WishlistPageClient recommendedProducts={recommendedProducts} />;

}
