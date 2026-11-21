import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/account",
                "/cart",
                "/checkout",
                "/login",
                "/signup",
                "/wishlist",
                "/en/account",
                "/en/cart",
                "/en/checkout",
                "/en/login",
                "/en/signup",
                "/en/wishlist",
                "/ar/account",
                "/ar/cart",
                "/ar/checkout",
                "/ar/login",
                "/ar/signup",
                "/ar/wishlist",
            ],
        },

        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
