"use client";

import { useTranslations } from "next-intl";

import { useCartStore } from "@/store/useCartStore";
import { Link } from "@/i18n/routing";
import CheckoutItem from "@/components/checkout/CheckoutItem";


type OrderSummaryProps = {
    items: ReturnType<typeof useCartStore.getState>["items"];
    appliedCoupon: ReturnType<typeof useCartStore.getState>["appliedCoupon"];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    step: 1 | 2 | 3;
    formatPrice: (amount: number) => string;
};


export default function OrderSummary({ items, appliedCoupon, subtotal, shipping, discount, total,step, formatPrice, }: OrderSummaryProps) {

    const t = useTranslations("Checkout");


    return (

        <>

            <h2 className="mb-6 text-xl font-medium text-black">
                {step === 1 ? t("orderSummary") : t("reviewTitle")}
            </h2>

            <div className="mb-6 max-h-64 space-y-5 overflow-y-auto pe-2">

                {items.length === 0 ? (

                    <div className="flex items-center justify-between gap-4 text-sm text-gray-500">

                        <span>{t("emptyCart")}</span>

                        <Link href="/cart" className="shrink-0 text-[var(--brand)] underline">
                            {t("backToCart")}
                        </Link>

                    </div>

                ) : (

                    items.map((item, index) => (

                        <CheckoutItem
                            key={`${item.product.id}-${item.selectedColor ?? ""}-${item.selectedSize ?? ""}-${index}`}
                            item={item}
                            formatPrice={formatPrice}
                        />

                    ))

                )}

            </div>

            <dl className="space-y-4 border-b border-gray-300 pb-5 text-sm text-black">

                <div className="flex items-center justify-between gap-4">

                    <dt>{t("subtotal")}</dt>

                    <dd>{formatPrice(subtotal)}</dd>

                </div>

                {appliedCoupon && (

                    <div className="flex items-center justify-between gap-4 text-green-700">

                        <dt>{t("discount")}</dt>

                        <dd>-{formatPrice(discount)}</dd>

                    </div>

                )}

                <div className="flex items-center justify-between gap-4">

                    <dt>{t("shipping")}</dt>

                    <dd>
                        {shipping === 0 ? t("free") : formatPrice(shipping)}
                    </dd>

                </div>

                <div className="flex items-center justify-between gap-4 pt-1 font-medium">

                    <dt>{t("total")}</dt>

                    <dd>{formatPrice(total)}</dd>

                </div>

            </dl>

        </>

    );

}

