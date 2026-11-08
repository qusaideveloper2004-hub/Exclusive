"use client";

import { useState } from "react";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { CountdownTimer } from "@/components/ui/CountdownTimer";

export const PromoBannerSection = () => {

const t = useTranslations("PromoBanner");

const [targetDate] = useState( () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) );

return (

<section className="py-10">

    <div className="page-container max-w-[1170px]">

        <div className="relative w-full bg-black text-white rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-14 lg:p-16 gap-8">




            <div className="flex flex-col items-start gap-8 z-10 max-w-lg">

                <span className="text-[#00FF66] text-sm md:text-base font-semibold tracking-wide">
                    {t("kicker")}
                </span>


                <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-wide max-w-[340px]">
                    {t("title")}
                </h2>

                <CountdownTimer
                    targetDate={targetDate}
                    variant="circular"
                />

                <Link
                    href="/category/electronics"
                    className="mt-2 inline-flex min-h-12 items-center justify-center rounded bg-[#00FF66] px-12 py-4 font-medium text-black transition-colors hover:bg-[#00cc52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    {t("buyNow")}
                </Link>

            </div>





            <div className="relative w-full md:w-1/2 h-[260px] md:h-[330px] flex items-center justify-center">

                <Image
                    src="/images/home/PromoBannerSection/jbl-speaker2.jpg"
                    alt="JBL Speaker"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"

                    className="z-10 object-contain mix-blend-screen"
                />

            </div>




        </div>

    </div>

</section>
);
}

