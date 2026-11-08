"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { Button } from "@/components/ui/Button";

import { ProductCard } from "@/components/products/ProductCard";

import { Product } from "@/types/product";

interface ExploreProductsSectionProps { products: Product[]; }


export const ExploreProductsSection: React.FC<ExploreProductsSectionProps> = ({ products }) => {

const t = useTranslations("ExploreProducts");
const [pageIndex, setPageIndex] = useState(0);


const currentProducts = products.slice(pageIndex * 8, pageIndex * 8 + 8);

const firstRowProducts = currentProducts.slice(0, 4);
const secondRowProducts = currentProducts.slice(4, 8);



const handlePrev = () => {setPageIndex((prev) => (prev > 0 ? prev - 1 : 0));};
const handleNext = () => {if ((pageIndex + 1) * 8 < products.length) {setPageIndex((prev) => prev + 1);} };


return (

    <section className="py-14 border-b border-gray-300">

        <div className="page-container max-w-[1170px]">

            <div className="flex flex-col gap-10">

                <div className="flex items-end justify-between">

                        <SectionTitle
                            kicker={t("kicker")}
                            title={t("title")}
                        />

                        <SliderArrows
                            onPrev={handlePrev}
                            onNext={handleNext}
                        />

                </div>


                <div className="flex flex-col gap-8">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                            {firstRowProducts.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}

                                    showBadge={false}
                                    showDiscount={false}
                                    showColors={false}
                                />

                            ))}

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                            {secondRowProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}

                                    showDiscount={false}

                                    showBadge={true}
                                    showColors={true}
                                />

                            ))}

                        </div>

                </div>


                <div className="flex justify-center pt-4">

                        <Link href="/category/all">

                            <Button variant="primary" size="md" className="!text-white font-medium px-12 py-4">

                                {t("viewAll")}

                            </Button>

                        </Link>

                </div>

            </div>

        </div>s

    </section>

);

};


