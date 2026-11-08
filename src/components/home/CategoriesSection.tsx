"use client";

import { useState } from "react";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SliderArrows } from "@/components/ui/SliderArrows";

const CATEGORY_ITEMS = [

    { id: 1, titleKey: "phones", image: "/images/home/Categories/Category-CellPhone.png", slug: "electronics" },
    { id: 2, titleKey: "computers", image: "/images/home/Categories/Category-Computer.png", slug: "electronics" },
    { id: 3, titleKey: "smartWatch", image: "/images/home/Categories/Category-SmartWatch.png", slug: "electronics" },
    { id: 4, titleKey: "camera", image: "/images/home/Categories/Category-Camera.png", slug: "electronics" },
    { id: 5, titleKey: "headPhones", image: "/images/home/Categories/Category-Headphone.png", slug: "electronics" },
    { id: 6, titleKey: "gaming", image: "/images/home/Categories/Category-Gamepad.png", slug: "electronics" },
    { id: 7, titleKey: "fashion", image: "/images/home/Categories/Category-Fashion.png", slug: "women's clothing" },
    { id: 8, titleKey: "bike", image: "/images/home/Categories/Category-Bike.png", slug: "men's clothing" },

];

export const CategoriesSection = () => {

const t = useTranslations("CategorySection");


const [currentIndex, setCurrentIndex] = useState(0);
const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));;
const handleNext = () => {setCurrentIndex((prev) => (prev < CATEGORY_ITEMS.length - 6 ? prev + 1 : prev));};

return (

<section className="py-14 border-b border-gray-200">

    <div className="page-container max-w-[1170px] flex flex-col gap-10">



        <div className="flex items-end justify-between">

            <SectionTitle kicker={t("kicker")} title={t("title")} />
            <SliderArrows onPrev={handlePrev} onNext={handleNext} />

        </div>



        <div className="relative w-full overflow-hidden pt-2 pb-2">

            <div className="flex gap-8 transition-transform duration-500 ease-out" style={{transform: `translateX(-${currentIndex * 202}px)`,}}>

                {CATEGORY_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        href={`/category/${item.slug}`}

                        className="group relative flex flex-col items-center justify-center w-[170px] h-[145px] shrink-0 rounded border border-gray-300 hover:border-[var(--brand)] hover:bg-[var(--brand)] transition-all duration-300 cursor-pointer"
                    >

                        <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                            <Image
                            src={item.image}
                            alt={t(`categories.${item.titleKey}`)}
                            
                            width={56}
                            height={56}

                            className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                            />
                        </div>

                        <span className="text-base font-normal text-black group-hover:text-white transition-colors duration-300">
                            {t(`categories.${item.titleKey}`)}
                        </span>

                    </Link>
                ))}
            </div>

        </div>



    </div>

</section>

);

};



