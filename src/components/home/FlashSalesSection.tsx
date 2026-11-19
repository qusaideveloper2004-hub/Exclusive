"use client";

import React, { useState } from "react";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { Button } from "@/components/ui/Button";

import { ProductCard } from "@/components/products/ProductCard";
import { useHorizontalSlider } from "@/hooks/useHorizontalSlider";

import { Product } from "@/types/product";

interface FlashSalesSectionProps {
products: Product[];

}

export const FlashSalesSection: React.FC<FlashSalesSectionProps> = ({ products, }) => {

const t = useTranslations("Home");

const [targetDate] = useState( () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

const flashProducts = products.filter((p) => p.discountPercentage);

const { sliderRef, movePrevious, moveNext, syncCurrentIndex } = useHorizontalSlider();

if (flashProducts.length === 0) return null;

return (

<section className="py-14 border-b border-gray-300">

    <div className="page-container max-w-[1170px] flex flex-col gap-10">


        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div className="flex flex-col md:flex-row md:items-end gap-8 lg:gap-20">

                <SectionTitle
                kicker={t("flashSalesKicker")}
                title={t("flashSalesTitle")}
                />

                <div className="pb-1 md:translate-x-8">

                    <CountdownTimer targetDate={targetDate} className="" />

                </div>

            </div>


                <SliderArrows
                onPrev={movePrevious}
                onNext={moveNext}

                className="self-end md:self-auto"
                />

        </div>


        <div ref={sliderRef} onScroll={syncCurrentIndex} className="hide-scrollbar relative w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain pt-2 pb-4 scroll-smooth">

            <div className="flex w-max min-w-full gap-8">

                {flashProducts.map((product) => (

                    <div key={product.id} data-slider-item className="w-[calc(100vw-2rem)] shrink-0 snap-start sm:w-[270px]">

                        <ProductCard
                            product={product}
                            
                            showDiscount={true}
                            showBadge={true}
                            showColors={false}
                        />

                    </div>
                    ))}

            </div>

        </div>


        <div className="flex justify-center pt-4">

            <Link href="/category/all">

                <Button variant="primary" size="md" className="!text-white font-medium px-12 py-4">
                    {t("viewAllProducts")}
                </Button>

            </Link>

        </div>


    </div>

</section>

);

};
