import type { Metadata } from "next";

import { createNoIndexMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/lib/seo/constants";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return createNoIndexMetadata(locale);
}

export default function SignupLayout({ children }: Pick<Props, "children">) {
    return children;
}

