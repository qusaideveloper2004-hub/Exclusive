"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";

export function HomeErrorState() {
    const t = useTranslations("Home");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return (
        <div className="page-container flex flex-col items-start gap-4 py-10" role="alert">
            <p className="text-sm text-red-600">{t("loadProductsError")}</p>
            <Button
                type="button"
                size="sm"
                disabled={isPending}
                onClick={() => startTransition(() => router.refresh())}
            >
                {isPending ? t("loadingProducts") : t("retry")}
            </Button>
        </div>
    );
}
