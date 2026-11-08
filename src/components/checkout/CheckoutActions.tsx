"use client";

import { useTranslations } from "next-intl";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";


type CheckoutActionsProps = {
    step: 1 | 2 | 3;
    onNextStep: () => void;
    onBackStep: () => void;
};


export default function CheckoutActions({ step, onNextStep, onBackStep, }: CheckoutActionsProps) {

const t = useTranslations("Checkout");


    return (

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            {step === 1 ? (

                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={onNextStep}
                    className="w-full gap-2"
                >

                    <span>{t("continueReview")}</span>

                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />

                </Button>

            ) : (

                <div className="w-full space-y-3">

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        {t("placeOrder")}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={onBackStep}
                        className="w-full gap-2"
                    >

                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />

                        {t("backShipping")}

                    </Button>

                </div>

            )}

        </div>

    );

}



