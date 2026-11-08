"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import type { UseFormRegister } from "react-hook-form";

import type { CheckoutFormInput } from "@/types/checkout";


type PaymentMethodProps = { register: UseFormRegister<CheckoutFormInput>; };


export default function PaymentMethod({ register }: PaymentMethodProps) {

    const t = useTranslations("Checkout");


    return (

        <fieldset className="min-w-0 space-y-5 border-b border-gray-200 py-5">

            <legend className="text-sm font-medium text-black">
                {t("paymentMethod")}
            </legend>

            <label className="flex items-center justify-between gap-3">

                <span className="flex items-center gap-3 text-sm text-black">

                    <input
                        type="radio"
                        value="bank"
                        {...register("paymentMethod")}
                        className="h-4 w-4 accent-black"
                    />

                    {t("bank")}

                </span>

                <span className="flex items-center gap-2">

                    <Image
                        src="/images/checkout/Bkash.png"
                        alt="bKash"
                        width={38}
                        height={24}
                        className="h-6 w-[38px] object-contain"
                    />

                    <Image
                        src="/images/checkout/Visa.png"
                        alt="Visa"
                        width={38}
                        height={24}
                        className="h-6 w-[38px] object-contain"
                    />

                    <Image
                        src="/images/checkout/Mastercard.png"
                        alt="Mastercard"
                        width={38}
                        height={24}
                        className="h-6 w-[38px] object-contain"
                    />

                    <Image
                        src="/images/checkout/Nagad.png"
                        alt="Nagad"
                        width={38}
                        height={24}
                        className="h-6 w-[38px] object-contain"
                    />

                </span>

            </label>

            <label className="flex items-center gap-3 text-sm text-black">

                <input
                    type="radio"
                    value="cash"
                    {...register("paymentMethod")}
                    className="h-4 w-4 accent-black"
                />

                {t("cashDelivery")}

            </label>

        </fieldset>

    );

}


