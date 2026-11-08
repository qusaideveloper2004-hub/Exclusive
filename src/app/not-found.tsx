import Link from "next/link";

import { getLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";

import { Button } from "@/components/ui/Button";

export default async function NotFoundPage() {

const locale = await getLocale();
const messages = await getMessages();

const text = messages.NotFoundPage as Record<string, string>;

return (

<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
<body className="min-h-screen bg-background text-foreground antialiased">

    <main className="py-16 md:py-24">

        <div className="page-container max-w-[1170px] flex flex-col gap-20">

            <nav className="flex items-center gap-2 text-sm text-gray-500">

                    <Link href={`/${locale}`} className="hover:text-black transition-colors">
                        {text.breadcrumbHome}
                    </Link>

                    <span>/</span>

                    <span className="text-black font-medium">
                        {text.breadcrumb404}
                    </span>

            </nav>


            <div className="flex flex-col items-center justify-center text-center gap-10 py-10">

                <div className="flex flex-col gap-6 items-center">

                    <h1 className="text-6xl sm:text-8xl md:text-[110px] font-medium tracking-wider text-black leading-none">
                        {text.title}
                    </h1>

                    <p className="text-sm sm:text-base text-black max-w-md">
                        {text.subtitle}
                    </p>

                </div>


                    <Link href={`/${locale}`}>

                        <Button
                            variant="primary"
                            size="md"

                            className="!bg-[var(--brand)] !text-white font-medium px-12 py-4 h-14 rounded text-base cursor-pointer hover:bg-[#d23f3f] transition-colors"
                        >
                            {text.backToHome}
                        </Button>

                    </Link>

            </div>

        </div>

    </main>

</body>
</html>

);

}


