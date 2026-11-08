import { useTranslations } from "next-intl";

import { Rating } from "@/components/ui/Rating";
import { Product } from "@/types/product";


interface ProductInfoProps { product: Product; }


export function ProductInfo({ product }: ProductInfoProps) {

const t = useTranslations("ProductDetails");

const ratingValue = typeof product.rating === "object" ? product.rating.rate : (product.rating || 0);

const ratingCount = product.reviewCount || (typeof product.rating === "object" ? product.rating.count : 0);


return (

<div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">

    <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-wide">
        {product.title}
    </h1>


    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">

        <Rating value={ratingValue} count={ratingCount} />

        <span className="text-gray-300">|</span>

        <span className="text-[#00FF66] font-medium">
            {t("inStock")}
        </span>

    </div>


    <div className="text-2xl font-normal text-black">
        ${product.price.toFixed(2)}
    </div>


    <p className="border-b border-gray-300 pb-5 text-sm leading-relaxed text-black sm:pb-6">
        {product.description}
    </p>

</div>

);

}


