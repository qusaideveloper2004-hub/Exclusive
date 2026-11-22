import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/seo/constants";

import SignupPageClient from "./SignupPageClient";

type Props = { params: Promise<{ locale: Locale }> };

export default async function SignupPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <SignupPageClient />;
}
