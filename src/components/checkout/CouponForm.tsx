"use client";

import { useTranslations } from "next-intl";

import type { UseFormRegister } from "react-hook-form";
import type { CheckoutFormInput } from "@/types/checkout";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


type CouponFormProps = {
    register: UseFormRegister<CheckoutFormInput>;
    couponStatus: "success" | "error" | null;
    onApplyCoupon: () => void;
};


export default function CouponForm({ register, couponStatus, onApplyCoupon, }: CouponFormProps) {

    const t = useTranslations("Checkout");


    return (

        <div className="flex flex-col gap-3 pt-5 sm:flex-row">

            <div className="min-w-0 flex-1">

                <Input
                    {...register("couponCode")}

                    placeholder={t("couponPlaceholder")}
                    aria-label={t("couponPlaceholder")}
                    className="h-11 border border-black/40 bg-transparent"
                />

                {couponStatus && (

                    <p
                        role="status"
                        className={`mt-2 text-xs ${
                            couponStatus === "success"
                                ? "text-green-700"
                                : "text-red-600"
                        }`}
                    >
                        {t(couponStatus === "success" ? "couponApplied" : "couponInvalid")}
                    </p>

                )}

            </div>

            <Button
                type="button"
                variant="primary"
                size="sm"
                className="h-11 shrink-0 px-7"

                onClick={onApplyCoupon}
            >
                {t("applyCoupon")}
            </Button>

        </div>

    );

}


