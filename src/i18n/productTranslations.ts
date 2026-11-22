import type { Locale } from "@/lib/seo/constants";
import type { Product } from "@/types/product";

const PRODUCT_TITLES_AR: Record<number, string> = {

    1: "حقيبة ظهر Fjallraven Foldsack رقم 1، تتسع لابتوب 15 بوصة",
2: "تيشيرتات رجالي كاجوال بمقاس سليم فيت",
3: "جاكيت رجالي قطن",
4: "ملابس رجالي كاجوال بمقاس سليم فيت",
5: "سوار سلسلة John Hardy Legends Naga نسائي بالذهب والفضة على شكل تنين",
6: "خاتم ذهب خالص Micropave صغير",
7: "خاتم Princess مطلي بالذهب الأبيض",
8: "طقم Pierced Owl مزدوج من الستانلس ستيل المطلي بالذهب الوردي",
9: "هارد خارجي محمول WD سعة 2 تيرابايت - USB 3.0",
10: "SanDisk SSD PLUS داخلي سعة 1 تيرابايت - SATA III",
11: "Silicon Power SSD سعة 256 جيجابايت 3D NAND بذاكرة SLC لتسريع الأداء",
12: "هارد WD للألعاب سعة 4 تيرابايت، متوافق مع Playstation 4",
13: "شاشة Acer SB220Q مقاس 21.5 بوصة Full HD بتقنية IPS فائقة النحافة",
14: "شاشة ألعاب Samsung منحنية 49 بوصة CHG90 بتردد 144 هرتز وتقنية QLED",
15: "جاكيت تزلج نسائي 3 في 1 من BIYLACLESEN للشتاء",
16: "جاكيت موتوسيكل نسائي جلد صناعي بغطاء رأس قابل للإزالة من Lock and Love",
17: "جاكيت مطر نسائي مخطط وواقٍ من الرياح للتسلق",
18: "تيشيرت نسائي MBJ سادة بكم قصير وياقة V",
19: "تيشيرت نسائي Opna بكم قصير ماص للرطوبة",
20: "تيشيرت نسائي DANVOUY قطن كاجوال بكم قصير",

};



const PRODUCT_TITLES: Partial<Record<Locale, Record<number, string>>> = {

ar: PRODUCT_TITLES_AR,
};


export function getProductTitle(id: number, title: string, locale: Locale): string {

return PRODUCT_TITLES[locale]?.[id] ?? title;
}

export function localizeProduct(product: Product, locale: Locale): Product {
    const originalTitle = product.originalTitle ?? product.title;

    return {
        ...product,
        originalTitle,
        title: getProductTitle(product.id, originalTitle, locale),
    };
}


