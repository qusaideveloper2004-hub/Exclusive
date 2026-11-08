import { getMessages } from "next-intl/server";
import { setRequestLocale} from   "next-intl/server"

import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";





import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/lib/seo/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>; }): Promise<Metadata> {

  const { locale } = await params;

    const validLocale = SUPPORTED_LOCALES.includes( locale as (typeof SUPPORTED_LOCALES)[number])
      ? locale as (typeof SUPPORTED_LOCALES)[number]
        : DEFAULT_LOCALE;

    return createMetadata(validLocale);
}






export function generateStaticParams() {

  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params, }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {

const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);


const messages = await getMessages();
const dir = locale === "ar" ? "rtl" : "ltr";

  return (

    <html lang={locale} dir={dir}>
      <body className="min-h-screen bg-background text-foreground antialiased">

        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>

      </body>
    </html>

  );
}




