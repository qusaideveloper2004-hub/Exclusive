import { Product } from "@/types/product";

import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import { getCategorySEO } from "@/lib/seo/categoryTranslations";

type Locale = "en" | "ar";

export function generateProductSchema( product: Product, locale: Locale ) {

const productUrl = `${SITE_URL}/${locale}/product/${product.id}`;

    return {

        "@context": "https://schema.org",
        "@type": "Product",

        name: product.title,
        description: product.description,

        image: [product.image],

        ...(typeof product.rating === "number" &&
            product.reviewCount !== undefined &&
            product.reviewCount > 0 && {

                aggregateRating: {

                    "@type": "AggregateRating",
                    ratingValue: product.rating,
                    ratingCount: product.reviewCount,
                    bestRating: 5,
                    worstRating: 1,
                },
            }),

        offers: {
            "@type": "Offer",

            url: productUrl,
            priceCurrency: "USD",
            price: product.price,

            availability: "https://schema.org/InStock",

            seller: {

                "@type": "Organization",
                name: SITE_NAME,
            },

        },

    };
}

export function generateBreadcrumbSchema( items: { name: string; url: string; }[] ) {

    return {

        "@context": "https://schema.org",
        "@type": "BreadcrumbList",

        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",

            position: index + 1,
            name: item.name,
            item: item.url,

        })),

    };
}

export function getCategoryBreadcrumb( slug: string, locale: Locale ) {
    const category = getCategorySEO(slug, locale);

    if (category) {
        return category.name;
    }

    return slug
        .replace(/-/g, " ")
        .toUpperCase();
}

