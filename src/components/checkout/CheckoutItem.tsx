"use client";

import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";
import { useCartStore } from "@/store/useCartStore";
import { localizeProduct } from "@/i18n/productTranslations";
import type { Locale } from "@/lib/seo/constants";


type CheckoutItemProps = {
    item: ReturnType<typeof useCartStore.getState>["items"][number];
    formatPrice: (amount: number) => string;
};


export default function CheckoutItem({ item, formatPrice }: CheckoutItemProps) {

    const t = useTranslations("Checkout");
    const locale = useLocale() as Locale;
    const product = localizeProduct(item.product, locale);


    return (

        <div className="flex items-center justify-between gap-4">

            <div className="flex min-w-0 items-center gap-4">

                <div className="relative h-14 w-14 shrink-0 rounded bg-[#F5F5F5] p-2">

                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-contain p-2"
                    />

                </div>

                <div className="min-w-0">

                    <p className="truncate text-sm font-medium text-black">
                        {product.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        {t("quantity", { count: item.quantity })}
                    </p>

                </div>

            </div>

            <span className="shrink-0 text-sm text-black">
                {formatPrice(item.product.price * item.quantity)}
            </span>

        </div>

    );

}

