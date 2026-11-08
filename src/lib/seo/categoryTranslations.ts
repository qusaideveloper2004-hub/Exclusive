
type CategorySEOData = {
    name: string;
    title: string;
    description: string;
};

type CategorySEOTranslations = {
    en: CategorySEOData;
    ar: CategorySEOData;
};

export const CATEGORY_SEO: Record<string, CategorySEOTranslations> = {

    all: {

        en: {
            name: "All Products",
            title: "All Products",
            description: "Browse all products at Exclusive and discover great deals across electronics, fashion, jewelry, and more."
        },

        ar: {
            name: "جميع المنتجات",
            title: "جميع المنتجات",
            description: "تصفح جميع منتجات Exclusive واكتشف عروضًا مميزة على الإلكترونيات والأزياء والمجوهرات وغيرها."
        }

    },

    sale: {

        en: {
            name: "Sale",
            title: "Sale Offers",
            description: "Explore the latest sale offers at Exclusive and find great prices across a wide range of products."
        },

        ar: {
            name: "التخفيضات",
            title: "عروض وتخفيضات",
            description: "اكتشف أحدث عروض وتخفيضات Exclusive واعثر على أسعار مميزة لمجموعة واسعة من المنتجات."
        }
    },

    electronics: {

        en: {
            name: "Electronics",
            title: "Electronics Products",
            description: "Discover a wide range of electronics at Exclusive. Explore our collection and find great deals on the products you need."
        },

        ar: {
            name: "الإلكترونيات",
            title: "منتجات الإلكترونيات",
            description: "اكتشف مجموعة متنوعة من المنتجات الإلكترونية في Exclusive واستمتع بأفضل العروض والخصومات."
        }
    },

    jewelery: {

        en: {
            name: "Jewelry",
            title: "Jewelry Collection",
            description: "Explore the jewelry collection at Exclusive and discover stylish pieces at great prices."
        },
        ar: {
            name: "المجوهرات",
            title: "مجموعة المجوهرات",
            description: "اكتشف تشكيلة المجوهرات في Exclusive واستمتع بقطع مميزة وأسعار رائعة."
        }
    },


    "men's clothing": {
        en: {
            name: "Men's Clothing",
            title: "Men's Clothing Collection",
            description: "Explore men's clothing at Exclusive. Discover a variety of styles and find great deals on your favorite pieces."
        },

        ar: {
            name: "ملابس رجالية",
            title: "تشكيلة الملابس الرجالية",
            description: "اكتشف تشكيلة الملابس الرجالية في Exclusive واستمتع بتصميمات متنوعة وعروض مميزة."
        }
    },


    "women's clothing": {
        en: {
            name: "Women's Clothing",
            title: "Women's Clothing Collection",
            description: "Discover women's clothing at Exclusive. Explore different styles and enjoy great deals on your favorite products."
        },
        ar: {
            name: "ملابس نسائية",
            title: "تشكيلة الملابس النسائية",
            description: "اكتشفي تشكيلة الملابس النسائية في Exclusive واستمتعي بتصميمات متنوعة وأفضل العروض."
        }
    },

    "home lifestyle": {
        en: {
            name: "Home & Lifestyle",
            title: "Home & Lifestyle Products",
            description: "Discover home and lifestyle products at Exclusive, from everyday essentials to items that make your space your own."
        },
        ar: {
            name: "المنزل وأسلوب الحياة",
            title: "منتجات المنزل وأسلوب الحياة",
            description: "اكتشف منتجات المنزل وأسلوب الحياة من Exclusive، من الاحتياجات اليومية إلى كل ما يضيف لمسة مميزة لمساحتك."
        }
    },

    medicine: {
        en: {
            name: "Medicine",
            title: "Medicine & Health Products",
            description: "Browse medicine and health products at Exclusive and find everyday essentials in one place."
        },

        ar: {
            name: "الأدوية",
            title: "الأدوية ومنتجات الصحة",
            description: "تصفح الأدوية ومنتجات الصحة من Exclusive واعثر على احتياجاتك اليومية في مكان واحد."
        }
    },

    "sports outdoor": {
        en: {
            name: "Sports & Outdoor",
            title: "Sports & Outdoor Products",
            description: "Explore sports and outdoor products at Exclusive for your next workout, adventure, or activity."
        },

        ar: {
            name: "الرياضة والأنشطة الخارجية",
            title: "منتجات الرياضة والأنشطة الخارجية",
            description: "اكتشف منتجات الرياضة والأنشطة الخارجية من Exclusive لتمارينك ومغامراتك القادمة."
        }
    },

    "baby toys": {
        en: {
            name: "Baby & Toys",
            title: "Baby Products & Toys",
            description: "Discover baby products and toys at Exclusive, with a variety of picks for little ones and families."
        },
        ar: {
            name: "مستلزمات الأطفال والألعاب",
            title: "منتجات الأطفال والألعاب",
            description: "اكتشف مستلزمات الأطفال والألعاب من Exclusive مع خيارات متنوعة للصغار والعائلات."
        }
    },

    "groceries pets": {
        en: {
            name: "Groceries & Pets",
            title: "Groceries & Pet Supplies",
            description: "Shop groceries and pet supplies at Exclusive and find useful everyday essentials for your home."
        },
        ar: {
            name: "البقالة ومستلزمات الحيوانات الأليفة",
            title: "منتجات البقالة ومستلزمات الحيوانات الأليفة",
            description: "تسوق منتجات البقالة ومستلزمات الحيوانات الأليفة من Exclusive واعثر على احتياجات منزلك اليومية."
        }
    },

    "health beauty": {
        en: {
            name: "Health & Beauty",
            title: "Health & Beauty Products",
            description: "Explore health and beauty products at Exclusive and find products for your daily care routine."
        },

        ar: {
            name: "الصحة والجمال",
            title: "منتجات الصحة والجمال",
            description: "اكتشف منتجات الصحة والجمال من Exclusive واختر ما يناسب روتين عنايتك اليومي."
        }
    }

};

export function getCategorySEO(slug: string, locale: "en" | "ar"): CategorySEOData | null {

let decodedSlug = slug;

try {
    decodedSlug = decodeURIComponent(slug);
    
} catch {
    decodedSlug = slug;
}

const normalizedSlug = decodedSlug
    .trim()
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

const category = CATEGORY_SEO[normalizedSlug];

if (!category) {

    return null;

}
return category[locale];

}


