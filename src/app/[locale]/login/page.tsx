import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

import LoginPageClient from "./LoginPageClient";
import { type Locale } from "@/lib/seo/constants";

type Props = { params: Promise<{ locale: Locale }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;

    return createNoIndexMetadata(locale);

}

export default function LoginPage() {

    return <LoginPageClient />;

}

