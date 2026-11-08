import { useTranslations } from "next-intl";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/products/ProductCard";

import { Product } from "@/types/product";


interface RelatedProductsProps {products: Product[]; }


export function RelatedProducts({ products }: RelatedProductsProps) {

const t = useTranslations("ProductDetails");


if (products.length === 0) return null;


return (

<div className="flex flex-col gap-8 pt-4">

    <SectionTitle
        kicker={t("relatedKicker")}
        title={t("relatedTitle")}
    />


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

            <ProductCard
                key={product.id}
                product={product}
                showBadge={true}
                showDiscount={true}
                showColors={true}
            />

        ))}

    </div>

</div>

);

}


