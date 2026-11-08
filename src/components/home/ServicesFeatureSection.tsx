"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { FaArrowUp } from "react-icons/fa";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServicesSection } from "../shared/ServicesSection";

const FEATURED_ITEMS = [

    {

        id: "ps5",
        titleKey: "ps5Title",
        descKey: "ps5Desc",

        image: "/images/home/New-Arrival/ps5.jpg",
        link: "/category/electronics",

        gridClass: "col-span-1 md:col-span-2 md:row-span-2 h-[300px] md:h-[600px]",
    },

    {

        id: "women",
        titleKey: "womenTitle",
        descKey: "womenDesc",

        image: "/images/home/New-Arrival/women-collection.jpg",
        link: "/category/women's clothing",

        gridClass: "col-span-1 md:col-span-2 h-[284px]",
    },

    {

        id: "speakers",
        titleKey: "speakersTitle",
        descKey: "speakersDesc",

        image: "/images/home/New-Arrival/speakers.jpg",
        link: "/category/electronics",

        gridClass: "col-span-1 h-[284px]",
    },

    {

        id: "perfume",
        titleKey: "perfumeTitle",
        descKey: "perfumeDesc",

        image: "/images/home/New-Arrival/perfume.jpg",
        link: "/category/jewelery",

        gridClass: "col-span-1 h-[284px]",
    },

];

export const ServicesFeatureSection = () => {

const t = useTranslations("ServicesFeature");
const commonT = useTranslations("Common");

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

return (

<section className="relative py-8">

    <div className="page-container max-w-[1170px] flex flex-col gap-12">


        <div className="flex flex-col gap-10">

            <SectionTitle
                kicker={t("kicker")}
                title={t("title")}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {FEATURED_ITEMS.map((itemS) => (
                    <div key={itemS.id} className={`relative bg-black rounded-sm overflow-hidden group p-6 md:p-8 flex items-end ${itemS.gridClass}`} >

                        <Image
                            src={itemS.image}
                            alt={t(`featured.${itemS.titleKey}`)}
                            fill
                            sizes={itemS.id === "ps5"
                                ? "(max-width: 768px) 100vw, 50vw"
                                : "(max-width: 768px) 100vw, 25vw"}
                                
                            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                        />


                        <div className="relative z-10 flex flex-col items-start gap-2 max-w-xs text-white">
    
                            <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
                                {t(`featured.${itemS.titleKey}`)}
                            </h3>
    
                            <p className="text-xs md:text-sm text-gray-300 font-normal">
                                {t(`featured.${itemS.descKey}`)}
                            </p>
    
                            <Link
                                className="font-medium text-sm md:text-base border-b border-white/60 pb-0.5 hover:border-white transition-colors mt-1"
                                href={itemS.link}
                            >
                                {t("shopNow")}
                            </Link>
    
                        </div>
    
                    </div>

                        ))}

            </div>

        </div>


            <ServicesSection />


            <div className="flex justify-end">

                    <button
                        onClick={scrollToTop}

                        aria-label={commonT("scrollToTop")}
                        className="w-12 h-12 rounded-full bg-gray-100 text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm cursor-pointer"
                    >

                        <FaArrowUp className="w-5 h-5" />

                    </button>

            </div>

    </div>

</section>

);

};


