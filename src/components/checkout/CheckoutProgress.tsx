"use client";

import { useTranslations } from "next-intl";


type CheckoutProgressProps = {
    step: 1 | 2 | 3;
};


export default function CheckoutProgress({ step }: CheckoutProgressProps) {

    const t = useTranslations("Checkout");


    return (

        <ol className="mb-10 grid max-w-xl grid-cols-2 text-sm">

            {[1, 2].map((stepNumber) => (

                <li
                    key={stepNumber}
                    aria-current={step === stepNumber ? "step" : undefined}
                    className={`flex items-center gap-3 border-b-2 pb-3 ${
                        step >= stepNumber
                            ? "border-[var(--brand)] text-black"
                            : "border-gray-200 text-gray-400"
                    }`}
                >

                    <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                            step >= stepNumber
                                ? "bg-[var(--brand)] text-white"
                                : "bg-gray-100 text-gray-500"
                        }`}
                    >

                        {stepNumber}

                    </span>

                    {stepNumber === 1 ? t("steps.shipping") : t("steps.review")}

                </li>

            ))}

        </ol>

    );

}


