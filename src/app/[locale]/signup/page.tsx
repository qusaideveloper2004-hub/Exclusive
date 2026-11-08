"use client";

import { useState } from "react";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createSignupSchema } from "@/lib/schemas/authSchema";
import type { SignupFormData } from "@/lib/schemas/authSchema";

import { useAuthStore } from "@/store/useAuthStore";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {


const t = useTranslations("Auth");

const router = useRouter();

const loginStore = useAuthStore((state) => state.login);

const [isLoading, setIsLoading] = useState(false);

const signupSchema = createSignupSchema({
    requiredField: t("validation.required"),
    passwordMin: t("validation.passwordMin"),
});

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        name: "",
        emailOrPhone: "",
        password: "",
    },
});

const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {

        setIsLoading(true);

        loginStore("mock-signup-token-12345", {
            name: data.name,
            firstName: data.name.split(" ")[0] || data.name,
            lastName: data.name.split(" ")[1] || "",
            email: data.emailOrPhone.includes("@") ? data.emailOrPhone : "user@example.com",
            username: data.name.toLowerCase().replace(/\s+/g, ""),
        });

        router.push("/");

    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
};

return (

<main className="w-full py-10 md:pb-20 md:pt-0">

    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[56%_44%] md:gap-0">

        <div className="relative aspect-[1.03/1] w-full overflow-hidden bg-[#CBE4E8]">
            <Image
                src="/images/auth/auth-login.jpg"
                alt={t("signupImageAlt")}

                fill
                priority
                className="object-cover"
            />
        </div>

        <div className="px-6 md:pl-[clamp(2rem,9vw,8rem)] md:pr-[max(2rem,calc((100vw-1170px)/2))]">

            <div className="mx-auto w-full max-w-[370px] md:mx-0">

                <h1 className="mb-3 text-2xl font-medium text-black sm:text-3xl">
                    {t("createAccountTitle")}
                </h1>

                <p className="mb-8 text-sm text-black">
                    {t("signupSubtitle")}
                </p>

                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <Input
                            type="text"
                            placeholder={t("namePlaceholder")}

                            {...register("name")}
                            error={errors.name?.message}

                            className="h-11 border-b border-black/50 border-t-0 border-x-0 bg-transparent px-0 rounded-none focus:border-black"
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            placeholder={t("emailOrPhonePlaceholder")}

                            {...register("emailOrPhone")}
                            error={errors.emailOrPhone?.message}

                            className="h-11 border-b border-black/50 border-t-0 border-x-0 bg-transparent px-0 rounded-none focus:border-black"
                        />
                    </div>

                    <div>
                        <Input
                            type="password"
                            placeholder={t("passwordPlaceholder")}

                            {...register("password")}
                            error={errors.password?.message}

                            className="h-11 border-b border-black/50 border-t-0 border-x-0 bg-transparent px-0 rounded-none focus:border-black"
                        />
                    </div>

                    <div className="space-y-4 pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? t("creatingAccount"): t("createAccount")}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="md"

                            onClick={() => alert(t("googleSignInDemo"))}

                            className="flex w-full items-center justify-center gap-3 border border-black/40 bg-transparent text-black transition-colors hover:bg-gray-50"
                        >
                            <FcGoogle className="h-5 w-5" aria-hidden="true" />
                            <span>{t("signUpGoogle")}</span>
                        </Button>
                    </div>

                    <div className="pt-2 text-center text-sm text-gray-600">
                        <span>{t("alreadyHaveAccount")} </span>
                        <Link
                            href="/login"
                            className="font-medium text-black underline underline-offset-4 hover:text-[#DB4444]"
                        >
                            {t("logIn")}
                        </Link>
                    </div>

                </form>

            </div>

        </div>

    </div>

</main>

);
}


