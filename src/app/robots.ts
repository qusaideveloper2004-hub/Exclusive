import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/account",
                "/wishlist",
                "/en/account",
                "/en/cart",
                "/en/login",
                "/en/wishlist",
                "/ar/account",
                "/ar/cart",
                "/ar/login",
                "/ar/wishlist",
            ],
        },

        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}


