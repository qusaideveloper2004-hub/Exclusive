import type { MetadataRoute } from "next";

import { SITE_URL, SUPPORTED_LOCALES ,} from "@/lib/seo/constants";

import { productService } from "@/services/productService";

export const dynamic = "force-dynamic";


const BASE_URL = SITE_URL.replace(/\/+$/, "");

type Locale = (typeof SUPPORTED_LOCALES)[number];

type SitemapOptions = { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; };


function createLocalizedEntries( path: string, options: SitemapOptions ): MetadataRoute.Sitemap {

const languages = Object.fromEntries(

SUPPORTED_LOCALES.map((locale) => [ locale, `${BASE_URL}/${locale}${path}`, ])

) as Record<Locale, string>;


return SUPPORTED_LOCALES.map((locale) => ({

    url: languages[locale],

        alternates: {
            languages,
        },

        changeFrequency: options.changeFrequency,

        priority: options.priority,

    }));

}




export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


    const staticPages = [
        {
            path: "",
            changeFrequency: "weekly",
            priority: 1,
        },

        {
            path: "/about",
            changeFrequency: "monthly",
            priority: 0.7,
        },

        {
            path: "/contact",
            changeFrequency: "monthly",
            priority: 0.6,
        },

    ] satisfies {
        path: string;
        changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
        priority: number;
    }[];


    const staticEntries = staticPages.flatMap((page) =>

        createLocalizedEntries(page.path, { changeFrequency: page.changeFrequency, priority: page.priority, })

    );



    const [categories, products] = await Promise.all([

        productService.getCategories(),

        productService.getAllProducts().catch((error) => {

            console.error("Sitemap Products Fetch Error:", error);

            return [];

        }),

    ]);



    const uniqueCategories = Array.from( new Set([ "all", ...categories,]));

    const categoryEntries = uniqueCategories.flatMap((category) => {

        const path = `/category/${encodeURIComponent(category)}`;

        return createLocalizedEntries(path, {
            changeFrequency: "weekly",
            priority: 0.8,
        });

    });


    const productEntries = products.flatMap((product) => {

        const path = `/product/${product.id}`;

        return createLocalizedEntries(path, {
            changeFrequency: "weekly",
            priority: 0.7,
        });

    });


    return [
        ...staticEntries,
        ...categoryEntries,
        ...productEntries,
    ];

}


