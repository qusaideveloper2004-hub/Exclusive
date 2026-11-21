"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

export function HomeErrorState() {
    const t = useTranslations("Home");
    const router = useRouter();

    return (
        <div className="page-container flex flex-col items-start gap-4 py-10" role="alert">
            <p className="text-sm text-red-600">{t("loadProductsError")}</p>
            <Button type="button" size="sm" onClick={() => router.refresh()}>
                {t("retry")}
            </Button>
        </div>
    );
}


