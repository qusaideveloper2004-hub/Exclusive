import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

import LoginPageClient from "./LoginPageClient";

type Props = { params: Promise<{ locale: "en" | "ar"; }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default function LoginPage() {

    return <LoginPageClient />;

}


