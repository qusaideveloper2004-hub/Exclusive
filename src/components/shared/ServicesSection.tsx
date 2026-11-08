"use client";


import Image from "next/image";
import { useTranslations } from "next-intl";

const SERVICES_ITEMS = [

{

    id: "delivery",
    titleKey: "deliveryTitle",
    descKey: "deliveryDesc",

    icon: "/images/home/New-Arrival/icon-delivery.png",
},
{

    id: "service",
    titleKey: "serviceTitle",
    descKey: "serviceDesc",

    icon: "/images/home/New-Arrival/Icon-Customer-service.png",
},
{

    id: "secure",
    titleKey: "secureTitle",
    descKey: "secureDesc",

    icon: "/images/home/New-Arrival/Icon-secure.png",
},
];


export const ServicesSection = ({ compact = false }: { compact?: boolean }) => {
const t = useTranslations("ServicesFeature");

return (

    <div className={`grid grid-cols-1 justify-items-center gap-8 py-10 md:grid-cols-3 ${compact ? "md:gap-8 md:py-0" : ""}`}>

        {SERVICES_ITEMS.map((service) => (

            <div key={service.id} className={`flex w-full flex-col items-center justify-start text-center ${compact ? "gap-3 md:gap-2" : "gap-4"}`}>

                <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-300/60 p-2 ${compact ? "md:h-13 md:w-13" : ""}`}>
                
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-black ${compact ? "md:h-10 md:w-10" : ""}`}>
                        <Image
                            src={service.icon}
                            alt={t(`services.${service.titleKey}`)}
                            width={compact ? 24 : 32}
                            height={compact ? 24 : 32}
                            
                            className="object-contain"
                        />
                    </div>

                </div>

                <div className="flex w-full flex-col items-center gap-1">
                    
                    <h4 className={`text-lg font-bold text-black uppercase md:text-xl ${compact ? "md:text-xs" : ""}`}>
                        {t(`services.${service.titleKey}`)}
                    </h4>
                    <p className={`max-w-[260px] text-xs text-gray-600 md:text-sm ${compact ? "md:text-[10px]" : ""}`}>
                        {t(`services.${service.descKey}`)}
                    </p>

                </div>

            </div>
        ))}

    </div>
);
};