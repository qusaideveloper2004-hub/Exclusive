"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SliderArrows } from "@/components/ui/SliderArrows";
import { useHorizontalSlider } from "@/hooks/useHorizontalSlider";

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

const { sliderRef, movePrevious, moveNext, syncCurrentIndex } = useHorizontalSlider();

return (

<section className="py-14 border-b border-gray-200">

    <div className="page-container max-w-[1170px] flex flex-col gap-10">



        <div className="flex items-end justify-between">

            <SectionTitle kicker={t("kicker")} title={t("title")} />
            <SliderArrows onPrev={movePrevious} onNext={moveNext} />

        </div>



        <div ref={sliderRef} onScroll={syncCurrentIndex} className="hide-scrollbar relative w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain pt-2 pb-2 scroll-smooth">

            <div className="flex w-max min-w-full gap-8">

                {CATEGORY_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        href={`/category/${item.slug}`}
                        data-slider-item

                        className="group relative flex h-[145px] w-[170px] shrink-0 snap-start cursor-pointer flex-col items-center justify-center rounded border border-gray-300 transition-all duration-300 hover:border-[var(--brand)] hover:bg-[var(--brand)]"
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
