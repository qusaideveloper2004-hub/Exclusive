"use client";

import { useLocale } from "next-intl";
import {useTranslations} from "next-intl";

import { usePathname, useRouter, Link } from "@/i18n/routing";

import { Dropdown } from "@/components/ui/Dropdown";

const LANGUAGE_OPTIONS = [

{ label: "English", value: "en" },
{ label: "العربية", value: "ar" },
];

export const TopBanner = () => {

const currentLocale = useLocale();
const pathname = usePathname();

const router = useRouter();

const t = useTranslations("TopBanner");

const handleLanguageChange = (nextLocale: string) => {router.replace(pathname, { locale: nextLocale }); };

return (
  
  <div className="w-full bg-black text-white">

    <div className="page-container flex min-h-[44px] flex-col items-center justify-center gap-1 py-2 sm:flex-row sm:justify-between sm:gap-4">

      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-2 text-center text-xs sm:text-sm">

          <span className="min-w-0">{t("announcement")}</span>

          <Link
            href="/category/sale"
            className="shrink-0 font-semibold underline underline-offset-2 transition-colors hover:text-gray-300"
          >
            {t("shopNow")}
          </Link>

      </div>


      <div className="flex shrink-0 items-center justify-center sm:justify-end">

          <Dropdown
            options={LANGUAGE_OPTIONS}
            value={currentLocale}

            onChange={handleLanguageChange}
          />

      </div>

    </div>

  </div>
);
};




