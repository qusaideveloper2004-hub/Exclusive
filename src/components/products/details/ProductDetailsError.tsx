import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { useLocale } from "next-intl";


export function ProductDetailsError({ onRetry }: { onRetry?: () => void }) {

const t = useTranslations("ProductDetails");
const locale = useLocale();


return (

<main className="py-20 text-center">

    <div className="page-container max-w-[1170px] flex flex-col items-center gap-4">

        <p className="text-red-600 text-lg font-medium">
            {t("errorMessage")}
        </p>

        {onRetry && (
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                {locale === "ar" ? "إعادة المحاولة" : "Retry"}
            </Button>
        )}

        <Link href="/">

            <Button variant="primary" size="md">
                {t("backHome")}
            </Button>

        </Link>

    </div>

</main>

);

}

