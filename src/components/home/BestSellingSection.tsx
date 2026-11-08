"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

import { Product } from "@/types/product";

interface BestSellingSectionProps {

products: Product[];
}

export const BestSellingSection: React.FC<BestSellingSectionProps> = ({products,}) => {


const t = useTranslations("BestSelling");

const bestSellingProducts = products.slice(0, 4);

return (
    <section className="py-14 ">

        <div className="page-container flex flex-col gap-10">


            <div className="flex items-end justify-between">
                <SectionTitle
                    kicker={t("kicker")}
                    title={(t("title"))} />


                <Link href="/category/all">
                    <Button variant="primary" size="md" className=" !text-white px-8 py-3 text-sm">
                        {t("viewAll")}
                    </Button>
                </Link>

            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {bestSellingProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        
                        showBadge={false}
                        showDiscount={false}
                        showColors={false}
                    />
                ))}
            </div>


        </div>

    </section>
);

};






