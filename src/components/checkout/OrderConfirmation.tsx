
"use client";

import { useTranslations } from "next-intl";

import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";


export default function OrderConfirmation() {

    const t = useTranslations("Checkout");


    return (

        <main className="page-container flex min-h-[55vh] max-w-[1170px] flex-col items-center justify-center py-16 text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">

                <Check className="h-10 w-10" />

            </div>

            <h1 className="mb-3 text-3xl font-semibold text-black">
                {t("orderConfirmedTitle")}
            </h1>

            <p className="mb-8 max-w-md text-sm leading-6 text-gray-600">
                {t("orderConfirmedDesc")}
            </p>

            <Link href="/">
                <Button variant="primary" size="md">
                    {t("backToHome")}
                </Button>
            </Link>

        </main>

    );

}


